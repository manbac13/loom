import instance from "api";

export const getAllMovieGenreList = () => {
  return instance.get("/genre/movie/list");
};

export const getFilteredMovies = async (params) => {
  const { filters, for: forPurpose } = params;
  const allGenres = filters?.genre?.join(",");
  const res = await instance.get(
    `/discover/movie?sort_by=${filters.sortBy}&with_genres=${allGenres}&page=${filters.page}&vote_average.gte=${filters?.vote_average?.[0]}&vote_average.lte=${filters?.vote_average?.[1]}`
  );
  return {
    data: res.data,
    for: forPurpose,
  };
};
