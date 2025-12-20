type Props = {
  score: number;
  combo: number;
  bestCombo: number;
  onRestart: () => void;
  onSelectMusic: () => void;
  onGoHome: () => void;
};

export default function GameResultModal({
  score,
  combo,
  bestCombo,
  onRestart,
  onSelectMusic,
  onGoHome,
}: Props) {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={titleStyle}>게임 종료</h2>
        
        <div style={resultContainerStyle}>
          <div style={resultItemStyle}>
            <div style={resultLabelStyle}>Score</div>
            <div style={resultValueStyle}>{score.toLocaleString()}</div>
          </div>
          <div style={resultItemStyle}>
            <div style={resultLabelStyle}>Best Combo</div>
            <div style={resultValueStyle}>{bestCombo}</div>
          </div>
        </div>

        <div style={buttonGroupStyle}>
          <button onClick={onRestart} style={buttonStyle}>
            Restart
          </button>
          <button onClick={onSelectMusic} style={buttonStyle}>
            음악 선택
          </button>
          <button onClick={onGoHome} style={buttonStyle}>
            홈으로
          </button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  background: "white",
  borderRadius: 20,
  padding: "40px 50px",
  minWidth: 300,
  textAlign: "center",
};

const titleStyle: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 800,
  marginBottom: 30,
};

const resultContainerStyle: React.CSSProperties = {
  marginBottom: 30,
  display: "flex",
  flexDirection: "column",
  gap: 20,
};

const resultItemStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const resultLabelStyle: React.CSSProperties = {
  fontSize: 14,
  opacity: 0.7,
  fontWeight: 600,
};

const resultValueStyle: React.CSSProperties = {
  fontSize: 32,
  fontWeight: 800,
  color: "#333",
};

const buttonGroupStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const buttonStyle: React.CSSProperties = {
  padding: "14px 24px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.15)",
  background: "rgba(0,0,0,0.05)",
  fontWeight: 700,
  cursor: "pointer",
  fontSize: 16,
  transition: "all 0.2s",
};

