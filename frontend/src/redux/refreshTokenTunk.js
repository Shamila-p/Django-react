import axios from '../utils/axios';
import { refreshToken } from '../utils/Constants';
import { setAuthToken } from './authTokenSlice';


export const refreshTokens = async () => {

  try {
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));
    const refresh = authTokens?.refresh;

    if (refresh) {
      const response = await axios.post(refreshToken, {
        refresh: refresh,
      });

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('authTokens', JSON.stringify(data));
        setAuthToken(JSON.stringify(data));
      }
    }
  } catch (error) {
    console.log(error);
  }
};
