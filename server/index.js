require("dotenv").config();

const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');

const authRoute = require("./routes/auth");
const interviewRoute = require("./routes/interview");

const { verifyUser } = require("./middlewares/auth");
require("./connection")

const port = process.env.PORT || 8000;

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    process.env.CLIENT_URL,
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
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
app.use('/auth', authRoute);
app.use('/interview', verifyUser, interviewRoute);

app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
});
