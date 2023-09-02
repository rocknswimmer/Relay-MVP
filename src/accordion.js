

import React from 'react';
import {useState} from 'react';
import '../public/accordion.css';

const Accordion = ({title, content, complete, even}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <React.Fragment>
      <div className={`accordion-item ${even ? "even" : "odd"}`}>
        <div className={`accordion-title ${complete ? "complete" : ""} ${even ? "even" : "odd"}`} onClick={() => setIsActive(!isActive)}>
          <div>{title}</div>
          <div>{isActive ? '-' : '+'}</div>
        </div>
        {isActive && <div className={`accordion-content ${even ? "even" : "odd"}`}>{content}</div>}
      </div>
    </React.Fragment>
  );
};

export default Accordion;