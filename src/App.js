import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
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
      imgDetected: ''
    }
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
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <div className='App'>
        <ParticlesBg color='#FFFFFF' type="cobweb" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
        <FaceRecognition imgDetected={this.state.imgDetected} />
      </div>
    );
  }
}

export default App;
