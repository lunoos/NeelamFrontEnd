import axios from 'axios';
import { FILTER_LIST_REQUEST, FILTER_LIST_SUCCESS, FILTER_LIST_FAIL } from "../constants/filterConstants"

const filterListProducts = (productId) => async (dispatch) =>{
	try {
		dispatch({ type: FILTER_LIST_REQUEST });
		const  { data } = await  axios.get("https://cors-anywhere.herokuapp.com/https://neelambackend.herokuapp.com/api/filter/" + productId);
		 dispatch( {type:  FILTER_LIST_SUCCESS, payload: data  });
	  
	}
	catch (error) {
		dispatch({type: FILTER_LIST_FAIL, payload:error.message });
	}
}

export {filterListProducts}