import type { NextApiRequest, NextApiResponse } from 'next';
import type { ResponseData, CatsResponse } from '../../../types';


/* 
  TODO: Migrate specific api fetching and respponse processing to back-end
*/
export default async function getCats (req: NextApiRequest, res: NextApiResponse<ResponseData>) {
      try {
        console.log("We're in...");
          const init = {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.NEXT_PUBLIC_CAT_API_KEY ?? ''
            }
          };
          
          const url: string = "https://api.thecatapi.com/v1/images/?limit=10&page=0&order=DESC";
          const response = await fetch(url, init);
          const clientResponse = await response.json();
          res.json(clientResponse);
          console.log(clientResponse);

      }
      catch(error: any){
          console.log(`API Request Failed error: ${error} `);
          res.status(500).end();
      }
};

export function catsHandler(response: Response){
    const res = response as unknown as CatsResponse;
    //TODO: Refactor hack to default score to 0 
    res.forEach((cat) => {cat.score = 0});
    return res;
}