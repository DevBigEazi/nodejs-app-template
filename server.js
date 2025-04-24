require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const { logger } = require("./middleware/logger");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConnect");

const PORT = process.env.PORT;

//Connect to DB
connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(cookieParser());

// middleware to handle encoded form data
app.use(express.urlencoded({ extended: false }));

// to give rest api ability to process json data
app.use(express.json());

// serving the static files
app.use(express.static("public"));

// base route
app.use("/", require("./routes/root"));

// endpoints
app.use("/api/v1/admin", require("./routes/adminRoute"));

// catch all routes/ error page routes
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.sendFile({ err: "404 Not Found" });
    } else {
        res.type("txt").send("404 Not Found");
    }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, console.log(`Server running on ${PORT}`));
});
