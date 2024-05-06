import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import ProjectsList from "../components/Projects/ProjectsList";

const Home = () => {
	const projects = useLoaderData();
	const [loading, setLoading] = useState(true);
	const [searchInput, setSearchInput] = useState('');
	const [options, setOptions] = useState({
		searchQuery: '',
		selectBy: 'name'
	});
	const [filteredProjects, setFilteredProjects] = useState([]);

	let timer;

	const setSearchQuery = (input) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			setOptions({ ...options, searchQuery: input });
		}, 1000);
	}

	const onSelect = (e) => {
		setLoading(true);
		setSearchInput('');
		setOptions({ searchQuery: '', selectBy: e.target.value });
	}

	const handleSearchInput = (e) => {
		setLoading(true);
		setSearchInput(e.target.value);
		setSearchQuery(e.target.value);
	}

	useEffect(() => {
		setLoading(false);
	}, []);

	useEffect(() => {
		setFilteredProjects(projects.filter(project => {
			if(options.selectBy === 'degree'){
				if(!project.project_degree.toLowerCase().includes(options.searchQuery.toLowerCase())) return false;
			}else if(options.selectBy === 'name'){
				if(!project.project_title.toLowerCase().includes(options.searchQuery.toLowerCase())) return false;
			}else{
				if(!project.project_title.toLowerCase().includes(options.searchQuery.toLowerCase())) return false;
			}
			return true;
		}));
		setLoading(false);
	}, [options]);

	return(
		<div className="page-home">
			<div className="page-home-project-search-container">
				<div className="page-home-project-search">
					<div className="page-home-project-search-input">
						<label htmlFor="searchBy">Search by</label>
						<select name="" id="searchBy" onChange={onSelect} defaultValue={options.selectBy}>
							<option value="name">Project Name</option>
							<option value="degree">Degree</option>
						</select>
					</div>
					<div className="page-home-project-search-input search-input">
						<label htmlFor="searchField">Search</label>
						<input type="text" placeholder="Search" value={searchInput} onInput={handleSearchInput} />
					</div>
				</div>
			</div>
			<div className={`page-home-projects-list ${loading && 'loading'}`}>
				<ProjectsList projects={filteredProjects} />
			</div>
		</div>
	)
}

export default Home;