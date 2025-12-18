import type { Music } from "../types/music";

type Props = {
  musics: Music[];
  onSelect: (music: Music) => void;
  onGoHome: () => void;
};

export default function MusicSelect({ musics, onSelect, onGoHome }: Props) {
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>음악 선택</h2>
      <div style={listStyle}>
        {musics.map((music) => (
          <button
            key={music.id}
            onClick={() => onSelect(music)}
            style={itemStyle}
          >
            <div style={itemTitleStyle}>{music.title}</div>
            {music.artist && <div style={itemArtistStyle}>{music.artist}</div>}
            <div style={itemInfoStyle}>
              노트: {music.notes.length}개{music.bpm && ` • BPM: ${music.bpm}`}
            </div>
          </button>
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
