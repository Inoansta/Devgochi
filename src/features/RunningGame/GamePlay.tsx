import { useState, useRef, useCallback, useEffect } from "react";
import Character from "./components/Character";
import Obstacle from "./components/Obstacle";
// import Item from './components/Item';
import Background from "./components/BackGround";

import styled from "styled-components";

const GameContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  cursor: pointer;
  overflow: hidden;
`;
interface GamePlayProps {
  onGameOver: (finalScore: number) => void;
}

// onGameOver로 finalScore 값을 부모로 넘겨줘야함
const GamePlay = ({ onGameOver }: GamePlayProps) => {
  // Character 컴포넌트에 전달할 점프 상태
  const [isJumping, setIsJumping] = useState<boolean>(false);
  // 시각적 효과를 위한 상태 (캐릭터 깜빡임용)
  const [isInvincible, setIsInvincible] = useState<boolean>(false);
  // 점수 표시를 위한 상태
  const [score, setScore] = useState<number>(0);
  // 생명 (3개)를 위한 상태
  const [hearts, setHearts] = useState<number>(3);
  // 게임이 끝났는지 판별하기 위한 상태
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // ref 생성 (부모에서 생성해야지 자식 컴포넌트의 위치를 확인할 수 있음)
  const playerRef = useRef<HTMLDivElement>(null);
  const obstacleRef = useRef<HTMLDivElement>(null);
  // 충돌 감지
  const isHitRef = useRef<boolean>(false);
  // 점수
  const scoreRef = useRef<number>(0);

  // 점프 함수
  const jump = useCallback(() => {
    // 이미 점프 중이면 무시 (이단 점프 방지)
    if (isJumping) return;

    setIsJumping(true);

    // 캐릭터 애니메이션 시간(0.5s)과 똑같이 맞춰서 false로 되돌림
    setTimeout(() => {
      setIsJumping(false);
    }, 700);
  }, [isJumping]); // isJumping이 바뀔 때만 함수 갱신

  // 스페이스바 눌렀을 때 점프하도록 window 객체에 이벤트 리스너 등록하기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault(); // 스페이스바 누르면 화면 스크롤 내려가는 거 막기
        jump();
      }
    };

    // 마운트 될 때 리스너 붙이기
    window.addEventListener("keydown", handleKeyDown);
    // 언마운트 될 때 리스너 떼기 (메모리 누수 방지)
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [jump]); // jump 함수가 바뀌면 리스너도 다시 등록

  // 0.1초 마다 점수 갱신 로직
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      // state 업데이트 (화면 표시용)
      setScore((prev) => prev + 10);
      // ref 업데이트 (게임 로직 참조용) -> 얘는 즉시 바뀜
      scoreRef.current += 10;
    }, 100);
    return () => clearInterval(timer);
  }, [isPlaying]);

  // setInterval 대신 rAF 사용
  useEffect(() => {
    let animationId: number;

    const loop = () => {
      // 충돌 체크 로직
      if (playerRef.current && obstacleRef.current) {
        // 충돌했고, 현재 무적 상태(충돌 중)가 아니라면
        if (
          checkCollision(playerRef.current, obstacleRef.current) &&
          !isHitRef.current
        ) {
          // (1) 중복 충돌 방지
          isHitRef.current = true;

          // (2) 하트 감소 및 게임 오버 체크
          setHearts((prev) => {
            const newHeart = prev - 1;
            if (newHeart <= 0) {
              setIsPlaying(false);
              onGameOver(scoreRef.current); // 최신 점수로 게임 오버 처리
            }
            return newHeart;
          });

          // (3) 무적 효과
          setIsInvincible(true);

          // (4) 1초 뒤 무적 해제
          setTimeout(() => {
            isHitRef.current = false;
            setIsInvincible(false);
          }, 1000);
        }
      }

      // 충돌 여부와 상관없이 게임이 진행 중이면 다음 프레임을 계속 요청해야 함
      if (isPlaying) {
        animationId = requestAnimationFrame(loop);
      }
    };

    // 게임 시작 시 루프 실행
    if (isPlaying) {
      loop();
    }

    // Cleanup: 언마운트되거나 isPlaying이 false가 되면 루프 중단
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying, setIsPlaying, onGameOver]); // 의존성 배열 정리

  // 4. 충돌 계산 함수 (타입 지정)
  const checkCollision = (
    playerNode: HTMLDivElement,
    obstacleNode: HTMLDivElement
  ): boolean => {
    const player = playerNode.getBoundingClientRect();
    const obstacle = obstacleNode.getBoundingClientRect();

    return (
      player.right > obstacle.left + 20 &&
      player.left < obstacle.right - 20 &&
      player.bottom > obstacle.top &&
      player.top < obstacle.bottom
    );
  };

  return (
    <GameContainer onClick={jump}>
      <Background /> {/* 배경은 ref 필요 없음 */}
      {/* 2. UI 요소 (화면 맨 위) */}
      {/* <UIHeader>
       <HeartContainer>...</HeartContainer>
       <ScoreBoard>...</ScoreBoard>
    </UIHeader> */}
      <Character
        ref={playerRef}
        isJumping={isJumping}
        isInvincible={isInvincible}
      />
      <Obstacle ref={obstacleRef} />
      {/*<Item ... /> */}
    </GameContainer>
  );
};

export default GamePlay;
