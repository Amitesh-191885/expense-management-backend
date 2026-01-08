export const trimToSingleWhiteSpaces = (str) => {
  if (typeof str !== "string") return str;
  if (!str) return str;
  str = str.replace(/\s+/g, " ").trim();
  return str.trim();
};
