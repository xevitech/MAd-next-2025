export interface ProductListing {
  lastPage: number;
  sliderValue: any[];
  Territory: any[];
  countrysData: any[];
  keywordData: any;
  KeyName: any;
  Countries: any[];
  filtersData: any[];
  catalogData: any[];
  rolesData: any[];
  editRoleId: any;
  brandsData: any[];
  categoryData: any[];
  productsList: any[];
  productKeywords: any[];
  relatedLikedProducts: any[];
  mostSearchesProducts: any[];
  bigPostList: any[];
  minPrice: any;
  maxPrice: any;
  memberIds: any[];
  filtersDataIds: any[];
  manufacturerYear: any[];
  priceTypeIds: any[];
  businessIds: any[];
  annualIds: any[];
  conditionIds: any[];
  availabilityIds: any[];
  completeScreenLoader: boolean;
  resetToggle: boolean;
  loader: boolean;
  getLatestPopup: boolean;
  totalProduct: any;
  manufacturersSuppliers: any;
  pageNumber: any;
  localLoader: boolean;
  searchProudct: any;
  categoryIds: any[];
  brandIds: any[];
  singleProductDetail: any[];
  searchCategory: any;
  singleProductId: any;
  emptyData: boolean;
  filterCategory: {
    categories: boolean;
    price_range: boolean;
    brand: boolean;
    business_type: boolean;
    annual_revenue: boolean;
    condition: boolean;
    price_type: boolean;
    product_availability: boolean;
    manufacturer_year: boolean;
    member_type: boolean;
    search_by_country: boolean;
    plan_type: boolean;
  };
  viewType: Number;
}
export interface wishListing {
  wishListed: any;
  loader: boolean;
  wishRemove: any;
  pageLoader: boolean;
}
export interface blogListing {
  blogListed: any[];
  singleBlog: any;
  blogListedTotal: any;
  loader: boolean;
  singleLoader: boolean;
  pageLoader: boolean;
  searchValue: any;
  currentBlog: any;
  recentBlogs: [];
  blogsCategory: [];
}
export interface notificationList {
  notificationlistItem: any[];
  loadData: boolean;
  ids: any;
  showSkeleton: boolean;
  listItem: any[];
  counting: {
    all: any;
    enquiries: any;
    orderInvoices: any;
    product: any;
  };
}
export interface enquiryList {
  enquiry: any;
  loader: boolean;
  pageLoader: boolean;
}
export interface ContactList {
  contacts: any[];
  contactId: any;
  loader: boolean;
  pageLoader: boolean;
}

/*********************************** Mini Site ***************************************** */
export interface miniSite {
  reviewData: any;
  rndDetail: any;
  reviewloader: boolean;
  certificateloading: boolean;
  headerloading: boolean;
  productData: any[];
  contextloading: boolean;
  userinfo: any;
  errormessage: any;
  sortedData: any[];
  certificatesData: any;
  faqData: any;
  headerData: any;
  selctedcategory: any;
  selctedsorting: any;
  factorydetails: any;
  servicelist: any;
  loader: boolean;
  allProducts: any;
  pageNumber: any;
  searchname: any;
  newsdata: any;
  activeData: any;
  categoryList: any;
}

export interface MultiSpecification {
  specificationsList: Array<[]>;
  specEdited: boolean;
  catId: "";
  specList: "";
  suggestedSpecifications: [];
  specsData: "";
  pendingSpecs: "";
  selectedSpecs: "";
  commercialInfoUnits: "";
  specValue: "";
  UpdateLoader: boolean;
  passiveSpecList: [];
  loader: boolean;
  addNewLoader: boolean;
  renameGroupLoader: boolean;
  submitLoader: boolean;
  matrixItems: Array<[]>;
  imageSrc: "";
  checkedSpec: Array<[]>;
  duplicate: boolean;
  updateTermData: any;
  accordinIndex: any;
  totalVariation: number;
  matrixListPage: number;
  levelParentError: boolean;
  parentMulError: boolean;
  matrixTableLoader: boolean;
}

export interface Template {
  id: number;
  type: string;
  name: string;
  thumbnail?: string;
  html: string;
  url?: string; // Make url optional if not all templates will have it
  templateType?: string;
}

export interface TemplateMasonryViewProps {
  templates: any;
  selectTemplate: (id?: number, type?: string) => void;
  setOpen: (open: boolean) => void;
  templatetype?: string;
}

export interface BusinessType {
  toggle?: string;
  name?: string;
}

export interface InventoryDetailProps {
  loader: boolean;
  factorydetails: any;
  fecilityTypeToShow?: string;
}

export interface CustomTabContentProps {
  data: any;
  activeTab: number;
  setMinisiteMenus?: any;
}

/*********************************************************************************************** */

export interface geoLocation {
  defaultCode: any;
  country: any;
  countryCode: any;
  allCities: any;
  allOtherCities: any;
  allMailingCities: any;
  allBillingCities: any;
  allShippingCities: any;
  selectedCity: any;
  mailingCountryCode: any;
  otherCountryCode:any;
  billingCountryCode:any;
  shippingCountryCode:any;
}

export interface subSellerList {
  sellerList: any[];
  rolesData: any[];
  loader: boolean;
  deleteResponse: any;
  bannerImage: any[];
  bannerFiles: any[];
  cycleNavigation: any;
  navButtonVisible: any;
  navButtonInVisible: any;
  indicators: any;
  activateBanner: any;
  swipe: any;
  fullHeightHover: any;
  defaultBanner: any;
  threeDotLoader: any;
  Id: any;
  status: any;
  banner: any;
  bannerPage: any;
  background_color: any;
  banner_list: any;
  page: any;
  bannerData: any;
  addBanner: any;
  bannarImagePreview: any;
  newBannerSlider: boolean;
  activeEditPage: string;
  activeEditPageIndex: number;
  activeEditPageData: any;
  bannerMode: string;
  isBannerPageSelected: boolean;
}

export interface companyProfile {
  companyDetails: any;
  loader: boolean;
  pageLoader: boolean;
  businessType: any;
  businessTabData: any;
  companyfacilities: any;
}
export interface AdsList {
  ads: any[];
  adsId: any;
  products: any[];
  createAdd: any[];
  updateAdd: any[];
  loader: boolean;
  productLoader: boolean;
  createLoader: boolean;
  detailsLoader: boolean;
  AdsDetail: [];
  title_1: any;
}

export interface socialMediaData {
  socialMediaLists: any;
  addAccounts: boolean;
  deleteId: any;
  deleteConfirmation: boolean;
  skeletonLoader: boolean;
  deleted: any;
  prevProfileLink: any;
}

export interface socialMediaData {
  socialMediaLists: any;
  addAccounts: boolean;
  deleteId: any;
  deleteConfirmation: boolean;
  skeletonLoader: boolean;
  deleted: any;
  prevProfileLink: any;
}

export interface UserData {
  user_info: any;
  dashboardSkeleton: any;
  social_type: string;
  socailLoader: boolean;
  loginviaSocial: boolean;
  welcomeModalSocial: boolean;
  userprofileImage: any;
  memberJoined: any;
  openLogoutModal: boolean;
  planBanner: any;
  addListingLoader: any;
  deleteAccount: boolean;
  qty: any;
  completeScreenLoader: boolean;
  userName: any;
  showVerifyMobileModal: any;
  showEditMobileModal: any;
  showConfirmEmailModal: boolean;
  showEditEmailModal: boolean;
  verifieduser: any;
  email_id: any;
  mobileverified: any;
  userDetails: any;
  userToken: any;
  userEmail: any;
  default_role: any;
  id: any;
  memberid: any;
  emailVerified: boolean;
  pendingFields: any;
  role: any;
  showRegisterationModal: boolean;
  profileCompletionPercent: boolean;
  profilePercentage: any;
  loader: any;
  ipAddress: any;
  subSellerList: any;
  emailId: any;
  followers: any;
  unfollowId: any;
  userType: any;
  trackedData: any;
  parent_user: any;
  timeofPop: any;
  userAvailibility: any;
  profileSocialAccount: any;
  profileInfos: {
    social_accounts: any;
    plan_status: any;
    basicDetails: {
      fullName: any;
      accountType: any;
      countryId: any;
      city: any;
      postalCode: any;
      gender: any;
      state: any;
      address: any;
      lats: any;
      longs: any;
      avatar_original: any;
      street_address: any;
      email_id: any;
    };
    jobDetails: {
      department: any;
      email_id: any;
      designation: any;
      mainLanguages: any[];
      otherLanguages: any[];
      time_zone: any;
      procurement_priorities: any;
      purchasing_authority: any;
      technical_expertise: any;
      years_of_experience: any;
      job_function: any;
      job_role: any;
      industry_knowledge: any;
      education: any;
      location: any;
      language: any;
      industry_expertise: any;
      target_customer: any;
      company_type: any;
      sales_skills: any;
      certification: any;
      total_quotation: any;
      total_orders: any;
      avg_time_spend_lead: any;
      wishlist_count: any;
      total_contacts: any;
      total_leads: any;
      lead_oppportunity_conversion_rate: any;
      avg_page_view_per_lead: any;
      weekly_lead_oppportunity_conversion_rate: any;
      weekly_avg_time_spend_lead: any;
      weekly_total_leads: any;
      weekly_total_contacts: any;
      weekly_avg_page_view_per_lead: any;
      weekly_total_quotation: any;
      weekly_wishlist_count: any;
      lead_to_customer_conversion_rate: any;
      lead_to_opportunity_deal_conversion_rate: any;
      total_products: any;
      total_brands: any;
      total_categories: any;
      total_rfq: any;
    };
  };
  weChatId: any;
  skypeId: any;
  whatsAppId: any;
  mobileNumber: any;
  mobileCode: any;
  mobile_country_code: any;
}
export interface productDetails {
  detail: any;
  country: any[];
  unit: any[];
  productConfig: any[];
  selectedProductOptions: any[];
  openQuoteModal: boolean;
  toggleConfigure: boolean;
  toggleSidebar: boolean;
}
export interface LeadsData {
  rowListing: any;
  sideBarListing: any;
  previewOpenModal: any;
  showImage: any;
  leadListingSaveResult: any;
  copyFormData: any;
  editProperty: any;
  editItems: any;
  editFieldsProperty: any;
  multiSelectPopUp: boolean;
  removedListItems: any;
  GridLayout: number;
  loader: boolean;
  Saveloader: boolean;
  checkMenu: any;
  editColumn: any;
  skeleton: any;
}

export interface Tag {
  id: number | string;
  label: string;
}

export interface chatMsgData {
  id?: number;
  room_id: string | number;
  sender_id: string | number;
  message: string;
  user_name?: string;
  created_at: string;
  read: string;
  replied_parent_id?: number;
  replied_message?: {
    message?: string;
    user_name?: string;
    sender_id?: number | string;
  };
  message_type: string;
}

export interface editProductInterface {
  newAttributeValue: string;
  productDetail: any[];
  percentage: any[];
  territoryData: any[];
  brandsData: any[];
  commercialInfoUnits: any[];
  showByOrderAddBrand: boolean;
  selectedCategories: any[];
  commercialInfoCurrencies: any[];
  showInStockAddBrand: boolean;
  commercialInfoPaymentTerms: any[];
  loader: boolean;
  addSpecificationLoader: boolean;
  productAvailability: string;
  pricingType: string;
  removeLevelLoader: number;
  removeLevelLoaderGroup: number;
  renameGroupLoader: number;
  finalGroupCalculation: boolean;
  localLoading: boolean;
  threedotLoading: boolean;
  productDetails: any;
  suggestedSpecifications: any;
  categoriesState: any[];
  cloneCategoryList: any[];
  cloneCategoriesState: any[];
  isCategoryClicked: boolean;
  responseType: string;
  open: boolean;
  responseMessage: string;
  pendingAllCategory: any[];
  pendingCategory: any[];
  productType: any;
  productCondition: string;
  informationType: string;
  attributesData: any;
  quantityBasedUnit: string;
  fixedPriceBasedUnit: string;
  inStockDispatchPeriod: string;
  uploadedProductImage: any[];
  uploadedparams: boolean;
  deletedPhotoId: any[];
  autoCompleteValue: any[];
  modifiedCountriesList: any;
  passiveSpecification: any;
  showUnitsSelection: boolean;
  specValue: string;
  passiveSpecList: any[];
  specificationsList: any[];
  showAuxComp: boolean;
  termImagesArray: any[];
  termPreviewImagesArray: any[];
  matrixItems: any[];
  specsData: any;
  pendingSpecs: any[];
  selectedSpecs: any[];
  completeScreenLoader: boolean;
  customSpecReduxState:any[];
}

interface Option {
  title: string;
  [key: string]: any;
}

export interface CustomAutoCompleteProps {
  id?: string;
  options: Option[];
  labelForTextField?: string;
  handleOptionChange: (
    event: React.SyntheticEvent,
    value: Option | string
  ) => void;
  groupBy?: (option: Option) => string;
  value: Option | string;
  defaultValue?: Option | string;
  typeOfValueToGet: string;
  error?: boolean;
  helperText?: string;
  placeholder: string;
  size?: any;
}

/********************Chat window*************************************************************************** */
export interface FetchChatHistoryParams {
  userId: string;
  isGroup?: any;
  roomID?: string;
  params?: string;
  url?: string;
  pageNumberParam?: string;
}
export interface AttachedMessage {
  id: number;
  message: string;
}

export interface EmptyChatUserListsProps {
  fetchUserList?: any; // You can replace `any` with a more specific type if available
  title?: string;
  imageURL?: string;
  imageWidth?: string;
}

export interface MessageReadStatusProps {
  messageStatus?: "read" | "delivered" | "unread"; // Adjust based on your actual statuses
  indexOfLastMessageRead: number;
  index: number;
}

export interface ChatMessageProps {
  message: {
    [key: string]: any;
    sender_id: string;
    created_at: string;
    status: "read" | "delivered" | "unread";
    user_name?: string;
  };
  currentLoggedUserId: string;
  indexOfLastMessageRead: number;
  index: number;
  activeUser?: {
    is_group: number;
    [key: string]: any;
  };
}

interface User {
  name?: string;
  avatar_original?: string;
}

export interface UserBadgeProps {
  user?: User;
  status?: string;
  showTooltip?: boolean;
  showAvatar?: boolean;
  image?: string;
}

export interface ListItemProps {
  item: {
    id: number;
    user_name?: string;
    name?: string;
    created_at: string;
    message: string;
    is_group?: any;
    online?: any;
    avatar_original?: any;
    [key: string]: any;
  };
  onClick: () => void;
}

export interface TransferChatProps {
  handleClose: () => void;
  additionalSuggestions: { componentType: string };
}
export interface SubAccountProps {
  id: number;
  name: string;
  job_role: string;
  file_name: string;
  is_admin?: boolean;
}

export interface quickSignupProps {
  handleClose: () => void;
  handleAfterSignup: () => void;
  isSignInPopupOpen: boolean;
}

export interface AlertDialogProps {
  isOpen: boolean;
  handleCloseBlockDailog: (open: boolean) => void;
  handleUnblock: () => void; // Optional if you are using it
  title?: string;
  description?: string;
  type?: "block" | string; // You can define specific types for type if needed
  children?: React.ReactNode;
}

export interface ChatMessageData {
  room_id: string;
  user_name: string;
  sender_id: number;
  message: string;
  id: string;
  replied_parent_id?: string;
  replied_message?: string;
  created_at: string;
  read: string;
  message_type: string;
}

/**********************************************Heat map tracking********************************************************** */

export interface HeatmapSettingsProps {
  enableDebug?: boolean;
  url?: string;
  baseUrl?: string;
  hashIdentification?: string;
  trackClicks?: boolean;
  clickThreshold?: number;
  movementThreshold?: number;
  movementDebounce?: number;
  trackMovements?: boolean;
  clickEndpoint?: string;
  scrollEndpoint?: string;
}

/******************************************CRM*****************************************************/
export interface CallbackFunctions {
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
}

export interface columnSettingsCrmTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
