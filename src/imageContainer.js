import React from "react";
import {useState} from 'react';

const ImageContainer = (props) => {
  const {progress, secret} = props;


  return (
    <div>
      <h1>A Decade of Waileys</h1>
      <img className="images" src="https://lh3.googleusercontent.com/drive-viewer/AITFw-yd77sHlDh0fxoeZ3PsYpBKk84e1VvoV7dO6gcMJOF3wDdT8mHioXplaLcb2O8Vb5qCrVWn67Sn5TiWniXHG2Xp9G1NUQ=s1600" alt="delSol"></img>
    </div>
  )
};

export default ImageContainer;