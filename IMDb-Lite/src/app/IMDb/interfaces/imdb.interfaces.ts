export interface ActorImage {
  url: string;
  is_cover: boolean;
}

export interface CastMember {
  actor_id: string;
  character_name: string;
  actor_name: string;
  images: ActorImage[];
}

export interface Movie {
  _id: string;
  title: string;
  description: string;
  genre: string[];
  director: string;
  cast: CastMember[];
  release_year: number;
  rating: number;
  images: ActorImage[];
}

export interface MovieSearchParams {
  page?: number;
  limit?: number;
  genre?: string[];
  rating?: number;
  release_year?: number;
  year_start?: number;
  year_end?: number;
  title?: string;
}

export interface Genre {
  name: string;
  value: string;
}

export interface Actor {
  actor_id: string;
  name: string;
  birth_date: string;
  biography: string;
  images: Image[];
  movies: MovieInformation[];
}

export interface MovieInformation {
  movie_id: string;
  title: string;
  role: string;
}

export interface Image {
  url: string;
  is_profile: boolean;
}

export interface ActorSearchParams {
  page?: number;
  limit?: number;
  birth_date?: string;
  name?: string;
  sort?: string;
}