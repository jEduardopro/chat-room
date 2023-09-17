import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
	name: { type: String, required: true, lowercase: true, trim: true, unique: true },
	pic: { type: String, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
}, {
	timestamps: true
})

UserSchema.set('toJSON', {
	transform: (doc, obj) => {
		obj.id = obj._id
		delete obj.__v
		delete obj._id
	}
})

const User = mongoose.model('User', UserSchema)

export default User