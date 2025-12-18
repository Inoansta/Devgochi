import React from "react";

const GameOver = ({ score, onStart }) => {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="GameOverMessage">
      <h2>⚠️ GAME OVER</h2>
      <p>
        최종 점수 : <strong>{score}</strong>
      </p>

      <div className="button-group">
        <button className="start-button" onClick={onStart}>
          재시작
        </button>
        <button className="home-button" onClick={handleGoHome}>
          나가기
        </button>
      </div>
    </div>
  );
};

export default GameOver;
