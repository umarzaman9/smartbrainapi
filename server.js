const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const saltRounds = 10;
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smartbrain'
  }
});

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.get('/' , (req, res)=> res.send(database.users))
app.post('/signin', signin.handleSignIn(db,bcrypt,saltRounds))
app.post('/register' , (req,res)=> { register.handleRegister(req,res,db,bcrypt,saltRounds) })
app.get('/profile/:id',  (req,res)=> {profile.handleProfile(req,res,db) })
app.put('/image', (req,res)=> {image.handleImage(req,res,db) })
app.post('/imageurl', (req,res)=> {image.handleApiCall(req,res) })

app.listen(3000, ()=> {
	console.log("app is Live on port:3000");
})