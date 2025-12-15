// src/components/Character.jsx

import React from "react";
// 📢 [수정 1]: src/images 폴더에서 이미지를 import합니다.
import CodeImage from "../images/code.png";
import BugImage from "../images/bug.png";

const Character = ({ data }) => {
  // 📢 [수정 2]: import한 변수를 사용합니다.
  const imageSrc = data.type === "정상코드" ? CodeImage : BugImage;

  return (
    <img
      src={imageSrc} // 📢 변수 사용
      alt={data.type}
      style={{
        position: "absolute",
        left: `${data.x - 20}px`,
        top: `${data.y}px`,
        width: "40px",
        height: "40px",
        transition: "top 0.02s linear",
        imageRendering: "pixelated",
      }}
    />
  );
};

export default Character;
