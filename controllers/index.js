const PatientController = require('./PatientController')
const AppointmentController = require('./ApointmentController')

module.exports = {
     PatientCtrl : new PatientController(),
     AppointmentCtrl :  new AppointmentController()
}