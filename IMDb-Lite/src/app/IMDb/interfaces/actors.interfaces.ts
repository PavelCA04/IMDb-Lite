export interface Actor {
  _id: string;
  actor_id: string;
  name: string;
  birth_date: string; 
  biography: string;
  images: Image[];
  movies: Movie[];
}

export interface Image {
  url: string;
  is_profile: boolean;
}

export interface Movie {
  movie_id: string;
  title: string;
  role: string;
}


export interface ActorSearchParams {
  page?: number;
  limit?: number;
  birth_date?: string;
  name?: string;
  order?: string;
}
