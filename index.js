const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const {MongoClient, ServerApiVersion} = require('mongodb');
const port = process.env.PORT || 5000


// middleware use here
app.use(cors());
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.algulij.mongodb.net/?retryWrites=true&w=majority`;

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

        // collection here
        const userCollection = client.db("foodDonationDB").collection("user")


        // -------userCollection here---------
        app.post('/user', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result);
        })

        app.patch('/user', async (req, res) => {
            const user = req.body;
            const filter = { email: user.email };
            const updateData = {
                $set: {
                    lastLoginAt: user.lastLoginAt,
                }
            }
            const result = await userCollection.updateOne(filter, updateData);
            res.send(result);

        })







        // Send a ping to confirm a successful connection
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


// testing routes here 
app.get('/', (req, res) => {
    res.send('Food donation server...')
})

app.listen(port, () => {
    console.log(`food donation server on port ${port}`)
})