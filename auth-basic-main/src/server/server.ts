import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import { PostModel } from "./schemas/post.schema.js";
import { UserModel } from "./schemas/user.schema.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
//import * as socketIO from "socket.io";
import http from 'http';
import dotenv from "dotenv";
import { authHandler } from "./middleware/auth.middleware.js";
import { FoodModel } from "./schemas/food.schema.js";
import { CartModel } from "./schemas/cart.schema.js";
dotenv.config();
const access_secret = process.env.ACCESS_TOKEN_SECRET as string;
console.log(access_secret);
const app = express();
// const server = http.createServer(app);
// const io = new socketIO.Server(server,  { cors: {
//   origin: '*'
// }});



const saltRounds = 10;


const PORT = 3000;

mongoose
  .connect("mongodb://localhost:27017/restaurantDB")
  .then(() => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => console.log("Failed to Connect to DB", err));

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:3501', 'http://localhost:8080']
}));
app.use(express.json());

app.get("/", function (req, res) {
  res.json({ message: "test" });
});

app.get("/posts", function (req, res) {
  PostModel.find()
    .then((data) => res.json({ data }))
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});

app.get("/users", authHandler, function (req: any, res) {
  UserModel.find({email:req.user.email}, '-password')
    .then((data) => res.json({ data }))
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});

app.post("/create-user", function (req, res) {
  const { name, email, username, password } = req.body;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      const user = new UserModel({
        name,
        username,
        email,
        password: hash,
      });
      user
        .save()
        .then((data) => {
          res.json({ data });
        }).then(()=>{
          const cart = new CartModel({
            user: user._id,
          })
          cart.save()
        })
        .catch((err) => {
          res.status(501);
          res.json({ errors: err });
        });
    });
  });
});

app.post("/create-post", function (req, res) {
  const { title, body } = req.body;
  const post = new PostModel({
    title,
    body,
  });
  post
    .save()
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});

app.delete("/delete-user/:id", function (req, res) {
  const _id = req.params.id;
  UserModel.findByIdAndDelete(_id).then((data) => {
    console.log(data);
    res.json({ data });
  });
});

app.put("/update-user/:id", function (req, res) {
  console.log("Update user");
  UserModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: { name: req.body.name, email: req.body.email },
    },
    {
      new: true,
    },
    function (err, updateUser) {
      if (err) {
        res.send("Error updating user");
      } else {
        res.json(updateUser);
      }
    }
  );
});

app.post("/login", function (req, res) {
  const { email, password } = req.body;
console.log("Login Information", req.body)
  UserModel.findOne({ email })
    .then((user) => {
        console.log("LOGIN USER",user);
      
      bcrypt.compare(password, `${user?.password}`, function (err, result) {
        if (result) {
          console.log("It matches!");
          const accessToken = jwt.sign({user}, access_secret)
          console.log("Token", accessToken)
          res.cookie('jwt', accessToken, {
              httpOnly: true,
              maxAge: 60*60*1000,
          })
          // res.json({message: 'Successfully Logged In', user})
          res.json({data:user})
        } else {
          res.sendStatus(403);
        }
      });
    })
    .catch((err) => {
      return res.sendStatus(404);
    });
});


// Logout

app.get('logout', authHandler, function(req, res){
    res.cookie('jwt', '', {
        httpOnly: true,
        maxAge: 0,
    })
    res.json({message: 'Successfully Logged Out'})
});

//Check if the user Login 

app.get('/check-login', authHandler, (req, res) => {
  res.json({message: 'yes'});
})


//create food

app.post("/create-food", function (req, res) {
  const {foodName, img,foodPrice } = req.body;
     const food = new FoodModel({
      foodName,
      img,
      foodPrice,
      });
      food.save()
        .then((data: any) => {
          res.json({ data });
        })
        .catch((err) => {
          res.status(501);
          res.json({ errors: err });
        });
    });


// get foods

app.get("/foods",authHandler, function (req, res) {
  FoodModel.find()
    .then((data) => res.json({ data }))
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});

//Delete food
app.delete("/delete-food/:id", function (req, res) {
  const _id = req.params.id;
  FoodModel.findByIdAndDelete(_id).then((data) => {
    console.log(data);
    res.json({ data });
  });
});


//Update cart
app.put("/update-cart",authHandler, function (req:any, res) {
  
  console.log("Login User", req.user)

  CartModel.findOneAndUpdate(
    {user:req.user._id},
    {
      $push: { items:req.body._id },
    },
    {
      new: true,
    },
    function (err, updateCart) {
      if (err) {
        res.send("Error updating cart");
      } else {
        res.json(updateCart);
      }
    }
  );
});

// Get cart
app.get("/cart", authHandler, function (req: any, res) {
  CartModel.findOne( 
    {user:req.user._id}
  ).populate('items')
    .then((data) => res.json({ data }))
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});

// Delete cart
  app.put("/delete-cart/:id",authHandler, function (req:any, res) {
    CartModel.findOneAndUpdate(
      {user:req.user._id},
      {
        $pull: { items:req.params.id },
      },
      {
        new: true,
      },
      function (err, deleteCart) {
        if (err) {
          res.send("Error updating cart");
        } else {
          res.json(deleteCart);
        }
      }
    );
  });



app.listen(PORT, function () {
  console.log(`starting at localhost http://localhost:${PORT}`);


});


// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.emit('message', 'work')
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });

