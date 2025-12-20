import type { Music } from "../types/music";

type Props = {
  musics: Music[];
  onSelect: (music: Music) => void;
  onGoHome: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
};

export default function MusicSelect({
  musics,
  onSelect,
  onGoHome,
  speed,
  onSpeedChange,
}: Props) {
  const speedOptions = [1.0, 1.5, 2.0, 3.0, 4.0];

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>음악 선택</h2>

      {/* 배속 선택 */}
      <div style={speedSelectorStyle}>
        <div style={speedLabelStyle}>노트 속도</div>
        <div style={speedButtonsStyle}>
          {speedOptions.map((option) => (
            <button
              key={option}
              onClick={() => onSpeedChange(option)}
              style={{
                ...speedButtonStyle,
                ...(speed === option ? speedButtonActiveStyle : {}),
              }}
            >
              {option}x
            </button>
          ))}
        </div>
      </div>

      <div style={listStyle}>
        {musics.map((music) => (
          <div key={music.id} style={itemContainerStyle}>
            <button onClick={() => onSelect(music)} style={itemStyle}>
              <div style={itemTitleStyle}>{music.title}</div>
              {music.artist && (
                <div style={itemArtistStyle}>{music.artist}</div>
              )}
              <div style={itemInfoStyle}>
                노트: {music.notes.length}개
                {music.bpm && ` • BPM: ${music.bpm}`}
              </div>
            </button>
          </div>
        ))}
      </div>
      <div style={buttonContainerStyle}>
        <button onClick={onGoHome} style={homeButtonStyle}>
          홈으로
        </button>
      </div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  padding: "40px 20px",
  maxWidth: 600,
  margin: "0 auto",
};

const titleStyle: React.CSSProperties = {
  fontSize: 32,
  fontWeight: 800,
  marginBottom: 30,
  textAlign: "center",
};

const listStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const itemStyle: React.CSSProperties = {
  width: "100%",
  padding: "20px 24px",
  borderRadius: 16,
  border: "1px solid rgba(0,0,0,0.15)",
  background: "rgba(0,0,0,0.05)",
  cursor: "pointer",
  textAlign: "left",
  transition: "all 0.2s",
};

const itemTitleStyle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
  marginBottom: 4,
};

const itemArtistStyle: React.CSSProperties = {
  fontSize: 14,
  opacity: 0.7,
  marginBottom: 8,
};

const itemInfoStyle: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.6,
};

const buttonContainerStyle: React.CSSProperties = {
  marginTop: 30,
  display: "flex",
  justifyContent: "center",
};

const homeButtonStyle: React.CSSProperties = {
  padding: "12px 24px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.15)",
  background: "rgba(0,0,0,0.05)",
  fontWeight: 700,
  cursor: "pointer",
  fontSize: 16,
  transition: "all 0.2s",
};

const speedSelectorStyle: React.CSSProperties = {
  marginBottom: 30,
  padding: "20px",
  borderRadius: 16,
  border: "1px solid rgba(0,0,0,0.15)",
  background: "rgba(0,0,0,0.03)",
};

const speedLabelStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 700,
  marginBottom: 12,
  textAlign: "center",
};

const speedButtonsStyle: React.CSSProperties = {
  display: "flex",
  gap: 8,
  justifyContent: "center",
};

const speedButtonStyle: React.CSSProperties = {
  padding: "10px 20px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.15)",
  background: "rgba(0,0,0,0.05)",
  fontWeight: 600,
  cursor: "pointer",
  fontSize: 16,
  transition: "all 0.2s",
  minWidth: 60,
};

const speedButtonActiveStyle: React.CSSProperties = {
  background: "rgba(0,0,0,0.15)",
  borderColor: "rgba(0,0,0,0.3)",
  fontWeight: 800,
};

const itemContainerStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: 8,
};

const editButtonStyle: React.CSSProperties = {
  padding: "8px 16px",
  borderRadius: 8,
  border: "1px solid rgba(0,0,0,0.15)",
  background: "rgba(0, 100, 200, 0.1)",
  fontWeight: 600,
  cursor: "pointer",
  fontSize: 12,
  transition: "all 0.2s",
  whiteSpace: "nowrap",
};

const createButtonStyle: React.CSSProperties = {
  padding: "12px 24px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.15)",
  background: "rgba(0, 150, 0, 0.1)",
  fontWeight: 700,
  cursor: "pointer",
  fontSize: 16,
  transition: "all 0.2s",
};
