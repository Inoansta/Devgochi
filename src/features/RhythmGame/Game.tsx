import { useEffect, useMemo, useRef, useState } from "react";
import type { Judge } from "./types/game";
import { judgeHit, JUDGE_WINDOWS } from "./utils/judge";
import ScoreBoard from "./components/ScoreBoard";
import JudgeText from "./components/JudgeText";

const NOTE_TIMINGS_MS = [1000, 2000, 3000, 4000, 5000, 6500, 8000];

// 노트가 화면 위에서 히트라인까지 내려오는 데 걸리는 시간(연출 속도)
const TRAVEL_MS = 1800;

// 시각화 높이(히트라인 위치)
const HIT_Y = 320;
const START_Y = 20;

export default function Game() {
  const notes = useMemo(() => NOTE_TIMINGS_MS, []);
  const rafId = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [nowMs, setNowMs] = useState(0);
  const [idx, setIdx] = useState(0);

  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);

  const [lastJudge, setLastJudge] = useState<Judge | null>(null);
  const [lastDelta, setLastDelta] = useState<number | null>(null);

  const nextTarget = notes[idx] ?? null;
  const ended = idx >= notes.length;

  const reset = () => {
    setIsPlaying(false);
    setStartTime(null);
    setNowMs(0);
    setIdx(0);
    setScore(0);
    setCombo(0);
    setBestCombo(0);
    setLastJudge(null);
    setLastDelta(null);
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = null;
  };

  const start = () => {
    reset();
    const t0 = performance.now();
    setStartTime(t0);
    setIsPlaying(true);

    const tick = () => {
      rafId.current = requestAnimationFrame(tick);
      setNowMs(performance.now() - t0);
    };
    rafId.current = requestAnimationFrame(tick);
  };

  const applyJudge = (judge: Judge, deltaMs: number) => {
    setLastJudge(judge);
    setLastDelta(deltaMs);

    if (judge === "Perfect") {
      setScore((s) => s + 100);
      setCombo((c) => {
        const nc = c + 1;
        setBestCombo((b) => Math.max(b, nc));
        return nc;
      });
      return;
    }

    if (judge === "Good") {
      setScore((s) => s + 60);
      setCombo((c) => {
        const nc = c + 1;
        setBestCombo((b) => Math.max(b, nc));
        return nc;
      });
      return;
    }

    setCombo(0);
  };

  // ✅ 자동 Miss 처리: 시간이 지나버린 노트는 입력 없어도 Miss
  useEffect(() => {
    if (!isPlaying) return;
    if (ended) return;
    if (nextTarget === null) return;

    const missLine = nextTarget + JUDGE_WINDOWS.good;
    if (nowMs > missLine) {
      applyJudge("Miss", Math.round(nowMs - nextTarget));
      setIdx((i) => i + 1);
    }
  }, [isPlaying, ended, nextTarget, nowMs]);

  // ✅ 스페이스 판정
  useEffect(() => {
    if (!isPlaying) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      e.preventDefault();

      if (ended) return;
      if (startTime === null) return;
      if (nextTarget === null) return;

      const { judge, deltaMs } = judgeHit(nowMs, nextTarget);
      applyJudge(judge, deltaMs);
      setIdx((i) => i + 1);
    };

    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown as any);
  }, [isPlaying, startTime, nowMs, nextTarget, ended]);

  // ✅ 끝나면 정지
  useEffect(() => {
    if (!isPlaying) return;
    if (!ended) return;

    const id = window.setTimeout(() => {
      setIsPlaying(false);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }, 800);

    return () => window.clearTimeout(id);
  }, [isPlaying, ended]);

  // 노트 Y좌표 계산: (노트 시간 - TRAVEL_MS)부터 화면 위에 나타나서 히트라인까지 내려옴
  const getNoteY = (noteTime: number) => {
    const appearAt = noteTime - TRAVEL_MS;
    const t = (nowMs - appearAt) / TRAVEL_MS; // 0~1
    return START_Y + t * (HIT_Y - START_Y);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ margin: 0, fontSize: 28 }}>Rhythm Game</h2>

      <div
        style={{
          marginTop: 12,
          display: "flex",
          gap: 10,
          justifyContent: "center",
        }}
      >
        <button onClick={start} style={btnStyle}>
          Start
        </button>
        <button onClick={reset} style={{ ...btnStyle, opacity: 0.9 }}>
          Reset
        </button>
      </div>

      <ScoreBoard score={score} combo={combo} bestCombo={bestCombo} />
      <JudgeText judge={lastJudge} deltaMs={lastDelta} />

      {/* ✅ 게임 필드 */}
      <div style={fieldStyle}>
        {/* 히트라인 */}
        <div style={hitLineStyle}>
          <span style={{ fontSize: 12, opacity: 0.8 }}>HIT LINE</span>
        </div>

        {/* 레인 */}
        <div style={laneStyle}>
          {/* 노트 렌더 */}
          {notes.map((t, i) => {
            // 이미 처리된 노트는 렌더를 줄여도 됨(성능/깔끔함)
            if (i < idx) return null;

            const y = getNoteY(t);

            // 화면 안에 보이는 구간만 그리기
            if (y < -30 || y > HIT_Y + 80) return null;

            const isNext = i === idx;

            return (
              <div
                key={`${t}-${i}`}
                style={{
                  ...noteStyle,
                  transform: `translate(-50%, ${y}px)`,
                  opacity: isNext ? 1 : 0.75,
                }}
              />
            );
          })}
        </div>

        {/* 안내 */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 0,
            right: 0,
            fontSize: 12,
            opacity: 0.8,
          }}
        >
          Space 키로 타이밍 맞추기
        </div>
      </div>

      <div style={{ marginTop: 10, opacity: 0.75 }}>
        {isPlaying ? (
          <>
            Time: <b>{Math.floor(nowMs)}ms</b>{" "}
            {nextTarget !== null && (
              <>
                / Next: <b>{nextTarget}ms</b>
              </>
            )}
          </>
        ) : (
          <span>{ended ? "Finished" : "Idle"}</span>
        )}
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 14,
  border: "1px solid rgba(0,0,0,0.15)",
  background: "rgba(0,0,0,0.05)",
  fontWeight: 800,
  cursor: "pointer",
};

const fieldStyle: React.CSSProperties = {
  position: "relative",
  width: 420,
  maxWidth: "92vw",
  height: 380,
  margin: "18px auto 0",
  borderRadius: 18,
  border: "1px solid rgba(0,0,0,0.12)",
  background: "linear-gradient(180deg, rgba(0,0,0,0.03), rgba(0,0,0,0.06))",
  overflow: "hidden",
};

const laneStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: "50%",
  width: 140,
  transform: "translateX(-50%)",
  borderLeft: "1px dashed rgba(0,0,0,0.12)",
  borderRight: "1px dashed rgba(0,0,0,0.12)",
};

const hitLineStyle: React.CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  top: HIT_Y,
  height: 2,
  background: "rgba(0,0,0,0.25)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const noteStyle: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  top: 0,
  width: 64,
  height: 18,
  borderRadius: 999,
  background: "rgba(0,0,0,0.65)",
};
