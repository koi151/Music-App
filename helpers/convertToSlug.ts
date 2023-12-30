import unidecode from "unidecode"; 

export const convertToSlug = (inputString: string): string => {
  const unidecodeString = unidecode(inputString).trim();
  return unidecodeString.replace(/\s+/g, '-');
}