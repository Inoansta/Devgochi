// 1. 아래 줄을 완전히 삭제하거나 주석 처리하세요.
// import { useState, useRef } from "react";

import Background from "./components/BackGround";
import styled from "styled-components";

// ... 이하 코드 동일 ...
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

const GamePlay = ({ onGameOver: _onGameOver }: GamePlayProps) => {
  return (
    <GameContainer>
      <Background />
    </GameContainer>
  );
};

export default GamePlay;
