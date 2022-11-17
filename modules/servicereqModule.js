const { ObjectId } = require("mongodb");
const mongo = require("../connect")

exports.getServices=async (req,res,next)=>{
    try{
        const getServices = await mongo.selectedDb.collection("services").find().toArray();
        res.send(getServices);
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    }
}

exports.updateServices= async (req,res,next)=>{
    const id = req.params.id;
    try{
        const updatedData = await mongo.selectedDb.collection("services").findOneAndUpdate({_id:ObjectId(id)},{$set:{...req.body.services}},{returnDocument:"after"});
        res.send(updatedData)
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    }
}

exports.createServices= async (req,res,next)=>{
    try{
        const insertedResponse = await mongo.selectedDb.collection("services").insertOne(req.body.services);
        res.send(insertedResponse);
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    }
}

exports.deleteServices=async (req,res,next)=>{
    const id = req.params.id;
    try{
        const deletedData = await mongo.selectedDb.collection("services").remove({_id:ObjectId(id)});
        res.send(deletedData)
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    }
}