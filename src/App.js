import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignInForm from './components/SignInForm/SignInForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import ParticlesBg from 'particles-bg'
import './App.css';

// Clarifai Setup
const MODEL_ID = 'face-detection';

const returnClarifaiRequestOption = (imageUrl) => {
  const PAT = 'adc67d41e4ef4ff3a2abfbde9939de10';
  const USER_ID = 'dewadityasanjaya';
  const APP_ID = 'face-framez';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMAGE_URL
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  return requestOptions;
}

class App extends Component {
  //App State
  constructor() {
    super();
    this.state = {
      imgUrlInput: '',
      imgDetected: '',
      frames: [],
      route: 'signin',
      isSignedIn: false,
    }
  }

  //Function to Route Page
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  //Function to Calculate Face Frame
  calculateFaceFrame = (data) => {
    const clarifaiFace = data.outputs[0].data.regions;
    const clarifaiFaceList = [];
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    let clarifaiFaceIDCounter = 0;
    for (let item of clarifaiFace) {
      clarifaiFaceList.push({
        key: 'image' + clarifaiFaceIDCounter,
        leftCol: item.region_info.bounding_box.left_col * width,
        topRow: item.region_info.bounding_box.top_row * height,
        rightCol: width - (item.region_info.bounding_box.right_col * width),
        bottomRow: height - (item.region_info.bounding_box.bottom_row * height)
      })
      clarifaiFaceIDCounter++;
    }
    return clarifaiFaceList;
  }

  //Function to Display Face Frame
  displayFaceFrame = (frames) => {
    this.setState({ frames: frames })
  }

  //Function to Change Input Value
  onInputChange = (event) => {
    this.setState({ imgUrlInput: event.target.value });
  }

  //Function to Submit Image URL to Clarifai
  onSubmit = () => {
    this.setState({ imgDetected: this.state.imgUrlInput })
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifaiRequestOption(this.state.imgUrlInput))
      .then(response => response.json())
      .then(result => {
        this.displayFaceFrame(this.calculateFaceFrame(result))
      })
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <div className='App'>
        <ParticlesBg color='#FFFFFF' type="cobweb" bg={true} />
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {
          this.state.route === 'home'
            ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onSubmit={this.onSubmit}
              />
              <FaceRecognition
                frames={this.state.frames}
                imgDetected={this.state.imgDetected}
              />
            </div>
            : (
              this.state.route === 'signin'
                ? <SignInForm
                  onRouteChange={this.onRouteChange}
                />
                : <RegisterForm
                  onRouteChange={this.onRouteChange}
                />
            )
        }

      </div>
    );
  }
}

export default App;
