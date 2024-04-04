import Axios from "axios";
import Cookie from  "js-cookie";
import { EMPTY_CART,CART_SAVE_PAYMENT, CART_SAVE_SHIPPING, CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants"

const baseURL = process.env.REACT_APP_API_URL;
const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
  	const { data } = await Axios.get(`${baseURL}/neelam/product?id=` + productId);
  	dispatch({
  		type: CART_ADD_ITEM, payload:{
  			product: data._id,
  			name: data.name,
  			image: data.image,
  			price: data.price,
  			countInStock: data.countInStock,
  			qty
  		}
  	});
  	const { cart: { cartItems } } = getState();
  	Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {

  }
}
const removeFromCart = (productId) => (dispatch, getState) => {
	dispatch({ type: CART_REMOVE_ITEM, payload:productId});

	const { cart: { cartItems } } = getState();
  	Cookie.set("cartItems", JSON.stringify(cartItems));
}

const emptyCart = () => (dispatch, getState) => {
  const { cart: { cartItems } } = getState();
    Cookie.remove("cartItems");
    const data = [];
    dispatch({ type: EMPTY_CART, payload: data });
}

const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
}
const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
}

export { addToCart, removeFromCart, saveShipping ,savePayment, emptyCart} 