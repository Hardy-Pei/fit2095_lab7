const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require('body-parser');
const ejs = require('ejs');

let app = express();

let Tasks = require('./models/Tasks');
let Developers = require('./models/Developers');

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({
    extended: false
}));

const url = "mongodb://localhost:27017/week7lab";
let filePath = __dirname + '/views';

//Connect to mongoDB server
mongoose.connect(url, function (err) {
    if (err) console.log(err);
    else {
        console.log("Connected!!!");
    }
});

app.get('/', function (req, res) {
    res.sendFile(filePath + '/index.html');
});

app.get('/newdev', function (req, res) {
    Developers.find().exec(function (err, result) {
        res.render('newdev.html', {
            ar: result
        });
    });
});

app.get('/listdevs', function (req, res) {
    Developers.find().exec(function (err, result) {
        res.render('listdevs.html', {
            ar: result
        });
    });
});

app.get('/newtask', function (req, res) {
    Tasks.find().exec(function (err, result) {
        res.render('new.html', {
            ar: result
        });
    });
});

app.get('/listtasks', function (req, res) {
    Tasks.find().exec(function (err, result) {
        res.render('list.html', {
            ar: result
        });
    });
});

app.get('/delete', function (req, res) {
    Tasks.find().exec(function (err, result) {
        res.render('delete.html', {
            ar: result
        });
    });
});

app.get('/deleteAll', function (req, res) {
    Tasks.deleteMany({
        'status': 'Complete'
    }, function (err, obj) {
        res.redirect('/listtasks');
    });
});

app.get('/update', function (req, res) {
    Tasks.find().exec(function (err, result) {
        res.render('update.html', {
            ar: result
        });
    });
});

app.post('/deletetask', function (req, res) {
    Tasks.deleteOne({
        '_id': new mongoose.Types.ObjectId(req.body.taskid)
    }, function (err, obj) {
        res.redirect('/listtasks');
    });
});

app.post('/newtask', function (req, res) {
    let details = req.body;
    let task = new Tasks({
        name: details.taskname,
        assign: new mongoose.Types.ObjectId(details.assignto),
        due: new Date(details.duedate),
        status: details.taskstatus,
        desc: details.taskdesc
    });
    task.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            console.log('Saved!');
            res.redirect('/listtasks');
        }
    });
});

app.post("/updatetask", function (req, res) {
    let updateDetail = req.body;
    Tasks.updateOne({
        '_id': new mongoose.Types.ObjectId(updateDetail.taskid)
    }, {
        $set: {
            'status': updateDetail.taskstatus
        }
    }, function (err, result) {
        res.redirect('/listtasks');
    });
});

app.post('/newdev', function (req, res) {
    let details = req.body;
    let dev = new Developers({
        name: {
            firstName: details.fname,
            lastName: details.lname
        },
        level: details.level,
        address: {
            state: details.state,
            suburb: details.suburb,
            street: details.street,
            unit: details.unit
        }
    });
    dev.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            console.log('Saved!');
            res.redirect('/listdevs');
        }
    });
});

app.listen(8080);