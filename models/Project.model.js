const mongoose = require('mongoose')  //import monggose
const {Schema, model} = mongoose;      

const projectShema = new Schema({
    title: String,
    description: String,
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
});

module.exports = model('Project', projectShema)