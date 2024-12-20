const { hashPassword, verifyPassword } = require("../utils/password");
const { generateToken, verifyToken } = require("../utils/jwt");
const User = require("../models/user");

//register
const registerUser = async (req, res) => {
  const { username, password,email,mobile} = req.body;
  try {
    
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }


    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({ username,email, password: hashedPassword,mobile });

    
    res.status(201).json({ message: "User registered successfully", user: newUser });
    newUser.save()
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

//login
const loginUser = async (req, res) => {
  const { username, password} = req.body;
  try {
    
    const user = await User.findOne({ where: { username } });
    if (!user ){
      return res.status(401).json({ message: "Incorrect user" });
    }
    
    const passwordValid=await verifyPassword(password, user.password)
    if(!passwordValid){
        return res.status(404).json("Incorrect password")
    }

    
    const token = generateToken({ id: user.id, username: user.username });

    
    req.session.token=token;
    
    res.status(201).json({message:"login successful",token})
   
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
};
//update
const updateUser = async (req, res) => {
  const { id } = req.params; 
  const { username, email,password,mobile} = req.body; 

  try {
    
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if(username){
      user.username=username;
    }
   if(email){
    user.email=email;
   }
    if(password){
      const hashedPassword = await hashPassword(password);
      user.password=hashedPassword;
    }
    if(mobile){
      user.mobile=mobile;
    }
    
    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: " error", error });
  }
};

const getall=async(req,res)=>{
  try{
    const users=await User.findAll();
    return res.json({data:users});
  }catch(err){
         res.status(404).json({message:"error"})
  }
 
  };

//getprofile
const getProfile = async (req, res) => {
  if (!req.session || !req.session.token) {
    return res.status(401).json({ message: "Session expired. Please log in again." });
  }

  const authHeader = req.headers.authorization; 
  let token;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]; 
  } else if (req.session.token) {
    token = req.session.token; 
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. No token found." });
  }

  const decoded = verifyToken(token); 
  if (!decoded) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }

  try {
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving profile.", error });
  }
};



//delete
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

module.exports = { registerUser, loginUser,getall, updateUser,getProfile,deleteUser};

