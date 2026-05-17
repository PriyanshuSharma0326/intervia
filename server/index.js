require("dotenv").config();

const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');

const authRouter = require("./routes/auth");
const { verifyUser } = require("./middlewares/auth");
require("./connection")

const port = process.env.PORT || 8000;

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get('/me', verifyUser, (req, res) => {
    return res.json({
        user: req.user
    });
});
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
});
