const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

// index de gösterilecek sayfa
router.get('/', (req,res)=>{
    res.render("././employee/addOrEdit.hbs" ,{
        viewTitle : "Insert Employee"
    });
});
//Db ye veri gönderirken POST metoodu kullanılır
router.post('/', (req,res)=>{
    if (req.body._id == '') {
        insertRecord(req,res);
    }
    else{
        updateRecord(req,res);
    }
    
});
//Db ye yeni kayıt ekleme fonksiyonu
function insertRecord(req,res) {
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err,doc)=>{
        if (!err) {
            res.redirect('employee/list');
        }
        else{
            if (err.name == 'ValidationError') {
                handleValidationError(err,req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee : req.body
                });
            }
            console.log('Error during record insertion : ' + err);
        }
    });
    
}
// tüm kayıtları getirme
router.get('/list', (req,res)=>{
    
    Employee.find((err,docs)=>{
        if (!err) {
            res.render("employee/list", {
                list: docs
            } );
        }
        else{
            console.log('Error in retrieving employee list :' + err);
        }
    });
});

//kayıt formundaki error kontrolü
function handleValidationError(err,body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullNameError':
                body['fullNameError'] = err.errors[field].message;
                break; 
            case 'email':
                body['emailError'] = err.errors[field].message;
                break; 
            default :
                break;
        }
    }
}
function updateRecord(req,res) {
    Employee.findOneAndUpdate({_id:req.body._id},req.body,{new:true} , (err,doc)=>{
        if (!err) {
            res.redirect('employee/list');
        }
        else{
            if (err.name == 'ValidationError') {
                handleValidationError(err,req.body);
                res.render("employee/addOrEdit" , {
                    viewTitle : 'Update Employee',
                    employee : req.body
                })
            }
            else{
                console.log('Error during record update :' + err);
            }
        }
    });
}

router.get('/:id', (req,res)=>{
    Employee.findById(req.params.id , (err,doc)=>{
        if (!err) {
            res.render("employee/addOrEdit", {
                viewTitle : "Update Employee",
                employee : doc
            })
        }
    })
});

router.get("/delete/:id" , (req,res)=>{
    Employee.findByIdAndRemove(req.params.id ,(err,doc)=>{
        if (!err) {
            res.redirect('/employee/list');
        }
        else{
            console.log("error in employee delete :" + err);
        }
    }); 
})
module.exports = router;