import { selector, selectorFamily } from 'recoil';
import { textState } from './atom';
import axios from 'axios';

export const charCountState = selector({

      key: 'charCountState',
      get: ({get}) => {
          const text = get(textState);

          return text.length;
      },
  })

  export const testAPI = selectorFamily({

      key: 'API',
      get: (key) => async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=ko&page=1`);

            return response;
      },
  })