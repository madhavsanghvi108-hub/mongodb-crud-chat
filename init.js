const mongoose=require('mongoose');
const chat=require('./models/chats.js');

main()
.then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

const sampleChats = [
    {
        from: "Madhav",
        to: "Rahul",
        msg: "Bhai assignment complete ho gaya?",
        created_at: new Date()
    },
    {
        from: "Rahul",
        to: "Madhav",
        msg: "Haan bhai, abhi bhejta hu.",
        created_at: new Date()
    },
    {
        from: "Anjali",
        to: "Priya",
        msg: "Kal college kitne baje aana hai?",
        created_at: new Date()
    },
    {
        from: "Priya",
        to: "Anjali",
        msg: "9 baje tak aa jana.",
        created_at: new Date()
    },
    {
        from: "Aman",
        to: "Rohit",
        msg: "Cricket khelenge sham ko?",
        created_at: new Date()
    },
    {
        from: "Rohit",
        to: "Aman",
        msg: "Bilkul, 6 baje milte hain.",
        created_at: new Date()
    },
    {
        from: "Neha",
        to: "Simran",
        msg: "Notes mil sakte hain?",
        created_at: new Date()
    },
    {
        from: "Simran",
        to: "Neha",
        msg: "Haan, WhatsApp check karo.",
        created_at: new Date()
    }
];

chat.insertMany(sampleChats);
