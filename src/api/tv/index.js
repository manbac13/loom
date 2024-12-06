import instance from "api";

export const getTvShowDetails = (params) => {
  return instance.get(`/tv/${params.id}`);
};

export const getTvCast = (params) => {
  return instance.get(`/tv/${params.id}/credits`);
};
