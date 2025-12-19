import React from "react";
import "../css/ScoreBoard.css"; 
const ScoreBoard = ({ score, timeLeft, status }) => {
  return (
    <>
      <div className="ScoreDisplay">점수 : {score}</div>
      {status === "PLAYING" && (
        <div className="TimerDisplay">남은 시간 : {timeLeft}초</div>
      )}
    </>
  );
};

export default ScoreBoard;
