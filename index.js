const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = 3000;

const app = express();
app.use(cors());
app.use(express.json())





const uri = "mongodb+srv://pet-mart_a10:Jjt03xK715CjYhZ5@cluster0.zqy5qu3.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        const database = client.db('petService');
        const petServices = database.collection('services');
        // POST OR SAVE SERVICE TO DATABASE
        app.post('/services', async (req, res) => {
            const data = req.body;
            const date = new Date();
            data.createdAt = date;
            console.log(data);
            const result = await petServices.insertOne(data);
            res.send(result)
        })

        // GET SERVICES FROM DATABASE
        app.get('/services', async (req, res) => {
            const result = await petServices.find().toArray();
            res.send(result);
        })

        app.get('/services/:id',async(req,res)=>{
            const id = req.params
            console.log(id);
            const query = {_id: new ObjectId(id)}
            const result = await petServices.findOne(query)
            res.send(result);
        })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello,developers')
})
app.listen(port, () => {
    console.log(`server  is runing on port ${port}`)
})