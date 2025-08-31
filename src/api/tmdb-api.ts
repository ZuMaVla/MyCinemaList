export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw error
    });
};

export const getMovie = (id: number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to get movie data. Response status: ${response.status}`);
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getGenres = () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
    import.meta.env.VITE_TMDB_KEY +
    "&language=en-US"
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch genres. Response status: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw error
    });
};

export const getMovieImages = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      return response.json();
    }).then((json) => json.posters)
    .catch((error) => {
      throw error
    });
};

export const getMovieReviews = (id: string | number) => { //movie id can be string or number
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log(json.results);
      return json.results;
    });
};

export const getUpcomingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw error
    });
};

export const fetchStarring = async (movieId: number): Promise<{ id: number; name: string; character: string }[]> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch credits: ${response.status}`);
  }

  const data: any = await response.json();

  return data.cast
    .filter(p => p.known_for_department === "Acting")
    .map((p: any) => ({
      id: p.id,
      name: p.name,
      character: p.character
    }))
};
