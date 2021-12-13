// Using ES6 imports
import mongoose from 'mongoose';

// By Danny @Flaminglets
// This page represents the User model/schema.
// Each property has a specified type that is used to collect data.

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        image: String,
        posts : [
            {type: mongoose.Schema.Types.ObjectId, ref:'addpost'}
        ]
    }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
