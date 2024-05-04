import editIcon from '../../assets/media/images/icons/edit.svg';
import deleteIcon from '../../assets/media/images/icons/delete.svg';

const AdminProjects = () => (
	<div className="admin-projects-page">
		<div className="admin-projects-page-list-container">
			<span className="title">Manage Projects</span>
			<div className="admin-projects-page-list">
				<div className="admin-projects-page-project">
					<span className="name" title="Project Name">ABC</span>
					<div className="admin-projects-page-project-buttons">
						<button type="button" title="Edit Project"><img src={editIcon} alt="Edit" /></button>
						<button type="button" title="Delete Project"><img src={deleteIcon} alt="Delete" /></button>
					</div>
				</div>
			</div>
		</div>
	</div>
)

export default AdminProjects;