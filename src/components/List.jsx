import {useState, useEffect} from 'react';
import { CapFirstChar, PriceFormatter, supplyFormatter} from "../utils/utils";
import { PopularCurr } from '../api-config/api';
import { getCoinData } from '../api-config/apiService';
import { Link, redirect, useNavigate} from 'react-router-dom';

export default function List( { sortMethod = '24H High to Low', currCurrency = 'usd'}) {

  const [isLoading, setIsLoading] =useState(true);
  const [data, setData] = useState([]);
  let currSymbol = currCurrency == ('INR' || 'inr') ? '₹' : '$';
  const [searchBarText, setSearchBarText] = useState('');
  
  const history = useNavigate();

  async function fetchData() {
      try{

        const coinData = await getCoinData(currCurrency);
        // setIsLoading(false);
        console.log('FETCHING SUCCESSFUL in ', currCurrency, coinData);
        setData(coinData);
        setIsLoading(false);
      }
      catch(error) {
        console.error('Error fetching data : ', error.message);
      }
 }

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [currCurrency]);

  function sortMethodLogic(a, b) {
    if(sortMethod === '24H High to Low') {
      if(parseFloat(a.price_change_percentage_24h) <= parseFloat(b.price_change_percentage_24h)){
        return 1;
      }
      else{
        return 0;
      }
    }
    else if(sortMethod === '24H Low to High') {
      if(parseFloat(a.price_change_percentage_24h) >= parseFloat(b.price_change_percentage_24h)){
        return 1;
      }
      else{
        return 0;
      }
    }
    else if(sortMethod === 'Low to High') {
      if(Number(a.current_price) > Number(b.current_price)){
        return 1;
      }
      else{
        return 0;
      }
    }
    else if(sortMethod === 'High to Low') {
      if(Number(a.current_price) < Number(b.current_price)){
        return 1;
      }
      else{
        return 0;
      }
    }
    else if(sortMethod === 'A to Z') {
      if(a.id > b.id){
        return 1;
      }
      else{
        return 0;
      }
    }
    else if(sortMethod === 'Z to A') {
      if(a.id < b.id){
        return 1;
      }
      else{
        return 0;
      }
    }
    else {
      if(parseFloat(a.market_cap) < parseFloat(b.market_cap)){
        return 1;
      }
      else{
        return 0;
      }
    }
  }


if(isLoading) {
  return <div>Loading...</div>;
}

const handleSearch = () => {
  data.sort(sortMethodLogic);
  return data.filter((stock) => {
    return (
      stock.name.toLowerCase().includes(searchBarText) ||
      stock.symbol.toLowerCase().includes(searchBarText)
    );
  }

  );
}
  return (
    <section className="h-full w-full">
      <div className="search-box pl-3">
        <input type="search"
          value={searchBarText}
          onChange={(e) => setSearchBarText(e.target.value.toLowerCase())}
          placeholder="Type your crypto..."
          className="h-9 w-1/2 rounded-lg border-none bg-gray-100 p-3 tracking-wide outline-none focus:ring-0" />
      </div>
      <div className="list h-full">
        <span className="mt-9 block pl-3 text-xl font-semibold">
          Popular 100 Cryptocurrencies
        </span>
        <div className="custom-scroll mt-6 overflow-y-scroll max-h-[75vh]">
          <table className="w-full ">
            <thead className="sticky top-0 z-[0] rounded-lg bg-gray-100">
              <tr className="text-sm text-gray-500">
                <th className="text-left px-4 py-2 font-normal">Name</th>
                <th className="px-4 py-2 font-normal">Price</th>
                <th className="px-4 py-2 font-normal">24H% Change</th>
                <th className="px-4 py-2 font-normal">Volume</th>
                <th className="px-4 py-2 font-normal">Market Capitalization</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {handleSearch().map((item) => {
                const change = item.price_change_percentage_24h > 0;
                return (
                  
                  <tr
                    key={item.id}
                    className="cursor-pointer transition-all hover:bg-gray-50"
                    onClick={() => history(`/coins/${item.id}`)} >
                    <td className="px-4 py-4 text-left">
                      {CapFirstChar(item.name)}{" "}
                      <span className="ml-1 text-sm text-gray-400">{`${item.symbol.toUpperCase()}`}</span>
                    </td>
                    <td className="px-4 py-4">
                      {currSymbol}{''}
                      {parseFloat(item.current_price)}
                    </td>
                    <td className={`px-9 py-4 ${change > 0 ? "text-green-600" : "text-red-600"}`}>
                      {change > 0 ? "+" : null}
                      {parseFloat(item.price_change_percentage_24h).toFixed(2)}%
                    </td>
                    <td className="pl-4 py-4 text-center">
                      {supplyFormatter(item.circulating_supply)}
                    </td>
                    <td className="px-4 py-4 text-right">
                      {currSymbol}{''}
                      {PriceFormatter(Number(item.market_cap)).slice(0, -6)}M
                    </td>
                  </tr>
                  // </Link>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
