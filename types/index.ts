import { Key } from "react";
import { Url } from "url";

export type ResponseData = Response & {
    message: String;
}

export type CatsResponse = [{
    id: Key,
    url: string,
    width: null,
    height: null,
    mime_type: "image/jpeg",
    entities: [],
    breeds: [],
    animals: [],
    categories: [],
    favourite_id?: string
    score: number,
}]


export type Cat = {
    id: Key,
    url: string,
    width: null,
    height: null,
    mime_type: "image/jpeg",
    entities: [],
    breeds: [],
    animals: [],
    categories: [],
    favourite_id?: string,
    score: number,
}

export type FavouritesResponse = [
    {
        id: string,
        user_id: string,
        image_id: string,
        sub_id: string,
        created_at: string,
        image: {
            id: string,
            url: string
        }
    }
]

export type Favourite = 
{
    id: string,
    user_id: string,
    image_id: string,
    sub_id: string,
    created_at: string,
    image: {
        id: string,
        url: string
    }
}

export type Vote = {
    id: string,
    image_id: string,
    sub_id: string,
    created_at: string,
    value: number,
    country_code: string,
    image: {
        id: string,
        url: string
    }
}