
const MAIN_URL = `https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts`;

export const fetchPost = async () => {
 return await fetch(MAIN_URL)
  .then(res =>  res.json())
  .then(data => data)
  .catch(err => console.error(err));
}