import { useLoaderData } from "react-router-dom";

import ProjectsList from "../components/Projects/ProjectsList";

const Home = () => {
	const projects = useLoaderData();

	return(
		<div className="page-home">
			<div className="page-home-project-search-container">
				<div className="page-home-project-search">
					<div className="page-home-project-search-input">
						<label htmlFor="searchBy">Search by</label>
						<select name="" id="searchBy">
							<option value="project-name" defaultChecked>Project Name</option>
							<option value="degree">Degree</option>
						</select>
					</div>
					<div className="page-home-project-search-input search-input">
						<label htmlFor="searchField">Search</label>
						<input type="text" placeholder="Search" />
					</div>
				</div>
			</div>
			<div className="page-home-projects-list">
				<ProjectsList projects={projects} />
			</div>
		</div>
	)
}

export default Home;