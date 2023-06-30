const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./src/routes/auth.routes.js")
const taskRoutes = require("./src/routes/task.routes.js")



const app = express();
const corsConfig = {
    origin: true,
    credentials: true,
};
app.use(cors(corsConfig));

app.use(express.json());
app.options("*", cors(corsConfig));


app.use("/auth", authRoutes)
app.use("/task", taskRoutes)


// connect with mongodb

const PORT = process.env.PORT || 8080;
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(PORT, () => console.log(`server has been connected to ${PORT}`))
    })
    .catch((error) => console.log(error, `did not connect to ${PORT}`))


