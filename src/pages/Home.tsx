import styled from "styled-components";
import { Link } from "react-router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 60px;
`;

const Title = styled.div`
  font-size: 1.5em;
  text-align: center;
  color: #bf4f74;
`;

// Link 자체를 스타일링
const GameButton = styled(Link)`
  padding: 12px 20px;
  border-radius: 12px;
  background-color: #bf4f74;
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;

  &:hover {
    background-color: #a63e64;
  }
`;

function Home() {
  return (
    <Container>
      <Title>This is home</Title>

      {/* 리듬게임으로 이동 */}
      <GameButton to="/rhythm">🎵 리듬게임 시작</GameButton>
    </Container>
  );
}

export default Home;
