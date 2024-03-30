//// movie show
export interface MovieShowCreateReq {
  movie_show: {
    user_id: number;
    language: string;
    seat_count: number;
    show_start_time: string;
    show_end_time: string;
    screen_no: number;
    movie_id: number;
    seat_type_count: {
      standard: number;
      premium: number;
      vip: number;
    };
    seat_type_price: {
      standard: number;
      premium: number;
      vip: number;
    };
  };
}

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

//// movie types
export interface Movie {
  id: number;
  title: string;
  stars: string;
  description: string;
  img_url:string;
}

export interface MovieCreateReq {
  id:number;
  user_id: number;
  title: string;
  stars: string;
  description: string;
  img_url:string;
}

export interface MovieUpdateReq {
  id: number;
  user_id: number;
  title: string;
  stars: string;
  description: string;
}

/////movie-in-theaters
export interface MovieInTheater {
  id: number;
  theater_id: number;
  movie_show_id: number;
  created_at: string;
  updated_at: string;
}
export interface MovieInTheaterCreateReq {
  movie_in_theater: {
    movie_show_id: number;
    theater_id: number;
  };
}

///theater

export interface Theater {
  id: number;
  name: string;
  location: string;
  city: string;
  created_at: string;
  updated_at: string;
  user_id: number;
}

export interface TheaterCreateReq {
  theater: {
    user_id: number;
    name: string;
    location: string;
    city: string;
  };
}

///ticket

export interface Ticket {
//   ticket: {
    id: number;
    payment_mode: string;
    seat_book: number;
    user_id: number;
    movie_show_id: number;
    seat_type: string[];
  // };
}
export interface TicketRequestBody {
  ticket: {
    payment_mode: string;
    seat_book: number;
    user_id: number;
    movie_show_id: number;
    seat_type: string[];
  };
}

/*

//movie

{
    "id": 4,
    "title": "Kkkg",
    "stars": "5 Stars",
    "description": "Action Movie",
    "img_url": "abc.com"
}


//movie in theater list

    {
        "id": 1,
        "movie_show_id": 5,
        "theater_id": 1,
        "created_at": "2024-03-25T18:28:46.155Z",
        "updated_at": "2024-03-25T18:28:46.155Z"
    }

    {
    "id": 2,
    "movie_show_id": 5,
    "theater_id": 1,
    "created_at": "2024-03-25T19:16:55.404Z",
    "updated_at": "2024-03-25T19:16:55.404Z"
}


// movie show by theater id 

    {
        "id": 5,
        "language": "English",
        "seat_count": 6,
        "show_start_time": "2000-01-01T10:00:00.000Z",
        "screen_no": 4,
        "movie_id": 2,
        "created_at": "2024-03-25T17:58:47.710Z",
        "updated_at": "2024-03-25T17:58:47.710Z",
        "show_end_time": "2024-03-20T14:00:00.000Z",
        "seat_type_price": {
            "vip": 200,
            "premium": 150,
            "standard": 100
        },
        "seat_type_count": {
            "vip": 1,
            "premium": 2,
            "standard": 3
        },
        "user_id": 1
    },


  //theater
      {
        "id": 1,
        "name": "Oasis",
        "location": "Navi Peth",
        "city": "Solapur",
        "created_at": "2024-03-25T18:13:57.002Z",
        "updated_at": "2024-03-25T18:13:57.002Z",
        "user_id": 29
    }


    //theater_by_movie_show_id


*/
