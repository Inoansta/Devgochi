// 기능별 분류
import React, { useState, useEffect } from "react";
import SortItem from "./components/SortItem.jsx";
import ScoreBoard from "./components/ScoreBoard.jsx";
import GameOver from "./components/GameOver.jsx";
import GameStart from "./components/GameStart.jsx";
import Decoration from "./components/Decoration.jsx";
import { GAME_CONFIG, getStaticY } from "./constants.js";
import "./CSS/BugHunter.css";
import BackgroundImage from "./images/rail_background.png";

// 코드, 버그 생성을 위한 변수
let nextId = 0;

const BugHunter = () => {
  // [상태 관리]
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("READY"); // READY, PLAYING, GAMEOVER
  const [characters, setCharacters] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [isPausedForGameOver, setIsPausedForGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  // 게임 시작 함수
  const startGame = () => {
    setScore(0);
    setIsPausedForGameOver(false);
    setFeedback(null);
    setTimeLeft(60);

    const initialCharacters = Array.from({ length: 15 }, (_, index) => ({
      id: nextId++,
      type: Math.random() < 0.5 ? "정상코드" : "버그",
      x: GAME_CONFIG.RAIL_CENTER_X,
      y: getStaticY(index),
    }));

    setCharacters(initialCharacters);
    setStatus("PLAYING");
  };

  const endGame = () => setStatus("GameOver");

  // (타이머) PLAYING일 때만 작동
  useEffect(() => {
    if (status !== "PLAYING") return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [status]);

  // (피드백 효과) 정답/오답 시 테두리 반짝임
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 500);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  // [오답 처리] 오답 시 2초간 멈춘 뒤 게임오버 화면으로 전환
  useEffect(() => {
    if (isPausedForGameOver) {
      const timer = setTimeout(() => {
        endGame();
        setIsPausedForGameOver(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isPausedForGameOver]);

  // [입력 판정] 키보드 입력
  useEffect(() => {
    if (status !== "PLAYING" || isPausedForGameOver) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        const target = characters[0];
        const isCorrect =
          (e.key === "ArrowLeft" && target.type === "정상코드") ||
          (e.key === "ArrowRight" && target.type === "버그");

        if (isCorrect) {
          setScore((s) => s + 10);
          setFeedback("correct");
          setCharacters((prev) => {
            const remaining = prev
              .slice(1)
              .map((c, i) => ({ ...c, y: getStaticY(i) }));
            const newChar = {
              id: nextId++,
              type: Math.random() < 0.5 ? "정상코드" : "버그",
              x: GAME_CONFIG.RAIL_CENTER_X,
              y: getStaticY(remaining.length),
            };
            return [...remaining, newChar];
          });
        } else {
          setFeedback("incorrect");
          setIsPausedForGameOver(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [status, characters, isPausedForGameOver]);

  return (
    <div className="BugHunterContainer">
      {/* 장식 요소: 항상 배경으로 깔려 있음 */}
      <Decoration status={status} />

      {/* 시작 화면: status가 READY일 때만 표시 */}
      {status === "READY" && <GameStart onStart={startGame} />}

      {/* 게임 중 UI: status가 PLAYING일 때만 점수와 타이머 표시 */}
      {status === "PLAYING" && (
        <ScoreBoard score={score} timeLeft={timeLeft} status={status} />
      )}

      {/*  게임 오버 화면: status가 GameOver일 때만 표시 */}
      {status === "GameOver" && <GameOver score={score} onStart={startGame} />}

      {/* 게임 플레이 영역: status가 PLAYING일 때만 캐릭터들을 렌더링 */}
      {status === "PLAYING" && (
        <div
          className={`PlayArea ${feedback || ""}`}
          style={{ "--bg-image": `url(${BackgroundImage})` }}
        >
          {characters.map((char) => (
            <SortItem
              key={char.id}
              data={char}
              style={{ opacity: isPausedForGameOver ? 0.5 : 1 }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BugHunter;
