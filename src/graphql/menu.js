import gql from 'graphql-tag';

const GET_MENU = gql`
  query GET_MENU($Id: ID!) {
    menu(id: $Id, idType: DATABASE_ID) {
      id
      name
      slug
      menuItems {
        nodes {
          id
          title
          url
          target
          parentId
          label
          path
          childItems {
            nodes {
              label
              id
              cssClasses
              title
              url
              path
            }
          }
        }
      }
    }
  }
`;

export default GET_MENU;
