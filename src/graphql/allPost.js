import gql from 'graphql-tag';

export const ALL_POSTS = gql`
{
  posts {
    nodes {
      postId
      title
      dateGmt
      tags {
        edges {
          node {
            name
            link
          }
        }
      }
      title
    }
  }
}
`;
