import React from "react"

import Helmet from 'react-helmet';
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import PostLink from "../components/post-link"
import HeroHeader from "../components/heroHeader"
import Navbar from 'react-bootstrap/Navbar'


import ContentLoader, { Facebook } from 'react-content-loader'


const MyFacebookLoader = () => <Facebook />



const IndexPage = ({
  data: {
    site,
    allMarkdownRemark: { edges },
  },
}) => {



  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return (
    <Layout>

      <Helmet>
      <title>Keshav Chawla's Blog</title>
        <meta name="description" content={site.siteMetadata.description} />
      </Helmet>

      <HeroHeader/>
      <h2>Blog Posts &darr;</h2>
      <div className="grids">
        {Posts}
      </div>

    </Layout>
  )
}

export default IndexPage
export const pageQuery = graphql`
  query indexPageQuery {
    site {
      siteMetadata {
        title
        description
        w3l_dom_key
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            thumbnail
          }
        }
      }
    }
  }
`
