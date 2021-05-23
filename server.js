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
    role_list: String,
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

app.get('/project_detail', function (req, res) {
    res.sendFile(__dirname + "/public/project_detail.html");
});

app.get('/application_submission', function (req, res) {
    res.sendFile(__dirname + "/public/application_submission.html");
});
app.get('/app_success', function (req, res) {
    res.sendFile(__dirname + "/public/app_success.html");
});
app.get('/app_failure', function (req, res) {
    res.sendFile(__dirname + "/public/app_failure.html");
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


// - post uses body for params
// - get uses query for params
// Get projects by selected roles
app.get("/get_projects_by_filters", (req, res) => {

    Project.find({}, (err,data) => {
        if (err) {
            res.send(
                {
                    "message": "db_error",
                    "data": []
                })
        } else {
            res.send(
                {
                    "message": "db_error",
                    "data": data
                })
        }
    });
});

app.get("/new-applicant", function(
    req,
    res){
    res.sendFile(__dirname+"/new-applicant")
});



let applicantList=[]
app.post("/new-applicant", function (req, res) {
    const new_applicant = {
        "applicant_name": req.body.applname,
        "applicant_email": req.body.email,
        "applicant_qualifications": req.body.qualifications,
        "preferred_roles": req.body.preferredRoles,

    }
    applicantList.push(new_applicant);

    // const applicantJSON = JSON.stringify(new_applicant);
    // console.log('new applicant' + applicantJSON);
    // fs.writeFile(__dirname + "/data.json", applicantJSON, function (err) {
    //     if (err) {
    //         res.redirect("/app_failure");
    //     } else {
    //         res.redirect("/app_success");
    //     }
    // });
    console.log(Project.distinct("applicants.applicant_name"));
    if (req.body._id) {
        Project.updateOne(
            {_id: req.body._id},
            {$set: new_applicant},
            {runValidators: true},
            (err, info) => {
                if (err) {
                    console.log(err.message);
                    //we will need this error part for the homework
                    //identify which field is incorrect after redirect
                    //cannot have line breaks
                    console.log(JSON.stringify(err.errors));
                    res.redirect(`/edit.html?error_message=${JSON.stringify(err.errors)}&input=${JSON.stringify(new_applicant)}&car_id=${req.body._id}`);
                } else {
                    console.log(info);
                    res.redirect(`/detail.html?car_id=${req.body._id}`);
                }
            }
        )
    } else {
        //car does not exist so we create a new car
        const nc = new Car(new_applicant);
        nc.save(function (err, new_car) {
            if (err) {
                console.log(err["message"]);
                res.redirect("/edit.html?error_message="
                    + err["message"] + "&input=" + JSON.stringify(new_applicant));
            } else {
                console.log(new_car._id);
                res.redirect("/detail.html?car_id=" + new_car._id);
            }
        });
    }

});

