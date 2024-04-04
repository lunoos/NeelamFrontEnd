import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link, useParams, useSearchParams,useNavigate} from 'react-router-dom';
import { signin } from '../actions/userActions';

function SigninScreen(props) {

	const [email, setEmail ] = useState('');
	const [password, setpassword] = useState('');
	const userSignin = useSelector(state=>state.userSignin);
	const {  loading, userInfo, error } = userSignin;
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();
	const redirect = searchParams? searchParams.get('redirect') : '/';
	const navigate = useNavigate();
	useEffect(() => {
       if(userInfo&&redirect) {
		navigate('/'+redirect);
       }else if(userInfo){
		navigate('/products');
	   }
		return () => {

		};
	}, [userInfo]);

	
    const submitHandler = (e) =>{
    	e.preventDefault();
    	dispatch(signin(email, password));
    }
	return <div className="form">
		<form onSubmit={submitHandler}>
			<ul className="form-container">
				<li>
					<h2>Sign-in</h2>
				</li>
				<li>
				{ loading && <div>loading...</div>}
				{ error && <div>{error}</div>}
				</li>
				<li>
					<label htmlFor="email">
						Email 
					</label>
					<input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
					</input> 
				</li>
				<li>
					<lable htmlFor="password">password</lable>
					<input type="password" id="password" name="password" onChange={(e) => setpassword(e.target.value)}>
					</input>
				</li>
				<li>
					<button type="submit" className="button primary">Signin</button>
				</li>
				<li>
					New to Neelam?
				</li>
				<li>
					<Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button secondary text-center" >Create your NEELAM accout</Link>
				</li>
		    </ul>
		</form>
	</div>
}

export default SigninScreen;