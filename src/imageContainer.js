import React from "react";
import {useState, useEffect} from 'react';

const ImageContainer = (props) => {
  const {progress, secret} = props;
  const urls = ["https://i.imgur.com/Qjn6EIr.jpg",
  "https://i.imgur.com/vlw7LhD.jpg",
  "https://i.imgur.com/6jx2GPG.jpg",
  "https://i.imgur.com/fsZUtN2.jpg",
  "https://i.imgur.com/3NkUpLA.jpg",
"https://i.imgur.com/q0p5P10.jpg"]
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