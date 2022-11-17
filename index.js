const express = require("express");
const mongo = require("./connect");
const dotenv = require("dotenv");
const registerRouter = require("./routers/registerRouter");
const auth = require("./modules/authModule");
const leads = require("./routers/leadsRouter");
const services = require("./routers/servicereqRouter");
const cors = require("cors");

dotenv.config();
mongo.connect();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/register",registerRouter);
app.use("/",auth.authenticateUser);
app.use("/leads", leads);
app.use("/services",services);

app.listen(process.env.PORT);