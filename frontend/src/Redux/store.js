import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userListReducer,
  userCreateReducer,
  userSingleReducer,
  userUpdateReducer,
  userDeleteReducer,
} from "./Reducers/UserReducers";
import {
  customerLoginReducer,
  customerListReducer,
  customerCreateReducer,
  customerSingleReducer,
  customerUpdateReducer,
  customerChangeProfileReducer,
  customerUpdateProfileReducer,
  customerDeleteReducer,
} from "./Reducers/CustomerReducers";
import {
  productAllReducer,
  productCategoriesDrugReducer,
  productCategoriesReducer,
  productCreateReducer,
  productDeleteReducer,
  productImportReducer,
  productListReducer,
  productListWithQtyReducer,
  productSingleReducer,
  productUpdateReducer,
} from "./Reducers/ProductReducers";
import {
  drugstoreAllReducer,
  drugstoreCategoriesDrugReducer,
  drugstoreCategoriesReducer,
  drugstoreImportReducer,
  drugstoreSingleReducer,
  drugstoreUpdateReducer,
  drugstoreListReducer,
  drugstoreUpdateReviewReducer,
} from "./Reducers/DrugStoreReducers";
import {
  orderDeliveredReducer,
  orderDetailReducer,
  orderSearchListReducer,
  orderSearchD2DListReducer,
  orderListReducer,
  orderCanceledReducer,
  orderConformReducer,
  orderReceivedReducer,
  orderCompletedReducer

} from "./Reducers/OrderReducers";
import {
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryListReducer,
  categoryUpdateReducer,
} from "./Reducers/CategoryReducer";
import {
  categoryDrugCreateReducer,
  categoryDrugDeleteReducer,
  categoryDrugListReducer,
  categoryDrugUpdateReducer,
} from "./Reducers/CategoryDrugReducer";
import { themeReducer } from "./Reducers/ThemeReducer";
import {
  ProviderCreateReducer,
  ProviderDeleteReducer,
  ProviderListReducer,
  ProviderSingleReducer,
  ProviderUpdateReducer,
} from "./Reducers/ProviderReducer";
import {
  importStockCancelReducer,
  importStockCreateReducer,
  importStockDetailReducer,
  importStockListReducer,
  importStockStatusReducer,
  importStockUpdateReducer,
} from "./Reducers/ImportStockReducer";
import {
  exportStockDetailReducer,
  exportStockListReducer,
  exportStockCreateReducer,
  exportStockStatusReducer,
  exportStockUpdateReducer,
  exportStockCancelReducer,
} from "./Reducers/ExportStockReducer";
import {
  UnitCreateReducer,
  UnitDeleteReducer,
  UnitListReducer,
} from "./Reducers/UnitReducer";
import {
  ManufacturerCreateReducer,
  ManufacturerDeleteReducer,
  ManufacturerListReducer,
} from "./Reducers/ManufacturerReducer";
import {
  CountryCreateReducer,
  CountryDeleteReducer,
  CountryListReducer,
} from "./Reducers/CountryOfOriginReducer";
import {
  APICreateReducer,
  APIDeleteReducer,
  APIListReducer,
} from "./Reducers/ActivePharmaReducer";
import {
  inventoryListReducer,
  inventoryTagReducer,
  inventoryToCheckListReducer,
} from "./Reducers/InventoryReducer";
import {
  inventoryCheckCancelReducer,
  inventoryCheckCreateReducer,
  inventoryCheckDetailReducer,
  inventoryCheckListItemReducer,
  inventoryCheckListReducer,
  inventoryCheckStatusReducer,
  inventoryCheckUpdateReducer,
} from "./Reducers/InventoryCheckReducer";
import {PageCreateReducer, PageDeleteReducer, PageListReducer} from './Reducers/PageReducer';
import {ContactCreateReducer, ContactDeleteReducer, ContactListReducer} from './Reducers/ContactReducer';
import {contentSingleReducer,contentUpdateReducer} from './Reducers/ContentReducer';
import {promotionCreateReducer,promotionUpdateReducer,promotionDeleteReducer,promotionListReducer,promotionProductListReducer} from "./Reducers/PromotionReducer"
import { reqInventoryCancelReducer, reqInventoryCreateReducer, reqInventoryDetailReducer, reqInventoryListReducer, reqInventoryStatusReducer, reqInventoryUpdateReducer } from "./Reducers/RequestInventoryReducer";
import { NotificationListReducer, NotificationSetOHReducer, NotificationSingleReducer, NotificationUpdateReducer } from "./Reducers/NotificationReducer";
const reducer = combineReducers({
  theme: themeReducer,

  userLogin: userLoginReducer,
  userCreate: userCreateReducer,
  userList: userListReducer,
  userSingle: userSingleReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,

  customerLogin: customerLoginReducer,
  customerCreate: customerCreateReducer,
  customerList: customerListReducer,
  customerSingle: customerSingleReducer,
  customerUpdate: customerUpdateReducer,
  customerChangeProfile:customerChangeProfileReducer,
  customerUpdateProfile:customerUpdateProfileReducer,
  customerDelete:customerDeleteReducer,

  productList: productListReducer,
  productListWithQty: productListWithQtyReducer,
  productAll: productAllReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productSingle: productSingleReducer,
  productCategories: productCategoriesReducer,
  productCategoriesDrug: productCategoriesDrugReducer,
  productUpdate: productUpdateReducer,
  productImport: productImportReducer,

  drugstoreList: drugstoreListReducer,
  drugstoreAll: drugstoreAllReducer,
  drugstoreSingle: drugstoreSingleReducer,
  drugstoreCategories: drugstoreCategoriesReducer,
  drugstoreCategoriesDrug: drugstoreCategoriesDrugReducer,
  drugstoreUpdate: drugstoreUpdateReducer,
  drugstoreImport: drugstoreImportReducer,
  drugstoreUpdateReview:  drugstoreUpdateReviewReducer,

  orderList: orderListReducer,
  orderSearchList:orderSearchListReducer,
  orderSearchD2DList:orderSearchD2DListReducer,
  orderDetail: orderDetailReducer,
  orderDelivered: orderDeliveredReducer,
  orderCanceled:orderCanceledReducer,
  orderConform :orderConformReducer,
  orderReceived:orderReceivedReducer,
  orderCompleted:orderCompletedReducer,

  categoryList: categoryListReducer,
  categoryCreate: categoryCreateReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryDelete: categoryDeleteReducer,

  categoryDrugList: categoryDrugListReducer,
  categoryDrugCreate: categoryDrugCreateReducer,
  categoryDrugUpdate: categoryDrugUpdateReducer,
  categoryDrugDelete: categoryDrugDeleteReducer,

  providerList: ProviderListReducer,
  providerSingle: ProviderSingleReducer,
  providerCreate: ProviderCreateReducer,
  providerUpdate: ProviderUpdateReducer,
  providerDelete: ProviderDeleteReducer,

  importStockList: importStockListReducer,
  importStockDetail: importStockDetailReducer,
  importStockCreate: importStockCreateReducer,
  importStockStatus: importStockStatusReducer,
  importStockCancel: importStockCancelReducer,
  importStockUpdate: importStockUpdateReducer,

  exportStockList: exportStockListReducer,
  exportStockDetail: exportStockDetailReducer,
  exportStockCreate: exportStockCreateReducer,
  exportStockStatus: exportStockStatusReducer,
  exportStockCancel: exportStockCancelReducer,
  exportStockUpdate: exportStockUpdateReducer,

  unitList: UnitListReducer,
  unitCreate: UnitCreateReducer,
  unitDelete: UnitDeleteReducer,

  manufacturerList: ManufacturerListReducer,
  manufacturerCreate: ManufacturerCreateReducer,
  manufacturerDelete: ManufacturerDeleteReducer,

  countryList: CountryListReducer,
  countryCreate: CountryCreateReducer,
  countryDelete: CountryDeleteReducer,

  APIList: APIListReducer,
  APICreate: APICreateReducer,
  APIDelete: APIDeleteReducer,

  inventoryList: inventoryListReducer,
  inventoryTag: inventoryTagReducer,

  inventoryCheckCreate: inventoryCheckCreateReducer,
  inventoryCheckList: inventoryCheckListReducer,
  inventoryCheckDetails: inventoryCheckDetailReducer,
  inventoryCheckUpdate: inventoryCheckUpdateReducer,

  inventoryToCheckList: inventoryToCheckListReducer,
  inventoryCheckListItem: inventoryCheckListItemReducer,
  inventoryCheckStatus: inventoryCheckStatusReducer,
  inventoryCheckCancel: inventoryCheckCancelReducer,

  reqInventoryList: reqInventoryListReducer,
  reqInventoryDetail: reqInventoryDetailReducer,
  reqInventoryCreate: reqInventoryCreateReducer,
  reqInventoryStatus: reqInventoryStatusReducer,
  reqInventoryCancel: reqInventoryCancelReducer,
  reqInventoryUpdate: reqInventoryUpdateReducer,

  pageList: PageListReducer,
  pageCreate: PageCreateReducer,
  pageDelete: PageDeleteReducer,

  contactList: ContactListReducer,
  contactCreate: ContactCreateReducer,
  contactDelete: ContactDeleteReducer,

  contentSingle: contentSingleReducer,
  contentUpdate: contentUpdateReducer,

  promotionList:promotionListReducer,
  promotionCreate:promotionCreateReducer,
  promotionUpdate:promotionUpdateReducer,
  promotionDelete:promotionDeleteReducer,
  promotionProductList:promotionProductListReducer,

  notificationList: NotificationListReducer,
  notificationSingle: NotificationSingleReducer,
  notificationUpdate: NotificationUpdateReducer,
  notificationOH: NotificationSetOHReducer
});

const initialState = {
  userLogin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
