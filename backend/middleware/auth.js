import * as token from '../lib/token.js';
import { checkIfAdmin } from '../controllers/users.js';

export const auth = (admin = false) => {
    return async (req, res, next) => {
		let {success, data} = token.verify(req.headers.authorization);

        if(!success) return res.status(401).json({ ok: false, msg: "Not authticated." });
        if(admin){
			let authorized = await checkIfAdmin(decoded.data.id, decoded.data.email);

			if(!authorized) return res.status(401).json({ ok: false, msg: "Not authorized." });
        }


        next();
    }
}