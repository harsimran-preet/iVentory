const User = require("../models/user");
const asyncHandler = require("express-async-handler");


const registerUser = async(req, res) => {
    const {name, email, password, pic} = req.body;
    res.json({
        name, email,
    });
};

// const registerUser = asyncHandler(async(req, res) => {
//     const { name, email, password, picture} = req.body;

    // const userExists = await User.findOne({email});
    // if (userExists){
    //     res.status(400);
    //     throw new Error("User Already Exists");
    // }
    // const user = await User.create({
    //     name,email,password,pic,
    // });
    // if (user) {
    //   res.status(201).json({
    //     _id: user._id,
    //     name: user.name,
    //     email: user.email,
    //     isAdmin: user.isAdmin,
    //     pic: user.pic,
    //   });
    // } else {
    //   res.status(400);
    //   throw new Error("Error Occured!");
    // }
//     res.json ({
//         name, email
//     });
// });


// const authUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   const user= await User.findOne({email});
//   if(user&& (await user.mat))


// });
module.exports={registerUser};