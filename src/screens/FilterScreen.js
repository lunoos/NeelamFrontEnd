import React, { getState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { filterListProducts } from '../actions/filterActions';


function FilterScreen(props) {
  const filterList = useSelector(state => state.filterList);
  const { products, loading, error } = filterList;
  const dispatch = useDispatch();

  let Id = props.match.params.id;
  
  useEffect(() =>{
    dispatch(filterListProducts(Id));
    return () => {
     // 
    };
  },[Id])

	return loading ? <div>Loading...</div> :
    error ? <div>{ error }</div> :
      <ul className="products">
        { products.map(product =>
            <li key={product._id}>
             <div className="product">
                <Link to={'/product/' + product._id}> <img className="product-image" src={product.image} alt="img not found"/></Link>
                <div className="product-name">
                  <Link to={'/product/' + product._id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">{product.price}</div>
                <div className="product-rating">{product.rating} Stars ({product.numReviews} Reiews)</div>
             </div>
          </li>
          )
        }
      </ul>
}

export default FilterScreen;

