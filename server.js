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
    res.sendFile(__dirname + "/public/current_projects.html");
});

app.get('/current_projects', function (req, res) {
    res.sendFile(__dirname + "/public/current_projects.html");
});

// app.get('/', function (req, res) {
//     res.sendFile(__dirname + "/public/current_projects.html");
// });

app.get('/project_detail', function (req, res) {
    res.sendFile(__dirname + "/public/project_detail.html");
});

app.get('/application_submission', function (req, res) {
    res.sendFile(__dirname + "/public/application_submission.html");
});

app.get('/project_submission', function (req, res) {
    res.sendFile(__dirname + "/public/project_submission.html");
});

app.get('/app_success', function (req, res) {
    res.sendFile(__dirname + "/public/app_success.html");
});

app.get('/app_failure', function (req, res) {
    res.sendFile(__dirname + "/public/app_failure.html");
});

app.get('/project_success', function (req, res) {
    res.sendFile(__dirname + "/public/project_success.html");
});

app.get('/project_failure', function (req, res) {
    res.sendFile(__dirname + "/public/project_failure.html");
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

app.get('/get_project_by_id', function (req, res) {
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

    Project.find({}, (err, data) => {
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

app.post("/new-applicant", function (req, res) {
    let current_project = {};

    Project.find({"_id": req.body.project_id}, function (err, data) {
        current_project = data[0]

        let app_name_list = [];
        let applicant_list = [];

        // each applicant in the foreach loop is an applicant object
        current_project.applicants.forEach(applicant => {
            applicant_list.push(applicant);
            if (!app_name_list.includes(applicant.applicant_name)) {
                app_name_list.push(applicant.applicant_name);
            }
        });

        if (app_name_list.includes(req.body.applicant_name)) {
            res.redirect("/app_failure?p_id=" + req.body.project_id);
        } else {
            // unique applicant name
            const new_applicant = {
                "applicant_name": req.body.applicant_name,
                "applicant_email": req.body.applicant_email,
                "applicant_qualifications": req.body.applicant_qualifications,
            }

            let roles_list = [];
            req.body.preferred_roles.split(" ").forEach(role => {
                roles_list.push({role: role});
            });

            // setting preferred roles to applicant object
            new_applicant["preferred_roles"] = roles_list;

            // adding new applicant object to applicant list
            applicant_list.push(new_applicant);

            Project.updateOne(
                {_id: req.body.project_id},
                {$set: {applicants: applicant_list}},
                {runValidators: true},
                (err, info) => {
                    if (err) {
                        console.log(err.message);
                        // console.log(JSON.stringify(err.errors));
                        // res.redirect(`/edit.html?error_message=${JSON.stringify(err.errors)}&input=${JSON.stringify(new_applicant)}&car_id=${req.body._id}`);
                    } else {
                        console.log(info);
                        // res.redirect(`/detail.html?car_id=${req.body._id}`);
                        res.redirect("/app_success");
                    }
                });
        }
    });
});

app.post("/new-project", function (req, res) {
    let project_names = [];

    Project.find({}, function (err, data) {
        // sends back a list of all documents in the database
        console.log("all data ", data);
        data.forEach(project => {
            project_names.push(project.title)
        })
    });

    console.log(project_names);

    if (project_names.includes(req.body.title)) {
        res.redirect("/project_failure");
    } else {
        // unique applicant name
        let role_list = "";

        if (req.body.actor) {
            role_list += "actor "
        }
        if (req.body.cin) {
            role_list += "cinematographer "
        }
        if (req.body.director) {
            role_list += "director "
        }
        if (req.body.editor) {
            role_list += "editor "
        }
        if (req.body.producer) {
            role_list += "producer "
        }
        if (req.body.scrn) {
            role_list += "screenwriter "
        }

        // creating correctly formatted date from date object
        let date = req.body.shooting_date.toString();
        let new_date = date.substring(5, 7) + "-" + date.substring(8, 10) + "-" + date.substring(0, 4);

        const new_project = {
            "title": req.body.title,
            "role_list": role_list,
            "information": [{
                "film_date": new_date,
                "paid": req.body.paidRadio,
                "creator_name": req.body.creator_name,
                "creator_email": req.body.creator_email,
                "synopsis": req.body.synopsis
            }],
            "role_descriptions": req.body.role_des,
            "applicants": []
        }

        const np = new Project(new_project);
        np.save(function (err, new_project) {
            if (err) {
                console.log(err["message"]);
                // res.redirect("/edit.html?error_message="
                //     + err["message"] + "&input=" + JSON.stringify(new_project));
            } else {
                console.log(new_project._id);
                res.redirect("/project_success");
            }
        })
    }
})