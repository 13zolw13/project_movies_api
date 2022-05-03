import { UserJWT } from "../models/movie.models";

export const MockDataBasicAccount = [{
        Title: "Jackie Brown",
        Director: "Quentin Tarantino",
        Released: "Thu Dec 25 1997 00:00:00 GMT+0000 (Coordinated Universal Time)",
        Genre: "Crime, Drama, Thriller",
        AddedBy: 123,
        Plot: "A flight attendant with a criminal past gets nabbed by the FBI for smuggling. Under pressure to become an informant against the drug dealer she works for, she must find a way to secure her future without getting killed.",
        Actors: "Pam Grier, Samuel L. Jackson, Robert Forster",
        Runtime: "154 min",
        Awards: "Nominated for 1 Oscar. 8 wins & 24 nominations total",
    },
    {
        Title: "John Wick",
        Released: "24 Oct 2014",
        Runtime: "101 min",
        Genre: "Action, Crime, Thriller",
        Director: "Chad Stahelski, David Leitch",
        Actors: "Keanu Reeves, Michael Nyqvist, Alfie Allen",
        Plot: "An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.",
        Awards: "5 wins & 10 nominations",
        AddedBy: 123,
    },
    {
        Title: "Duck Soup",
        Released: "17 Nov 1933",
        Runtime: "69 min",
        Genre: "Comedy, Musical",
        Director: "Leo McCarey",
        Actors: "Groucho Marx, Harpo Marx, Chico Marx",
        Plot: "Rufus T. Firefly is named the dictator of bankrupt Freedonia and declares war on neighboring Sylvania over the love of his wealthy backer Mrs. Teasdale, contending with two inept spies who can't seem to keep straight which side they'",
        Awards: "2 wins & 2 nominations",
        AddedBy: 123

    },
    {
        Title: "Dude, Where's My Car?",
        Released: "15 Dec 2000",
        Runtime: "83 min",
        Genre: "Comedy, Mystery, Sci-Fi",
        "Director": "Danny Leiner",
        Actors: "Ashton Kutcher, Seann William Scott, Jennifer Garner",
        Plot: "Two potheads wake up after a night of partying and cannot remember where they parked their car.",
        Awards: "6 nominations",
        AddedBy: 123
    },
    {
        Title: "Hot Shots!",
        "Released": "31 Jul 1991",
        Runtime: "84 min",
        Genre: "Action, Comedy",
        "Director": "Jim Abrahams",
        Actors: "Charlie Sheen, Cary Elwes, Valeria Golino",
        Plot: "A parody of Top Gun (1986) in which a talented but unstable fighter pilot must overcome the ghosts of his father and save a mission sabotaged by greedy weapons manufacturers.",
        Awards: "1 win",
        AddedBy: 123,




    },
    {
        Title: "Catch 22",
        Released: "15 Mar 2018",
        Runtime: "11 min",
        Genre: "Short, Mystery, Sci-Fi",
        Director: "Steve Keddy",
        Actors: "Tyshia Drake, Naz Ahmed, Indira Layne",
        Plot: "In a desperate act that could jeopardize her own existence, a nuclear physicist travels back in time to avert a global catastrophe.",
        Awards: "N/A",
        AddedBy: 123,


    }

]


export const MockDataAddedPremiumAccount = [{
        Title: "Jackie Brown",
        Director: "Quentin Tarantino",
        Released: "Thu Dec 25 1997 00:00:00 GMT+0000 (Coordinated Universal Time)",
        Genre: "Crime, Drama, Thriller",
        AddedBy: 434,
        Plot: "A flight attendant with a criminal past gets nabbed by the FBI for smuggling. Under pressure to become an informant against the drug dealer she works for, she must find a way to secure her future without getting killed.",
        Actors: "Pam Grier, Samuel L. Jackson, Robert Forster",
        Runtime: "154 min",
        Awards: "Nominated for 1 Oscar. 8 wins & 24 nominations total",
    },
    {
        Title: "John Wick",
        Released: "24 Oct 2014",
        Runtime: "101 min",
        Genre: "Action, Crime, Thriller",
        Director: "Chad Stahelski, David Leitch",
        Actors: "Keanu Reeves, Michael Nyqvist, Alfie Allen",
        Plot: "An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.",
        Awards: "5 wins & 10 nominations",
        AddedBy: 434,
    },
    {
        Title: "Duck Soup",
        Released: "17 Nov 1933",
        Runtime: "69 min",
        Genre: "Comedy, Musical",
        Director: "Leo McCarey",
        Actors: "Groucho Marx, Harpo Marx, Chico Marx",
        Plot: "Rufus T. Firefly is named the dictator of bankrupt Freedonia and declares war on neighboring Sylvania over the love of his wealthy backer Mrs. Teasdale, contending with two inept spies who can't seem to keep straight which side they'",
        Awards: "2 wins & 2 nominations",
        AddedBy: 434

    },
    {
        Title: "Dude, Where's My Car?",
        Released: "15 Dec 2000",
        Runtime: "83 min",
        Genre: "Comedy, Mystery, Sci-Fi",
        "Director": "Danny Leiner",
        Actors: "Ashton Kutcher, Seann William Scott, Jennifer Garner",
        Plot: "Two potheads wake up after a night of partying and cannot remember where they parked their car.",
        Awards: "6 nominations",
        AddedBy: 434
    },

    {
        Title: "Hot Shots!",
        "Released": "31 Jul 1991",
        Runtime: "84 min",
        Genre: "Action, Comedy",
        "Director": "Jim Abrahams",
        Actors: "Charlie Sheen, Cary Elwes, Valeria Golino",
        Plot: "A parody of Top Gun (1986) in which a talented but unstable fighter pilot must overcome the ghosts of his father and save a mission sabotaged by greedy weapons manufacturers.",
        Awards: "1 win",
        AddedBy: 434,

    },

    {
        Title: "Catch 22",
        Released: "15 Mar 2018",
        Runtime: "11 min",
        Genre: "Short, Mystery, Sci-Fi",
        Director: "Steve Keddy",
        Actors: "Tyshia Drake, Naz Ahmed, Indira Layne",
        Plot: "In a desperate act that could jeopardize her own existence, a nuclear physicist travels back in time to avert a global catastrophe.",
        Awards: "N/A",
        AddedBy: 434,
    }

]



export const fakeUserBasic: UserJWT = {
	userId: 123,
	role: "basic",
	name: "",
	iat: 0,
	exp: 0,
	iss: "",
	sub: "",
};

export const fakeUserPremium: UserJWT = {
	userId: 123,
	role: "premium",
	name: "",
	iat: 0,
	exp: 0,
	iss: "",
	sub: "",
};