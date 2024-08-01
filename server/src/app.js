import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import path from 'path';
import cookieParser from 'cookie-parser';


import homeRouter from "./routes/home.routes.js";
import videoRouter from "./routes/video.routes.js";

const app= express();
app.use(bodyParser.json());
app.use(
    cors({
        origin:'http://localhost:5173',
        credentials:true
    })
);

const __dirname= path.resolve();  //for hosting purspose only

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

//routes
app.use("/api", homeRouter);
app.use("/api/video", videoRouter);

app.use(express.static(path.join(__dirname, "/client/dist"))); //for hosting purpose only
app.get('*', (req, res)=>{  //for hosting purpose only
    res.sendFile(path.join(__dirname, "client", "dist", "index.html")) 
})

export {app};