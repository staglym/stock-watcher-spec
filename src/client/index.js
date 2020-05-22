import { fetchUrl } from '../utils';

const fetchName = (data) => {
  console.log(data.bestMatches);
  const bestMatch = data.bestMatches.filter(match => {
    return parseFloat(match['9. matchScore']) === 1;
  });

  if (!bestMatch.length) {
    throw new Error('No matches made');
  }
  const name = bestMatch[0]['2. name'];

  return name;
};

/**
 * 
 * @param {Number} num 
 * @param {Number} precision | Number of decimal places - Must be an Int
 */
const round = (num, precision) => Number.parseFloat(num).toFixed(precision);
const roundToTwo = (num) => round(num, 2);

export const fetchStocks = async (
  setError,
  setLoading,
  setStocks,
  stocks,
  symbol
) => {
  setError(false);
  setLoading(true);

  const API_KEY = 'HY0JP87WH3PG17X6';
  const baseUrl = `https://www.alphavantage.co/query?function`;
  const searchUrl = `${baseUrl}=SYMBOL_SEARCH&keywords=${symbol}&apikey=${API_KEY}`;
  const quoteUrl = `${baseUrl}=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;

  /*
   * First we call the SYMBOL_SEARCH endpoint in order to get the company name since that is clearly laid out in the mockups
   * From that point we call the GLOBAL_QUOTE endpoint to get the rest of the info we need.
   * I could be wrong, but I didn't see any one endpoint in the documentation that returns all the data necessary to comply with the mockups
   */
  try {
    const [companyData, stockData] = await Promise.all([
      fetchUrl(searchUrl),
      fetchUrl(quoteUrl)
    ]);
    const companyName = fetchName(companyData);
    const stockInfo = stockData['Global Quote'];
    const stockSymbol = stockInfo['01. symbol'];

    const newStock = {
      name: companyName,
      symbol: stockSymbol,
      open: roundToTwo(stockInfo['02. open']),
      high: roundToTwo(stockInfo['03. high']),
      low: roundToTwo(stockInfo['04. low']),
      price: roundToTwo(stockInfo['05. price']),
      change: roundToTwo(stockInfo['09. change']),
      changePercent: roundToTwo(stockInfo['10. change percent'])
    };

    setStocks([
      ...stocks,
      newStock
    ]);
  } catch (error) {
    console.error(error);
    setError(true);
  }

  setLoading(false);
};
