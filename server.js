const express = require('express'),
    connectDB = require('./config/db');

//Create global app object  
const app = express();

//Connect Database
connectDB(); 

//Inint Middleware 
app.use(express.json({ extended: false}))


//All routes -initialized
app.get('/', (req, res) => res.send('Api Running'))

//Define Routes
app.use('/api/users', require('./routes/api/users')); 
app.use('/api/auth', require('./routes/api/auth')); 
app.use('/api/profile', require('./routes/api/profile')); 
app.use('/api/posts', require('./routes/api/posts')); 

const PORT = process.env.PORT || 5000;

//Finally, lets start our server....
var server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
