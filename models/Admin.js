const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
    {
        username: {
            type: String,
            minLength: 3,
        },
        password: {
            type: String,
            trim: true,
        },
        roles: {
            Admin: {
                type: Number,
                default: 6160
            },
            Director: Number,
            Lead: Number,
        },
    },
    {
        collection: "admin-data",
    }
);


module.exports = mongoose.model('Employee', adminSchema);