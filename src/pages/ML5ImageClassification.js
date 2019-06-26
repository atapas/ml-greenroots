import React, {Component} from "react"
import Select from 'react-select';
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import * as ml5 from "ml5";

import Spinner from 'react-bootstrap/Spinner';

import ImageUploader from 'react-images-upload';

import peng from "../images/pengu.jpg";
import boat from "../images/boat.jpg";
import deer from "../images/deer.jpg";
import unknown from "../images/unknown.jpg";
import human from "../images/human.jpg";

const images = [
  { label: "Boat", value: boat },
  { label: "Deer", value: deer },
  { label: "human", value: human },
  { label: "Penguin", value: peng },
  { label: "Unknown", value: unknown }
];

class ML5ImageClassification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: images[0],
      predictions: [], // Set the empty array predictions state
      loader: (<div><Spinner animation="grow" />&nbsp;<span>Predicting...</span></div>),
     
    };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(pictureFiles, pictureDataURLs) {
    if (pictureFiles.length > 0) {
      images.push({label: pictureFiles[0].name, value: pictureDataURLs[0]});
    }
  }

  setPredictions = (pred) => {
    // Set the prediction state with the model predictions
    this.setState({
      predictions: pred
    });
  }

  setLoader = (show) => {
    if (show) {
      this.setState({
        loader: (<div><Spinner animation="grow" />&nbsp;<span>Predicting...</span></div>)
      });
    } else {
      this.setState({
        loader: (<div></div>)
      });
    }
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.setLoader(true);
    this.setPredictions([]);
    console.log(`Option selected:`, selectedOption);
    setTimeout(() => {
      // once the component has mount, start the classification
      this.classifyImg();
    }, 2000);
  };

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
      this.setLoader(false);
      this.setPredictions(results);
    });
  }

  componentDidMount(){
      this.classifyImg();
  }


  render() {
    const { selectedOption } = this.state;
    let imageToRender = (<img src={ selectedOption.value } id="peng_image_id" width="400" height="300" alt=""/>)

    let loader = this.state.loader;
    let predictions = "";
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
        <SEO title="Image Classification" />
        <h1>Image Classification</h1>
        
        <ImageUploader
          withIcon={true}
          buttonText='BYOI'
          onChange={this.onDrop}
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={200000}
          fileSizeError="File size is too long for this test. Max allowed size is 200kbs."
        />

        <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={images}
        />
        
        <div id="sic">
          { imageToRender }
          { loader }
          { predictions }
        </div>
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    );
  }
}

export default ML5ImageClassification
