const {validationResult} = require('express-validator');
const { Appointment, Patient} = require('../models')
function AppointmentController() {

}
const create = async function(req, res){
    const errors = validationResult(req);
    const data = {
        patient: req.body.patient,
        dentNumber: req.body.dentNumber,
        diagnosis: req.body.diagnosis,
        price: req.body.price,
        date: req.body.date,
        time: req.body.time
    }
    if(!errors.isEmpty()){
        return res.status(422).json({
            success: false,
            message: errors.array()
        })
    }
    // const patient = await Patient.findOne({_id: data.patient})
    // if(!patient){
    //     return res.status(404).json({
    //         success: false,
    //         message: "Пациент не найден"
    //     })
    // }
    try{
        await Patient.findOne({_id: data.patient})
    }catch(e){
        return res.status(404).json({
            success: false,
            message: 'Пациент не найден'
        })
    }
    Appointment.create(data, function(err, doc){
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

const remove = async function(req, res){
    console.log(req.params);//в index.js delete ..../id 
    //query ?name=anton&password=33;
    const id = req.params.id;
    const patient = await Appointment.findOne({_id: id})
    if(!patient){
        return res.status(404).json({
            success: false,
            message: 'Записи на прием не найдено'
        })
    }
    Appointment.deleteOne({_id: id}, (err) => {
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

const update = async function(req, res){
    const appointmentId = req.params.id;
    
    const errors = validationResult(req);
    const data = {
        dentNumber: req.body.dentNumber,
        diagnosis: req.body.diagnosis,
        price: req.body.price,
        date: req.body.date,
        time: req.body.time
    }
    if(!errors.isEmpty()){
        return res.status(422).json({
            success: false,
            message: errors.array()
        })
    }
    //$set это такая специальная штука с помощью которой обновляешь
    Appointment.updateOne({_id: appointmentId}, {$set: data}, function(err, doc){
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

const all = function(req, res)  {
    Appointment.find({})
    .populate('patient')
    .exec(function(err, docs){
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

AppointmentController.prototype = {
    create,
    all,
    remove,
    update
}
// в прототип помещаем объект у которого есть 2 свойства
module.exports = AppointmentController;