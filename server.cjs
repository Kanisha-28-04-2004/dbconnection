// post validation for a html input
const express=require('express')
const bodyParser=require('body-parser')
const {connectToDb,getDb}=require('./db.cjs')//importing the db file
const { ObjectId } = require('mongodb')
// const { response } = require('express')
const app=express()
app.use(bodyParser.json())
app.use(express.static(__dirname))
let db
connectToDb(function(error){
    if(!error){
        app.listen(7000)
        console.log("Listening to the server 9000")
        db=getDb()
    }
    else{
        console.log(error)

    }//call back function to start server
})
app.post('/add-entry', function(request, response) {
    db.collection('ExpenseData').insertOne(request.body).then(function(){
        response.status(201).json({
            'status':'data successfully entered'
        })
    }).catch(function(error){
        response.status(500).json({
            'error':error
        })
    })
})
app.get('/get-data',function(request,response){
    const entries=[]
    db.collection('ExpenseData').find()//run loop to iterate and store data
    .forEach(entry=>entries.push(entry))
    .then(function(){
        response.status(200).json(entries)
    }).catch(function(error){
        response.status(404).json({
            'error':error
        })
    })
})
app.delete('/delete-entry/:id',function(request,response){
    console.log(request.params.id)
    if(ObjectId.isValid(request.params.id)){
        console.log('object id valid')
        db.collection('ExpenseData').deleteOne({
            _id:new ObjectId(request.params.id)
        }).then(function(){
            response.status(201).json({
            'status':'data deleted successful'
            })
    }).catch(function(error){
        response.status(500).json({
            'error':error
        })
    })

}else{
    response.status(500).json({
        'status':'ObjectId not valid'
    })
}
})//function returns 
app.patch('/update-entry',function(request,response){
    if(ObjectId.isValid(request.body.id)){
        db.collection('ExpenseData').updateOne({
            _id:new ObjectId(request.body.id)},
            {$set:request.body.data}
            ).then(function() {
                response.status(201).json({
                    'status' : 'data successfully updated'
                })
            }).catch(function(error) {
                response.status(500).json({
                    'error' : error
                })
            })
        } else {
            response.status(500).json({
                'status' : 'ObjectId not valid'
            })
        }
    })

//mongo doesn't accept direct id,send as object id
//end point
// get-entries-->fetchin the entry Data
// add-entries
// delete-entries
// edit-entries
//api working checked by postman,fetching adding are done properly
//find returns a cursor-to iterate it is used
//update -->patch

//id param