import { BusinessType } from "@/hooks/Interface";
import { countriesList } from "@/utils/countriesphp";

export const getBusinessType = (businessTypes?: BusinessType[]) => {
  const foundBusiness = businessTypes?.find(
    (business) => business?.toggle === "1"
  );
  return foundBusiness?.name || "business type not available";
};

export const formatString = (input: string): string => {
  if (!input) return "";
  return input
    .replace(/_+(.)/g, (_, char) => ` ${char.toUpperCase()}`)
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
};

// export const formatTitleAndValueQAQC = (blockData, arrayGetTitle) => {
//   if (!blockData && (!arrayGetTitle || arrayGetTitle?.length === 0)) return [];

//   if (Array.isArray(blockData)) {
//     let mappedData = blockData.map((el) => {
//       return [
//         ...arrayGetTitle.map((el) => {
//           const value = blockData[0][el?.key] || "N/A";
//           return value !== "N/A" ? { title: el?.title, value } : null;
//         }),
//       ];
//     });
//     return mappedData?.length > 0 ? mappedData[0] : [];
//   } else {
//     return [
//       ...arrayGetTitle
//         ?.map((departmentItem) => {
//           const value = blockData?.[departmentItem?.key] || "N/A";
//           return value !== "N/A"
//             ? { title: departmentItem?.title, value }
//             : null;
//         })
//         .filter(Boolean),
//     ];
//   }
// };

export const formatTitleAndValueQAQC = (blockData, arrayGetTitle) => {
  if (!blockData || !arrayGetTitle || arrayGetTitle?.length === 0) return [];
  if (Array.isArray(blockData)) {
    return blockData.map((el) => {
      return arrayGetTitle
        .map((titleItem) => {
          const value = el[titleItem?.key] || "N/A";
          console.log(value, "value");
          return value !== "N/A" ? { title: titleItem?.title, value } : null;
        })
        .filter(Boolean); 
    });
  } else {
    return arrayGetTitle
      .map((departmentItem) => {
        const value = blockData?.[departmentItem?.key] || "N/A";
        return value !== "N/A" ? { title: departmentItem?.title, value } : null;
      })
      .filter(Boolean);
  }
};
export const formatTitleAndValue = (blockData, arrayGetTitle) => {
  if (!blockData || !Array.isArray(arrayGetTitle) || arrayGetTitle.length === 0) {
    return [];
  }

  if (Array.isArray(blockData)) {
    return blockData.map((data) => {
      return arrayGetTitle.map((el) => {
        let value = data[el?.key] || "N/A";
        if (data?.annualStoreValue && el?.key === "annualStorUnit") {
          value = `${data?.annualStoreValue} ${data[el?.key] || ""}`;
        }
        if (data?.latitude && el?.key === "longitude") {
          const secondValue = data[el?.key] ? `,${data[el?.key]}` : "";
          value = `${data?.latitude}${secondValue}`;
        }
        if (el?.key === "country") {
          const country = countriesList?.find(
            (country) => country?.code === value
          );
          if (country?.name) {
            value = country.name;
          }
        }
        return value !== "N/A" ? { title: el?.title, value } : null;
      }).filter(Boolean); 
    });
  } else {
    return arrayGetTitle
      .map((departmentItem) => {
        const value = blockData[departmentItem?.key] || "N/A";
        return value !== "N/A"
          ? { title: departmentItem?.title, value }
          : null;
      })
      .filter(Boolean);
  }
};
