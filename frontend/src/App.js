import React,{useEffect} from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/productScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import CategoriesDrugScreen from "./screens/CategoriesDrugScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import AddProduct from "./screens/AddProduct";
import AddImport from "./screens/AddImport";
import EditImport from "./screens/EditImport";
import AddExport from "./screens/AddExport";
import EditExport from "./screens/EditExport";
import Login from "./screens/LoginScreen";
import UsersScreen from "./screens/UsersScreen";
import CustomersScreen from "./screens/CustomersScreen";
import CustomersDetailScreen from "./screens/CustomersDetailScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import CategoriesDetail from "./screens/CategoriesDetail";
import CategoriesDrugDetail from "./screens/CategoriesDrugDetail";
import ProductExcelCSV from "./screens/ProductExcelCSV";
import DrugStoreExcelCSV from "./screens/DrugStoreExcelCSV";
import {useDispatch,useSelector} from "react-redux";
import {listProduct} from "./Redux/Actions/ProductActions";
import {listOrder} from "./Redux/Actions/OrderActions";
import ProviderScreen from './screens/ProviderScreen';
import ImportStockScreen from "./screens/ImportStockScreen"
import ExportStockScreen from "./screens/ExportStockScreen"
import InventoryScreen from './screens/InventoryScreen';
import DrugStoreScreen from './screens/DrugStoreScreen';
import PromotionScreen from './screens/PromotionScreen';
import DrugStoreEditScreen from "./screens/DrugStoreEditScreen";
import TagInventory from './screens/TagInventory';
import InventoryCheckScreen from "./screens/InventoryCheckScreen";
import AddInventoryCheckScreen from "./screens/AddInventoryCheckScreen";
import EditInventoryCheckScreen from "./screens/EditInventoryCheckScreen";
import ContentEditScreen from "./screens/ContentEditScreen";
import ReviewScreen from "./screens/ReviewScreen"
import ReqInventoryScreen from "./screens/ReqInventoryScreen";
import AddRequestInventory from "./screens/AddReqInventory";
import EditRequestInventory from "./screens/EditReqInventory";
function App() {
  const data=useSelector((state) => state.theme)
  if(data.theme==="dark") {
    document.body.classList.remove("bg-light")
    document.body.classList.add("bg-dark")
  }
  else {
    document.body.classList.remove("bg-dark")
    document.body.classList.add("bg-light")
  }
  const dispatch=useDispatch();
  const userLogin=useSelector(state => state.userLogin)
  const {userInfo}=userLogin;
  useEffect(() => {
    if(userInfo) {
      dispatch(listProduct());
      dispatch(listOrder())
    }
  },[dispatch,userInfo])

TODO: 

  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={HomeScreen} exact />

          <PrivateRouter path="/products" component={ProductScreen} exact />
          <PrivateRouter path="/product/add" component={AddProduct} />
          <PrivateRouter path="/product/excel" component={ProductExcelCSV} exact />
          <PrivateRouter path="/product/:id" component={ProductEditScreen} exact />

          <PrivateRouter path="/categories" component={CategoriesScreen} />
          <PrivateRouter path="/category/:id" component={CategoriesDetail} />

          <PrivateRouter path="/categories-drug" component={CategoriesDrugScreen} />
          <PrivateRouter path="/category-drug/:id" component={CategoriesDrugDetail} />

          <PrivateRouter path="/orders" component={OrderScreen} />
          <PrivateRouter path="/order/:id" component={OrderDetailScreen} />

          <PrivateRouter path="/import-stock" component={ImportStockScreen} exact />
          <PrivateRouter path="/import-stock/add" component={AddImport} />
          <PrivateRouter path="/import-stock/:id" component={EditImport} />

          <PrivateRouter path="/export-stock" component={ExportStockScreen} exact />
          <PrivateRouter path="/export-stock/add" component={AddExport} />
          <PrivateRouter path="/export-stock/:id" component={EditExport} />

          <PrivateRouter path="/inventory-check" component={InventoryCheckScreen} exact />
          <PrivateRouter path="/inventory-check/add" component={AddInventoryCheckScreen} />
          <PrivateRouter path="/inventory-check/:id" component={EditInventoryCheckScreen} />

          <PrivateRouter path="/providers" component={ProviderScreen} exact />

          <PrivateRouter path="/inventories" component={InventoryScreen} exact />
          <PrivateRouter path="/tag-inventory" component={TagInventory} exact />

          <PrivateRouter path="/req-inventory" component={ReqInventoryScreen} exact />
          <PrivateRouter path="/req-inventory/add" component={AddRequestInventory} />
          <PrivateRouter path="/req-inventory/:id" component={EditRequestInventory} />

          <PrivateRouter path="/drugstore" component={DrugStoreScreen} exact />
          <PrivateRouter path="/drugstore/excel" component={DrugStoreExcelCSV} exact />
          <PrivateRouter path="/review" component={ReviewScreen} exact />
          <PrivateRouter path="/drugstore/:id" component={DrugStoreEditScreen} exact />
          <PrivateRouter path="/content" component={ContentEditScreen} exact />
          <PrivateRouter path="/promotion" component={PromotionScreen} exact />
          <PrivateRouter path="/users" component={UsersScreen} />
          <PrivateRouter path="/customers" component={CustomersScreen} />
          <PrivateRouter path="/customer/:id" component={CustomersDetailScreen} />

          <Route path="/login" component={Login} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}//"proxy": "http://dev2.sunny.net.vn:24253",

export default App;