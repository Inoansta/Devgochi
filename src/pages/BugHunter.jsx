import React, { useState, useEffect } from "react";
import Character from "../components/Character.jsx";
import "../css/BugHunter.css";
import BackgroundImage from "../images/rail_background.png";

let nextId = 0;

// 레일 중앙 X 좌표와 캐릭터 간 고정 간격, 판정 위치 Y를 상수화
const RAIL_CENTER_X = 300;
const GAP = 45;
const BOTTOM_Y = 500;

// 큐 인덱스에 따라 정적인 Y 위치를 계산하는 헬퍼 함수
const getStaticY = (index) => BOTTOM_Y - index * GAP;

const BugHunter = () => {
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("READY");
  const [characters, setCharacters] = useState([]);
  // const [timeLeft, setTimeLeft] = useState(60); // 60초 타이머 상태

  // 게임 시작
  const startGame = () => {
    setScore(0);
    // setTimeLeft(60); // 타이머 초기화

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

  // 게임 오버
  const endGame = () => {
    setStatus("GAMEOVER");
  };

  // 타이머 부분
  // useEffect(() => {
  //   if (status !== "PLAYING") return;

  //   const timer = setInterval(() => {
  //     setTimeLeft((prevTime) => {
  //       if (prevTime <= 1) {
  //         clearInterval(timer);
  //         endGame(); // 시간이 다 되면 게임 종료
  //         return 0;
  //       }
  //       return prevTime - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [status]);

  // 키보드 입력 처리 및 분류 판정
  useEffect(() => {
    if (status !== "PLAYING") return;
    if (characters.length === 0) return;

    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        const targetChar = characters[0];
        let isCorrect = false;

        // 판정: 입력 키와 캐릭터 타입 비교
        if (event.key === "ArrowLeft" && targetChar.type === "정상코드") {
          isCorrect = true;
        } else if (event.key === "ArrowRight" && targetChar.type === "버그") {
          isCorrect = true;
        }

        // 정답 처리: 캐릭터 제거 및 다음 턴 진행
        if (isCorrect) {
          setScore((s) => s + 10);

          setCharacters((prev) => {
            const remaining = prev.slice(1);

            // 남은 캐릭터 위치 업데이트 (한 칸씩 올라감)
            const shifted = remaining.map((char, index) => ({
              ...char,
              y: getStaticY(index),
            }));

            // 새로운 캐릭터를 위에추가
            const newCharacter = {
              id: nextId++,
              type: Math.random() < 0.5 ? "정상코드" : "버그",
              x: RAIL_CENTER_X,
              y: getStaticY(shifted.length),
            };

            return [...shifted, newCharacter];
          });
        } else {
          endGame();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [status, characters]);

  return (
    <div className="BugHunterContainer">
      {/* 점수 표시 */}
      <div>점수 : {score}</div>

      {/* 타이머 표시 */}
      {/* {status === "PLAYING" && (
        <div className="TimerDisplay">남은 시간: {timeLeft}초</div>
      )} */}

      {/* 게임 시작 대기 화면 */}
      {status === "READY" && <button onClick={startGame}>게임 시작</button>}

      {/* 게임 오버 화면 */}
      {status === "GAMEOVER" && (
        <div>
          <h2>게임 오버!</h2>
          <p>최종 점수 : {score}</p>
          <button onClick={startGame}>한번 더?</button>
        </div>
      )}

      {/* 게임 진행 중 */}
      {status === "PLAYING" && (
        <div
          className="PlayArea"
          style={{ "--bg-image": `url(${BackgroundImage})` }}
        >
          {characters.map((char) => (
            <Character key={char.id} data={char} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BugHunter;
