import Axios from 'axios';

const appApi = Axios.create({
  baseURL: 'https://api.conext.asia/',
});
export { appApi };
