import React from "react";

const FaceRecognition = ({ imgDetected }) => {
    return (
        <div className="center">
            <div className="absolute mt2">
                <img alt="face-detected" src={imgDetected} width='500px' height='auto' />
            </div>
        </div>
    )
}

export default FaceRecognition;