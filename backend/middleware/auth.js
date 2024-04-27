import * as token from '../lib/token.js';

export const auth = (roles) => {
    return (req, res, next) => {
        let {success, data} = token.verify(req.cookies.access_token);

        if(!success) return res.status(401).json({ ok: false, msg: "Not authticated." });
        if(roles){
            // TODO:: Fetch roles from users tables by email address from jwt token data and compare with roles param to check if user has required roles.
        }


        next();
    }
}