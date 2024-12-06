export const dateFormatter = (datestr) => {
  const date = new Date(datestr);

  // Create an options object for formatting the date
  const options = {
    day: "2-digit",
    month: "short", // "short" gives the 3-letter abbreviation (e.g., "Nov")
    year: "numeric",
  };

  // Use the Intl.DateTimeFormat to format the date
  const formattedDate = date.toLocaleDateString("en-GB", options);
  return formattedDate;
};

export const timeFormatter = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours}h ${minutes}m`;
};

export const getBorderColor = (theme, rating) => {
  if (rating >= 7) return theme.palette.success.light;
  if (rating >= 5 && rating < 7) return "#ffcd38";
  if (rating >= 2.5 && rating < 5) return theme.palette.warning.light;
  return theme.palette.error.light;
};

export const checkIfFiltersApplied = (filters) => {
  return Object.values(filters).some((filter) => {
    if (Array.isArray(filter)) {
      if (filter.length === 2 && filter[0] === 0 && filter[1] === 10) {
        return false;
      }
      return filter.length > 0;
    }
    return filter !== null && filter !== undefined && filter !== "";
  });
};

export const sortFiltersList = [
  { name: "Popularity Descending", key: "popularity.desc" },
  { name: "Popularity Ascending", key: "popularity.asc" },
  { name: "Title Descending", key: "title.desc" },
  { name: "Title Ascending", key: "title.asc" },
];

export const convertCurrencyUnit = (value) => {
  return `$${(value / 1_000_000).toFixed(2)} mil`;
};

export const givebacklanguage = (languageList, value) => {
  const found = languageList.find((item) => item.iso_639_1 === value);
  return found?.english_name;
};

export const getGender = (num) => {
  switch (num) {
    case 0:
      return "Not Specified";
    case 1:
      return "Female";
    case 2:
      return "Male";
    case 3:
      return "Non-binary";
    default:
      return "N/A";
  }
};
