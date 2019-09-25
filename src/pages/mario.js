import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Mario = () => (
  <Layout>
    <SEO title="Mario" />
    <h1 align="center">Mario Demo in Javascript</h1>
    <p>Use left and right arrow keys to move. Spacebar to jump. Left and right click to place blocks</p>

    <iframe src="/mario/mario.html" 
    tabindex="0" 
    onload="this.contentWindow.focus()" 
    frameborder="1" 
    scrolling="no" 
    style={{position: "relative", height: "550px", width: "1000px"}} 
    height="100%" 
    width="100%">
    </iframe>

  </Layout>
)

export default Mario