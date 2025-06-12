import { Key, useState } from 'react';
import Heart from 'react-animated-heart';
import type { Cat } from '../types'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from '@headlessui/react';

export default function CatImage(cat: Cat){
    console.log("cat: " + JSON.stringify(cat));
    console.log("!!cat.favourite_id: " + !!cat.favourite_id);
    const router = useRouter();

    const [isFavourite, setFavouriteClick] = useState<boolean>(!!cat.favourite_id);

    const favouriteClick = (id: Key) => {

        const favourite_id = cat.favourite_id;
        console.log("isFavourite: " + !!isFavourite);
        
        const resource = !!!isFavourite ? 'favourites' : `favourites/${favourite_id}`; // Not a favourite, try to favourite
        const body = !!!isFavourite ? JSON.stringify({ image_id: id}) : null; // Is a favourite, try to delete favourite

        const init = {
            headers:{
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_CAT_API_KEY ?? ''
            },
            method: !!!isFavourite ? 'POST' : 'DELETE',
            body: body
        };

        fetch(`https://api.thecatapi.com/v1/${resource}`, init)
        .then((response) => response.json())
        .then((data) => {
            if(!!isFavourite){
                if(data && data.message == "SUCCESS"){
                    console.log("Favourite is set");
                    setFavouriteClick(true);
                    router.reload();
                }
                else{
                    console.log("Favourite Not set");
                    setFavouriteClick(false);
                    router.reload();
                }
            }
            else{
                // Handle delete response
                console.log("Why am I here?? Response data: " + JSON.stringify(data));
                router.reload();
            } 
        });
    }

    const upVote = (id: Key) => {

      const init = {
            headers:{
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_CAT_API_KEY ?? ''
            },
            method:  'POST',
            body: JSON.stringify({ "image_id": id, "value": 1})
        };

        fetch(`https://api.thecatapi.com/v1/votes`, init)
        .then((response) => response.json())
        .then((data) => {
                if(data && data.message == "SUCCESS"){
                    // Manage state of score
                     router.reload();
                }
                else{
                  // Handle error
                }
            });
    };

    const downVote = (id: Key) => {
       const init = {
            headers:{
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_CAT_API_KEY ?? ''
            },
            method:  'POST',
            body: JSON.stringify({ "image_id": id, "value": -1})
        };

        fetch(`https://api.thecatapi.com/v1/votes`, init)
        .then((response) => response.json())
        .then((data) => {
                if(data && data.message == "SUCCESS"){
                    // Manage state of score
                     router.reload();
                }
                else{
                  // Handle error
                }
            });
    };

    return (
     <>
                  <article
                    key={cat.id}
                    className="p-6 mb-6  transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer"
                  >
                    <div className="relative mb-4 rounded-2xl">
                      <Image
                        width={400}
                        height={400}
                        className="max-h-80 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                        src={cat.url}
                        alt=""
                      />
                      <span>
                        <Heart isClick={isFavourite} onClick={() => favouriteClick(cat.id)}></Heart> <label className='pt-5 absolute'>Score {cat.score ?? 0}</label>
                        <Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => upVote(cat.id)} >Up Vote</Button> <Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => downVote(cat.id)}>Down Vote</Button>
                      </span>
                    </div>
                  </article>
                </>
    );
}