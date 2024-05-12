import { useRef, useState } from "react";
import Editor from "../components/General/Editor";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const [alert, setAlert] = useState({});
	const editorRef = useRef(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = new FormData(e.target);

		const project = {
			title: data.get('project-title') || '',
			degree: data.get('project-degree') || '',
			content: editorRef.current.getMarkdown() || ''
		}

		try{
			if(!project.title || !project.content){
				throw { type: "negative", messages: ["Please fill atleast project title & content."] };
			}

			let response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/projects`, {
				method: 'POST',
				body: JSON.stringify(project),
				headers: {
					"Content-Type": "application/json",
					"Authorization": user.token || ''
				}
			});

			response = await response.json();

			if(!response.ok){
				throw { type: "negative", messages: [response.msg || ""] };
			}

			setAlert({ type: "positive", messages: ["Project has been added succesfully."] });
			response.id && navigate(`/project/${response.id}`);
		}catch(error){
			setAlert({ type: error.type || "negative", messages: error.messages || ["Something wen't wrong please try again later."] });
		}
	}

	return(
		<div className="page-add-project">
			<div className="page-add-project-form-container">
				<form onSubmit={handleSubmit}>
					{ alert.messages && alert.messages.length > 0 &&
						<ul className={`form-errors ${alert.type || "neutral"}`}>
							{alert.messages.map((message, index) => <li key={index}>{message}</li>)}
						</ul>
					}
					<input type="text" name="project-title" placeholder="Project Title" />
					<input type="text" name="project-degree" placeholder="Degree" />
					<Editor editorRef={editorRef} />
					<div className="page-add-project-form-buttons-container">
						<button type="submit" className="main-button">Add Project</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddProject;