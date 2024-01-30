// const {MongoClient}=require('mongodb')//mongodb object acquired from mongodb
// let db//store the connection established data
// function connectToDb(startServer){
//     MongoClient.connect('mongodb://127.0.0.1:27017/ExpenseTracker').then(function(client){//returns the client established
//          db=client.db()//access to db//connection established completely
//          return startServer()
//     }).catch(function(error){
//         return startServer(error)
//         //error if any issue in connecting db
//     })
//     //url to the db,here local is used generally cloud db used,connect to connect the db
// //connecting to the particular db,store the connection

// }
// function getDb(){
//     return db//database 
// }
// module.exports={connectToDb,getDb}
// //start server after connecting to db

const {MongoClient}=require('mongodb')//mongodb object acquired from mongodb
let db//store the connection established data
function connectToDb(startServer){
    MongoClient.connect('mongodb+srv://kanisha:kanisha2804@cluster1.5vxmslo.mongodb.net/Trailer?retryWrites=true&w=majority').then(function(client){//returns the client established
         db=client.db()//access to db//connection established completely
         return startServer()
    }).catch(function(error){
        return startServer(error)
        //error if any issue in connecting db
    })
    //url to the db,here local is used generally cloud db used,connect to connect the db
//connecting to the particular db,store the connection

}
function getDb(){
    return db//database 
}
module.exports={connectToDb,getDb}
//start server after connecting to db