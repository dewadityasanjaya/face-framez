import React from "react";

const Entries = ({ name, entries }) => {
    return (
        <div>
            <div className="f3 white">
                {'Hi ' + name + ', your current entry count is'}
            </div>
            <div className="f1 white">
                {entries + ' image(s).'}
            </div>
        </div>
    )
}

export default Entries;