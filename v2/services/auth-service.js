const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
var base64 = require('base-64')
const config = dotenv.config();
const {SECRET} = config.parsed;
module.exports = {
    token: (data)=>{
        const token = jwt.sign({id: data.id, empresa: data.empresa}, SECRET, {expiresIn: "3y"});
        return base64.encode(token);
    },
    authorize: function(req, res, next)
    {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if(!token)
        {
            res.status(401).json({error: "token Inválido."})
        }else
        {
            token = base64.decode(token);
           jwt.verify(token, SECRET, function(error, decoded)
           {
               if(error)
               {
                res.status(401).json({error: "token Inválido."})
               }else
               {
                   next();
               }
           });
        }
    },
    decodeToken:  (token)=>
    {
        token = base64.decode(token);
        try 
        {
            var decoded = jwt.verify(token, SECRET);
        }catch(err) {
            return err;
        }
        return decoded;
    }
}