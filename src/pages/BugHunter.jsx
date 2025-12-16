import React, { useState, useEffect } from "react";
import SortItem from "../components/SortItem.jsx";
import "../css/BugHunter.css";
import BackgroundImage from "../images/rail_background.png";
import LeftDecoImage from "../images/code.png";
import RightDecoImage from "../images/bug.png";

let nextId = 0;

// 분류 객체의 중앙선, 나열 간격, 그리고 판정 Y 좌표
const RAIL_CENTER_X = 300;
const GAP = 45;
const BOTTOM_Y = 500;

// index에 따라 레일 위에서의 '대기 위치' Y 좌표를 계산
const getStaticY = (index) => BOTTOM_Y - index * GAP;

const BugHunter = () => {
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("READY");
  const [characters, setCharacters] = useState([]);
  const [feedback, setFeedback] = useState(null);

  //  게임 오버 잠시 추기 위한 상태
  const [isPausedForGameOver, setIsPausedForGameOver] = useState(false);

  // 타이머 (60초)
  const [timeLeft, setTimeLeft] = useState(60);

  // 게임 시작
  const startGame = () => {
    setScore(0);
    setIsPausedForGameOver(false); // 재시작 시 초기화
    setFeedback(null); // 재시작 시 초기화

    // 타이머 초기화
    setTimeLeft(60);

    // 초기 캐릭터
    const initialCharacters = Array.from({ length: 15 }, (_, index) => ({
      id: nextId++,
      type: Math.random() < 0.5 ? "정상코드" : "버그",
      x: RAIL_CENTER_X,
      y: getStaticY(index),
    }));

    setCharacters(initialCharacters);
    setStatus("PLAYING");
  };

  useEffect(() => {
    // 게임 중 일때만 작동
    if (status != "PLAYING") return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          endGame(); // 시간이 0이되면 게임 종료
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // 클린업 : 컴포넌트 unmount 시 타이머 정리
  }, [status]); // status가 게임 중일 떄로 변경 될 떄 타이머 작동

  // 게임 오버
  const endGame = () => {
    setStatus("GAMEOVER");
  };

  // 정답/오답 테두리 깜박임 0.5초
  useEffect(() => {
    let timer;
    if (feedback) {
      timer = setTimeout(() => {
        setFeedback(null);
      }, 500);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [feedback]);

  // 2초 후 게임 오버로 전환
  useEffect(() => {
    let gameOverTimer;

    if (isPausedForGameOver) {
      // 2초 멈춘후 게임 오버
      gameOverTimer = setTimeout(() => {
        endGame();
        setIsPausedForGameOver(false); // 상태 초기화
      }, 2000);
    }

    return () => {
      if (gameOverTimer) {
        clearTimeout(gameOverTimer);
      }
    };
  }, [isPausedForGameOver]);

  // 키보드 입력 처리 및 분류 판정
  useEffect(() => {
    //  게임이 PLAYING 상태이면서 멈춘 상태가 아닐 때만 입력 허용
    if (status !== "PLAYING" || isPausedForGameOver) return;
    if (characters.length === 0) return;

    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        const targetChar = characters[0];
        let isCorrect = false;

        // 입력 키와 캐릭터 타입 비교
        if (event.key === "ArrowLeft" && targetChar.type === "정상코드") {
          isCorrect = true;
        } else if (event.key === "ArrowRight" && targetChar.type === "버그") {
          isCorrect = true;
        }

        // 정답 처리: 캐릭터 제거 및 다음 턴 진행
        if (isCorrect) {
          setScore((s) => s + 10);
          setFeedback("correct");

          setCharacters((prev) => {
            const remaining = prev.slice(1);
            const shifted = remaining.map((char, index) => ({
              ...char,
              y: getStaticY(index),
            }));

            const newCharacter = {
              id: nextId++,
              type: Math.random() < 0.5 ? "정상코드" : "버그",
              x: RAIL_CENTER_X,
              y: getStaticY(shifted.length),
            };

            return [...shifted, newCharacter];
          });
        } else {
          // 오답 시 게임 종료가 아닌 잠시 멈춤
          setFeedback("incorrect");
          setIsPausedForGameOver(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [status, characters, isPausedForGameOver]);

  return (
    <div className="BugHunterContainer">
      {/* PLAYING 상태일 때만 좌우 데코 이미지 렌더링 */}
      {status === "PLAYING" && (
        <img
          src={LeftDecoImage}
          alt="Left Decoration - code"
          className="BodyLevelDeco left"
          style={{ width: "200px" }}
        />
      )}

      {status === "PLAYING" && (
        <img
          src={RightDecoImage}
          alt="Right Decoration - Bug"
          className="BodyLevelDeco right"
          style={{ width: "200px" }}
        />
      )}

      {/* 점수 표시 */}
      <div className="ScoreDisplay">점수 : {score}</div>

      {/* 타이머 표시 */}
      {status === "PLAYING" && (
        <div className="TimerDisplay">남은 시간 : {timeLeft}초</div>
      )}

      {/* 게임 시작 대기 화면 */}
      {status === "READY" && <button onClick={startGame}>게임 시작</button>}

      {/* 게임 오버 화면 */}
      {status === "GAMEOVER" && (
        <div className="GameOverMessage">
          <h2>게임 오버!</h2>
          <p>최종 점수 : {score}</p>
          <button onClick={startGame}>한번 더?</button>
        </div>
      )}

      {/* 게임 진행 중 */}
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
