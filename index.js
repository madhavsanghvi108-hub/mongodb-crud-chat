const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const Chat=require('./models/chats.js');
const { addAbortListener } = require('events');
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.static("public"));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
main()
.then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}



app.get('/chats/new',(req,res)=>{
    res.render("create.ejs");
})
app.get('/chats',async(req,res)=>{
    let chats=await Chat.find();
    console.log(chats);
    res.render("chats.ejs", {chats});
})
app.get('/',(req,res)=>{
    res.send("route is working");
})

app.post("/chats", (req, res) => {
    const { from, to, msg } = req.body;

    const chati = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });

    chati.save()
        .then(() => {
            console.log("Chat Saved!");
            res.redirect("/chats");
        })
        .catch((err) => {
            console.log(err);
            res.send("Error while saving chat");
        });
});

app.get('/chats/:id/edit', async(req,res)=>{
    let {id}=req.params;
    const  chat=await Chat.findById(id);
    res.render("Edit.ejs",{chat});
})

app.patch('/chats/:id',async(req,res)=>{
     let {id}=req.params;
     const {msg}=req.body;
     await Chat.findByIdAndUpdate(id, {
        msg:msg
    });
    res.redirect("/chats");
})

app.delete("/chats/:id", async (req, res) => {
    try {
        let { id } = req.params;

        const deletedChat = await Chat.findByIdAndDelete(id);

        if (!deletedChat) {
            return res.status(404).send("Chat not found");
        }

        res.redirect("/chats");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});
let port=8080;

app.listen(port,()=>{
    console.log("app is listening");
})