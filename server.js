const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./routes/user');
const register = require('./routes/register');
const login = require('./routes/login');
const token = require('./routes/token');
const del = require('./routes/delete');
const pinStock = require('./routes/pinStock');
const getStock = require('./routes/getStock');
const auth = require('./middleware/auth');

const app = express();

//middlewares
app.use(express.json());
app.use(cors())

//connect to mongodb
mongoose.connect("mongodb+srv://tbUser:tbUserPass@cluster0.ccwyq.mongodb.net/tb?retryWrites=true&w=majority", 
{
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})

//routes
app.get('/', (req, res) => {
    res.send('Server has Started');
});

app.post('/register', (req,res) => {register.handleRegister(req,res)});

app.post('/login', (req,res) => {login.handleLogin(req,res)});

app.post('/tokenValid', (req,res) => {token.checkToken(req,res)});

app.get('/user', auth, (req,res) => {User.handleUser(req,res)});

app.delete('/delete', auth, (req,res) => {del.delUser(req,res)});

app.post('/pinStock', (req,res) => {pinStock.pinStock(req,res)});

app.get('/getStock/:id', auth, (req,res) => {getStock.getStock(req,res)});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));