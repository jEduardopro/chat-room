import mongoose from 'mongoose'

export async function connectDB() {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://mongodb:27017/chat_room')

		console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
		
	} catch (error) {
		console.log(`Error: ${error.message}`.red);
		process.exit()
	}
}