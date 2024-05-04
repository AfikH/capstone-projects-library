import graphic from '../assets/media/images/404.svg';

const NotFound = () => (
	<div className="page-not-found">
		<img src={graphic} alt="404" />
		<div className="page-not-found-text">
			<span className="title">Page Not Found</span>
			<span className="message">The page you are looking for might have been removed has its name changed or temporarily unavailable</span>
		</div>
	</div>
)

export default NotFound;