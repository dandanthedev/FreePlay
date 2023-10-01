import jwt from 'jsonwebtoken';


const signJwt = (user) => {
    try{
    return jwt.sign(user, process.env.JWT_SECRET);
    }catch(err){
        return null
    }
}

const verifyJwt = (token) => {
    if(!token) return null;
    try{
    return jwt.verify(token, process.env.JWT_SECRET);
    }catch(err){
        return null
    }
}

const genCookie =  (payload) => {
    if(!payload || !payload.user) return null;
    return{
        user: payload.user
    }
}   

const verifyCookie =  (token) => {
    if(!token) return null;
    const payload = verifyJwt(token);
    if(!payload) return null;
    if(!payload.user) return null;


    return payload;
}

export {
    signJwt,
    verifyJwt,
    genCookie,
    verifyCookie
}