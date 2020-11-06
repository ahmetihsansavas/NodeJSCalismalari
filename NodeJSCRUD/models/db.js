//mongoose kullanarak mongodb baglantısı gerçeklestirilmistir.
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeDB' , {useNewUrlParser:true ,useFindAndModify:false},(err)=>{
    if (!err) {
        console.log('MongoDB Connection Succeeded.');
    }
    else{
        console.log('DB baglanti hatasi : ' + err);
    }
}

);
require('./employee.model');