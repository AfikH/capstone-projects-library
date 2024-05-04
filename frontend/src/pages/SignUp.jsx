import { Link } from 'react-router-dom';

import graphic from '../assets/media/images/login.svg';
import { useState } from 'react';

const SignUp = () => {
	const [alert, setAlert] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setAlert({})

		let input = new FormData(e.target);

		let {passwordConfirmation, ...user} = {
			firstName: input.get('first-name'),
			lastName: input.get('last-name'),
			email: input.get('email'),
			password: input.get('password'),
			passwordConfirmation: input.get('password-confirmation'),
			phoneNumber: input.get('phone-number')
		};

		try{
			// if(!user.firstName || !user.lastName || !user.email || !user.password || !passwordConfirmation || !user.phoneNumber){
			// 	throw { type: "negative", messages: ["All form fields are required"] };
			// }

			// if(user.password !== passwordConfirmation){
			// 	throw { type: "negative", messages: ["Password confirmation doesn't equal to password field"] };
			// }

			let response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/user`, {
				method: 'POST',
				body: user
			});

			response = await response.json();

			console.log(response);
		}catch(error){
			console.log(error);
			setAlert({ type: error.type || "negative", messages: error.messages || ["Something wen't wrong please try again later."] });
		}
	}

	return (
		<div className="page-user-sign-up">
			<div className="page-user-sign-up-container">
				<div className="page-user-sign-up-image-container">
					<img src={graphic} />
				</div>
				<div className="page-user-sign-up-form-container">
					<h2>Sign Up</h2>
					<form onSubmit={handleSubmit}>
						{ alert.messages && alert.messages.length > 0 &&
							<ul className={`form-errors ${alert.type || "neutral"}`}>
								{alert.messages.map((message, index) => <li key={index}>{message}</li>)}
							</ul>
						}
						<div className="page-user-sign-up-form-inputs-row">
							<input type="text" name="first-name" placeholder="First Name" />
							<input type="text" name="last-name" placeholder="Last Name" />
						</div>
						<input type="text" name="email-address" placeholder="Email Address" />
						<input type="password" name="password" placeholder="Password" />
						<input type="password" name="password-confirmation" placeholder="Password Confirmation" />
						<input type="text" name="phone-number" placeholder="Phone Number" />
						<button type="submit" className="main-button">Submit</button>
					</form>
					<span className="page-user-sign-up-message">
						Already have a user? <Link to="/user/sign-in">Sign In</Link>
					</span>
				</div>
			</div>
		</div>
	)
}

export default SignUp;