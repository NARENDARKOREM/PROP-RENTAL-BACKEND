// dependencies
const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./db');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

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

// routes
const userRoutes = require("./routes/userRoutes");
const countryRoutes = require("./routes/countryRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const couponRoutes = require("./routes/couponRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const extraImagesRoutes = require("./routes/extraImageRoutes");
const facilityRoutes = require("./routes/facilityRoutes");
const faqRoutes = require("./routes/faqRoutes");
const galleryCategoryRoutes = require("./routes/galleryCategoryRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const packageRoutes = require("./routes/packageRoutes");
const pageRoutes = require("./routes/pageRoutes");
const paymentRoutes = require("./routes/paymentRoutes")
const payoutRoutes = require("./routes/payoutRoutes");
const propertyRoutes = require("./routes/propertyRoutes");

// middlewares
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{secure:false}
}));

app.use("/users", userRoutes);
app.use("/countries", countryRoutes);
app.use("/categories",categoryRoutes);
app.use("/coupons", couponRoutes);
app.use("/enquiries", enquiryRoutes);
app.use("/extra-images", extraImagesRoutes);
app.use("/facilities", facilityRoutes);
app.use("/faqs", faqRoutes);
app.use("/gallery-categories", galleryCategoryRoutes);
app.use("/galleries", galleryRoutes);
app.use("/packages", packageRoutes);
app.use("/pages", pageRoutes);
app.use("/payments", paymentRoutes);
app.use("/payouts", payoutRoutes);
app.use("/properties", propertyRoutes);

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

app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
});
