import React from "react"
import Card from 'react-bootstrap/Card';
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import image_classification_cover from "../images/image_classification_cover.gif";

import '../styles/bootstrap.min.css';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image_classification_cover} />
      <Card.Body>
        <Card.Title>Image Classification</Card.Title>
        <Card.Text>
          <p>
            Image classification is a supervised learning problem: define a 
            set of target classes (objects to identify in images), and train a 
            model to recognize them using labeled example photos.
          </p>
          <p>
            Here is an Implementation of it using ML5 library.
          </p>
        </Card.Text>
        <Link to="/imageClassification/">See in Action</Link>
      </Card.Body>
    </Card>
  </Layout>
)

export default IndexPage
