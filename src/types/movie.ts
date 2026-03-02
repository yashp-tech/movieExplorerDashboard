// Shared Movie types for the Movie Explorer Dashboard

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  imdbRating?: string;
}

export interface MovieDetails extends Movie {
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards?: string;
  Metascore?: string;
  imdbVotes?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Ratings?: { Source: string; Value: string }[];
  Response: string;
  Error?: string;
  totalSeasons?: string;
}

export interface MovieSearchResult {
  movies: Movie[];
  totalResults: number;
}
