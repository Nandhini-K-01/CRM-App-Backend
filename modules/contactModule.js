const { ObjectId } = require("mongodb");
const mongo = require("../connect")

exports.getcontacts=async (req,res,next)=>{
    try{
        const getContacts = await mongo.selectedDb.collection("contacts").find().toArray();
        res.send(getContacts);
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    }
}

exports.updateContacts= async (req,res,next)=>{
    const id = req.params.id;
    try{
        const updatedData = await mongo.selectedDb.collection("contacts").findOneAndUpdate({_id:ObjectId(id)},{$set:{...req.body.contacts}},{returnDocument:"after"});
        res.send(updatedData)
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    }
}

exports.createContacts= async (req,res,next)=>{
    try{
        const insertedResponse = await mongo.selectedDb.collection("contacts").insertOne(req.body.contacts);
        res.send(insertedResponse);
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    }
}

exports.deleteContacts=async (req,res,next)=>{
    const id = req.params.id;
    try{
        const deletedData = await mongo.selectedDb.collection("contacts").remove({_id:ObjectId(id)});
        res.send(deletedData)
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    }
}