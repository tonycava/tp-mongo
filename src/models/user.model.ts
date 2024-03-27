import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	surveys: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Survey' }]
});
