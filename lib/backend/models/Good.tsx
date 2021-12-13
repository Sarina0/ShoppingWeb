import mongoose, { Mongoose } from 'mongoose';

// By Sarina

const goodSchema = new mongoose.Schema(
    {
        createdAt: {type: String, default: Date.now()},
        name: String,
        witch: String,
        material: String,
        width: String,
        length: String,
        weight: String,
        location: String,
        description: String,
        images: Array,
        price: Number,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }
)

export default mongoose.models.good || mongoose.model('good', goodSchema)
