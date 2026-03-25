import axios from "axios";

export const convertPriceToCurrencysss = async (
  price,
  targetCurrency,
  currentCurrency
) => {
  const response = await axios.get(
    `https://open.er-api.com/v6/latest/${currentCurrency}`
  );
  const rates = response.data.rates;
  if (rates.hasOwnProperty(targetCurrency)) {
    const convertedPrice = price * rates[targetCurrency];
    return convertedPrice.toFixed(2);
  } else {
    return 0;
  }
};
