import { useEffect, useState } from 'react';
import { catsHandler } from './api/my-cats';
import Link from 'next/link';
import type { CatsResponse, Favourite, FavouritesResponse } from '../types'
import CatImage from '../components/catImage'

export default function Home() {

 const [catImages, setCatImages] = useState<CatsResponse>();
 const [favourites, setFavourites] = useState<[Favourite?]>([]);
 const [catFavourites, setCatFavourites] = useState<CatsResponse>();

 // Page init - load the cats, load the favourites, normalise the model
  useEffect(() => {
    Promise.all([fetchCats(), fetchFavourites()]);
    // I was going down a different route here until I realised that the state should just be managed by a 3rd normalised prop
    return () => {};
    
  }, []);

  useEffect(() => {
    normaliseCatFavourites();
  }, [catImages]);

  // normalise and manage the combined cats - favourites model
  const normaliseCatFavourites = () => {
    console.log("We're normalising");
    catImages?.forEach(cat => {
      // Check if cat is a favourite
      console.log("favourites: " + JSON.stringify(favourites));
      const favourite = favourites.find(favourite => favourite?.image_id == cat.id);
      if(favourite){
        console.log("Setting favourite id on cat: " + JSON.stringify(cat));
        cat.favourite_id = favourite.id;
      }
    });

    console.log(JSON.stringify(catImages));
    if(catImages !== undefined){
      setCatFavourites(catImages);
    }
  };   

  const fetchCats = () => {
    const init = {
        headers:{
            'Content-Type': 'application/json',
            'x-api-key': 'live_Si8nMRhQsHfEqpYMKbZ0ieoiwqvSGBkJYjejkqbYsK2GHqt07ACpM86Y9tgeAB2x' 
        },
        method: 'GET',
        body: null
      };

      return fetch('https://api.thecatapi.com/v1/images/?limit=10&page=0&order=DESC', init)
      .then((response) => response.json())
      .then((data) => {
         const catsResponse = catsHandler(data);
         console.log("We're setting cats: " + JSON.stringify(catsResponse));
        setCatImages(catsResponse);
        console.log("catImages: " + JSON.stringify(catImages));
      });
  };

  const fetchFavourites = () => {
    const init = {
        headers:{
            'Content-Type': 'application/json',
            'x-api-key': 'live_Si8nMRhQsHfEqpYMKbZ0ieoiwqvSGBkJYjejkqbYsK2GHqt07ACpM86Y9tgeAB2x' 
        },
        method: 'GET',
        body: null
      };

      return fetch('https://api.thecatapi.com/v1/favourites', init)
      .then((response) => response.json())
      .then((data) => {
        // map to obj
         console.log("We're setting favourites");
        setFavourites(data as unknown as []);

      })
    };

  return (
    <div className="md:grid md:gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
            {catFavourites?.map((cat) => 
              {
              return (
               <CatImage key={cat.id} {...cat} />
              );
            })} 
    </div>
  );
}