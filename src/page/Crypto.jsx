import { useParams } from 'react-router-dom';
import { getCoinDetails } from '../api-config/apiService';
import { useState, useEffect } from 'react';
import { supplyFormatter } from '../utils/utils';
import ChartComp from '../components/chart';

export default function Cyrpto({currCurrency}) {
  const { id } = useParams();
  const [cryptoData, setCryptoData] = useState('');

  async function getCryptoData() {
    try{
      const data = await getCoinDetails(id);
      console.log("FETCHING SUCCESSFUL for COIN: ", id, data);
      setCryptoData(data);
    }
    catch(error){
      console.error('Erro while fetching Coin DETAILS ', error.message);
    }
  }

  useEffect(() => {
    getCryptoData();
  }, []);

  if(!cryptoData){
    return <div>Loading...</div>
  }
  let currPriceInLatestCurrency = currCurrency === 'INR' ? cryptoData.market_data.current_price.inr : cryptoData.market_data.current_price.usd;
  let currMarketCap =  Number(currCurrency === 'INR' ? cryptoData.market_data.market_cap.inr : cryptoData.market_data.market_cap.usd);
  return (
    <div className="crypto-detail flex flex-col gap-4 mt-2">
      {cryptoData && (
        <div className="crypto-detail">
          <div className="wrapper">
            <header className="flex items-center">
              <div className="name-wrapper">
                <span className="text-2xl font-medium">{cryptoData.name}</span>
                <span className="ml-3 text-base text-gray-500">
                  {cryptoData.symbol.toUpperCase()}
                </span>
              </div>
              {/* {user && ()} */}
              <span className="price ml-auto mr-40 text-2xl font-medium">
                {currCurrency === 'INR' ? '₹' : '$'} {currPriceInLatestCurrency}
              </span>
            </header>
            <div className="chart mt-9 mb-6">
              <ChartComp cryptoData={cryptoData} currCurrency={currCurrency} />
            </div>
            <div className="info">
              <p className="about">
                <span className="mb-1 block text-base font-medium">
                  About {cryptoData.name}
                </span>
                {cryptoData.description.en.split(". ")[0] + '.'}
              </p>
              <div className="stats mt-3 flex items-center text-base">
                <span className="block font-semibold rounded-md border  text-[#00B386] border-[#00B386] px-6 py-1">
                  RANK -{" "}
                  <span className="font-semibold">
                    {cryptoData.market_cap_rank}
                  </span>
                </span>
                <span className="ml-auto block rounded-md border border-gray-400 px-6 py-1">
                  MARKET CAP -{" "}
                  <span className="font-semibold">
                    {currCurrency === 'INR' ? '₹' : '$'} {supplyFormatter(currMarketCap)}
                  </span>
                </span>
              </div>
              <div className="sha-algo mt-4 flex text-base justify-start">
              <span className=" leftblock rounded-md border border-gray-400 pl-6 pr-4 py-1">
                  Hashing Algorithm :&nbsp;<span className="font-mono">{cryptoData.hashing_algorithm} </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}