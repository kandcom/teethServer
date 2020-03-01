const {validationResult} = require('express-validator');
const { Patient } = require('../models')
function PatientController() {

}
//контроллер
const create = function(req, res){
    const data = {
        fullname: req.body.fullname,
        phone: req.body.phone,
    }
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(500).json({
            success: false,
            errors: errors.array()
        })
    }
    Patient.create(data, function(err, doc){
        if(err) {
            return res.status(500).json({
                success: false,
                message: err
            })
        }
        res.status(201).json({
            success: true,
            data: doc
        })
    })
}
//PatientController.prototype.all = function(req, res)  {
const all = function(req, res)  {
    Patient.find({}, function(err, docs){
        if(err) {
            return res.status(500).json({
                success: false,
                message: err
            })
        }
        res.status(201).json({
            success: true,
            data: docs
        })
    })
}

const remove = async function(req, res){
    console.log(req.params);
    const id = req.params.id;
    const patient = await Patient.findOne({_id: id})
    if(!patient){
        return res.status(404).json({
            success: false,
            message: 'Пациент не найден'
        })
    }
    Patient.deleteOne({_id: id}, (err) => {
        if(err){
            return res.status(500).json({
                success: false,
                message: err
            })
        }
        res.json({
            success: true,
        })
    })
}

const update =  function(req, res){
    const patienttId = req.params.id;
    
    const errors = validationResult(req);
    const data = {
        fullname: req.body.fullname,
        phone: req.body.phone
    }
    if(!errors.isEmpty()){
        return res.status(422).json({
            success: false,
            message: errors.array()
        })
    }
    //$set это такая специальная штука с помощью которой обновляешь
    Patient.updateOne({_id: patienttId}, {$set: data}, function(err, doc){
        if(err) {
            return res.status(500).json({
                success: false,
                message: err
            })
        }
        if(!doc){//не найден документ
            return res.status(404).json({
                success: false,
                message: 'Пациент не найден'
            })
        }
        res.status(200).json({
            success: true,
            data: doc
        })
    })
}

const show = async function(req, res){
    const id = req.params.id;
    // Patient.findById({_id: id}, (err, doc) => {
    //     console.log(doc);
    //     if(err){
    //         return res.status(404).json({
    //             success: false,
    //             message: 'Не верный Id пользователя'
    //         })
    //     }
    //     res.status(200).json({
    //         success: true,
    //         message: doc
    //     })
    // })
    try{
        const patient = await Patient.findById(id).exec();
        res.status(200).json({
            success: true,
            data: patient
        })
    }catch(e){
        res.status(404).json({
            success: false,
            message: 'Пациент не найден'
        })
    }
    
    
    console.log(patient);    
}
PatientController.prototype = {
    all,
    create,
    update,
    remove,
    show
}
console.log(PatientController.prototype)
// в прототип помещаем объект у которого есть 2 свойства
module.exports = PatientController;