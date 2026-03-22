const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./modules/chat.js");
const methodOverride = require("method-override");


app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // parse form data

async function startServer() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
    console.log("connection Successful");
    app.listen(8080, () => {
      console.log("server is listening to 8080");
    });
  } catch (err) {
    console.error("MongoDB connection failed. Start MongoDB service and try again.");
    console.error(err.message);
    process.exit(1);
  }
}

// index route
app.get("/chats", async (req, res) => {
  const chats = await Chat.find({});
  console.log(chats);

  res.render("index", { chats: chats });
});

// new route
app.get("/chats/new", (req, res) => {
  res.render("new");
});

// create route
app.post("/chats", async (req, res) => {
  const { from, to, msg } = req.body;

  const chat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });

  
  try {
    await chat.save();
    res.redirect("/chats");
  } catch (err) {
    console.log(err);
    res.status(400).send("Unable to save chat");
  }
});


/// edit route
app.get("/chats/:id/edit", async (req, res) => {

    const { id } = req.params;
    const chat = await Chat.findById(id);

    res.render("edit", { chat });
});


// update route 
app.put("/chats/:id", async (req, res) => {

    const { id } = req.params;
    const {msg: Newmsg } = req.body; 
    
    // console.log(Newmsg);
    
    let updatedChat = await Chat.findByIdAndUpdate(id,
       { msg: Newmsg},
       {runValidators: true, new: true });
    console.log(updatedChat);
    res.redirect("/chats");
});


/// Delte route 

app.delete("/chats/:id", async (req, res) => {

    const { id } = req.params;
     let delteChat = await Chat.findByIdAndDelete(id);
     console.log(delteChat);

    res.redirect("/chats");
} );



    app.get("/", (req, res) => {
  res.send(" server is working");
    });

startServer();
