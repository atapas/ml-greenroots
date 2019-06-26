import React from "react"
import { Link } from "gatsby"
import image_classification_cover from "../../images/image_classification_cover.gif";

import MakeCard from './MakeCard';

const ML5ImageClassificationCard = () => (
    <MakeCard 
      image = {image_classification_cover}
      title = 'Image Classification'
      body = 'Image classification is a supervised learning problem: define a set of target classes (objects to identify in images), and train a model to recognize them using labeled example photos.'
      footer = {<Link to="/ML5ImageClassification/">See in Action</Link>} 
    />
);

export default ML5ImageClassificationCard


