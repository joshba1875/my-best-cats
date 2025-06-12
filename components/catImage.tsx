import { Key, useState } from 'react';
import Heart from 'react-animated-heart';
import type { Cat } from '../types'
import Image from 'next/image';
import { useRouter } from 'next/router';

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
            'x-api-key': 'live_Si8nMRhQsHfEqpYMKbZ0ieoiwqvSGBkJYjejkqbYsK2GHqt07ACpM86Y9tgeAB2x' 
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
                      <Heart isClick={isFavourite} onClick={() => favouriteClick(cat.id)}></Heart>
                    </div>
                  </article>
                </>
    );
}