import { createContext, useEffect, useState } from "react";

export const CryptoContext = createContext();

// The Provider is just a normal component that wraps children and supplies them with shared values through
const CryptoContextProvider = (props) => {
    // - >Raw array returned by CoinGecko for the selected currency.

    const [cryptolist, setCryptolist] = useState([]);

    // - > A derived list that respects the user’s search term. Keeps filtering logic isolated so UI components can render directly from it.

    const [filteredCryptos, setFilteredCryptos] = useState([]);
    // - > Two‑way bound to a text input in  your UI.
    const [searchTerm, setSearchTerm] = useState("");
    // - > Object describing which fiat currency you’re pricing coins in. Changing it triggers a data refetch
const [currentCurrency, setCurrentCurrency] = useState({
  name: "usd",
  symbol: "$",
});


    // API -> CG-zrgrteEKDK1QGAMS4GW1p9MF
    const fetchCryptoData  = async () => {
        const options = {
  method: 'GET',
  headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-zrgrteEKDK1QGAMS4GW1p9MF'}
};

try{
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentCurrency.name}`, options);
    const data  = await res.json();
    // If the fetch is successful, it parses the JSON response and updates the cryptolist state with the fetched data using setCryptolist(data).
    setCryptolist(data);
} catch(err){
    console.log('Failed to fetch crypto data:', err);
}
    }


        // REFETCH WHEN CURRENCY CHANGES

        // * useEffect is crucial here for handling side effects like data fetching and data filtering based on state changes.
        useEffect(() => {
            fetchCryptoData();

            // The [currentCurrency] array is the dependency array. If any value in this array changes between renders, the effect will re-run. This ensures that if the user switches from USD to EUR, new data is fetched immediately.
// It also runs once when the component mounts for the first time to fetch initial data.
        }, [currentCurrency]);

        // * REFILTER WHEN RAW LIST OR SEARCH TERM CHANGES
        useEffect(() => {
            if(searchTerm.trim() === ""){
                // If searchTerm is empty (or just whitespace), filteredCryptos is set to the entire cryptolist
                setFilteredCryptos(cryptolist);
            } else{
                setFilteredCryptos(
                    cryptolist.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
                )
            }
        }, [cryptolist, searchTerm]);
  const contextValue = {
            cryptolist,
            filteredCryptos,
            currentCurrency,
            setCurrentCurrency,
            searchTerm,
            setSearchTerm,
    
  };

  return (
    <CryptoContext.Provider value={contextValue}>
      {props.children}
    </CryptoContext.Provider>
  );
};

export default CryptoContextProvider;