const mongoose = require("mongoose");
const Chat = require("./modules/chat.js");
main().then(()=>{
    console.log("connection Successful")
})
.catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


let allchats = [

   {
    from:"neha",
    to:"rahul",
    msg: "hi can you send the homework",
    created_at: new Date(),

},

   {
    from:"navid",
    to:"sufyan",
    msg: "Nice to meet you",
    created_at: new Date(),

},

   {
    from:"jack",
    to:"william",
    msg: "hi how are you",
    created_at: new Date(),

},

   {
    from:"usama",
    to:"qasim",
    msg: "hi How are you",
    created_at: new Date(),
   }

];



 Chat.insertMany(allchats);
  

