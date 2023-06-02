require('dotenv').config()

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());

const verifyJwt = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).send({ error: true, message: 'unauthorized access' })
  }

  // bearer token
  const token = authorization.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).send({ error: true, message: 'unauthorized access' })
    }
    req.decoded = decoded;
    next();
  })
}



// const uri = `mongodb+srv://@cluster0.6iqnpnz.mongodb.net/?retryWrites=true&w=majority`;
var uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ac-kodbbia-shard-00-00.6iqnpnz.mongodb.net:27017,ac-kodbbia-shard-00-01.6iqnpnz.mongodb.net:27017,ac-kodbbia-shard-00-02.6iqnpnz.mongodb.net:27017/?ssl=true&replicaSet=atlas-12qn8w-shard-0&authSource=admin&retryWrites=true&w=majority`;


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
    // Connect the client to the server	(optional starting in v4.7)
    client.connect();

    const usersCollection = client.db('bistroDB').collection('users');
    const menuCollection = client.db('bistroDB').collection('menu');
    const reviewsCollection = client.db('bistroDB').collection('reviews');
    const cartCollection = client.db('bistroDB').collection('cart');

    // Warning : use verifyJwt before using verifyAdmin
    const verifyAdmin = async (req, res, next)=>{
      const email = req.decoded.email;
      const query = {email:email};
      const user = await usersCollection.findOne(query);

      if(user?.role !== 'admin'){
        return res.status(403).send({ error: true, message: 'forbidden access' })
      }
      next();
    }


    app.post('/jwt', (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      res.send({ token });
    })


    /*
    * 1. do not show secure links to those who should not see the links
    * 2. use jwt token: verifyJwt
    * * use verifyAdmin middleware 
    */
    // Users
    app.get('/users', verifyJwt, verifyAdmin, async (req, res) => {

      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    app.post('/users', async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: 'User already exists' })
      }
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      console.log('delete users',id)
      const query = { _id: new ObjectId(id) }
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });


    // Security layer1 = verifyJwt 
    // layer2 = email
    // layer3 = admin

    app.get('/users/admin/:email', verifyJwt, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        return res.send({ admin: false })
      }

      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const result = { admin: user?.role === 'admin' };
      res.send(result);
    })

    app.patch('/users/admin/:id', async (req, res) => {

      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateRole = {
        $set: {
          role: 'admin'
        }
      }
      const result = await usersCollection.updateOne(filter, updateRole);
      res.send(result)
    });

    // Menu
    app.get('/menu', async (req, res) => {

      const result = await menuCollection.find().toArray();
      res.send(result);
    });

    // Reviews
    app.get('/reviews', async (req, res) => {

      const result = await reviewsCollection.find().toArray();
      res.send(result);
    });

    // Carts
    app.get('/carts', verifyJwt, async (req, res) => {

      const email = req.query.email;
      if (!email) {
        res.send([]);
      }

      const decodedEmail = req.decoded.email;
      if (email !== decodedEmail) {
        return res.status(401).send({ error: true, message: 'forbidden access' })
      }

      const query = { email: email }

      const result = await cartCollection.find(query).toArray();
      res.send(result);

    });

    app.post('/carts', async (req, res) => {
      const item = req.body;
      console.log(item);
      const result = await cartCollection.insertOne(item);
      res.send(result);
    });

    app.delete('/carts/:id', async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const query = { _id: new ObjectId(id) }
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Bistro Boss Server is Running.......');
});


app.listen(port, () => {
  console.log(`Server Port: ${port} `);
})


/**
 * --------------------------------
 *      NAMING CONVENTION
 * --------------------------------
 * users : userCollection
 * app.get('/users')
 * app.get('/users/:id')
 * app.post('/users')
 * app.patch('/users/:id')
 * app.put('/users/:id')
 * app.delete('/users/:id')
*/
