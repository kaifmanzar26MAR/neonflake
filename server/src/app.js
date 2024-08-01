import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import path from 'path';
import cookieParser from 'cookie-parser';


import homeRouter from "./routes/home.routes.js";
import videoRouter from "./routes/video.routes.js";

const app= express();
app.use(bodyParser.json());
// app.use(
//     cors({
//         origin:'https://neonflake-2wu9.onrender.com',
//         credentials:true
//     })
// );

const allowedOrigins = ['https://neonflake-2wu9.onrender.com', 'https://66aba13eab8c740d061f6117--soft-bavarois-f74c66.netlify.app', 'http://localhost:5173'];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));

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