import axios from 'axios';
import { endpoints } from 'src/config/endpoints';

export const gastrixApiAdapter = axios.create({
  baseURL: endpoints.gastrics_app,
});
