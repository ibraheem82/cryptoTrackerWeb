import { Coins, Search } from 'lucide-react';
import { CryptoContext } from '../context/cryptoContext';
import { useContext, useState } from 'react';

const Navbar = () => {
    const [input, setInput] = useState("");
const [filteredCoins, setFilteredCoins] = useState([]);
const { cryptolist = [], setSearchTerm } = useContext(CryptoContext);

const searchHandler = (event) => {
  event.preventDefault();
  // Clears any visible search suggestions after a search is performed.
  setFilteredCoins([]);

  // Updates the global searchTerm in the CryptoContext with the current value of the input field. This will likely trigger a re-render in other components that are listening to searchTerm, causing them to filter their data.
  setSearchTerm(input);
};
            const inputHandler = (event) => {
              // This function is called every time the user types into the search input field.

  const value = event.target.value;

  // Updates the input state, which in turn updates the displayed value in the input field.
  setInput(value);

  // If the input field is empty, it clears the global search term (setSearchTerm("")) and hides any previous search suggestions
  if (value === "") {
    setSearchTerm("");
    setFilteredCoins([]);
  } else {
    //  It filters the cryptolist (all cryptocurrencies) to find coins whose names include the typed value (case-insensitively).
    const suggestions = cryptolist.filter((coin) =>
      coin.name.toLowerCase().includes(value.toLowerCase())
    );
    // It takes only the first 5 matching suggestions to keep the dropdown concise.

    // Updates the filteredCoins state, which will then render the suggestion list.
    setFilteredCoins(suggestions.slice(0, 5));
  }
};
  return (
    <nav className='flex flex-wrap md:flex-nowrap items-center justify-between gap-4 px-[5%] md:px-[8%] lg:px-[10%] py-5 bg-gray-900 backdrop-blur-md border-b border-gray-700/30 sticky top-0 z-50'>
        <a className='order-1 flex-shrink-0 flex items-center gap-2 hover:scale-105 transition-transform'>
            <Coins className='w-8 h-8 text-emerald-800' />
            <span className='text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent'>
                CryptoTracker
            </span>
        </a>


{/* Search  */}

        <form onSubmit={searchHandler} className='order-3 w-full md:order-2 md:w-auto flex-1 max-w-2xl mx-0 md:mx-4 relative'>
  <div className='relative group'>
    {/* Gradient background */}
    <div className='absolute inset-0 bg-gradient-to-r from-emerald-600/40 to-cyan-500/40 rounded-full opacity-30 group-hover:opacity-50 transition duration-300 pointer-events-none'></div>

    {/* Input + Button */}
    <input
      type="text"
      placeholder="Search Crypto....."
      value={input}
      onChange={inputHandler}
      required
      className='relative w-full pr-12 pl-6 py-3 bg-gray-800/60 border border-gray-600/30 rounded-full
        focus:outline-none focus:ring-2 focus:ring-emerald-500/50 placeholder-gray-400 text-gray-200 backdrop-blur-sm z-10'
    />

    <button
      type='submit'
      className='absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-full hover:scale-105 transition-all'
    >
      <Search className='w-4 h-4 pointer-events-none' />
    </button>
  </div>
            {filteredCoins.length > 0 && (
  <ul className='absolute w-full bg-gray-800/95 border border-gray-700 mt-2 rounded-lg shadow-xl z-10 backdrop-blur-md'>
    {filteredCoins.map((coin, idx) => (
      <li key={idx} className='px-4 py-2 hover:bg-emerald-600/30 cursor-pointer text-gray-100'
        onClick={() => {
          setInput(coin.name);
          setFilteredCoins([]);
        }}
      >
        {coin.name}
      </li>
    ))}
  </ul>
)}
</form>


    
    </nav>
  )
}

export default Navbar