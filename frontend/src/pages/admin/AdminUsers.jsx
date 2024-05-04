import editIcon from '../../assets/media/images/icons/edit.svg';
import deleteIcon from '../../assets/media/images/icons/delete.svg';

const AdminUsers = () => (
	<div className="admin-users-page">
		<div className="admin-users-page-list-container">
			<span className="title">Manage Users</span>
			<div className="admin-users-page-list">
				<div className="admin-users-page-user">
					<span className="name" title="User Name">Afik Habaz</span>
					<div className="admin-users-page-user-buttons">
						<button type="button" title="Edit user"><img src={editIcon} alt="Edit" /></button>
						<button type="button" title="Delete user"><img src={deleteIcon} alt="Delete" /></button>
					</div>
				</div>
			</div>
		</div>
	</div>
)

export default AdminUsers;