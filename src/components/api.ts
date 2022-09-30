import { IResponse } from './interfaces';

const api = async () => {
  try {
    const res = await fetch('https://rickandmortyapi.com/api/character/?page=2');
    const data = await res.json();
    console.log(data);
    return data as unknown as IResponse;
  } catch (error) {
    console.log(error);
  }
};

export default api;
