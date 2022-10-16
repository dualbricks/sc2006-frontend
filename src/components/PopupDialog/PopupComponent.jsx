import React from 'react';
import './PopupComponent-style.scss';

const PopupComponent = props => {
    return (
        <div className="popup">
          <div className="popup-inner">
              <button className="close-btn" onClick = {props.handleClose}>Close</button>
              { props.children }
          </div>
        </div>
    )
}

export default PopupComponent