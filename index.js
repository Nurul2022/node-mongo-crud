const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion } = require('mongodb');

// use middleware
app.use(cors());
app.use(express.json());

// nurulbd73
// 3TCOoodJVDplru4x 



const uri = "mongodb+srv://nurulbd73:3TCOoodJVDplru4x@cluster0.hl7qb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    //     const collection = client.db("foodExpress").collection("users");
    // console.log('db connected')
    //     // perform actions on the collection object
    //     client.close();
});

async function run() {
    try {
        await client.connect();
        const userCollection = client.db("foodExpress").collection("users");
        // const user = { name: "Nahiya Nodi", email: 'nahi@gmail.com' }
        // const result = await UserCollection.insertOne(user)
        // console.log(`User inserted with id: ${result.insertedId}`)

        // get users
        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        });
        app.get('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.findOne(query);
            res.send(result);
        });

        // POST User : add a new user
        app.post('/user', async (req, res) => {
            const newUser = req.body;
            console.log('adding new user', newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result)
        });
        // update user
        app.put('/user/:id', async (req, res) => {
            const id = req.params.id;
            const updatedUser = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    name: updatedUser.name,
                    email: updatedUser.email
                }
            };
            const result = await userCollection.updateOne(filter, updatedDoc, options);
            res.send(result);

        })

        // delete a user
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })
    }
    finally {
        // await client.close().
    }
}



run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running My Node CRUD Server')

})

app.listen(port, () => {
    console.log('CRUD Server is running');
})
