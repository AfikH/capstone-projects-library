import * as token from '../lib/token.js';
import { checkIfAdmin } from '../controllers/users.js';

export const auth = (admin = false) => {
    return async (req, res, next) => {
		let {success, data} = token.verify(req.headers.authorization);

        if(!success) return res.status(401).json({ ok: false, msg: "Not authticated." });

		let authorized = await checkIfAdmin(data.id, data.email);

        if(admin && !authorized) return res.status(401).json({ ok: false, msg: "Not authorized." });
		
		req.body.userIsAdmin = authorized ? true : false;
		req.body.userId = data.id;

        next();
    }
}