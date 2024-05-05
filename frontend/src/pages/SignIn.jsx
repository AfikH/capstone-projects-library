import { useState } from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import graphic from '../assets/media/images/login.svg';

const SignIn = () => {
	const [alert, setAlert] = useState({});
	const { signin } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setAlert({})

		let input = new FormData(e.target);

		let user = {
			email: input.get('email-address'),
			password: input.get('password')
		};

		try{
			if(!user.email || !user.password){
				throw { type: "negative", messages: ["Please enter valid email address & password"] };
			}

			let response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/users/sign-in`, {
				method: 'POST',
				body: JSON.stringify(user),
				headers: {
					"Content-Type": "application/json"
				}
			});

			response = await response.json();

			if(!response.ok){
				throw { type: "negative", messages: [response.msg || ""] };
			}

			signin(response.token);

			setAlert({ type: "positive", messages: ["Signed In succesfully."] });
		}catch(error){
			console.log(error);
			setAlert({ type: error.type || "negative", messages: error.messages || ["Something wen't wrong please try again later."] });
		}
	}

	return (
		<div className="page-user-sign-in">
			<div className="page-user-sign-in-container">
				<div className="page-user-sign-in-image-container">
					<img src={graphic} />
				</div>
				<div className="page-user-sign-in-form-container">
					<h2>Sign In</h2>
					<form onSubmit={handleSubmit}>
						{ alert.messages && alert.messages.length > 0 &&
							<ul className={`form-errors ${alert.type || "neutral"}`}>
								{alert.messages.map((message, index) => <li key={index}>{message}</li>)}
							</ul>
						}
						<input type="text" name="email-address" placeholder="Email Address" disabled={alert && alert.type === "positive" ? true : false} />
						<input type="password" name="password" placeholder="Password" disabled={alert && alert.type === "positive" ? true : false} />
						{/* <label className="checkbox-label" htmlFor="remember">
							<input type="checkbox" name="remember" id="remember" />
							<span>Remember Me</span>
						</label> */}
						<button type="submit" className="main-button" disabled={alert && alert.type === "positive" ? true : false}>Submit</button>
					</form>
					{alert && alert.type === "positive" ?
					<span className="page-user-sign-in-message">
						<Link to="/" className='main-button'>Explore the capsule</Link>
					</span>
					:
					<span className="page-user-sign-in-message">
						Don't have a user? <Link to="/user/sign-up">Sign Up</Link>
					</span>
					}
				</div>
			</div>
		</div>
	)
}

export default SignIn;