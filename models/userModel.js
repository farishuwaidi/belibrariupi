const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true,"Please enter your name"]
        },
        nim: {
            type: Number,
            required: true
        },
        prodi: {
            type: String,
            required: [true, "Please enter the prodi"]
        },
        image: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema);

module.exports = User;