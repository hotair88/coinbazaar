import axios from 'axios';
import { CoinDetails, HistoricalChart, PopularCrypto, PopularCurr } from './api';

export const getCoinData = async (currency = 'USD') => {
  try{
    const response = await axios.get(PopularCurr(currency));
    return response.data;
  //  const response = await simulateAPICall();
  //  return response;
  }
  catch(error) {
    console.error('Error while fetching API: ', error.message);
    throw error;
  }
}
export const getCoinDetails = async (id) => {
  try{
    const response = await axios.get(CoinDetails(id));
    return response.data;
  }
  catch(error){
    console.error('Error while fetching Coin Detail from API: ', error.message);
    throw error;
  }
}
export const getHistoricalChart = async (id, days, currency) => {
  try{
    const response = await axios.get(HistoricalChart(id, days, currency));
    return response.data;
  }
  catch(error){
    console.error('Error while fetching Chart data: ', error.message);
    throw error;
  }
}
// async function simulateAPICall() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve("API response data");
//     }, ); // Simulating a delay of 2 seconds
//   });
// }