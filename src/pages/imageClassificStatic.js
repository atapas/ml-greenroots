import React, {Component} from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import * as ml5 from "ml5";

// Photo by Derek Oyen on Unsplash
// import unknown from "../images/unknown.jpg";
import deer from "../images/deer.jpg";


class StaticImageClassification extends Component {

  state = {
    predictions: []  // Set the empty array predictions state
  }

  setPredictions = (pred) => {
    // Set the prediction state with the model predictions
    this.setState({
      predictions: pred
    });
  }

  classifyImg = () => {
    // Initialize the Image Classifier method with MobileNet
    const classifier = ml5.imageClassifier('MobileNet', modelLoaded);
    // When the model is loaded
    function modelLoaded() {
      console.log('Model Loaded!');
    }
    // Put the image to classify inside a variable
    const image = document.getElementById('peng_image_id');

    
    // Make a prediction with a selected image
    classifier.predict(image, 5, function(err, results) {
      if(err) {
        console.log(err);
      }
      // set the prediction in state
      // setPredictions(results);
      // print the result in the console
      console.log(results);
      return results;
    }).then((results) => {
        this.setPredictions(results);
    });
  }

  componentDidMount(){
    // once the component has mount, start the classification
    this.classifyImg();
  }

  render() {
    let predictions = (<div>Predictions to come here!</div>);
    if(this.state.predictions.length > 0){
      predictions = this.state.predictions.map((pred, i) => {
        let { label, confidence } = pred;
        // round the probability with 2 decimal
        confidence = Math.floor(confidence * 10000) / 100 + "%";
        return (
          <div key={ i + "" }>{ i+1 }. Prediction: { label } at { confidence } </div>
        )
      });
    }
    return (
      <Layout>
        <SEO title="Page two" />
        <h1>Static Image Classifications</h1>
        <div id="sic">
          <img src={ deer } id="peng_image_id" width="400" height="300" alt=""/>
          { predictions }
        </div>
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    );
  }
}

export default StaticImageClassification
