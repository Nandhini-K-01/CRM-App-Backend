const { ObjectId } = require("mongodb");
const mongo = require("../connect")

exports.getLeads=async (req,res,next)=>{
    try{
        const getLeads = await mongo.selectedDb.collection("leads").find().toArray();
        res.send(getLeads)
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    }
}

exports.updateLeads= async (req,res,next)=>{
    const id = req.params.id;
    try{
        const updatedData = await mongo.selectedDb.collection("leads").findOneAndUpdate({_id:ObjectId(id)},{$set:{...req.body.leads}},{returnDocument:"after"});
        res.send(updatedData)
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    }
}

exports.createLeads= async (req,res,next)=>{
    try{
        const insertedResponse = await mongo.selectedDb.collection("leads").insertOne(req.body.leads);
        res.send(insertedResponse);
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    }
}

exports.deleteLeads=async (req,res,next)=>{
    const id = req.params.id;
    try{
        const deletedData = await mongo.selectedDb.collection("leads").remove({_id:ObjectId(id)});
        res.send(deletedData)
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    }
}