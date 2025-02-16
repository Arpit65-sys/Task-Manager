import React from "react";
import "./../styles/popupForm.css";

const PopupForm = ({ title, children, onClose }) => {
  return (
    <div className="popup-form">
      <div className="popup-content">
        <h3>{title}</h3>
        {children}
        <button className="btn btn-danger" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PopupForm;
