import React from "react";
import {useState, useEffect} from 'react';

const ImageContainer = (props) => {
  const {progress, secret} = props;
  const urls = ["https://lh3.googleusercontent.com/drive-viewer/AITFw-yy3v7tBIcggQR_5Sne1qKNvZQNnTzMIubB5AsJT5iHMNCEOUzg0DTlh14Ea_yHauJW44eZFb0cSVRMTR6s3UwMITEMfA=s1600",
  "https://lh3.googleusercontent.com/drive-viewer/AITFw-yjJBJGQKCoVDlr5zO7_IuzptIvCnjxJ8TIzw1451vOlq9KRTo0AZURPuORc09bykf0-VrkuaOWEksWhQujhFCzLotYuA=s1600",
  "https://lh3.googleusercontent.com/drive-viewer/AITFw-y3Y7jUz-XARl_a7iAH5uAyU32KwnsFj0Sah7a3TIz9JgOwrxnqWuLyy6NaS949WoXRYPbOnlgmUyzBxwYLeo_vA9FFBQ=s1600",
  "https://lh3.googleusercontent.com/drive-viewer/AITFw-yd77sHlDh0fxoeZ3PsYpBKk84e1VvoV7dO6gcMJOF3wDdT8mHioXplaLcb2O8Vb5qCrVWn67Sn5TiWniXHG2Xp9G1NUQ=s1600"]
  const alts = ["delSol"]
  const descriptions = ["Del Sol, 2019"]
  const [photo, setPhoto] = useState(0)

  useEffect(() => {
console.log('checking no infinite useEffect');
  }, [progress])


  return (
    <div className="image-container">
      <h1>A Decade of Waileys</h1>
      <img className="images" src={urls[photo]} alt={alts[photo]}></img>
      <p>{descriptions[photo]}</p>
    </div>
  )
};

export default ImageContainer;