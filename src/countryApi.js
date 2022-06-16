const API_URL = 'https://restcountries.com/v3.1/all';

export default async function getCountries() {
  const response = await fetch(`${API_URL}`);
  const json = await response.json();
  return json;
}
