const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./db');

// models
const User = require('./models/User');
const Country = require('./models/Country');
const Category = require("./models/Category");
const Coupon = require("./models/Coupon");
const Payment =  require("./models/Payment");
const Payout = require("./models/Payout");
const ExtraImage = require("./models/ExtraImage");
const Property = require("./models/Property");
const Facility = require("./models/Facility");
const GalleryCategory = require("./models/GalleryCategory");
const Gallery = require("./models/Gallery");
const Package = require("./models/Package");
const Page = require("./models/Page");
const FAQ = require("./models/FAQ");
const Enquiry = require("./models/Enquiry");

const cookieParser = require('cookie-parser');
const session = require('express-session');
// routes
const userRoutes = require("./routes/userRoutes");
const countryRoutes = require("./routes/countryRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();
const port = 3000;

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{secure:true}
}))

app.use("/users", userRoutes);
app.use("/countries", countryRoutes);
app.use("/categories",categoryRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => {
        console.error('Unable to create the database:', err);
    });

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
