import mongoose from 'mongoose';
const connect = async function() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("DB connected")
    } catch(err) {
        console.log(err)
    }
}

export default connect