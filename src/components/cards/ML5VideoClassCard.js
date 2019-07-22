import React from "react"
import { Link } from "gatsby"
import video_classification_cover from "../../images/video_classification_cover.gif";

import MakeCard from './MakeCard';

const ML5VideoClassificationCard = () => (
    <MakeCard 
      image = {video_classification_cover}
      title = 'Video Classification'
      body = ' A video is really just a stack of images. Like image classification, 
                            this is also a supervised learning problem where examples can be detected
                            and classified from a Video.'
      footer = {<Link to="/ML5VideoClassification/">See in Action</Link>} 
    />
);

export default ML5VideoClassificationCard


