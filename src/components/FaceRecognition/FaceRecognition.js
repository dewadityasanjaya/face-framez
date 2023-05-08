import React from "react";
import './FaceRecognition.css'

const FaceRecognition = ({ imgDetected, frame }) => {
    return (
        <div className="center">
            <div className="absolute mt2">
                <img id='inputimage' alt="face-detected" src={imgDetected} width='500px' height='auto' />
                <div className='bounding-box' style={{ top: frame.topRow, right: frame.rightCol, bottom: frame.bottomRow, left: frame.leftCol }}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;