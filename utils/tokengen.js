const JWTtoken = require("jsonwebtoken");

const generateToken = async({email}) =>{
    return await JWTtoken.sign({ email: email }, process.env.SECRET, {
        expiresIn: "24h",
    });
}
 
module.exports = generateToken;