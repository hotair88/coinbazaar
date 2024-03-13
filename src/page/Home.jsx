import {Routes, Route} from 'react-router-dom';
import  List  from '../components/List';

function Home({ currCurrency, sortMethod }) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<List currCurrency={currCurrency} sortMethod={sortMethod} />} />
        {/* <Route path="" element={<Crypto />} /> */}
      </Routes>
    </div>
  );
}
export default Home;