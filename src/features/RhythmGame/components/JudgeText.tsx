import type { Judge } from "../types/game";

type Props = {
  judge: Judge | null;
  deltaMs: number | null;
};

export default function JudgeText({ judge, deltaMs }: Props) {
  if (!judge) return null;

  const deltaLabel =
    deltaMs === null ? "" : `${deltaMs > 0 ? "+" : ""}${deltaMs}ms`;

  return (
    <div
      style={{
        marginTop: 12,
        padding: "10px 14px",
        borderRadius: 12,
        background: "rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ fontSize: 22, fontWeight: 800 }}>{judge}</div>
      <div style={{ opacity: 0.85, marginTop: 4 }}>{deltaLabel}</div>
    </div>
  );
}
