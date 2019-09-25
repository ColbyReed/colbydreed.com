import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Projects = () => (
  <Layout>
    <SEO title="Projects" />
    <div align="center">
      <h1>Projects</h1>
      <p>Here is a clickable list of recent projects I have done.</p>
      <ul>
        <a href="/mario"><li>Mario Javascript Game Demo</li></a>
        <a href="https://github.com/ColbyReed/basic_calculator_android"><li>Basic Calculator App for Android</li></a>
      </ul>
    </div>
  </Layout>
)

export default Projects