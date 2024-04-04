import { combineReducers,applyMiddleware, compose}  from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { productListReducer, productDetailsReducer, productSaveReducer , productDeleteReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers';
import { filterListReducer } from './reducers/filterReducers';
import Cookie from 'js-cookie';
import { userSigninReducer, userRegisterReducer } from './reducers/userReducers'

const cartItems = Cookie.get("cartItems") || [];
const  userInfo = Cookie.get("userInfo") || null;
//const userInfo = null;

const initialState = { cart: { cartItems, shipping: {}, payment: {} } , userSignin: { userInfo }};
const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userSignin: userSigninReducer,
	userRegister: userRegisterReducer,
	productSave: productSaveReducer,
	productDelete: productDeleteReducer,
	filterList: filterListReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = configureStore({reducer: reducer,initialState:initialState, enhancer:composeEnhancer(applyMiddleware(thunk))});
export default store;