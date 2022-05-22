export const API =
  'https://project.creativity.com.kw/P167-Mostagbalik/P167-Mostagbalik-Backend/public/api';

export const getHeaders = async props => {
  return {
    headers: {
      authorization: `bearer ${props}`,
    },
  };
};
