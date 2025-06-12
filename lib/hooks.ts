
import { getCats, catsHandler } from '../pages/api/my-cats';

export async function useGetCats(){
   const response = await fetch('/api/my-cats', {
          method: 'GET',
          body: null}).then((data) => {
          // map to obj
          const catsResponse = catsHandler(data);
          return catsResponse;
  }
}