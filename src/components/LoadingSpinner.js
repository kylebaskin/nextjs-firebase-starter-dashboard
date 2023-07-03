import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({notFullHeight, notFullWidth, isOverlay}) => {

  if(notFullHeight){
    var height = "h-100";
  }else{
    var height = "vh-100";
  }
  if(notFullWidth){
    var width = "w-auto";
  }else{
    var width = "w-100"
  }
  if(isOverlay){
    var overlayStyles = 'position-absolute top-50 start-50 translate-middle'
  }else{
    var overlayStyles = '';
  }
  return (
    <div className={`d-flex justify-content-center align-items-center ${width} ${height} ${overlayStyles}`}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default LoadingSpinner;