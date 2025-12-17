import React, { useState, useRef } from "react";
// import Character from './components/Character';
// import Obstacle from './components/Obstacle';
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

const GamePlay: React.FC<GamePlayProps> = ({ onGameOver }: GamePlayProps) => {
  // 로직과 상태들은 그대로...
  const [isJumping, setIsJumping] = useState(false);

  // ref 생성 (부모가 만듦)
  const playerRef = useRef<HTMLDivElement>(null);
  const obstacleRef = useRef<HTMLDivElement>(null);

  // ... 충돌 감지 로직 (playerRef.current로 접근 가능!) ...

  return (
    <GameContainer>
      <Background /> {/* 배경은 ref 필요 없음 */}
      {/* 2. UI 요소 (화면 맨 위) */}
      {/* <UIHeader>
       <HeartContainer>...</HeartContainer>
       <ScoreBoard>...</ScoreBoard>
    </UIHeader> */}
      {/* <Character 
        ref={playerRef} // ⭐ 이제 이렇게 넘겨줄 수 있음!
        isJumping={isJumping}
        isInvincible={isInvincible}
      />

      <Obstacle ref={obstacleRef} />
      
      <Item ... /> */}
    </GameContainer>
  );
};

export default GamePlay;
