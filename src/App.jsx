import Home from './page/Home';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GreenUpArrow from "./assets/GreenUpArrow";
import { useEffect, useState } from "react";
import RedDownArrow from "./assets/RedDownArrow";
import Cyrpto from './page/Crypto';
import ErrorPage from './error-page';
// import  List  from "./components/List";


// function List() {
//   return (
//     <h1>List</h1>
//   );
// }

function Header() {
  return (
    <header className="logo text-[28px] w-full font-medium">
      <a href="/" target="_blank">
        CoinBazaar
        {/* <BitcoinIcon /> */}
        </a>
    </header>
  );
}
function Sidebar({sortMethod, sortChange, currCurrency, changeCurr}) {

  const isLoading = false;

  return (
    <section className="sidebar mt-7 flex max-h-[76vh] max-w-[400px] h-full flex-col">
        {/* // the user is logged out always */}
    <div className="user-login">
    <button className="group w-full cursor-pointer items-center justify-senter text-[#fff] gap-2 rounded-lg bg-[#00B386] px-8 py-1.5 tracking-wide transition-all hover:scale-105 active:scale-95">
      Login
    </button>
    </div>
    <div className="currency-drop mt-6">
      <div className="flex w-full"> 
        <span className="text-sm">Select Currency</span>
      </div>
      <div className="options mt-2">
        <select name="" id="" value={currCurrency.toUpperCase()}
        onChange={(e) => changeCurr(e.target.value)}
        className="rounded-lg border border-gray-400 text-gray-500 bg-white p-2 w-full tracking-wide outline-none focus:ring-0"
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
        </select>
      </div>
    </div>
    <div className="currency-drop mt-6">
      <div className="flex w-full"> 
        <span className="text-sm">Sort by</span>
      </div>
      <div className="options mt-2">
        <select name="" id="" value={sortMethod}
        onChange={(e)=> sortChange(e.target.value)}
        className="rounded-lg border border-gray-400 text-gray-500 bg-white p-2 w-full tracking-wide outline-none focus:ring-0"
        >
          <option value="24H High to Low">24H High to Low</option>
          <option value="24H Low to High">24H Low to High</option>
          <option value="Low to High">Low to High</option>
          <option value="High to Low">High to Low</option>
          <option value="A to Z">A to Z</option>
          <option value="Z to A">Z to A</option>
          <option value="Market Cap">Market Cap</option>
        </select>
      </div>
    </div>
    {/* <div className="news mt-8">
      <div className="text-sm ml-14">News</div>
      <div className="border mt-1 -mr-3 -ml-8 p-3 border-gray-400 rounded-xl">
      <span className="text-xs">
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes.
      </span>
      </div>
    </div> */}
    {/* <div className="top-stocks mt-10">
    <div className="gainer">
  <GreenUpArrow />
  <div className="flex-col mx-3 justify-between  md:h-[72px] h-[60px] md:p-4 p-3 bg-gray-100 rounded-xl mt-3 items-center overflow-scroll">
    {isLoading ? 
    (<div className="flex justify-center h-full items-center">
    <div className="spinner animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
    <div className="text-sm ml-5">Loading...</div>
  </div>) : 
    (<><div className="flex justify-between">
    <div className="gainer-name md:text-base text-sm">Bitcoin</div>
    <div className="price md:text-base text-xs text-green-500 font-medium">52000</div>
    </div>
    <div className="flex justify-between text-xs">
    <div className="font-mono text-gray-500">BTC</div>
    <div>+16%</div> </div></>) }
    </div>
</div>

    <div className="loser mt-6">
     <RedDownArrow />
     <div className="flex-col mx-3 md:h-[72px] h-[60px] justify-between md:p-4 p-3 bg-gray-100 rounded-xl mt-3 items-center overflow-scroll">
     {isLoading ? 
    (<div className="text-center flex items-center h-full justify-center">
    <div className="spinner animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
    <div className="text-sm ml-5">Loading...</div>
  </div>) : 
    (<><div className="flex justify-between">
    <div className="gainer-name md:text-base text-sm ">Shitcoin</div>
    <div className="price  md:text-base text-xs font-medium text-red-500 align-baseline">52000</div>
    </div>
    <div className="flex justify-between text-xs">
    <div className="font-mono text-gray-500">SHTC</div>
    <div>+16%</div> </div></>) }

    </div>

  </div>

  </div> */}
    </section>
  );
}
function App() {
  const[currCurrency, setCurrCurrency] = useState('INR');
  const [sortMethod, setSortMethod] = useState('24H High to Low');
  const [stockId, setStockId] = useState(''); 
  // useEffect(() => {

  // }
  // , []);

  function sortChange(newMethod) {
    setSortMethod(newMethod);
    // console.log(newMethod);
    // console.log(parseFloat("-3.456") < parseFloat("-6.45"));
  }
  function changeCurr(newCurr) {
    setCurrCurrency(newCurr);
    console.log(newCurr);
  }

return (
  <Router>
  <main className="mx-auto max-w-screen-xl px-4 flex justify-start text-gray-800">
  <div className="flex-none md:w-1/6 w-1/5 mt-4">
    <Header />
    <Sidebar sortMethod={sortMethod} sortChange={sortChange} currCurrency={currCurrency} changeCurr={changeCurr} />
  </div>
  <div className="mt-4 flex-grow md:ml-12 ml-4">
    <Routes>
    <Route path="*" element={<Home currCurrency={currCurrency} sortMethod={sortMethod} />} />
    <Route path="/coins/:id" element={ <Cyrpto currCurrency={currCurrency}/> } errorElement={<ErrorPage/>} />
    </Routes>
  </div>
  </main>
  </Router>
);
}

export default App;