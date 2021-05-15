// mongo
// use movieDB
// db.movies.find()
// db.movies.find({rating:7.2})

// basically we just dump data into database, we run it once
const mongoose = require('mongoose');

const fs = require('fs');
const rawdata = fs.readFileSync(__dirname + "/data.json");
const jsonList = JSON.parse(rawdata);

//connect to mongodb server
mongoose.connect('mongodb://localhost:27017/filmDB',
    {useNewUrlParser: true}, function () {
        console.log("db connection successful");
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

//create list of movies to save into database
const projectList = [];

jsonList.forEach(function (project) {
    //make sure all of the strings align with how we define the moviedb strings
    projectList.push(
    {
        "title": project["title"],
        "role_list": project["role_list"],
        "information": project["information"],
        "role_descriptions": project["role_descriptions"],
        "applicants": project["applicants"]
    });
    console.log("added project: " + project["title"]);
});

Project.insertMany(projectList, {}, function (err) {
    //when err is not empty or none do this
    if (err) {
        console.log(err);
    } else {
        console.log("All data saved successfully!");
        mongoose.connection.close();
    }
});