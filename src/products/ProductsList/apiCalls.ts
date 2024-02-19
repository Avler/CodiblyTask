import axios from 'axios';

export const fetchProductsList = async (page: number = 1) => {
  const response = await axios.get(`https://reqres.in/api/products?page=${page}`);
  return response.data; 
};

export const fetchProductById = async (id: string) => {
  const response = await axios.get(`https://reqres.in/api/products/${id}`);
  return response.data; 
};
