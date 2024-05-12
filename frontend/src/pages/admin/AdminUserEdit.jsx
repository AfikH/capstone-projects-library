import { useState } from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth.js';
import { useLoaderData } from 'react-router-dom';

const AdminUserEdit = () => {
	const { user } = useAuth();
	const [alert, setAlert] = useState({});
	const userData = useLoaderData();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = new FormData(e.target);

		const formData = {
			firstName: data.get('first-name') || '',
			lastName: data.get('last-name') || '',
			email: data.get('email-address') || '',
			password: data.get('password') || '',
			phoneNumber: data.get('phone-number') || '',
			admin: data.get('is-admin') ? true : false
		}

		console.log(formData);

		try{
			if(!formData.firstName || !formData.lastName || !formData.email || !formData.phoneNumber){
				throw { type: "negative", messages: ["First name, Last name, Email * Phone number fields are required."] };
			}

			let response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/users/${userData.user_id}`, {
				method: 'PUT',
				body: JSON.stringify(formData),
				headers: {
					"Content-Type": "application/json",
					"Authorization": user.token || ''
				}
			});

			response = await response.json();

			if(!response.ok){
				throw { type: "negative", messages: [response.msg || ""] };
			}

			setAlert({ type: "positive", messages: ["User has been updated succesfully."] });
		}catch(error){
			setAlert({ type: error.type || "negative", messages: error.messages || ["Something wen't wrong please try again later."] });
		}
	}

	return(
		<div className="page-edit-user">
			<div className="page-edit-user-form-container">
				<span className="title">{`Edit ${userData.user_firstname} ${userData.user_lastname}'s user`}</span>
				<form onSubmit={handleSubmit}>
					{ alert.messages && alert.messages.length > 0 &&
						<ul className={`form-errors ${alert.type || "neutral"}`}>
							{alert.messages.map((message, index) => <li key={index}>{message}</li>)}
						</ul>
					}
					<div className="page-user-sign-up-form-inputs-row">
						<input type="text" name="first-name" placeholder="First Name" defaultValue={userData.user_firstname} />
						<input type="text" name="last-name" placeholder="Last Name" defaultValue={userData.user_lastname} />
					</div>
					<input type="text" name="email-address" placeholder="Email Address" defaultValue={userData.user_email} />
					<input type="password" name="password" placeholder="Password" />
					<input type="text" name="phone-number" placeholder="Phone Number" defaultValue={userData.user_phone_number} />
					<label htmlFor="isAdmin" className="checkbox-label">
						<input type="checkbox" name="is-admin" id="isAdmin" defaultChecked={userData.user_admin ? true : false} />
						<span>Admin</span>
					</label>
					<div className="page-edit-user-form-buttons-container">
						<button type="submit" className="main-button">Update User</button>
						<Link to="/admin/users" className="main-button">Users list</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AdminUserEdit;