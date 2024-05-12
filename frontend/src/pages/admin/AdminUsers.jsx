import { Link, useLoaderData } from 'react-router-dom';

import useAuth from '../../hooks/useAuth.js';
import editIcon from '../../assets/media/images/icons/edit.svg';
import deleteIcon from '../../assets/media/images/icons/delete.svg';
import { useState } from 'react';

const AdminUsers = () => {
	const { user } = useAuth();
	const usersLoader = useLoaderData();
	const [users, setUsers] = useState(usersLoader);

	const deleteUser = async (id) => {
		try{
			let response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/users/${id}`, {
				method: 'DELETE',
				headers: {
					"Authorization": user.token || ''
				}
			});

			response = await response.json();

			if(!response.ok){
				throw { type: "negative", messages: [response.msg || ""] };
			}

			setUsers(users.filter(user => user.user_id !== id));
		}catch(error){
			console.log(error);
		}
	}

	return (
		<div className="admin-users-page">
			<div className="admin-users-page-list-container">
				<span className="title">Manage Users</span>
				{users && users.length > 0 ? 
					<div className="admin-users-page-list">
						{users.map((user, index) => (
							<div key={index} className="admin-users-page-user">
								<span className="user-name" title="User Name">{`${user.user_firstname} ${user.user_lastname}`}</span>
								<div className="admin-users-page-user-buttons">
									<Link to={`/admin/user/edit/${user.user_id}`} title="Edit User"><img src={editIcon} alt="Edit" /></Link>
									<button type="button" title="Delete user" onClick={() => deleteUser(user.user_id)}><img src={deleteIcon} alt="Delete" /></button>
								</div>
							</div>
						))}
					</div>
				:
					<span>No users found.</span>
				}
			</div>
		</div>
	)
}

export default AdminUsers;