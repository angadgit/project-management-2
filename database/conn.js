import mongoose from 'mongoose';

const connectMongo = async () => {
    try {
        const { connection } = await mongoose.connect("mongodb+srv://angad:Angad1234@cluster0.5xl6h.mongodb.net/testDB?retryWrites=true&w=majority");

        if(connection.readyState == 1){
            return Promise.resolve(true)
        }
    } catch (error) {
        return Promise.reject(error)
    }
}

export default connectMongo;