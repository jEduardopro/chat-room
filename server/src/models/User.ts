import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	pic: { type: String, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
}, {
	timestamps: true
})

const User = mongoose.model('User', UserSchema)

module.exports = User