import { IResponse } from './interfaces';

export const getPageData = async (search: string | null) => {
  try {
    const urlApi = search ? search : `https://rickandmortyapi.com/api/character/?page=1`;
    const res = await fetch(urlApi);
    const data = await res.json();
    return { data: data as unknown as IResponse, status: res.status };
  } catch (error) {
    console.log(error);
  }
};

export const searchByName = async (name: string) => {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
    const data = await res.json();
    return { data: data as unknown as IResponse, status: res.status };
  } catch (error) {
    console.log(error);
  }
};
