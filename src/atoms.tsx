import { atom } from "recoil";

interface ISlider {
    keyName: string;
    title: string;
}
interface ISearchResults {
    content: string;
    title: string;
}
interface IRootUrl {
    [key: string] : string;
}
interface IOffset {
    [key: string] : number[];
}

export const moviesState = atom<ISlider[]>({
    key: "movies",
    default: [
        {
            keyName: "now_playing",
            title: "Now Playing In Theatres",
        },{
            keyName: "top_rated",
            title: "Top Rated",
        },{
            keyName: "popular",
            title: "Current Popular",
        },{
            keyName: "upcoming",
            title: "Upcoming Movies",
        },
    ],
});

export const tvState = atom<ISlider[]>({
    key: "tvs",
    default: [
        {
            keyName: "airing_today",
            title: "TV Airing Today",
        },{
            keyName: "top_rated",
            title: "Top Rated",
        },{
            keyName: "popular",
            title: "Current Popular",
        },{
            keyName: "on_the_air",
            title: "TV On The Air",
        },
    ],
});

export const searchState = atom<ISearchResults[]>({
    key: "search",
    default: [
        {
            content: "movie",
            title: "Movie Search Results",
        },{
            content: "tv",
            title: "TV Show Search Results",
        },{
            content: "person",
            title: "Person Search Results",
        },
    ],
});

export const rootState = atom<IRootUrl>({
    key: "rootUrl",
    default: {
        movie: "/",
        tv: "/tv",
        search: "/search",
    },
});

export const offsetState = atom<IOffset>({
    key: "offset",
    default: {
        pc: [1200, 6],
        tablet: [768, 4],
        mobile: [320, 3],
    }
})