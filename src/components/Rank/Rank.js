import React from "react";

const Rank = ({ imgNumber }) => {
    return (
        <div>
            <div className="f3 white">
                {'You have frame ...'}
            </div>
            <div className="f1 white">
                {imgNumber + ' face(s).'}
            </div>
        </div>
    )
}

export default Rank;