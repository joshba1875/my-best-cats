import { useEffect, useState } from 'react';
import { catsHandler } from './api/my-cats';
import type { CatsResponse, Favourite, Vote } from '../types'
import CatImage from '../components/catImage'
import fetcher from '../lib/fetcher';
import errorHandler from '../lib/errorHandler';

export default function Home() {

 const [catImages, setCatImages] = useState<CatsResponse>();
 const [favourites, setFavourites] = useState<[Favourite?]>([]);
 const [catFavourites, setCatFavourites] = useState<CatsResponse>();
 const [catVotes, setCatVotes] = useState<[Vote?]>([]);
 const [errorMessage, setErrorMessage] = useState<string>();

 // Page init - load the cats, load the favourites, normalise the model
  useEffect(() => {
    Promise.all([fetchCats(), fetchFavourites(), fetchVotes()]);
    // I was going down a different route here until I realised that the state should just be managed by a 3rd normalised prop
    return () => {};
    
  }, []);

  useEffect(() => {
    normaliseCats();
  }, [catImages]);

  // normalise and manage the combined cats - favourites - votes model
  const normaliseCats = () => {
    catImages?.forEach(cat => {
      // Check if cat is a favourite
      const favourite = favourites.find(favourite => favourite?.image_id == cat.id);
      if(favourite){
        cat.favourite_id = favourite.id;
      }
      // Check how many votes cat has
      const votes = catVotes.filter(vote => vote?.image_id == cat.id);
      votes.forEach((vote) => {
        if(vote){
          if(isNaN(cat.score))
          {
            
          }
          cat.score += vote.value;
        }
      });

    });

    console.log(JSON.stringify(catImages));
    if(catImages !== undefined){
      setCatFavourites(catImages);
    }
  };   

  const fetchCats = () => {
      return fetcher('GET', 'https://api.thecatapi.com/v1/images/?limit=10&page=0&order=DESC')
      .then((response) => {
        if(!response.ok){
          setErrorMessage(errorHandler(response));
          Promise.reject(response);
        }
        return response.json();
      })
      .then((data) => {
         const catsResponse = catsHandler(data);
         console.log("We're setting cats: " + JSON.stringify(catsResponse));
        setCatImages(catsResponse);
        console.log("catImages: " + JSON.stringify(catImages));
  })
  .catch(() => {
    // More specific error handling
  });
};

  const fetchFavourites = () => {
    return fetcher('GET', 'https://api.thecatapi.com/v1/favourites')
      .then((response) => {
        if(!response.ok){
          setErrorMessage(errorHandler(response));
          Promise.reject(response);
        }
        return response.json();
      })
      .then((data) => {
        // map to obj
        console.log("We're setting favourites");
        setFavourites(data as unknown as []);

      })
      .catch(() => {
        // More specific error handling
      });
    };

    const fetchVotes = () => {
      return fetcher('GET', 'https://api.thecatapi.com/v1/votes')
      .then((response) => {
        if(!response.ok){
          setErrorMessage(errorHandler(response));
          Promise.reject(response);
        }
        return response.json();
      })
      .then((data) => {
        // map to obj
        console.log("We're setting cat votes");
        setCatVotes(data as unknown as []);

      })
      .catch(() => {
        // More specific error handling
      });
    };

  return (
    <div className="md:grid md:gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
            {!!!errorMessage ? 
              catFavourites?.map((cat) => 
                {
                return (
                <CatImage key={cat.id} {...cat} />
                );
            }) : 
            <label>{errorMessage}</label>} 
    </div>
  );
}