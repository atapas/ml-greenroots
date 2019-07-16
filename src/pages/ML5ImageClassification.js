import React, {Component} from "react"
import Select from 'react-select';
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import * as ml5 from "ml5";

import Spinner from 'react-bootstrap/Spinner';

import ImageUploader from 'react-images-upload';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ListGroup from 'react-bootstrap/ListGroup';

import '../styles/bootstrap.min.css';

import peng from "../images/pengu.jpg";
import boat from "../images/boat.jpg";
import deer from "../images/deer.jpg";
import unknown from "../images/unknown.jpg";
import human from "../images/human.jpg";
import tick from "../images/tick.png";

const images = [
  { label: "Boat", value: boat },
  { label: "Deer", value: deer },
  { label: "Human", value: human },
  { label: "Penguin", value: peng },
  { label: "Unknown", value: unknown }
];

class ML5ImageClassification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: images[0],
      predictions: [], // Set the empty array predictions state
      loader: true,
     
    };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(pictureFiles, pictureDataURLs) {
    if (pictureFiles.length > 0) {
      for (let pictureDataURL of pictureDataURLs) {
        let name = (pictureDataURL.split(';')[1]).split('=')[1];
        let obj = {label: name, value: pictureDataURL};
        let matchFound = false;
        for (let i=0; i<images.length; i++) {
          if(images[i].label === name){
            console.log('match');
            matchFound = true;
            break;
          } else {
            console.log('No Match with ', images[i].label);
          }
        }
        if (!matchFound) {
          images.push(obj);
          this.setState({
            selectedOption: obj
          });
          this.handleChange(obj);
        }
      }
    }
    console.log('All the images', images);
  }

  setPredictions = (pred) => {
    // Set the prediction state with the model predictions
    this.setState({
      predictions: pred
    });
  }

  setLoader = (show) => {
    this.setState({
      loader: show
    });
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
    const image = document.getElementById('classific_image_id');

    
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
    let imageToRender = (<img src={ selectedOption.value } id="classific_image_id" width="400" height="300" alt=""/>)

    let loaderToRender = (<div></div>);
    if(this.state.loader) {
      loaderToRender = (<div><Spinner animation="grow" />&nbsp;<span>Predicting...</span></div>);
    }
    let predictions = "";
    if(this.state.predictions.length > 0){
      predictions =  this.state.predictions.map((pred, i) => {
        let { label, confidence } = pred;
        // round the probability with 2 decimal
        confidence = Math.floor(confidence * 10000) / 100 + "%";
        return (
          
          <ListGroup.Item key={ i + "" }>
          <img src={tick} height="40px" width="40px" alt=""/>
              <span> Prediction: { label } at { confidence } </span>
            
          </ListGroup.Item>
        )
      });
    }
    return (
      <Layout>
        <SEO title="Image Classification" />

        <React.Fragment>
          <Link to="/"> Go back to the homepage</Link>

          <Container className="predResult">
            <Row>
              <Col>
                <h1>Image Classification</h1>
              </Col>
            </Row>
            <Row>
              <Col>
              <ImageUploader
                withIcon={true}
                withLabel={true}
                buttonText='BYOI'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.ico', 'jpeg']}
                maxFileSize={1000000}
                fileSizeError="File size is too long for this test. Max allowed size is 1Mb."
                label="Max file size: 1Mb, accepted: jpg|gif|png|ico|jpeg"
              />
              </Col>
            </Row>
            <Row>
              <Col>
                <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={images}
                />
              </Col>  
            </Row>
            <Row>
              <Col>
                <div id="sic">
                  { imageToRender }
                  { loaderToRender }
                  <ListGroup variant="flush">
                    { predictions }
                  </ListGroup>
                </div>
              </Col>
            </Row>
          </Container>

        </React.Fragment>
        
      </Layout>
    );
  }
}

export default ML5ImageClassification
