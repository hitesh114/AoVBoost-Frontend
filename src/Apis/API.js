 import axios from "axios";
/* import {Items } from './APIOffer'; */

const Server_URL = "http://localhost:3004/";

export const GetAPI = async (Items) => {
  const response = await axios.get(Server_URL + Items);
  return response.data;
};

export const DeleteAPI = async (id,Items) => {
  return await axios.delete(`${Server_URL}${Items}/${id}`);
};

export const UpdateAPI = async (id, newOffer,Items) => {
  return await axios.put(`${Server_URL}${Items}/${id}`, newOffer);
};

export const AddAPI = async (newOffer,Items) => {
  return await axios.post(`${Server_URL}${Items}`, newOffer);
};