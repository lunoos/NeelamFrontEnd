import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
function PaymentScreen(props) {

	const [paymentMethod, setPaymentMethod] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	
    const submitHandler = (e) =>{
    	e.preventDefault();
    	dispatch(savePayment({paymentMethod}));
    	navigate('/placeorder');
    }
	return <div>
		<CheckoutSteps step1 step2 step3></CheckoutSteps>
		<div className="form">
		<form onSubmit={submitHandler}>
			<ul className="form-container">
				<li>
					<h2>Payment</h2>
				</li> 
				<li>
				<div>
				<input type="radio" name="paymentMethod" id="paymentMethod" value="RazorPay" onChange={(e) => setPaymentMethod(e.target.value)}>
				</input>
					<label htmlFor="address">
						RazorPay
					</label>
				</div>
				</li>
				<li>
					<button type="submit" className="button primary">Continue</button>
				</li>
				
				
		    </ul>
		</form>
	</div>
	</div>
	
}

export default PaymentScreen;