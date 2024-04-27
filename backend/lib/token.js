import jwt from 'jsonwebtoken';

export const generate = (email) => {
    const payload = { email };

    const secret = 'your-secret-key';
    const options = { expiresIn: '1h' };

    return jwt.sign(payload, secret, options);
}

export const verify = (token) => {
    const secret = 'your-secret-key';

    try{
        const decoded = jwt.verify(token, secret);
        return { success: true, data: decoded };
    }catch(error){
        return { success: false, error: error.message };
    }
}