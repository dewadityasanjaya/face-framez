import React from "react";
import logo from "./logo.png";

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav className="flex justify-between">
                <img className="ma3 br4 shadow-4" src={logo} alt="logo" height={'100px'} width={'auto'} />
                <p onClick={() => onRouteChange('signout')} className='f3 link dim white pa3 pointer'>Sign Out</p>
            </nav>
        );
    } else {
        return (
            <nav className="flex justify-between">
                <img className="ma3 br4 shadow-4" src={logo} alt="logo" height={'100px'} width={'auto'} />
                <div className="flex">
                    <p onClick={() => onRouteChange('signin')} className='f3 link dim white pa3 pointer'>Sign In</p>
                    <p onClick={() => onRouteChange('register')} className='f3 link dim white pa3 pointer'>Register</p>
                </div>
            </nav>
        );
    }

    // return (
    //     <div className="flex justify-between">
    //         <p className="f3 pa3">FaceFramez</p>
    //         <p onClick={() => onRouteChange('signin')} className="f3 link dim black pa3 pointer">Sign Out</p>
    //     </div>
    // )
}

export default Navigation;