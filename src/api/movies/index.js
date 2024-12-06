import instance from "api";

export const getPopularMovies = (params) => {
  return instance.get(`/movie/popular?page=${params.page}`);
};

export const getNowPlayingMovies = (params) => {
  return instance.get(`/movie/now_playing?page=${params.page}`);
};

export const getUpcomingMovies = (params) => {
  return instance.get(`/movie/upcoming?page=${params.page}`);
};

export const getTopRatedMovies = (params) => {
  return instance.get(`/movie/top_rated?page=${params.page}`);
};

export const getMovieDetails = (params) => {
  return instance.get(`/movie/${params.id}`);
};

export const getMovieCast = (params) => {
  return instance.get(`/movie/${params.id}/credits`);
};

export const getSimilarMovies = (params) => {
  return instance.get(`/movie/${params.id}/similar`);
};

export const getSearchedMovie = async (params) => {
  console.log('params recieved', params)
  const { query, for: forPurpose } = params;
  const res = await instance.get(`/search/movie?query=${query}`);
  return {
    data: res.data,
    for: forPurpose,
  };
};
