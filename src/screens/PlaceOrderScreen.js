import React, { useEffect } from 'react';
import { addToCart , removeFromCart,emptyCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import {Link,useNavigate} from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import axios from 'axios';

  const placeOrderHandler = (src) => {
  	return new Promise(resolve => {
  		const script = document.createElement('script')
  	script.src = src;
  	script.onload = () => {
  		resolve(true)
  	}
  	script.onerror = () => {
  		resolve(false)
  	}
  	document.body.appendChild(script)
  })
  }

function PlaceOrderScreen(props) {
 
  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.userSignin);
  const navigate = useNavigate();

  const { cartItems, shipping, payment } = cart;
  const { userInfo } = user;
  if(!shipping.address){
	navigate("/shipping")
  }else if(!payment.paymentMethod){
	navigate("/payment")
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.price*c.qty, 0);
  const shippingPrice = itemsPrice> 100 ? 0 : 10;
  const taxPrice = 0.15*itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  async function displayRazorpay(){
  		const res = await placeOrderHandler("https://checkout.razorpay.com/v1/checkout.js");
  		
  		if(!res){
  			alert('Razorpay SDK failded to load. Are you online?')
  			return
  		}
  			let user = {
  				amount: Number(totalPrice)*100
  			}
  		const data = await fetch('http://localhost:8080/neelam/razorpay/order', { 
  			method: 'POST',
  			headers: {
    			'Content-Type': 'application/json;charset=utf-8'
  			},
  			body: JSON.stringify(user)
			}).then(response => response.json())
			.then(data => {
			  // data is now a JavaScript object
			  console.log(data);
			  return data;
			})
			.catch(error => {
			  console.error('Error:', error);
			});
  	  const options = {
    key: "rzp_test_av1wpTOyUA2Hbx", 
    country: data.country,
    amount: '1000',
    order_id: data.id,
    name: "neelam garments",
    description: "Trusted for quality",
    image: "https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/09/fashion-logo-design-1024x709.jpg",    
    handler: function (response){
    	//need to fix the updading of the product once
    //     async function  test(product) {
    //     	await axios.put('https://cors-anywhere.herokuapp.com/https://neelambackend.herokuapp.com/api/products/update', product)
    //     }
    //     cartItems.map(product => {
    //     	test(product);
    //    });
    //     //"user Order update"
    //     async function update(product) {
    //     	await axios.put('https://cors-anywhere.herokuapp.com/https://neelambackend.herokuapp.com/api/users/'+userInfo.email, product)
    //     }
    //     cartItems.map(product =>{
    //     	update(product);
    //     });
        //emtying the cart
       
        navigate('/success');
         dispatch(emptyCart());
        
    },
    prefill: {
        name: userInfo.name,
        email: userInfo.email
    }
	};
	const paymentObject = new window.Razorpay(options);
	paymentObject.open();
  }
 

  useEffect(() => {

  }, []);

  const checkoutHandler = () =>{
  	props.history.push("/signin?redirect=shipping");
  }

	return <div>
	 <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>

	 <div className="placeorder">
		<div className="placeorder-info">
		  <div>
		  	<h3>
		  	 shipping
		  	</h3>
		  	<div>
		  		{cart.shipping.address},{cart.shipping.city},
		  		{cart.shipping.postalCode},{cart.shipping.country}
		  	</div>
		  	</div>
		  	<div>
		  		<h3>Payment</h3>
		  		<div>
		  			payment Method: {cart.payment.paymentMethod}
		  		</div>
		  	</div>
		  	<div>
		  		<ul className="cart-list-container">
				<li>
					<h3>
						Shopping Cart
					</h3>
					<div>
						Price
					</div>
				</li>
				{
					cartItems.length === 0 ?
					<div>
						Cart is empty
					</div>
					:
					cartItems.map( item =>
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
	<div className = "placeorder-action">
	  <ul>
	  	<li>
	  		<button onClick={displayRazorpay} className="button primary full-width"> Place Order</button>
	  	</li>
	  	<li>
	  		<h3>Order Summary</h3>
	  	</li>
	  	<li>
	  		<div>Item</div>
	  		<div>${itemsPrice}</div>
	  	</li>
	  	<li>
	  		<div>shipping</div>
	  		<div>${shippingPrice}</div>
	  	</li>
	  	<li>
	  		<div>Tax</div>
	  		<div>${taxPrice}</div>
	  	</li>
	  	<li>
	  		<div>Order Total</div>
	  		<div>${totalPrice}</div>
	  	</li>
	  </ul>
		

	</div>
</div>
</div>

	
} 

export default PlaceOrderScreen;