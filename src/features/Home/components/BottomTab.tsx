import styled from "styled-components";
import RetroButton from "@/features/Home/components/RetroButton";
import Running from "@/features/Home/assets/images/RunningMan.png";
import Rhythm from "@/features/Home/assets/images/Rhythm.png";
import Bug from "@/features/Home/assets/images/Bug.png";

const Tab = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: #bfbfbf;
  border-top: 4px solid #ffffff; 
  z-index: 1;
  justify-content: space-around; 
  align-items: center;
  color: white;
  font-weight: bold;
`;

function BottomTab() {
  return (
    <Tab>
      <RetroButton moveTo={"/run"} label={"RUNNING MAN"} image={Running} />
<<<<<<< HEAD
      <RetroButton moveTo={"/RhythmGame"} label={"RHYTHM GAME"} image={Rhythm} />
      <RetroButton moveTo={"/BugHunter"} label={"BUG HUNTER"} image={Bug} />
=======
      <RetroButton moveTo={"/run"} label={"RHYTHM GAME"} image={Rhythm} />
      <RetroButton moveTo={"/run"} label={"BUG HUNTER"} image={Bug} />
>>>>>>> 2514374e271cb4d5c5b52d54a3bce2817f15f295
    </Tab>
  );
}

export default BottomTab;
