import React from "react"
import { Link, useStaticQuery, graphql  } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Img from "gatsby-image"




const IndexPage = props => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div>
      {/* <Image /> */}
      <Img fluid={props.data.me.childImageSharp.fluid} />
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