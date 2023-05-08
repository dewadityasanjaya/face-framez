import React from "react";
import './FaceRecognition.css'

const FaceRecognition = ({ imgDetected, frames }) => {
    return (
        <div className="center">
            <div className="absolute mt2">
                <img id='inputimage' alt="face-detected" src={imgDetected} width='500px' height='auto' />
                {
                    frames.map(frame => {
                        return (
                            <div
                                key={frame.key}
                                className='bounding-box'
                                style={{ top: frame.topRow, right: frame.rightCol, bottom: frame.bottomRow, left: frame.leftCol }}>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FaceRecognition;