import React from "react";

const GameStart = ({ onStart }) => {
  return (
    <div className="Overlay ready-screen">
      <h1>👾 버그 헌터 (Bug Hunter)</h1>

      <div className="Instructions">
        <p>
          <strong>[조작 방법]</strong>
        </p>
        <p>정상 코드: ⬅️ 왼쪽 방향키</p>
        <p>버그(벌레): ➡️ 오른쪽 방향키</p>
      </div>

      <button className="start-button" onClick={onStart}>
        게임 시작
      </button>
    </div>
  );
};

export default GameStart;
