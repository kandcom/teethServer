const {check} = require('express-validator')
const validation = {
    create: [
        check('dentNumber').isInt({min: 1, max: 48}),
        check('price').isInt({min: 0, max: 999999}),
        check('diagnosis').isLength({min: 3, max : 50}),
        check('date').isLength({min: 6}),
        check('time').isLength({min: 4}),
        check('patient').isLength({min: 1}),
    ],
    update: [
        check('dentNumber').isInt({min: 1, max: 48}),
        check('price').isInt({min: 0, max: 999999}),
        check('diagnosis').isLength({min: 3, max : 50}),
        check('date').isLength({min: 6}),
        check('time').isLength({min: 4})
    ]
}
module.exports = validation