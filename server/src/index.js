import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routers/index.js';
import * as database from './config/index.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;
database.connect();
//dung lượng tối đa mà client có thể submit lên server
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', cors());
routes(app);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
