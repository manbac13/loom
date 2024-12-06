import instance from "api";

export const getPeople = (params) => {
  return instance.get(`/person/popular?page=${params.page}`);
};

export const getSearchedPeople = (params) => {
  return instance.get(`search/person?query=${params.query}`);
};

export const getPersonDetails = (params) => {
  return instance.get(`/person/${params.id}`);
};

export const getKnownForData = (params) => {
  return instance.get(`/person/${params.id}/combined_credits`);
};
