import React from "react";

const ProgressBar = (props) => {
  const { bgcolor, completed, gif} = props;

  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    marginBottom: '20px'
  }

  const containerStylesGif = {
    height: 30,
    width: '100%',
    backgroundColor: 'inherit',
    borderRadius: 50,
    //marginBottom: '20px'
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    transition: 'width 1s ease-in-out',
    textAlign: 'right',
    overflow: 'hidden'
  }

  const fillerStylesGif = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: 'inherit',
    borderRadius: 'inherit',
    transition: 'width 1s ease-in-out',
    textAlign: 'right',
    //overflow: 'hidden'

  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
    //width: 'max-content',
  }

  const gifStyle = {
    height: '20px',
    width: '20px',
  }

  return (
    <div style={gif ? containerStylesGif : containerStyles}>
      <div style={gif ? fillerStylesGif : fillerStyles}>
        <div style={labelStyles}>{gif && <img src="runner.gif" style={gifStyle} alt="running stick figure"  ></img>}{!gif && `${Math.floor(completed)}% complete`}</div>
      </div>
    </div>
  );
};

export default ProgressBar;