import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';



function ProductScreen(props) {
	const userSignin = useSelector(state=>state.userSignin);
	const { userInfo } = userSignin;
	return <div className="profileContainer">
		<div className="form">
			<ul className="form-container">
				<li>
					<h1>Name:{userInfo.name}</h1>
				</li> 
				<li>
					<h2>Email:{userInfo.email}</h2>
				</li>
				
			</ul>
	</div>
		<div>
		  		<ul className="cart-list-container">
				<li>
					<h3>
						Your Orders Are
					</h3>
					<div>
						Price
					</div>
				</li>
				{
					userInfo.products.length === 0 ?
					<div>
						U have not Orderd anything yet
					</div>
					:
					userInfo.products.map( item =>
						<li>
							<div className="cart-image">
							<img src={item.image} alt="product" />
							</div>
							<div className="cart-name">
								<div>
									<Link to={"/product" + item.product}>
									{item.name}
									</Link>
								</div>
								<div>
									Qty: {item.qty}
								</div>
							</div>
						<div className="cart-price">
							${item.price}
						</div>
						</li> )
				}
			</ul>	
		  	</div>
		
	</div>
}

export default ProductScreen;