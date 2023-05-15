//вбудована бібліотека яка праює зі шляхами
const path = require('path');
const express = require('express');
const multer = require('multer');
//шлях куди має завантажуватись наші файли
const uploadDir = path.join(__dirname, '../public/uploads/');
// console.log(uploadDir);
//стандартний код для мультера, вказує папку куди мультер загружає наші дані
const upload = multer({ dest: uploadDir });

const router = express.Router();
const fs = require('fs');
//підключаєм валідатор
const Ajv = require('ajv');
//підключаєм валідатор
const ajv = new Ajv();


router.get('/', (req,res) =>{
    res.render('page')
})

const arrData = [];


router.get('/item', (req,res) => {
    console.log(arrData);
    res.json(arrData)
})


//pattern: '^([0-9][0-9])$'
// upload.none() для парсення форм дати
// цим роутом і за допомогою мультера ми передаєм наші дані з форм дати на бек
router.post('/infoUser', upload.none(), (req,res) => {
    console.log('body:', req.body);


    const schema = {
        type: 'object',
        properties: {
            name: {type: 'string'},
            surname: {type: 'string'},
            birthday: {type: 'string',
            pattern: '^(19|20)[0-9][0-9]\.[0-1][0-9]\.[0-3][0-9]$'// регулярка дн
            },
            years: {  type: 'number',
            minimum: 1,
            maximum: 99,
            }
        },
        additionalProperties: false,
        required: ['name', 'surname', 'birthday', 'years'],
    };
    //наступними двома рядками валідуємо наші дані
    const validate = ajv.compile(schema);
    const valid = validate(req.body);

    if (!valid) {
        res.json({ status: 'validate error', error: validate.errors })
        console.log('ERROR!!!!')
    } else if (valid) {
        arrData.push(req.body)
        console.log(arrData)
        res.json(arrData)
        console.log('CONFIRMED!!!')
    }

    //arrData.push({name:req.body.name, surname:req.body.surname, birthday:req.body.birthday})
    //arrData.push(req.body) можна написати коротше, всерівно виведе масив
    //res.json(arrData)
})




module.exports = router;