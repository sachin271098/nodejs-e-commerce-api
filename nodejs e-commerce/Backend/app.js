const express = require('express');
const app = express();
// dotnev
const dotenv = require('dotenv');
dotenv.config();


// bodyparser
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extented:true }));

// Database connection
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>
{
    console.log("DB CONNECTION DONE");
}).catch(("ERROR", (err)=>
{
console.log("DB CONNECTION NOT DONE",err);
}))


// Routes
const userRoute = require('./Routes/User');
const authRoute = require('./Routes/Auth.js');
const productRoute = require('./Routes/Product');
const cartRoute = require('./Routes/Cart');
const orderRoute = require('./Routes/Order');
const stripeRoute = require('./Routes/stripe');


// Middlewares
app.use(express.json());
app.use(authRoute);
app.use(userRoute);
app.use(productRoute);
app.use(cartRoute);
app.use(orderRoute);
app.use(stripeRoute);

// Server 
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`app listening on port ${PORT}!`))