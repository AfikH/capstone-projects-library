const cors = () => {
    return (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
		res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		res.setHeader('Access-Control-Allow-Credentials', true);

        next();
    }
}

export default cors;