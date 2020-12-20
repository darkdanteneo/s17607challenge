const mongoose= require('mongoose');
const schema = mongoose.Schema;

const teamSchema = new schema({
    team_name:{
        type: String,
        required: true,
        unique:true,
        trim: true,
        minlength: 3
    },
    wins:{
        type: Number,
        required: true,
        trim: true
    },
    losses:{
        type: Number,
        required: true,
        trim: true
    },
    ties:{
        type: Number,
        required: true,
        trim: true
    },
    score:{
        type: Number,
        required: true,
        trim: true
    },
},{   
    timestamps: true,
});
module.exports = mongoose.model('Tem', teamSchema);