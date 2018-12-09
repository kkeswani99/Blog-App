var express          = require("express"),
	methodOverride   = require("method-override"),
	expressSanitizer = require("express-sanitizer"),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    app              = express();

//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
//MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);


// Blog.create({
// 	title: "Test Blog",
// 	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAllBMVEX/mTMSiAf///8AgQD/lycAAIgAAIUAAH4AAIIAAHMAAHzi4u+kpMvz8/kAAHjg4O/n5/Lt7fV/f7eZmcX6+v65uddSUqTLy+FERJzIyOJiYqna2uogIJCAgLqxsdNUVKU+PpoYGJCGhrsnJ5KTk8IQEIx2drRpaaxKSp+QkMCqqs8zM5dfX6i/v9qiosstLZQ7O5goKJnFqDfbAAAErElEQVR4nO3bbXOiSBSG4WzP9Iu8gwgoQhSTUTGa7P//c3saEqc2JzOT/bB0qnyuqjhq/NDeAw1i5+4OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOA/+g7v3Ql4D004NOHQhEMTDk24r9AkWRxXm63cblbHReJ6MOILNPGPO22MUlJKpYzR66PvekiOm5SFNopiSKW1Hu5Iow+l20E5bZIU2kZQTz+8Q1qnB+/HkzK0vejC6S7kssnFbhnGzEUozqmoRXqme3NjNxw9dzguh03uDb33rD+lYthXFvamFOmp76iVuXc3MGdNwjVtDpWf2/utvQmu93K/ot+tQ1dDc9UkfKRtgfaQpX2wjOnmSD/x+FDMNW1Dj66iOGqS01Zi+iYVeU+Pwge6eaKfB5uhz0Xa9BRlnbsZnKMmBSU5D/cu9hBT0M/z67/JZXj+TFEKN4Nz02RupGnFGMVOpisKIynH6vUxJREtvcbN0cdJE1/TEacbpxAR0N4T0JvXlIrm2X6Ya+k39uijnZzTOmlyUOrwkNKdvZ0xZCjqtci9XKxrEdLmInL7fPpgX+ZieC6aLLXU44lqeKJJtT2IPErDKEyjXBxa++w4uSb0Ohen+S6abJTq8uGoK1JJe4daiF1ATYKdWCjas2Q6/G6Zd0pVDsbnoEms7QQr+n544NWi1SLbpFG6yYRuRe3Zs5VhXqFpVsfTD9BBk46Ow/a/PylslXJ2FnK/9OIo9pZ7Kc4zu7u0hZ1dKzr0dNMP0EGTRzrGjqeoF0nby2LWl7NE16bWyazsZ/S5ZyHHc5SUjtnb6Qc4fRM6EMu3+2ElFyKYnbOuK7dl1zXn2YWKbNK3F0gXh+Ppm7RG7cNluxw3ldZT5Tnyd3XQBPXOj87lozd8EBR52ZbhXpl28hFO3yRTqqF/4mOxCmo66O5nmb/zm+qlauJdnM1W9Fzd74tjTa9qlMomH+H0Te6V9MazjmS+jnbZMul28cFeSDIHf5clZXeKHh/GPab0pJr+Qsr0TZ6VKq5XAdLLi6e7ujHSMk191N7L5XrlMSyUep58hNM3obd+TZKHYRrXZVCpoYmqLmUdp2F4vUgQmp8T8mScNEnqRTDfn6T2vCiKzLZ5kaOXbm3omcjT8u/7Y9CW8c00wXbyzh/nk9PtzSc/jzs+jjuvsvGU49PnJ93kI8R5LIfPO5yDz8Vb+lw8vml8Ln7Tmc9eP9nczPUTXGf7QIXrsUz5yev2/g1dt79+v5OvfvX9jri173fwPeBH8H3xB+y6gmFhEtYVXI3rT7Jfrj/JbnD9CdYpfSRc09uuYqxn+5dx3WPA1z1mt7ruUfx+fezF4biwjprDensOf5fBOW8ihr/f2Q9/v7M/LtI/v/x/9xWafDVowqEJhyYcmnBowt19g/fu/oL30IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NuH8Az4kkIcXXSpAAAAAASUVORK5CYII=",
// 	body: "HELLO THIS IS A BLOG POST!"
// });

//RESTFUL ROUTES

app.get("/", function(req,res){
	res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", function(req,res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log("ERROR!!");
		}
		else
		{
			res.render("index", {blogs: blogs});
		}
	})
});


//NEW ROUTE
app.get("/blogs/new", function(req,res){
	res.render("new");
});

//CREATE ROUTE
app.post("/blogs", function(req,res){
	//create a blog 
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new");
		}
		else
		{
			// redirect to index
			res.redirect("/blogs");
		}
	})
	
});
// SHOW ROUTE
app.get("/blogs/:id", function(req,res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		}
		else
		{
			res.render("show", {blog: foundBlog});
		}
	})
});

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req,res){
	Blog.findById(req.params.id, function(err,foundBlog){
		if(err)
		{
			res.redirect("/blogs");
		}
		else
		{
			res.render("edit", {blog: foundBlog});
		}
	})
});

//UPDATE ROUTE
app.put("/blogs/:id", function(req,res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err)
		{
			res.redirect("/blogs");
		}
		else
		{
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

//DELETE ROUTE
app.delete("/blogs/:id", function(req,res){
	//destroy blog
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err)
		{
			res.redirect("/blogs");
		}
		else
		{
			res.redirect("/blogs");
		}
	});
	//redirect somewhere
});
app.listen(3000, function(){
	console.log("Server has started");
});