import instance from "api";

export const getLanguages = () => {
  return instance.get(`/configuration/languages`);
};
