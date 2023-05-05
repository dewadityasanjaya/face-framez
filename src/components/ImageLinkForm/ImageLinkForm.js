import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = () => {
    return (
        <div>
            <p className="f3">
                {'Put any image link below and the magic mask will frame every face it has.'}
            </p>
            <div className="center">
                <div className="center form pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70 center" type="text" />
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-dark-blue">FrameIt</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;