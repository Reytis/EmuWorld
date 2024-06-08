export type GameInfo = {
    id: number,
    cover: {id: number, url: string}, //cover of game
    name: string, //name of game
    editors: string[], //array of studio name
    release: number, //Date type 2016
    genres: string[], // list of genre
    rating: number // <10 convert base 80/100 to 8/10
}

export type children = string | JSX.Element | (string | JSX.Element)[]