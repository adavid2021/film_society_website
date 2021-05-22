let project = {
    "title": "Trivia Night",
    "role_list": "actor cinematographer editor",
    "information": [{
        "film_date": "07-05-2021",
        "paid": "unpaid",
        "creator_name": "Natalia",
        "creator_email": "some_email@gmail.com",
        "synopsis": "blkajwdba.msndvawnvdlajwvdnabsvd,nbva,nwbdv,nbavw,ndbv,nasbdv,nbvasdn,bv,nbasdv."
    }],
    "role_descriptions": "I am looking for someone to play {describe role here} role.",
    "applicants": [{
        "applicant_name": "Joe",
        "applicant_email": "joe@gmail.com",
        "applicant_qualifications": "I am a very good actor please hire me.",
        "preferred_roles": [{"role": "actor"}, {"role": "editor"}, {"role": "director"}]
    },
        {
            "applicant_name": "Sue",
            "applicant_email": "sue@gmail.com",
            "applicant_qualifications": "I am the best editor at Clark, that's what my friend said.",
            "preferred_roles": [{"role": "editor"}, {"role": "actor"}, {"role": "director"}]
        }]
}
let currentIndex = 0;

$('#application_details').empty();


function load_application(application){
    const applicant_list=project.applicants;
    $('#title').text(project.role_list);


    $('#application_details li')
        .append("<div class='row justify-content-between'></div>");

    $('#application_details .row')
        .append(
            '  <div class="card-body">' +
            '  </div>' +
            '</div>')


    $('#application_details .card-body').append(function(){
    return('<div class="row">'+
        '<div class="col-lg-8 justify-content-center">'+
        `<div class="row"> <div class="col-2">Name:</div> <div class="col-2" id="applicant_name" ${applicant_list.applicant_name}></div></div>`+
        `<div class="row"> <div class="col-2">Email:</div> <div class="col-2" id="applicant_email" ${applicant_list.applicant_email}></div></div>`+
        `<div class="row"> <div class="col-4">Qualifications:</div> <div class="col-4" id="applicant_email" ${applicant_list.applicant_email}></div></div>`+
        `<div class="row"> <div class="col-4">Preferred Roles:</div> <div class="col-4" id="applicant_email" ${applicant_list.preferred_roles}></div></div>`+
        '</div>'+
        '<div class="col-lg-2 justify-content-center">'+
        `<input type="checkbox" id="checkBox" value="The information I have provided is accurate to the extend of my knowledge">`+
        '</div>'+
        '</div class="col-lg-2 justify-content-center">'+
        `<button type="button" className="btn btn-primary application_submission">Submit Information</button>`+
        '</div>'+
        '</div>'

    )
})

    $('application_submission').on('click', function () {
        const applicant = $('#application_details').val();
        console.log(applicant);
        $.post('/new-applicant', {message: message}).done(function () {
            location.reload();
        });
    });

}

$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const project_id = urlParams.get('project_id');
    console.log(project_id);
    if (project_id) {
        $.getJSON('/get_project_by_id?project_id=' + project_id).done(function (data) {
            console.log(data);
            if (data["message"] === "success") {
                project = data["data"];
                load_application(project);
            }
        });
    }
});
