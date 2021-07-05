import gql from 'graphql-tag';

export const ALL_POSTS = gql`
{
  posts {
    nodes {
      postId
      content(format: RENDERED)
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
