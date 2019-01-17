const env = process.env.NODE_ENV !== 'production' ? 'dev' : 'prod';

const config = {
  url: {
    dev: 'https://demo-api-books.herokuapp.com/api',
    prod: 'https://demo-api-books.herokuapp.com/api',
  },
}

export const BASE_URL = config.url[env];
