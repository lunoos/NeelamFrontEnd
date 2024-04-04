import React, {useState, useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';




function SuccessScreen(props) {
	const navigate = useNavigate();
	return <div className="SuccessContainer">
	 <h1>YOUR ORDER HAS BEEN PLACED</h1>
	 <button onClick={() => navigate('/') } className="button primary">Continue Shopping</button>
	 </div>
	
	
}

export default SuccessScreen;