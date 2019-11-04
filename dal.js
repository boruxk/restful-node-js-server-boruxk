const fs = require('fs');

function readAll(callback) {
    const fileName = 'phones/phones.json';
    fs.readFile(fileName, (e, d) => {
        const data = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        callback(null, data);
    });
}

function readOne(id, callback) {
    const fileName = 'phones/phones.json';
    fs.readFile(fileName, (e, d) => {
        let data = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        data = data.filter(phone => phone.id.toString() === id);
        let [dataOne] = data;
        callback(null, dataOne);
    });
}

function saveOne(newPhone, callback) {
    const fileName = 'phones/phones.json';
    fs.readFile(fileName, (e, d) => {
        const data = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        data.push(newPhone);
        fs.writeFile(fileName, JSON.stringify(data), (e) => {
            if (e) {
                callback('error');
            }
            else {
                callback(null);
            }
        });
    });
}

function updateOne(phone, callback) {
    const fileName = 'phones/phones.json';
    fs.readFile(fileName, (e, d) => {
        const data = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        const index = data.findIndex(({ id }) => id.toString() === phone.id);
        data[index] = phone;
        fs.writeFile(fileName, JSON.stringify(data), (e) => {
            if (e) {
                console.log(e);
                callback('error');
            }
            else {
                callback(null);
            }
        });
    });
}

function deleteOne(idToDelete, callback) {
    const fileName = 'phones/phones.json';
    fs.readFile(fileName, (e, d) => {
        const data = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        const data2 = data.filter(({ id }) => id.toString() !== idToDelete);
        fs.writeFile(fileName, JSON.stringify(data2), (e) => {
            if (e) {
                console.log(e);
                callback('error');
            }
            else {
                callback(null);
            }

        });
    });
}

module.exports.readAll = readAll;
module.exports.readOne = readOne;
module.exports.saveOne = saveOne;
module.exports.updateOne = updateOne;
module.exports.deleteOne = deleteOne;