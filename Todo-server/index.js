const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000


// middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6l0by.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        const AllTodoList = client.db('ToDo').collection('todo-list')

        app.post('/allList', async (req, res) => {
            const jahid = req.body;
            const result = await AllTodoList.insertOne(jahid)
            res.send(result)
        })

        app.get('/allList', async (req, res) => {
            const query = {}
            const result = await AllTodoList.find(query).toArray()
            res.send(result)
        })

        app.put('/allList', async (req, res) => {
            // const { doctor_email } = req.params.doctor_email;
            const allname = req.body;
            console.log("title", allname.fruitItems[0].title)
            // const query = {}
            // const allname2 = allname.fruitItems[0]
            // const singleName = allname.fruitItems[0].map(name => name.title);
            // console.log('signa', singleName)
            // const singleName2 = singleName.map(na => na)
            // console.log('333', singleName2)
            const find = await AllTodoList.updateMany({}, { $set: { title: allname.fruitItems[0].title } });
            // console.log('find', find)
            res.send(find)
            // res.send(console.log('haool'))
        })

    }
    finally {

    }
}
run().catch()



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})