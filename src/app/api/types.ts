export interface MovieShow {
  id: number;
  language: string;
  seat_count: number;
  show_start_time: string;
  screen_no: number;
  movie_id: number;
  created_at: string;
  updated_at: string;
  show_end_time: string;
  seat_type_price: {
    vip: number;
    premium: number;
    standard: number;
  };
  seat_type_count: {
    vip: number;
    premium: number;
    standard: number;
  };
  user_id: number;
}

export interface Movie {
    id: number;
    title: string;
    stars: string;
    description: string;
}
