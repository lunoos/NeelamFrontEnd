 import { PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_SAVE_REQUEST , PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_LIST_REQUEST , PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST , PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL} from "../constants/productConstants.js";
import axios from 'axios';
import Axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;
const listProducts = () => async (dispatch) =>{
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });
		const  { data } = await  axios.get(`${baseURL}/neelam/products`);
		  
		dispatch( {type:  PRODUCT_LIST_SUCCESS, payload: data  });
	  
	}
	catch (error) {
		dispatch({type: PRODUCT_LIST_FAIL, payload:error.message });
	}
}

const saveProduct = (product) => async (dispatch, getState) => {
	try{
		dispatch({type: PRODUCT_SAVE_REQUEST, payload: product});
		const {userSignin: { userInfo } }= getState();
		if(!product._id){
			const {data} = await Axios.post(`${baseURL}/neelam/addProduct`, product, {
			headers:{
			Authorization: `Bearer ${userInfo.token}`
		}, });
		dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data});	
		}else{
			const {data} = await axios.post(`${baseURL}/neelam/updateProductById?id=` + product._id, product, {
			headers:{
			Authorization: `Bearer ${userInfo.token}`
			
		},});
			dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data});
		}
		
	}catch(error){
		dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
	}
}

const detailsProduct = (productId) => async (dispatch) => {
	console.log("detailsProduct "+productId);
	try{
		dispatch({type:PRODUCT_DETAILS_REQUEST, payload: productId });
		const  { data } = await  axios.get(`${baseURL}/neelam/product?id=` + productId);
		dispatch({ type:PRODUCT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: PRODUCT_DETAILS_FAIL, payload:error.message });

	}
}

const deleteProduct = (productId) => async (dispatch, getState) => {
	try{

		const {userSignin: { userInfo }} = getState();
		dispatch({type:PRODUCT_DELETE_REQUEST, payload: productId });
		const  { data } = await  axios.delete(`${baseURL}/neelam/deleteProduct?id=` + productId, {
		headers:{
				Authorization: `Bearer ${userInfo.token}`
			},
		});
		dispatch({ type:PRODUCT_DELETE_SUCCESS, payload: data, success: true });
	} catch (error) {
		dispatch({ type: PRODUCT_DELETE_FAIL, payload:error.message });

	}
}


export { listProducts, detailsProduct , saveProduct, deleteProduct}