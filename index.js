const express = require('express');
//const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./core/db')
const {patientValidation, appointmentValidation} = require('./utils/validation')
const {PatientCtrl, AppointmentCtrl} = require('./controllers')

const app = express();
app.use(express.json());
app.use(cors())

app.get('/patient', PatientCtrl.all);
app.post('/patient', patientValidation.create, PatientCtrl.create);
app.delete('/patient/:id', PatientCtrl.remove);
app.patch('/patient/:id', patientValidation.update, PatientCtrl.update);
app.get('/patient/:id', PatientCtrl.show);


app.get('/appointment', AppointmentCtrl.all)
app.post('/appointment', appointmentValidation.create, AppointmentCtrl.create)
app.delete('/appointment/:id',  AppointmentCtrl.remove )
app.patch('/appointment/:id',  appointmentValidation.update, AppointmentCtrl.update )//patch патчить значит что-то менять. 

app.listen(303, 'localhost', (err) => {
    if(err) return console.log(err.message);
    return console.log("Сервер запущен успешно")
})