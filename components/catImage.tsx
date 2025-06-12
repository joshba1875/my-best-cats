import { Key, useState } from 'react';
import Heart from 'react-animated-heart';
import type { Cat } from '../types'
import Image from 'next/image';
import { Button } from '@headlessui/react';
import fetcher from '../lib/fetcher';
import errorHandler from '../lib/errorHandler';

export default function CatImage({cat, setTriggerRefresh}: {cat: Cat, setTriggerRefresh: any}){
    const [isFavourite, setFavouriteClick] = useState<boolean>(!!cat.favourite_id);
    
    const favouriteClick = (id: Key) => {
        const favourite_id = cat.favourite_id;
        const resource = !!!isFavourite ? 'favourites' : `favourites/${favourite_id}`; // Not a favourite, try to favourite
        const body = !!!isFavourite ? JSON.stringify({ image_id: id}) : undefined; // Is a favourite, try to delete favourite

        return fetcher(!!!isFavourite ? 'POST' : 'DELETE', `https://api.thecatapi.com/v1/${resource}`, body)
          .then((response) => {
            if(!response.ok){
              console.error((errorHandler(response)));
              Promise.reject(response);
            }
            return response.json();
          })
          .then((data) => {
            if(data && data.message == "SUCCESS"){
              setFavouriteClick(!!!isFavourite);
              setTriggerRefresh({});
          }
          else{
              setFavouriteClick(!!!isFavourite);
              setTriggerRefresh({});
          }
         })
          .catch(() => {
            // More specific error handling
          });
    }

    const upVote = (id: Key) => {
      return fetcher('POST', 'https://api.thecatapi.com/v1/votes', JSON.stringify({ "image_id": id, "value": 1}))
       .then((response) => {
          if(!response.ok){
            console.error(errorHandler(response));
            Promise.reject(response);
          }
          return response.json();
        })
        .then((data) => {
          if(data && data.message == "SUCCESS"){
                // Manage state of score
                setTriggerRefresh({});
            }
            else{
              // Handle error
            }
          })
          .catch(() => {
            // More specific error handling
          });
    };

    const downVote = (id: Key, currentScore: number) => {
      if(currentScore === 0){
        // do nothing, cat score is already low enough :)
        return;
      }
      
      return fetcher('POST', 'https://api.thecatapi.com/v1/votes', JSON.stringify({ "image_id": id, "value": -1}))
        .then((response) => {
            if(!response.ok){
              console.error(errorHandler(response));
              Promise.reject(response);
            }
            return response.json();
        })  
        .then((data) => {
          if(data && data.message == "SUCCESS"){
              // Manage state of score
              setTriggerRefresh({});
          }
          else{
            // Handle error
          }
        });
    };

    return (
      <>
        <article key={cat.id} className="p-6 mb-6  transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer">
          <div className="relative mb-4 rounded-2xl">
            <Image
              width={400}
              height={400}
              className="max-h-80 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
              src={cat.url}
              alt={`Image of a cat with a score of ${cat.score}`}
            />
            <span>
              <Heart isClick={isFavourite} onClick={() => favouriteClick(cat.id)}></Heart> <label className='pt-5 absolute'>Score {cat.score ?? 0}</label>
              <Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => upVote(cat.id)} >Up Vote</Button> <Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => downVote(cat.id, cat.score)}>Down Vote</Button>
            </span>
          </div>
        </article>
      </>
      );
}