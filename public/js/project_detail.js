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

//puts values into html
function load_project(project) {

    const r_list = project.role_list.split(" ");
    const applicant_list = project.applicants
    $('#title').text(project.title);
    // $('#role_details').text("Role descriptions: " + project.role_descriptions);
    $('#role_details').append(
        `<div><h6><b>Role descriptions: </b></h6>`+
        `<h6>${project.role_descriptions}</h6></div>`
    )
    $('#synopsis').append(
        `<div class="row"><h6><b>Synopsis: </b></h6>` +
        `<h6>${project.information[0].synopsis}</h6></div>`

    )
    $('#starting_date').append(
        `<div class="row"><h6><b>Filming Date: </b></h6>` +
        `<h6>${project.information[0].film_date}</h6></div>`

    )
    // $("#synopsis").text(project.information[0].synopsis)
    // $("#starting_date").text(project.information[0].film_date)

    $('#available_roles').append(function (idx) {
        let button_html = `<p>Available Roles:</p>`;
        const list = project.role_list.split(" ");
        list.forEach(role => {
            if (role) {
                button_html += `<div class="card card-header" style="padding: 5px; background-color: white; color: var(--burnt-sienna); border-color: var(--burnt-sienna); border-width: 2px">${role}</div>`
            }
        });
        return button_html
    })
    // let date = project.information[0].film_date.toString();
    // // let new_date = date.substring(5, 7) + "-" + date.substring(8, 10) + "-" + date.substring(0, 4);
    // $("#synopsis").text(project.information[0].synopsis)
    // $("#starting_date").text(project.information[0].film_date)
    // $("#role_details").text(project.role_descriptions)
    //



    // $('#role_list').empty();
    //
    // for (let i = 0; i < r_list.length; i++) {
    //     $('#role_list').append("<li class='list-group-item py-2'></li>").append('<p class="pad"></p>');
    // }
    //
    // $('#role_list li')
    //     .append("<div class='row justify-content-between'></div>");
    //
    // $('#role_list .row').addClass(function (idx) {
    //     if (idx % 2 === 0) {
    //         return 'even_row';
    //     } else {
    //         return 'odd_row';
    //     }
    // });
    //
    // $('#role_list .row')
    //     .append(
    //         '<div class="card text-success border-success mb-3">' +
    //         '  <div class="card-body">' +
    //         '    <h5 class="role_name"></h5>' +
    //         '  </div>' +
    //         '</div>')

    // for (let i = 0; i < applicant_list.length; i++) {
    //     $('.applicants').append("<li class='list-group-item'></li>");
    // }
    // $('.role_name').append(function (idx) {
    // $('#role_list .row .card-body').append(function (idx) {
    //     currentIndex = idx;
    //     return ('<div class="row">' +
    //             '<div class="col-lg-9 col-md-7 justify-content-center">'+
    //         `<h4><b>${r_list[idx]}</b></h4>` +
    //         '</div>' +
    //         '<div class="col-lg-3 col-md-5">'+
    //         `<a class="btn btn-outline-success" href="${applyToRole(project.role_list.split(' '))}" style="width: 100%">Apply</a>`+
    //         '</div>' +
    //         '</div>'
    //     )
    // });

    applicant_list.forEach(applicant => {
        $('#applicant_list').append(
            '<div class="row justify-content-between pt-1 pb-1">' +
            `   <h4>Name: ${applicant.applicant_name}</h4>` +
            `   <h6>Email: ${applicant.applicant_email}</h6>` +
            addRoles(applicant) +
            '</div>'
        );
    });
}

function addRoles(applicant) {
    let output = '';
    applicant.preferred_roles.forEach(role => {
        output += role['role'] + ' ';
    })
    return `<p>Preferred Roles: ${output}</p>`;
}


// function applyToRole(list) {
//     // console.log("ci: " + currentIndex)
//     console.log("list: " + list);
//     return "/application_submission?p_id=" + (project._id).toString() + "&p_role=" + (list[currentIndex]);
// }

//when entire page has been loaded execute this function
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
                load_project(project);
            }
        });
    }
});