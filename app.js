const express = require('express');

let app = express();

let fs = require('fs');

let bodyParser = require('body-parser');

let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));

app.listen(3000, '127.0.0.1', () => {
    console.log('Server is running on http://127.0.0.1:3000/')
});

app.get("/", (req, res) => {
    let duomenysIsFailo = fs.readFileSync('./public/tasks.txt', 'utf8');
    let paverciuMasyvuIsString = JSON.parse(duomenysIsFailo);
    res.render('index', { appInputText: paverciuMasyvuIsString });
});

app.post('/index', urlencodedParser, (req, res) => {
    let duomenysIsFailo = fs.readFileSync('./public/tasks.txt', 'utf8');
    let paverciuMasyvuIsString = JSON.parse(duomenysIsFailo);
    paverciuMasyvuIsString.push(req.body);
    fs.writeFileSync('./public/tasks.txt', JSON.stringify(paverciuMasyvuIsString));
    
    res.redirect('/');
});

console.log('hello');
console.log('hello');

app.get('/index/:id', (req, res) =>{
    let appInputText = [];
    if(fs.existsSync('./public/nauji.txt')){
        appInputText = fs.readFileSync('./public/nauji.txt', 'utf8');
        appInputText = JSON.parse(receptes);
        appInputText.splice(req.params.id, 1);
        fs.writeFileSync('./public/tasks.txt', JSON.stringify(receptes));
    }
    res.redirect('/')
});