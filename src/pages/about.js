import React from "react"
import { Link, useStaticQuery, graphql  } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Img from "gatsby-image"




const IndexPage = props => (
  <Layout>
    <SEO title="About" />
    <h1 align="center">About me</h1>

    <div>
      <div style={{width: '25%', float: 'left', marginRight:"40px", marginLeft:"50px"}}>
        {/* <Image /> */}
        <Img fluid={props.data.me.childImageSharp.fluid} />
      </div>
      <div style={{float:"left|center", margin:"20px", width:"90%"}}>
        <p style={{textIndent:"40px"}}>My name is Colby Reed and I am a Senior studying Computer Science at the University of Arkansas.
        I am currently working at J.B. Hunt as an Application Development Intern.</p>
        <p>I have been introduced and have gained experience in tools such as:</p>
        <ul style={{listStyle:"disc", align:"center"}}>
          <li>Docker</li>
          <li>NGINX</li>
          <li>Angular</li>
          <li>Spring Boot</li>
        </ul>
      </div>
    </div>
  </Layout>
);
export default IndexPage;

export const data = graphql`
  query {
    me: file(relativePath: { eq: "me.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;