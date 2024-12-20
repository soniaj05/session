const express=require("express")
const { connectDB } = require("./config/db");
const User = require("./models/user");
const session=require('express-session')
const {registerUser,loginUser,getProfile,updateUser,getall}=require("./controller/usercontroller");
const router=require('./routes/userroutes')
const { generateToken, verifyToken }=require('./utils/jwt');
const { hashPassword, verifyPassword }=require('./utils/password')
const app = express();
require("dotenv").config();
app.use(session({
    secret:'secret',
    cookie:{maxAge:5*60*1000},
    saveUninitialized:false
  }));
  
app.use(express.json());


app.use('/api/users', router);


(async () => {
  await connectDB();
  await User.sync(); 
})();


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
