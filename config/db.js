const moongose = require('mongoose')
require('dotenv').config(); 


const connectDB = async () => {
  try {
    await moongose.connect(process.env.MONGODB_URI , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
     console.log("MongoDB is Connected..."); 
  } catch(err) {
    console.log(err.message)
    
    //Exit process with failure
    process.exit(1)

  }
}

module.exports = connectDB; 
