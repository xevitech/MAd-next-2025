import { getParsedValue } from "@/components/Helper";
import {
  ASSETS_URL,
  BASE_URL,
  BASE_URL_CRM,
  DOMAIN_URL,
} from "../staticValues";
import { HeatmapSettingsProps } from "@/hooks/Interface";

export const getBussinessType = (businessTypes = []) => {
  if (businessTypes?.length === 0) return "";
  const foundBusiness = businessTypes?.find(
    (bussiness) => bussiness?.toggle === "1"
  );
  const bussinessType = foundBusiness?.name || "bussiness type not avaiable";
  return bussinessType;
};

export const getFactoryPhotos = (
  companyFecilityValues: object = {},
  bussinessType: string = ""
) => {
  if (!bussinessType || !companyFecilityValues) return [];
  const changedString = bussinessType
    .toLowerCase()
    .slice(0, -1)
    .replaceAll(" ", "_");
  const bussinessTypeDatas = getParsedValue(
    companyFecilityValues[changedString]
  );
  if (
    bussinessTypeDatas &&
    Array.isArray(bussinessTypeDatas.factory) &&
    bussinessTypeDatas.factory.length > 0
  ) {
    const factoryData = bussinessTypeDatas?.factory[0]?.factoryData;
    const showFactoryData = bussinessTypeDatas?.factory[0]?.selected_value;
    if (showFactoryData == "no") return;
    const factoryImages = factoryData.flatMap((item) => {
      if (Array.isArray(item.factoryImage)) {
        return item.factoryImage;
      }
      return [];
    });
    return factoryImages;
  } else {
    return [];
  }
};

export const getHeatMapSettings = (props: HeatmapSettingsProps = {}) => {
  const {
    enableDebug = false,
    url = BASE_URL,
    baseUrl = null,
    hashIdentification = "",
    trackClicks = true,
    clickThreshold = 1,
    movementThreshold = 0,
    movementDebounce = 20,
    trackMovements = true,
    clickEndpoint = `${BASE_URL_CRM}create-click-tracking`,
    scrollEndpoint = `${BASE_URL_CRM}create-scroll-tracking`,
  } = props;
  let finalBaseUrl = DOMAIN_URL;

  if (typeof window !== "undefined") {
    const isLocalhost = window?.location?.hostname === "localhost";

    finalBaseUrl = isLocalhost ? window?.location?.origin : ASSETS_URL;
  }

  return {
    debug: enableDebug,
    url: url,
    baseUrl: finalBaseUrl,
    hash: hashIdentification,
    clicks: trackClicks,
    clicksThreshold: clickThreshold,
    movementsThreshold: movementThreshold,
    movementDebounce: movementDebounce,
    movement: trackMovements,
    clickEndpoint: clickEndpoint,
    scrollEndpoint: scrollEndpoint,
  };
};
