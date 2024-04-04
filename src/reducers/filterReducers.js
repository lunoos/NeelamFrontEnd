import { FILTER_LIST_REQUEST, FILTER_LIST_SUCCESS, FILTER_LIST_FAIL } from "../constants/filterConstants";


function filterListReducer(state ={ products: [] }, action) {

   switch(action.type){
   	case FILTER_LIST_REQUEST: 
   		return { loading: true , products: []};
   	case FILTER_LIST_SUCCESS:
   		return { loading: false, products: action.payload };
   	case FILTER_LIST_FAIL:
   		return { loading: false, error: action.payload }
   	default:
   		return state;
  }
}

export { filterListReducer };