import { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import BackGround from "./assets/serverBack.png";
import { useCharacter } from "@/hooks/useCharacter";
import { useNavigate } from "react-router";

interface GameOverProps {
  score: number;
  onRestart: () => void; // 이름 변경: onGameOver -> onRestart (의미가 더 명확함)
}

// GameIntro와 거의 동일

// --- 네온 효과를 주기위한 애니메이션 ---
// 네온 상태에서 깜빡이도록
const textFlicker = keyframes`
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    opacity: 1;
    text-shadow: 
      0 0 5px #fff,
      0 0 10px #4DEEEA,
      0 0 20px #4DEEEA,
      0 0 40px #0055FF,
      0 0 80px #0055FF;
  }
  20%, 24%, 55% {
    opacity: 0.1;
    text-shadow: none;
  }
`;

// 박스 테두리 빛이 퍼졌다 줄어들었다 함
const borderPulse = keyframes`
  0% { 
    box-shadow: 
      -4px 0 0 0 #4DEEEA, 4px 0 0 0 #4DEEEA, 
      0 -4px 0 0 #4DEEEA, 0 4px 0 0 #4DEEEA,
      0 0 10px 0 rgba(0, 85, 255, 0.7); 
  }
  50% { 
    box-shadow: 
      -4px 0 0 0 #4DEEEA, 4px 0 0 0 #4DEEEA, 
      0 -4px 0 0 #4DEEEA, 0 4px 0 0 #4DEEEA,
      0 0 40px 10px rgba(0, 85, 255, 0.9); /* 빛이 제일 강하게 퍼짐 */
  }
  100% { 
    box-shadow: 
      -4px 0 0 0 #4DEEEA, 4px 0 0 0 #4DEEEA, 
      0 -4px 0 0 #4DEEEA, 0 4px 0 0 #4DEEEA,
      0 0 10px 0 rgba(0, 85, 255, 0.7); 
  }
`;

// --- 픽셀 박스 스타일 ---
const pixelBorderNeon = css`
  position: relative;
  background: rgba(0, 10, 20, 0.6); /* 아주 어두운 남색 배경 */
  margin: 4px;

  /* 숨쉬는 애니메이션 적용 */
  animation: ${borderPulse} 3s infinite ease-in-out;

  /* 모서리 계단 처리  */
  &::after {
    content: "";
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    box-shadow:
      -4px 0 0 0 #4deeea,
      4px 0 0 0 #4deeea,
      0 -4px 0 0 #4deeea,
      0 4px 0 0 #4deeea;
    z-index: -1;
  }
`;

// --- 컴포넌트 스타일 정의 ---

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-image: url(${BackGround});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  font-family: "Galmuri11", sans-serif;
  color: #fff;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 0;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-height: 90vh;
  width: 100%;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 0;
  line-height: 1.2;
  text-align: center;
  color: #f0ffff;
  animation: ${textFlicker} 4s infinite;
`;

const ResultBox = styled.div`
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  ${pixelBorderNeon}
`;

const ResultRow = styled.div<{ $isHighlight?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  padding-bottom: 15px;
  border-bottom: 2px dashed rgba(96, 255, 255, 0.3);

  color: ${(props) => (props.$isHighlight ? "#FFD700" : "#fff")};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .label {
    color: #4deeea;
    text-shadow: 0 0 10px rgba(0, 153, 255, 0.5);
  }

  .value {
    font-size: 1.4rem;
    text-shadow: 2px 2px 0 #000;
  }
`;

const NewRecordBadge = styled.span`
  background-color: #ff6b6b;
  color: white;
  font-size: 0.7rem;
  padding: 3px 6px;
  margin-left: 10px;
  box-shadow: 2px 2px 0 #000;
  animation: blink 0.8s steps(2, start) infinite;

  @keyframes blink {
    to {
      visibility: hidden;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;
  justify-content: center;
`;

const PixelButton = styled.button<{ $primary?: boolean }>`
  font-family: "Galmuri11", sans-serif;
  font-size: 1.2rem;
  background: ${(props) =>
    props.$primary ? "rgba(255, 107, 107, 0.1)" : "rgba(77, 238, 234, 0.1)"};
  color: ${(props) => (props.$primary ? "#FF6B6B" : "#4DEEEA")};
  border: 2px solid ${(props) => (props.$primary ? "#FF6B6B" : "#4DEEEA")};
  padding: 15px 30px;
  cursor: pointer;
  position: relative;

  box-shadow:
    inset 0 0 10px
      ${(props) =>
        props.$primary
          ? "rgba(255, 107, 107, 0.3)"
          : "rgba(77, 238, 234, 0.3)"},
    0 0 10px rgba(0, 0, 0, 0.5);
  text-shadow: 0 0 5px
    ${(props) =>
      props.$primary ? "rgba(255, 107, 107, 0.5)" : "rgba(77, 238, 234, 0.5)"};

  transition: all 0.1s;

  &:hover {
    transform: translate(-2px, -2px);
    background: ${(props) => (props.$primary ? "#FF6B6B" : "#4DEEEA")};
    color: #000;
    text-shadow: none;
    box-shadow:
      0 0 20px ${(props) => (props.$primary ? "#FF6B6B" : "#4DEEEA")},
      4px 4px 0px 0px #000;
  }

  &:active {
    transform: translate(2px, 2px);
    box-shadow: none;
  }
`;

// --- 4. Logic & Component ---

const GameOver = ({ score, onRestart }: GameOverProps) => {
  const [highScore, setHighScore] = useState<number>(0);
  const [isNewRecord, setIsNewRecord] = useState<boolean>(false);
  // 계산된 경험치
  const [gainedXp, setGainedXp] = useState<number>(0);
  // 총 경험치
  const [totalXp, setTotalXp] = useState<number>(0);
  const isNewRef = useRef<boolean | null>(null);
  const { gainExp } = useCharacter();
  const isExpProcessedRef = useRef<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. 로컬 스토리지에서 기존 최고 점수 가져오기
    const savedScore = localStorage.getItem("runningGameBestScore");
    const currentBest = savedScore ? parseInt(savedScore, 10) : 0;

    // 2. 신기록 갱신 체크
    if (score > currentBest) {
      localStorage.setItem("runningGameBestScore", score.toString());
      setHighScore(score);
      setIsNewRecord(true);

      // (선택) 여기에 신기록 달성 효과음 재생 로직 추가 가능
    } else {
      setHighScore(currentBest);
      setIsNewRecord(false);
    }

    if (!isExpProcessedRef.current) {
      // gainedXp state is updated asynchronously, so use local `xp` value
      gainExp(xp);
      const savedTotalXP = localStorage.getItem("exp");
      const currentTotalXP = savedTotalXP ? parseInt(savedTotalXP, 10) : 0;
      const newDisplayTotalXP = currentTotalXP + xp;
      setTotalXp(newDisplayTotalXP);
      isExpProcessedRef.current = true; // 처리 완료 플래그 세우기
    }
  }, [score]);

  return (
    <div className="game-over-container">
      <div className="error-box">
        <h1 className="error-title">SYSTEM FAILURE</h1>
        <p className="error-code">ERROR_CODE: 0xDEAD_BEEF</p>

        <div className="score-report">
          <div className="score-row">
            <span>FINAL SCORE</span>
            <span className="score-value">{score.toLocaleString()}</span>
          </div>

          <div
            className={`score-row best-row ${isNewRecord ? "new-record" : ""}`}
          >
            <span>BEST SCORE</span>
            <span className="score-value">
              {highScore.toLocaleString()}
              {isNewRecord && <span className="new-badge">NEW!</span>}
            </span>
          </ResultRow>
          <ResultRow>
            <span className="label">TOTAL EXP</span>
            <span className="value">{totalXp.toLocaleString()} XP</span>
          </ResultRow>
          <ResultRow $isHighlight={true}>
            <span className="label">BEST RECORD</span>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className="value">{bestScore.toLocaleString()} PTS</span>
              {isNewRecord && <NewRecordBadge>NEW!</NewRecordBadge>}
            </div>
          </ResultRow>
        </ResultBox>

{/* 버튼 영역 */}
        <ButtonGroup>
          <PixelButton onClick={onRestart}>
            SYSTEM REBOOT
          </PixelButton>
          <PixelButton $primary onClick={() => navigate("/")}>
            MISSION START
          </PixelButton>
        </ButtonGroup>
      </ContentWrapper>
    </Overlay>
  );
};

export default GameOver;
