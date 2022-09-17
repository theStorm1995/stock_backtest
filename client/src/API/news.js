import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://bb-finance.p.rapidapi.com/stories/list',
  params: {id: 'usdjpy', template: 'CURRENCY'},
  headers: {
    'X-RapidAPI-Key': '0066cccc01msh270f25eed0597e1p194e98jsn6bf463d41559',
    'X-RapidAPI-Host': 'bb-finance.p.rapidapi.com'
  }
};

export const getNews = async () => axios.request(options)
