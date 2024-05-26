const jwt = require('jsonwebtoken');

//Function to verify the generated token for authentication 
const jwtAuthMiddleware = (req,res,next) =>{
    const authorization  = req.headers.authorization;
    if(!authorization) return res.status(401).json({error: 'Token Not Found'});
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error: 'Unauthorized'});

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({error: 'Invalid token'});
        
    }
}
  //Function to generate to jwt token
  const generateToken = (userData) =>{
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:7200000});
}

module.exports = { jwtAuthMiddleware, generateToken};