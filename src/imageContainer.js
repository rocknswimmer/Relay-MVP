import React from "react";
import {useState, useEffect} from 'react';

const ImageContainer = (props) => {
  const {progress, secret} = props;
  const urls = ["https://drive.lienuc.com/uc?id=1e_aB6_K2NDtrOlVDJNRXon-q0XNz26e7",
  "https://drive.lienuc.com/uc?id=1Ks57u3D6xQIcGfggcIqNc1-jgyF9sTaw",
  "https://drive.lienuc.com/uc?id=1Aj4_3PtWQCz4wEfIWUbCOAqbP_ulgTb7",
  "https://drive.lienuc.com/uc?id=15Iu2dAtQlSHofam10K0e4mIszRC_fAV8",
  "https://drive.lienuc.com/uc?id=1AbUhHF4TcXYRK12PooxZpOeIusM9s5Pp",
"https://drive.lienuc.com/uc?id=12qxHIrzWtx6_5K8seoWy5RSkFqIXui4Y"]
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