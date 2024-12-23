import { GetAPI, DeleteAPI, UpdateAPI, AddAPI } from './API';


export const Items = "items";

export const fetchOffer = async () => {
    return await GetAPI(Items);
  };
  
  // Function to remove an offer
  export const removeOffer = async (id) => {
    return await DeleteAPI(id,Items);
  };
  
  // Function to modify an offer
  export const modifyOffer = async (id, newOffer) => {
    return await UpdateAPI(id, newOffer,Items);
  };
  
  // Function to create a new offer
  export const createOffer = async (newOffer) => {
    return await AddAPI(newOffer,Items);
  };