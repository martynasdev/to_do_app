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

app.get('/index/:id', (req, res) => {
    let appInputText = [];
    if (fs.existsSync('./public/tasks.txt')) {
        appInputText = fs.readFileSync('./public/tasks.txt', 'utf8');
        appInputText = JSON.parse(receptes);
        appInputText.splice(req.params.id, 1);
        fs.writeFileSync('./public/tasks.txt', JSON.stringify(receptes));
    }
    if (appInputText > 3) {
        fs.existsSync("appToDo").fs.writeFileSync('appToDoo');
    }
    res.redirect('/')
});

app.get('/delete/:id', (req, res) => {
    let receptes = [];
    if (fs.existsSync('./public/tasks.txt')) {
        receptes = fs.readFileSync('./public/tasks.txt', 'utf8');
        receptes = JSON.parse(receptes);
        receptes.splice(req.params.id, 1);
        fs.writeFileSync('./public/tasks.txt', JSON.stringify(receptes));
    }
    res.redirect('/')
})

// app.get('/check/:id', (req, res) =>{
//     let receptes = [];
//     if(fs.existsSync('./public/tasks.txt')){
//         receptes = fs.readFileSync('./public/tasks.txt', 'utf8');
//         receptes = JSON.parse(receptes);
//         receptes[req.params.id].checked = true;
//         fs.writeFileSync('./public/tasks.txt', JSON.stringify(receptes));
//     }
//     res.redirect('/')
// })