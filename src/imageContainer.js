import React from "react";
import {useState, useEffect} from 'react';

const ImageContainer = (props) => {
  const {progress, secret} = props;
  const urls = ["https://drive.lienuc.com/uc?id=1e_aB6_K2NDtrOlVDJNRXon-q0XNz26e7",
  "https://lh3.googleusercontent.com/drive-viewer/AITFw-yy3v7tBIcggQR_5Sne1qKNvZQNnTzMIubB5AsJT5iHMNCEOUzg0DTlh14Ea_yHauJW44eZFb0cSVRMTR6s3UwMITEMfA=s1600",
  "https://lh3.googleusercontent.com/drive-viewer/AITFw-yjJBJGQKCoVDlr5zO7_IuzptIvCnjxJ8TIzw1451vOlq9KRTo0AZURPuORc09bykf0-VrkuaOWEksWhQujhFCzLotYuA=s1600",
  "https://lh3.googleusercontent.com/drive-viewer/AITFw-y3Y7jUz-XARl_a7iAH5uAyU32KwnsFj0Sah7a3TIz9JgOwrxnqWuLyy6NaS949WoXRYPbOnlgmUyzBxwYLeo_vA9FFBQ=s1600",
  "https://lh3.googleusercontent.com/drive-viewer/AITFw-yd77sHlDh0fxoeZ3PsYpBKk84e1VvoV7dO6gcMJOF3wDdT8mHioXplaLcb2O8Vb5qCrVWn67Sn5TiWniXHG2Xp9G1NUQ=s1600",
"https://lh3.googleusercontent.com/drive-viewer/AITFw-yNMKglxQwUPe7rbHV46APBCE2mDaWIO6imqT1ZBa5GZmeiKRX6G7oAsE6gb_s74wDk5OQUjmOBLVxDmCz8Gz6VqoXA=s1600"]
  const alts = ["unlock", "DC", "Napa", "NWpassage", "delSol", "finish"]
  const descriptions = ["unlocked by running", "D.C., 2013", "Napa Valley, 2015", "North West Passage, 2017", "Del Sol, 2019", "2023 Done!"]
  const [photo, setPhoto] = useState(0)

  useEffect(() => {
    if(progress === 0){
      setPhoto(0)
    } else if (progress < 25){
      setPhoto(1)
    } else if (progress < 50){
      setPhoto(2)
    } else if (progress < 75){
      setPhoto(3)
    } else if (progress < 100){
      setPhoto(4)
    } else if(progress === 100){
      setPhoto(5)
    }else{
      setPhoto(0)
    }
  }, [progress])


  return (
    <div className="image-container">
       <h1>A Decade of Waileys!</h1>
      {secret && <img crossorigin="anonymous" className="images" src={urls[photo]} alt={alts[photo]}></img>}
      {secret && <p>{descriptions[photo]}</p>}

      {!secret && <img crossorigin="anonymous" className="images" src={urls[0]} alt={alts[0]}></img>}
      {!secret && <p>{descriptions[0]}</p>}
    </div>
  )
};

export default ImageContainer;