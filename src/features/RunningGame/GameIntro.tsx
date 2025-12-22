import { useState, useEffect } from "react";
import "./GameIntro.css";

// 1. Props 타입 정의
interface GameIntroProps {
  onStart: () => void;
}

// 2. 기록 데이터의 모양 정의
interface GameRecord {
  score: number;
  date: string;
}

const GameIntro = ({ onStart }: GameIntroProps) => {
  // 💡 해결 방법: showHelpModal을 사용하지 않으므로 일단 주석 처리하거나,
  // 아래 return문에서 실제로 사용해야 합니다. 빌드 통과를 위해 주석 처리합니다.
  // const [showHelpModal, setShowHelpModal] = useState<boolean>(false);

  const [records, setRecords] = useState<GameRecord[]>([]);

  useEffect(() => {
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
            // onClick={() => setShowHelpModal(true)} // 상태를 안 쓰므로 일단 로그만 찍게 수정
            onClick={() => console.log("Help clicked")}
          >
            <span className="btn-text">SYSTEM HELP</span>
            <span className="btn-glitch-effect"></span>
          </button>

          <button className="cyber-button start-button" onClick={onStart}>
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
