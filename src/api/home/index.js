import instance from "api";

export const getTrendingAll = () => {
  return instance.get("/trending/all/day");
};

export const getWhatsPopular = (params) => {
  return instance.get(`/${params.platForm}/popular`);
};

export const getUpcomingMovies = () => {
  return instance.get("/movie/upcoming");
};

export const getTrailer = (params)=>{
  return instance.get(`/movie/${params.id}/videos`)
}
