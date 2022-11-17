const mongo = require("../connect")
const bcrypt = require("bcrypt");
const jsw = require("jsonwebtoken");
const joi = require("joi");

exports.signup = async (req,res,next)=>{
    try{
        const validation = joi.object({
            // firstname: joi.string().alphanum().min(3).max(25).trim(true).required(),
            // lastname: joi.string().alphanum().min(3).max(25).trim(true).required(),
            email: joi.string().email().trim(true).required(),
            password: joi.string().min(5).trim(true).required(),
            confirmpassword: joi.string().min(5).trim(true).required(),
          });
      
          const { error } = validation.validate(req.body);
          if (error) {
            return res.status(400).send({ msg: error.message });
          }

        //To check if req.body.email is a registered user
        const existUser = await mongo.selectedDb.collection("users").findOne({email: req.body.email})
        // console.log(existUser)
        if(existUser){
            return res.status(400).send({msg:"You are already a registered user"})
        }

        //password validation
        const isSamePassword = checkPassword(req.body.password, req.body.confirmpassword) //calling the function below written

        //sending password validation message after checking
        if(!isSamePassword){
            return res.status(400).send({msg:"Password does not match"});
        }else{
            delete req.body.confirmpassword;
        }

        //Password encryption (hash)
        const randomString = await bcrypt.genSalt(10);
        req.body.password =  await bcrypt.hash(req.body.password, randomString);
        // console.log(req.body.password)

        //Save in database
        const insertedResponse = await mongo.selectedDb.collection("users").insertOne({...req.body});
        res.send(insertedResponse)

     }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

        //Function to check if password and confirmpassword are same
        const checkPassword = (password,confirmPassword)=>{
            return password !== confirmPassword ? false : true;
        }

exports.signin = async (req,res,next)=>{

        //To check if req.body.email is a registered user
        const existUser = await mongo.selectedDb.collection("users").findOne({email: req.body.email})
        // console.log(existUser)
        if(!existUser){
            return res.status(400).send({msg:"You are not a registered user"})
        }

        //Pasword checking
        const isSamePassword = await bcrypt.compare(req.body.password, existUser.password)
        if(!isSamePassword){
            res.status(400).send({msg: "Your password is incorrect"})
        }

        //sending token
        const token = jsw.sign(existUser, process.env.SECRET_KEY, {expiresIn:"1hr"})
        res.send(token)
}