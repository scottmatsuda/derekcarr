import axios from 'axios';

const onGlobalSuccess = (response) => {
  return response.data;
};

const onGlobalError = (err) => {
  return Promise.reject(err);
};

// const TRUMEDIA_API_KEY = 'c48f9c0c-462a-4260-ace4-bd605e6abe9f';
const API_HOST_PREFIX = 'https://project.trumedianetworks.com';
const endpoint = API_HOST_PREFIX + "/api/nfl";

const getPlayerById = (playerId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/player/${playerId}`,
    headers: { "accept": "application/json", "tempToken": "d9eab71a-c759-45eb-a444-7c43d8f81b83" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAllPlayers = () => {
  const config = {
    method: "GET",
    url: `${endpoint}/players`,
    crossdomain: true,
    headers: { "accept": "application/json", "tempToken": "d9eab71a-c759-45eb-a444-7c43d8f81b83" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export {
  getPlayerById, getAllPlayers
}

  
