import React from 'react';
import '../public/modal.css';

const Modal = ({close, content}) => {
  return (
    <div className="modal">
      <div className="modal-pop">
         <div className='modal-close'> <button onClick={() => { close(); }}>x</button> </div>
        {content}
      </div>
      <div className="modal-overlay" onClick={() => { close(); }}></div>
    </div>
  );
};

export default Modal;