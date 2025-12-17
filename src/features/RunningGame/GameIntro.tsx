import React, { useState, useEffect } from "react";
import "./GameIntro.css";

// 1. Props 타입 정의: 부모에게 받을 데이터의 모양
interface GameIntroProps {
  onStart: () => void; // 매개변수 없고, 반환값도 없는 함수
}

// 2. 기록 데이터의 모양 정의 (객체 구조)
interface GameRecord {
  score: number;
  date: string;
}

// 컴포넌트 함수 옆에 : React.FC<Props타입> 을 붙이거나, 매개변수 옆에 붙입니다.
const GameIntro = ({ onStart }: GameIntroProps) => {
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);

  // records는 GameRecord 객체들의 배열([])이라고 알려줍니다.
  const [records, setRecords] = useState<GameRecord[]>([]);

  useEffect(() => {
    // 더미 데이터도 타입에 맞춰서 작성
    const dummyRecords: GameRecord[] = [
      { score: 12500, date: "23.12.10" },
      { score: 8900, date: "23.12.11" },
      { score: 5400, date: "23.12.12" },
      { score: 1200, date: "23.12.12" },
      { score: 0, date: "-" },
    ];
    setRecords(dummyRecords.slice(0, 5));
  }, []);

  return (
    <div className="server-room-intro-container">
      <div className="scanline-overlay"></div>

      <h1 className="game-title neon-flicker">
        SERVER ROOM <br />
        <span className="title-highlight">RUNNING MAN</span>
      </h1>

      <div className="intro-content-box">
        {/* 기록 보드 */}
        <div className="record-board-container monitor-screen">
          <h2 className="board-title">SYSTEM_RECORDS_TOP_5</h2>
          <ul className="record-list">
            {records.map((record, index) => (
              <li key={index} className="record-item">
                <span className="rank">RANK 0{index + 1}</span>
                {/* 숫자에 toLocaleString() 자동완성이 잘 뜰 겁니다 */}
                <span className="score">
                  {record.score.toLocaleString()} PTS
                </span>
                <span className="date">[{record.date}]</span>
              </li>
            ))}
            {records.length === 0 && (
              <li className="no-record">NO DATA FOUND...</li>
            )}
          </ul>
        </div>

        {/* 버튼 그룹 */}
        <div className="button-group-container">
          <button
            className="cyber-button help-button"
            onClick={() => setShowHelpModal(true)}
          >
            <span className="btn-text">SYSTEM HELP</span>
            <span className="btn-glitch-effect"></span>
          </button>

          <button
            className="cyber-button start-button"
            onClick={onStart} // 타입이 맞으므로 에러 없음
          >
            <span className="btn-text">MISSION START</span>
            <span className="btn-glitch-effect"></span>
          </button>
        </div>
      </div>

      <footer className="intro-footer">
        STATUS: WAITING FOR PLAYER INPUT... // SERVER INTEGRITY: 98%
      </footer>
    </div>
  );
};

export default GameIntro;
