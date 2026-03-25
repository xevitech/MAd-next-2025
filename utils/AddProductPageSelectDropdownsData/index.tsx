export const postValidityOptions = [
  { value: "1_month", view: "1 Month" },
  { value: "3_months", view: "3 Month(s)" },
  { value: "6_months", view: "6 Month(s)" },
  { value: "1_year", view: " 1 Year" },
  { value: "2_years", view: "2 Year(s)" },
  { value: "no_expiry_date", view: "No expiry date" },
];

const currentYear = new Date().getFullYear();
const startYear = 1900; // Change this to 1940 if you want the range from 1940 to the current year
const yearsArray = Array.from(
  { length: currentYear - startYear + 1 },
  (_, index) => {
    const year = startYear + index;
    return { value: year, view: year };
  }
);

export const ManufacturingYears = yearsArray.reverse();

export const productionCapacity = [
  "500 – 10,000",
  "10,001 – 50,000",
  "50,001 – 100,000",
  "100,001 – 500,000",
  "500,001 – 1,000,000",
  "1,000,001 – 5,000,000",
  "5,000,001 and above",
];
export const transactionAmount = [
  "0 – 100,000",
  "100,001 – 500,000",
  "500,001 – 1,000,000",
  "1,000,001 – 5,000,000",
  "	5,000,001 and above",
];
export const years = [
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
  "2009",
  "2008",
  "2007",
  "2006",
  "2005",
  "2004",
  "2003",
  "2002",
  "2001",
  "2000",
  "1999",
  "1998",
  "1997",
  "1996",
  "1995",
  "1994",
  "1993",
  "1992",
  "1991",
  "1990",
  "1989",
  "1988",
  "1987",
  "1986",
  "1985",
  "1984",
  "1983",
  "1982",
  "1981",
  "1980",
  "1979",
  "1978",
  "1977",
  "1976",
  "1975",
];

export const shippedInVariables = [
  { value: "Days", view: "Days" },
  { value: "weeks", view: "Weeks" },
  { value: "Months", view: "Months" },
  { value: "Years", view: "Years" },
];

export const shippedInVariablesForByOrder = [
  { value: "Daily", view: "Daily" },
  { value: "Weekly", view: "Weekly" },
  { value: "Monthly", view: "Monthly" },
  { value: "Annually", view: "Annually" },
];

export const constantTypes = [
  { value: "Currency($)", view: "Currency($)" },
  { value: "Unit", view: "Unit" },
];

export const availabilityOptions = [
  { id: 1, view: "In Stock", value: "in_stock" },
  { id: 2, view: "By Order", value: "by_order" },
];

export const priceTypeOptions = [
  { id: 1, view: "Fixed Price", value: "fixed" },
  { id: 2, view: "Quantity Based", value: "quantity" },
];

export const productTypeOptions = [
  { id: 1, view: "Simple Product", value: "simple" },
  { id: 2, view: "Config Product", value: "configured" },
];
