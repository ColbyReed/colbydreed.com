import React from "react"
import { Link, useStaticQuery, graphql  } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Img from "gatsby-image"




const IndexPage = props => (
  <Layout>
    <SEO title="Home" />

    <div align="center">
      <h1>Colby Reed's Website</h1>
      <h3>A portfolio of my projects and happenings.</h3>
      <h4>(Work in progress)</h4>

      <p>Use the nagivation bar to navigate the website.</p>
      <p>Take a look at my recent <a href="/projects">projects!</a></p>
    </div>
  </Layout>
);
export default IndexPage;
