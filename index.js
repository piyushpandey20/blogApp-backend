const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

//routes and mounting
const blog = require("./routes/blog");
app.use("/api/v1", blog);

require('./config/database').dbConnect()

app.listen(PORT,() => {
    console.log(`App is started at ${PORT}`)
})

app.get("/",(req,res) =>{
    res.send(`<h1>This is homepage</h1>`)
})