
import type { NextApiRequest, NextApiResponse } from 'next';
import type { ResponseData } from '../../../types';
import { Url } from 'next/dist/shared/lib/router/router';

export default async function uploadFile (req: NextApiRequest, res: NextApiResponse<ResponseData>) {

     // implement logic for sending image to api using fetch
      try {
        // get req parms
        let { image: file, sub_id } = req.body;
        if(sub_id === undefined){
          sub_id = 0;
        }
        // use as 
        // live_Si8nMRhQsHfEqpYMKbZ0ieoiwqvSGBkJYjejkqbYsK2GHqt07ACpM86Y9tgeAB2x
          const init = {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'live_Si8nMRhQsHfEqpYMKbZ0ieoiwqvSGBkJYjejkqbYsK2GHqt07ACpM86Y9tgeAB2x' 
            },
             body: JSON.stringify({ file, sub_id }),
             method: 'POST'
          };
          
        //    const url = new URL("https://api.thecatapi.com/v1/images/upload");
        const url = 'https://api.thecatapi.com/v1/images/upload';

          const response = await fetch(url, init);

          if(!response.ok){
            console.log("Error: " + JSON.stringify(response));
          }
          console.log("response: " + JSON.stringify(response));
          const clientResponse = await response.json();
          res.json(clientResponse);

      }
      catch(error: any){
          console.log(`API Request Failed uploadFile error: ${error} `);
          res.status(500).end();
      }
};