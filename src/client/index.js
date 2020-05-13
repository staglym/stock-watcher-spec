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

  try {
    const [companyData, stockData] = await Promise.all([
      fetchUrl(searchUrl),
      fetchUrl(quoteUrl)
    ]);

    console.log(companyData);
    console.log(stockData);
    const companyName = fetchName(companyData);
    const stockInfo = stockData['Global Quote'];
    const stockSymbol = stockInfo['01. symbol'];

    const newStock = {
      name: companyName,
      symbol: stockSymbol,
      open: stockInfo['02. open'],
      high: stockInfo['03. high'],
      low: stockInfo['04. low'],
      price: stockInfo['05. price'],
      change: stockInfo['09. change'],
      changePercent: stockInfo['10. change percent']
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
