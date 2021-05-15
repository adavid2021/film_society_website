//npm init
// npm i express body-parser mongoose

const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//connect to mongodb server
mongoose.connect('mongodb://localhost:27017/filmDB',
    {useNewUrlParser: true}, function () {
        console.log("db connection successful 2");
    });

const applicantSchema = {
    applicant_name: String,
    applicant_email: String,
    applicant_qualifications: String,
    preferred_roles: [{
        role: String
    }]
}

const projectSchema = {
    title: String,
    role_list: [{
        role: String
    }],
    information: [{
        film_date: String,
        paid: String,
        creator_name: String,
        creator_email: String,
        synopsis: String
    }],
    role_descriptions: String,
    applicants: [applicantSchema]
}

const Project = mongoose.model('Project', projectSchema);


app.listen(3000, function () {
    console.log("server started at 3000");
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/get_all_projects", function (req, res) {
    Project.find(function (err, data) {
        if (err) {
            // sending json file for client to be able to read
            res.send({
                "message": "internal server error",
                "data": []
            });
        } else {
            res.send({
                "message": "success",
                "data": data
            });
        }
    });
});

app.get('/get_project_by_id',
    function (req, res) {
        console.log(req.query.project_id);
        Project.find({"_id": req.query.project_id}, function (err, data) {
            if (err || data.length === 0) {
                // sending json file for client to be able to read
                res.send({
                    "message": "internal database error",
                    "data": {}
                });
            } else {
                res.send({
                    "message": "success",
                    "data": data[0]
                });
            }
        });
    });