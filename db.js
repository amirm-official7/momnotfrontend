const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const datesSchema = new Schema({
    week: {
        type: 'Number',
        unique : true,
        required: true
    },
    percentage: {
        type: 'Number',
        required: true
    },
    expectedP : {
        type: 'Number',
        required: true
    },
    money: {
        type: 'Number',
        required: true
    }
  
})
  

const dates = mongoose.model('dates',datesSchema);



module.exports = { dates }