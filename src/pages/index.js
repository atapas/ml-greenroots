import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import ML5ImageClassificationCard from '../components/cards/ML5ImageClassCard.js'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <ML5ImageClassificationCard />
  </Layout>
)

export default IndexPage
