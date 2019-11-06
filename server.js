const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3201;
const phoneBl = require('./phonebl');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/phone', (req, res) => {
    phoneBl.getPhones(function (e, data) {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(data);
        }
    })
});

app.get('/phone/:id', (req, res) => {
    let id = req.params.id;
    phoneBl.getPhone(id, function (e, data) {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(data);
        }
    })
});

app.post('/phone', (req, res) => {
    let newPhoneData = req.body;
    phoneBl.createPhone(newPhoneData, function (e, data) {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(data);
        }
    })
});

app.put('/phone/:id', (req, res) => {
    let phone = req.body;
    phoneBl.updatePhone(phone, function (e, data) {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(data);
        }
    })
});

app.delete('/phone/:id', (req, res) => {
    let id = req.params.id;
    phoneBl.deletePhone(id, function (e, data) {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(data);
        }
    })
});

app.listen(process.env.PORT || PORT, () =>
    console.log(`App listening on port ${PORT}!`),
);