import { Link } from 'react-router-dom';

import graphic from '../assets/media/images/login.svg';

const SignIn = () => (
	<div className="page-user-sign-in">
		<div className="page-user-sign-in-container">
			<div className="page-user-sign-in-image-container">
				<img src={graphic} />
			</div>
			<div className="page-user-sign-in-form-container">
				<h2>Sign In</h2>
				<form action="">
					<input type="text" placeholder="Email Address" />
					<input type="password" placeholder="Password" />
					<label className="checkbox-label" htmlFor="remember">
						<input type="checkbox" name="remember" id="remember" />
						<span>Remember Me</span>
					</label>
					<button type="submit" className="main-button">Submit</button>
				</form>
				<span className="page-user-sign-in-message">
					Don't have a user? <Link to="/user/sign-up">Sign Up</Link>
				</span>
			</div>
		</div>
	</div>
)

export default SignIn;