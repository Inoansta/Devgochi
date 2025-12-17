import React, { useEffect, useState } from "react";
import "./GameOver.css";

interface GameOverProps {
  score: number;
  onRestart: () => void; // 이름 변경: onGameOver -> onRestart (의미가 더 명확함)
}

const GameOver = ({ score, onRestart }: GameOverProps) => {
  const [highScore, setHighScore] = useState<number>(0);
  const [isNewRecord, setIsNewRecord] = useState<boolean>(false);

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

    // 3. 기록 목록(랭킹) 업데이트 로직도 여기에 추가할 수 있음 (복잡해지니 일단 생략)
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
          </div>
        </div>

        <p className="message">
          {isNewRecord
            ? "🎉 NEW SYSTEM RECORD ESTABLISHED! 🎉"
            : "SERVER DISCONNECTED. REBOOT REQUIRED."}
        </p>

        <button className="reboot-button" onClick={onRestart}>
          SYSTEM REBOOT (TRY AGAIN)
        </button>
      </div>
    </div>
  );
};

export default GameOver;
