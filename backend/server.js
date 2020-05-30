if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

const express = require('express');
const port = 8080;
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//Initialization
const app = express();
  require("./DB/database");

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

//Controllers
const UserController = require("./controllers/UserController");
const ReviewController = require("./controllers/ReviewController");


//Routes
app.post("/login", UserController.login);
app.post("/register", UserController.register);
app.post("/review-form", ReviewController.addReview);

//Api Routes
app.get('/api/users', UserController.getUserList);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});