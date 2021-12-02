import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import { PostModel } from "./schemas/post.schema.js";
import { UserModel } from "./schemas/user.schema.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import http from "http";
import dotenv from "dotenv";
import { authHandler } from "./middleware/auth.middleware.js";
import { FoodModel } from "./schemas/food.schema.js";
import { CartModel } from "./schemas/cart.schema.js";
import Stripe from 'stripe';
import path from 'path';
dotenv.config();

const secret=process.env.ACCESS_SECRET_KEY as string;
const stripe = new Stripe(secret,
{apiVersion:'2020-08-27'});

const access_secret = process.env.ACCESS_TOKEN_SECRET as string;
console.log(access_secret);
const app = express();
// const server = http.createServer(app);
// const io = new socketIO.Server(server,  { cors: {
//   origin: '*'
// }});

const saltRounds = 10;

const PORT = process.env.PORT || 3000;

mongoose
	.connect(`${process.env.MONGO_URL}`)
	.then(() => {
		console.log("Connected to DB Successfully");
	})
	.catch((err) => console.log("Failed to Connect to DB", err));

app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin: [
			"http://localhost:3000",
			"http://localhost:4200",
			"http://localhost:3501",
			"http://localhost:8080",
		],
	})
);
app.use(express.json());
const clientPath = path.join(__dirname, "/dist/client");
app.use(express.static(clientPath));

app.get("/api/posts", function (req, res) {
	PostModel.find()
		.then((data) => res.json({ data }))
		.catch((err) => {
			res.status(501);
			res.json({ errors: err });
		});
});

app.get("/api/users", authHandler, function (req: any, res) {
	UserModel.find({ email: req.user.email }, "-password")
		.then((data) => res.json({ data }))
		.catch((err) => {
			res.status(501);
			res.json({ errors: err });
		});
});

app.post("/api/create-user", function (req, res) {
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
				})
				.then(() => {
					const cart = new CartModel({
						user: user._id,
					});
					cart.save();
				})
				.catch((err) => {
					res.status(501);
					res.json({ errors: err });
				});
		});
	});
});

// Delete user

app.delete("/api/delete-user/:id", function (req, res) {
	const _id = req.params.id;
	UserModel.findByIdAndDelete(_id).then((data) => {
		console.log(data);
		res.json({ data });
	});
});

//Update User
app.put("/api/update-user/:id", function (req, res) {
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

// Login
app.post("/api/login", function (req, res) {
	const { email, password } = req.body;
	console.log("Login Information", req.body);
	UserModel.findOne({ email })
		.then((user) => {
			console.log("LOGIN USER", user);

			bcrypt.compare(password, `${user?.password}`, function (err, result) {
				if (result) {
					console.log("It matches!");
					const accessToken = jwt.sign({ user }, access_secret);
					console.log("Token", accessToken);
					res.cookie("jwt", accessToken, {
						httpOnly: true,
						maxAge: 60 * 60 * 1000,
					});
					// res.json({message: 'Successfully Logged In', user})
					res.json({ data: user });
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

app.get("/api/logout", authHandler, function (req, res) {
	console.log("LOGOUT");
	res.cookie("jwt", "", {
		httpOnly: true,
		maxAge: 0,
	});
	res.json({ message: "Successfully Logged Out" });
});

//Check if the user Login

app.get("/api/check-login", authHandler, (req, res) => {
	res.json({ message: "yes" });
});

//create food

app.post("/api/create-food", function (req, res) {
	const { foodName, img, foodPrice } = req.body;
	const food = new FoodModel({
		foodName,
		img,
		foodPrice,
	});
	food
		.save()
		.then((data: any) => {
			res.json({ data });
		})
		.catch((err) => {
			res.status(501);
			res.json({ errors: err });
		});
});

// get foods

app.get("/api/foods", authHandler, function (req, res) {
	FoodModel.find()
		.then((data) => res.json({ data }))
		.catch((err) => {
			res.status(501);
			res.json({ errors: err });
		});
});

//Delete food
app.delete("/api/delete-food/:id", function (req, res) {
	const _id = req.params.id;
	FoodModel.findByIdAndDelete(_id).then((data) => {
		console.log(data);
		res.json({ data });
	});
});

//************************************************************************************************ */
app.put("/api/update-cart", authHandler, function (req: any, res) {
	CartModel.findOne({ user: req.user._id })
		.populate("items.food")
		.then((cart) => {
			console.log(cart, "Cart");
			if (cart) {
				console.log(req.body, req.body._id, cart.items[0]);
				const item = cart.items.find((item) => item.food._id == req.body._id);
				console.log(item, "item");
				if (item) {
					item.quantity++;
				} else {
					cart.items.push({ food: req.body._id, quantity: 1 });
				}
				cart.save().then((updatedCart) => res.json(cart));
			}
		});
});

///////////////////////////////////////////////////////////

app.put("/api/remove-cart-item", authHandler, function (req: any, res) {
	console.log("remove from cart Cart", req.user);
	CartModel.findOne({ user: req.user._id }).then((cart) => {
		if (cart) {
			const item = cart.items.find((item) => item.food == req.body._id);
			if (item) {
				item.quantity--;
				if (item.quantity < 1) {
					cart.items.splice(
						cart.items.findIndex((ii) => ii == item),
						1
					);
				}
			}
			cart?.save().then((updatedCart) => {
				CartModel.populate(updatedCart, "items.food").then((populatedCart) => {
					res.json(populatedCart);
				});
			});
		}
	});
});

// Get cart Items
app.get("/api/cart", authHandler, function (req: any, res) {
	CartModel.findOne({ user: req.user._id })
		.populate("items.food")
		.populate("user")
		.then((data) => res.json({ data }))
		.catch((err) => {
			res.status(501);
			res.json({ errors: err });
		});
});

//create order
// app.post("/create-order",
// orderProcess.createOrder,
// orderProcess.emptyCart
// );

app.put("/api/empty-cart/:id", authHandler, function (req: any, res) {
	CartModel.findOneAndUpdate(
		{ user: req.user._id },
		{
			$set: { items: [] },
		},
		{
			new: true,
		},
		function (err, emptyCart) {
			if (err) {
				res.send("Error empty food list from cart");
			} else {
				res.json(emptyCart);
				console.log("empty food", emptyCart);
			}
		}
	);
});

//stripe
app.post("/api/payment", (req, res) => {
	stripe.charges.create(
		{
			amount: req.body.amount,
			currency: "USD",
			description: "payments",
			source: req.body.id,
		}
	).then(charges=>{
    res.json({charges})
  }).catch(error=>{
    console.log(error)
    res.sendStatus(501)
  })
	console.log(req.body);
});


// Delete cart Items
app.put("/api/delete-cart/:id", authHandler, function (req: any, res) {
	CartModel.findOneAndUpdate(
		{ user: req.user._id },
		{
			$pull: { items: req.params.id },
		},
		{
			new: true,
		},
		function (err, deleteItemFromCart) {
			if (err) {
				res.send("Error delete Items from cart");
			} else {
				res.json(deleteItemFromCart);
			}
		}
	).populate("items");
});

app.all("/api/*", function (req, res) {
	res.sendStatus(404);
  });
  app.get("*", function (req, res) {
	const filePath = path.join(__dirname, "/dist/client/index.html");
	console.log(filePath);
	res.sendFile(filePath);
  });
  


app.listen(PORT, function () {
	console.log(`starting at localhost http://localhost:${PORT}`);
});
