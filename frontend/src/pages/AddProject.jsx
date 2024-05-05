import Editor from "../components/General/Editor";

const AddProject = () => {

	return(
		<div className="page-add-project">
			<div className="page-add-project-form-container">
				<form action="">
					<input type="text" placeholder="Project Title" />
					<input type="text" placeholder="Degree" />
					<Editor />
					<div className="page-add-project-form-buttons-container">
						<button type="submit" className="main-button">Add Project</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddProject;