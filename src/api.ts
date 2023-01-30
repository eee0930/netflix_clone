import { setCookie } from "./cookie";

const MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const MOVIE_BASE_FETCH = process.env.REACT_APP_MOVIE_BASE_FETCH;

/**
 * get content interface
 */
export interface IContent {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title?: string; // for movie
    name?: string; // for tv
    overview: string;
    origin_country?: string[]; // for tv
}
export interface IGetContentsResult {
    page : number;
    results: IContent[];
    total_pages: number;
    total_results: number;
}

/**
 * get detail interface
 */
interface IGenres {
    id: number;
    name: string;
}
interface ICompany {
    id: number;
    logo_path: string;
    name: string;
}
export interface IGetMovieDetail {
    id: number;
    title: string;
    original_title: string;
    backdrop_path : string;
    poster_path: string;
    genres: IGenres[];
    overview: string;
    release_date: string;
    runtime: number;
    adult: boolean;
    vote_average: number;
    production_companies: ICompany[];
}
interface ILastEpi {
    id: number;
    air_date: string;
    season_number: number;
    episode_number: number;
    name: string;
    overview: string;
    runtime: number;
    still_path: string;
    vote_average: number;
}
interface ICreatedBy {
    id: number;
    name: string;
    profile_path: string;
}
export interface IGetTvDetail {
    id: number;
    name: string;
    original_name: string;
    backdrop_path : string;
    poster_path: string;
    genres: IGenres[];
    overview: string;
    first_air_date: string;
    last_air_date: string;
    number_of_episodes: number;
    number_of_seasons: number;
    adult: boolean;
    vote_average: number;
    created_by: ICreatedBy[];
    last_episode_to_air: ILastEpi;
    production_companies: ICompany[];
}
export interface IGetPersonDetail {
    id: number;
    name: string;
    known_for_department: string;
    birthday: string;
    biography: string;
    deathday: string;
    profile_path: string;
}


/**
 * credits interface
 */
interface ICast {
    id: number;
    known_for_department: string;
    name: string;
    profile_path: string;
    character: string;
    order: number;
}
export interface ICredits {
    id: number;
    cast: ICast[];
}



/**
 * video interface
 */
export interface IVideos {
    id: string;
    key: string;
    name: string;
    site: "YouTube";
    size: string;
    type: string;
    official: boolean;
}
export interface IGetVideos {
    id: number;
    results: IVideos[];
}



/**
 * search result interface
 */
export interface IKnownFor {
    id: number;
    backdrop_path: string;
    poster_path: string;
    name?: string; // for tv
    title?: string; // for movie
    adult?: boolean;
    media_type: string;
    first_air_date?: string; // for tv
    release_date?: string; // for movie
}
export interface IContentSearch {
    id: number;
    poster_path: string;
    backdrop_path: string;
    title?: string; // for movie
    name?: string; // for tv, person
    known_for_department?: string; // for person
    profile_path?: string; // for person
    known_for?: IKnownFor[]; // for person
}
export interface IGetContentSearchResults {
    page: number;
    results: IContentSearch[];
    total_results: number;
    total_pages: number;
}



export function getContentResults(keyName: string, content: string) {
    return fetch(`${MOVIE_BASE_FETCH}/${content}/${keyName}?api_key=${MOVIE_API_KEY}&page=1`).then(
        (response) => response.json()
    );
};

export function getContentDetails(contentId: number, content: string) {
    return fetch(`${MOVIE_BASE_FETCH}/${content}/${contentId}?api_key=${MOVIE_API_KEY}`).then(
        (response) => response.json()
    );
};

export function getSimilarContents(contentId: number, content: string) {
    return fetch(`${MOVIE_BASE_FETCH}/${content}/${contentId}/similar?api_key=${MOVIE_API_KEY}&page=1`).then(
        (response) => response.json()
    );
}

export function getCredits(contentId: number, content: string) {
    return fetch(`${MOVIE_BASE_FETCH}/${content}/${contentId}/credits?api_key=${MOVIE_API_KEY}`).then(
        (response) => response.json()
    );
}

export function getContentVideos(contentId: number, content: string) {
    const contentVideo = fetch(`${MOVIE_BASE_FETCH}/${content}/${contentId}/videos?api_key=${MOVIE_API_KEY}`).then(
        (response) => response.json()
    );
    if(contentVideo as any) {
        setCookie('safeCookie1', 'foo', {
            path: "/",
            secure: true,
            sameSite: "None",
        });
    }
    return contentVideo;
};

export function getSearchResults(query: string, content: string) {
    return fetch(`${MOVIE_BASE_FETCH}/search/${content}?api_key=${MOVIE_API_KEY}&query=${query}`).then(
        (response) => response.json()
    );
};
