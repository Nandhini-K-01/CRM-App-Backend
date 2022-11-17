const {MongoClient} = require("mongodb");

module.exports = {
    selectedDb:{},
    async connect(){
        try{
            const client = await MongoClient.connect(process.env.MONGODB_URL)
            this.selectedDb = client.db("crm");
        }catch(err){
            console.log(err);
        }
    }
}