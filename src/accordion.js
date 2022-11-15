

import React from 'react';
import {useState} from 'react';
import '../public/accordion.css';

const Accordion = ({title, content, complete}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <React.Fragment>
      <div className="accordion-item">
        <div className={`accordion-title ${complete ? "complete" : ""}`} onClick={() => setIsActive(!isActive)}>
          <div>{title}</div>
          <div>{isActive ? '-' : '+'}</div>
        </div>
        {isActive && <div className="accordion-content">{content}</div>}
      </div>
    </React.Fragment>
  );
};

export default Accordion;