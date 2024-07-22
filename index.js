const port = 9000;
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const Users = require('./Models/ProductModel');
const loginusers = require('./Models/LoginModel');
const jwt = require('jsonwebtoken');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/images', express.static('images')); // Static directory for serving images

// Connect to MongoDB
mongoose.connect('mongodb+srv://Hamza:2vFfwKwATPXWmJy8@social.0drhd5s.mongodb.net/Adminpanel')
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err));

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/tmp'); // Save files to /tmp directory on Vercel
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// File upload route
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: 'No file uploaded' });
    }

    res.json({
        success: 1,
<<<<<<< HEAD
        image_url: `https://backend-w1zs.vercel.app/images/${req.file.filename}`
=======
        image_url: `https://backend-w1zs.vercel.app/images/${req.file.filename}` // Update this URL if using cloud storage
>>>>>>> 68381528d8a388ef81f11688cc133e37155d412f
    });
});

// Serve files from /tmp (for local testing only)
app.get('/images/:filename', (req, res) => {
    const filePath = path.join('/tmp', req.params.filename);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ success: 0, message: 'File not found' });
    }
});

// Add product route
app.post('/addproducts', upload.single('image'), async (req, res) => {
    const { name, category, old_price, new_price } = req.body;

    const product = new Users({
        name: name,
        category: category,
        old_price: old_price,
        new_price: new_price,
        id: Date.now(),
<<<<<<< HEAD
        image: `https://backend-w1zs.vercel.app/addproducts/images/${req.file.filename}`
    })
    res.status(200).json(database)
})

///////////////////////////////////////////////////////



app.get('/addproducts', async (req, res) => {
    // const newid = await Users.countDocuments()
    // console.log(newid + 1)
    const getelement = await Users.find()
    res.json(getelement)


})

///////////////////////////////////////////////////////



app.delete('/addproducts/:id', async (req, res) => {
    const { id } = req.params
    console.log('the id is', id)
    const deleteitem = await Users.findByIdAndDelete({ _id: id })
    res.status(203).json(deleteitem)
})
///////////////////////////////////////////////
// Popular in Women 

app.get('/newcollection', async (req, res) => {
    const newcommectoin = await Users.find()
    res.json(newcommectoin.slice(-8).slice(-8))

})


///////////////////////////////////////////////////////
app.post('/signup', async (req, res) => {
    const { Username, email, password, cart } = req.body;

    const duplicateEmail = await loginusers.findOne({ email: email })
    if (duplicateEmail) {
        res.json({ message: "Email Alreay in Use !" })
=======
        image: `https://backend-w1zs.vercel.app/images/${req.file.filename}` // Ensure this URL is valid
    });
>>>>>>> 68381528d8a388ef81f11688cc133e37155d412f

    try {
        await product.save();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ success: 0, message: 'Error adding product' });
    }
});

// Get products route
app.get('/addproducts', async (req, res) => {
    try {
        const products = await Users.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ success: 0, message: 'Error fetching products' });
    }
});

// Delete product route
app.delete('/addproducts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Users.findByIdAndDelete(id);
        res.status(203).json(deletedProduct);
    } catch (error) {
        res.status(500).json({ success: 0, message: 'Error deleting product' });
    }
});

// New collection route
app.get('/newcollection', async (req, res) => {
    try {
        const products = await Users.find();
        res.json(products.slice(-8)); // Returns the last 8 products
    } catch (error) {
        res.status(500).json({ success: 0, message: 'Error fetching new collection' });
    }
});

// Signup route
app.post('/signup', async (req, res) => {
    const { Username, email, password } = req.body;

    try {
        const duplicateEmail = await loginusers.findOne({ email: email });
        if (duplicateEmail) {
            return res.json({ message: 'Email Already in Use!' });
        }

        if (Username && email && password) {
            const newUser = new loginusers({
                Username: Username,
                email: email,
                password: password,
                cart: [],
                id: Date.now()
            });
            await newUser.save();

            const token = jwt.sign({ id: newUser.id }, 'secret_ecom');
            res.json({ success: true, token, message: 'Successfully Signed in!' });
        } else {
            res.json({ success: false, message: 'Please Provide All Details!' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error during signup' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await loginusers.findOne({ email: email });
        if (user) {
            const isPasswordValid = user.password === password;
            if (isPasswordValid) {
                const token = jwt.sign({ id: user.id }, 'secret_ecom');
                res.json({ success: true, token });
            } else {
                res.json({ success: false, errors: 'Wrong Password' });
            }
        } else {
            res.json({ success: false, errors: 'Email Not Found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error during login' });
    }
});

// Get users route
app.get('/users', async (req, res) => {
    try {
        const users = await loginusers.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching users' });
    }
});

// Delete user route
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await loginusers.findByIdAndDelete(id);
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting user' });
    }
});

// Middleware for authentication
const fetchUsers = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ success: false, errors: 'Please authenticate using a valid token.' });
    }

    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.loginusersdata = data;
        next();
    } catch (err) {
        res.status(401).send({ errors: err.message });
    }
};

// Cart routes
app.post('/cart', fetchUsers, async (req, res) => {
    try {
        await loginusers.updateOne(
            { id: req.loginusersdata.id },
            { $push: { cart: req.body } },
            { new: true }
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating cart' });
    }
});

app.post('/getcart', fetchUsers, async (req, res) => {
    try {
        const user = await loginusers.findOne({ id: req.loginusersdata.id });
        res.json(user);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching cart' });
    }
});

app.delete('/getcart/:id', fetchUsers, async (req, res) => {
    try {
        const updatedUser = await loginusers.findOneAndUpdate(
            { id: req.loginusersdata.id },
            { $pull: { cart: { _id: req.params.id } } },
            { new: true }
        );
        res.json(updatedUser.cart);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error removing item from cart' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
