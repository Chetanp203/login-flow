import UserModel from './../Models/UserModel.js'
import jwt from 'jsonwebtoken'



export const register= async (req,res) =>{
    
    try{
        // const {userData}=req.body
        const {name, number, password}= req.body.userData;
        if (!name || !number || !password )
         return res.json({success:false ,message:"All fields are mandatory.."})

        const ifNumberExist = await UserModel.find({number:number})
        if (ifNumberExist?.length){
            return res.json({success:false ,message:"Number already exists try a different number..."})
        }

        const user = new UserModel({name , number , password});

        await user.save();

        return res.json({success:true,message:"User Registered Succefully..."})



    }catch(error){
        return res.send({success: false,message: error})
    }
}

export const login = async(req,res)=>{
    try{
        // const {userData}=req.body
        const{number, password}= req.body.userData;
        if (!number || !password) return res.json({success:false ,message:"All fields are mandatory.."})
         
        const user = await UserModel.findOne({number})
        console.log(user)
        if (!user) return res.json({success:false ,message:"User not found"})

        if (password == user.password){
            const userCreds = {
                name: user.name,
                number: user.number,
                _id : user._id,
            }
            
            const token = jwt.sign({ userID: user._id}, process.env.JWT_SECRET)
           
            return res.json({success:true ,message:"Login Successfull",user: userCreds,token:token})
        }
        return res.json({success:false ,message:"Password is incorrect"})
    }catch(error){
        return res.json({success:false ,message:error})
    }
}


export const getCurrentUser =async (req,res) =>{
    try{
        const {token} = req.body;
        if(!token) return res.status(404).json({success:false,message:"Token is required"})

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)
         
        if(!decodedData){
            return res.status(404).json({success:false,message:"Not a valid token"})
        }
        // return res.send(decodedData)

        const userId =decodedData?.userID

        const user = await UserModel.findById(userId);

        if(!user){
            return res.status(404).json({success:false,message:"User not found"})
        }
        const userObject = {
            name : user?.name,
            number : user?.number,
            _id: user?._id,
        }

        return res.status(200).json({success:true,user : userObject})

    }catch(error){
        return res.status(500).json({success:false, message:error})
    }
}