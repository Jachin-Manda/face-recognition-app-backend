import express from "express";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from 'knex';
import { handleRegister } from "./controllers/register.js";
import { handleSignIn } from "./controllers/signin.js";
import { handleProfile } from "./controllers/profile.js";
import { handleImage, handleApiCall } from "./controllers/image.js";

const db = knex({
      client: 'pg',
      connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'root',
      database : 'smartbrain'
    }
  }
);

const app = express();

app.use(express.json());
app.use(cors());

/*
As a developer, you need to plan and have an idea of what your apllication
will be doing.
So here, we are planning our API of how it will work. */

//--> 1. '/' Have a root route that responds with 'this is working || response = this is working
app.get('/', (req, res) => { res.json('hello') })

//--> 2. '/signin => POST = return success/fail
app.post('/signin', (req, res) => { handleSignIn(req, res, db, bcrypt) })

//--> 3. '/register' => POST = return user created object
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })

//--> 4. '/profile/:userId' => GET user information
app.get('/profile/:id', (req, res) => { handleProfile(req, res, db) })

//--> 5. '/image' => PUT = update user object
app.put('/image', (req, res) => { handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { handleApiCall(req, res)})

app.listen(3000, () => { console.log('Server has started running on port 3000') });
