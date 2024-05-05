import jwt from 'jsonwebtoken';

export const generate = (data) => {
    const payload = { ...data };
    const options = { expiresIn: '1h' };

    return jwt.sign(payload, process.env.TOKEN_SECRET, options);
}

export const verify = (token) => {
    try{
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        return { success: true, data: decoded };
    }catch(error){
        return { success: false, error: error.message };
    }
}