const mongoose = require('mongoose');
const crypto = require('crypto');

const randomTokenSchema = new mongoose.Schema({
    isValid: {
        type: Boolean,
        default: true, // Use default instead of value
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    accessToken: {
        type: String,
        default: function () {
            // Generate a random token when a new document is created
            return crypto.randomBytes(20).toString('hex');
        },
    },
}, {
    timestamps: true, // Correct the field name to timestamps
});

const RandomToken = mongoose.model('RandomToken', randomTokenSchema);
module.exports = RandomToken;
