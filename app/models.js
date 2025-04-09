
const mongoose = require('mongoose')
const {Schema} = mongoose

const ticketSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    tickets: [ticketSchema]
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User