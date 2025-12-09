export const API_KEY = "AIzaSyDUm6gFKc63N1D3Iy1G042CMxcwcTzw0-s";
export const value_converter = (value) => {
  if (value === undefined || value === null) return "0"; // prevent crash

  value = Number(value);

  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "M";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + "K";
  }

  return value.toString();
};
