import {createContext} from "react";
import {useQueries} from "react-query";
import {getAllStocks} from "../service/StockService";
import {getAllSectors} from "../service/SectorService";
import {getAllCommodities} from "../service/CommoditiyService";
import {getAllCryptoCurrencies} from "../service/CryptoService";


const StaticDataContext = createContext();

const StaticDataProvider = ({children}) => {
    const queryResults = useQueries(
        [
            {queryKey: 'stock-data', queryFn : getAllStocks},
            {queryKey: 'sector-data', queryFn : getAllSectors},
            {queryKey: 'commodity-data', queryFn : getAllCommodities},
            {queryKey: 'crypto-data', queryFn : getAllCryptoCurrencies}
        ]
    )

    if(queryResults[0].isLoading && queryResults[1].isLoading) {
        return <h1>Loading....</h1>
    }

    const value = {
        stocks: queryResults[0].data,
        sectors: queryResults[1].data,
        commodities: queryResults[2].data
    }

    return (
        <StaticDataContext.Provider value={value}>
            {children}
        </StaticDataContext.Provider>
    )
}

export {StaticDataContext, StaticDataProvider}