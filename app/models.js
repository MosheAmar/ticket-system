
const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    tickets: {
        type: Object,
        default: [],
    }
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User