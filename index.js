import express from "express";
import cors from "cors";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import db from "./config/Database.js";
import dotenv from "dotenv";
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import DataUmatRoute from "./Routes/DataUmatRoute.js";
import KlentengRoute from "./Routes/KlentengRoute.js";

dotenv.config();
const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// store.sync();

// (async () => {
//   await db.sync();
// })();

app.use(cors({
  credentials: true,
  origin: "http://localhost:3000",
}));

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(express.json());

app.use(AuthRoute);
app.use(UserRoute);
app.use(DataUmatRoute);
app.use(KlentengRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("server started", process.env.APP_PORT);
});
