import axios from "axios";
import { ORDER_DELIVERED_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS ,
    ORDER_SEARCH_LIST_FAIL, ORDER_SEARCH_LIST_REQUEST, ORDER_SEARCH_LIST_SUCCESS,
    ORDER_SEARCH_D2D_LIST_FAIL, ORDER_SEARCH_D2D_LIST_REQUEST, ORDER_SEARCH_D2D_LIST_SUCCESS,
    ORDER_CANCELED_FAIL, ORDER_CANCELED_SUCCESS, ORDER_CANCELED_REQUEST,
    ORDER_RECEIVED_FAIL, ORDER_RECEIVED_SUCCESS, ORDER_RECEIVED_REQUEST,
    ORDER_CONFORM_FAIL, ORDER_CONFORM_SUCCESS, ORDER_CONFORM_REQUEST,
    ORDER_COMPLETED_FAIL, ORDER_COMPLETED_SUCCESS, ORDER_COMPLETED_REQUEST,
} from "../Constants/OrderConstants";
import { logout } from "./UserActions";
import { ORDER_DELIVERED_REQUEST, ORDER_DELIVERED_FAIL } from './../Constants/OrderConstants';

//ORDER LIST
export const listOrder = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST });
        // userInfo -> userLogin -> getState(){globalState}
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/orders/all`, config);
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: message,
        });
    }
};


//ORDER LIST
export const searchListOrder = (from=' ', to = ' ') => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_SEARCH_LIST_REQUEST });
        // userInfo -> userLogin -> getState(){globalState}
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/orders/all-check?from=${from}&to=${to}`,config);
        dispatch({ type: ORDER_SEARCH_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_SEARCH_LIST_FAIL,
            payload: message,
        });
    }
};

//ORDER LIST
export const searchD2DListOrder = (keyword='',from=' ', to = ' ') => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_SEARCH_D2D_LIST_REQUEST });
        // userInfo -> userLogin -> getState(){globalState}
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/orders/all-search?keyword=${keyword}&from=${from}&to=${to}`,config);
        dispatch({ type: ORDER_SEARCH_D2D_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_SEARCH_D2D_LIST_FAIL,
            payload: message,
        });
    }
};


//ORDER DETAIL
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });
        // userInfo -> userLogin -> getState(){globalState}
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/orders/${id}`);
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: message,
        });
    }
};

//ORDER CONFORM
export const getOrderConform = (orderItems) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CONFORM_REQUEST });
        // userInfo -> userLogin -> getState(){globalState}
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        // api not transmiss any params because it just change state of deliverd 
        const { data } = await axios.get(`/api/orders/${orderItems._id}/conform`, config);
        dispatch({ type: ORDER_CONFORM_SUCCESS, payload: data });

    
        
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_CONFORM_FAIL,
            payload: message,
        });
    }
};


//ORDER DELIVERED
export const getOrderDelivered = (orderItems) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DELIVERED_REQUEST });
        // userInfo -> userLogin -> getState(){globalState}
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        //kt stock
        let checkStock=true;

        const check= async()=>{
            orderItems.orderItems.map( async  (item)=>{
                const {data}=await axios.get(`/api/drugstore/${item.drugstoreId}/check-stock?num=${item.qty}`, config)
                
                 if(!data.result) checkStock=false;
             })
        }
        const update=async()=>{
            if(checkStock){                
                // api not transmiss any params because it just change state of deliverd 
                const { data } = await axios.put(`/api/orders/${orderItems._id}/delivered`, {}, config);
                dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data });

                ///////////////////////////
                let newOrderItems=[]
                let OrderItem={}
                orderItems.orderItems.map( async  (item)=>{
                    const {data}=await axios.get(`/api/drugstore/${item.drugstoreId}/update-stock?num=${item.qty}`, config);//lấy kq trả về
                    //console.log({data});
                    OrderItem={...item,detailStock:data.orderStock}
                    newOrderItems.push(OrderItem)
                })
                console.log({orderItems:orderItems.orderItems});
                console.log({newOrderItems});
                console.log(orderItems._id);

                setTimeout(async()=>{
                    await axios.put(`/api/orders/${orderItems._id}/update-order-item`,newOrderItems, config);
                },1000)
                ////////////////////////////
               
            }else{
                dispatch({
                    type: ORDER_DELIVERED_FAIL,
                    payload: "Số lượng không thỏa",
                });
            }
        }

        await check()
        await update()
        //await upadteCoin()
        const { data } = await axios.get(`/api/orders/${orderItems._id}/deliverd`, config);
        dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data });

    
        
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_DELIVERED_FAIL,
            payload: message,
        });
    }
};





//ORDER CANCELED for Admin
export const getOrderCanceled = (orderItems) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CANCELED_REQUEST });
        // userInfo -> userLogin -> getState(){globalState}
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        orderItems.orderItems.map(async(item)=>{
            await axios.get(`/api/drugstore/${item.drugstoreId}/update-stock?num=${(item.qty)*(-1)}`, config);
        })
        
        // api not transmiss any params because it just change state of deliverd 
        const { data } = await axios.get(`/api/orders/${orderItems._id}/AdminCanceled`, config);
        dispatch({ type: ORDER_CANCELED_SUCCESS, payload: data });

    
        
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_CANCELED_FAIL,
            payload: message,
        });
    }
};
//ORDER COMPLETE  for Admin
export const getOrderCompleted  = (orderItems) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_COMPLETED_REQUEST });
        // userInfo -> userLogin -> getState(){globalState}
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        // api not transmiss any params because it just change state of deliverd 
        const { data } = await axios.get(`/api/orders/${orderItems._id}/complete`, config);
        //cong diem khách hàng
        orderItems.orderItems.map(async(item)=>{
            await axios.get(`/api/drugstore/${item.drugstoreId}/inc-buy-num`, config);
        })
        dispatch({ type: ORDER_COMPLETED_SUCCESS, payload: data });

    
        
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_COMPLETED_FAIL,
            payload: message,
        });
    }
};

//ORDER RECEIVED  for User
export const getOrderReceived  = (orderItems) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_RECEIVED_REQUEST });
        // userInfo -> userLogin -> getState(){globalState}
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        // api not transmiss any params because it just change state of deliverd 
        const { data } = await axios.get(`/api/orders/${orderItems._id}/received`, config);
        dispatch({ type: ORDER_RECEIVED_SUCCESS, payload: data });

    
        
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_RECEIVED_FAIL,
            payload: message,
        });
    }
};//getOrderConform

