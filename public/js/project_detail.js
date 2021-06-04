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
        // `<div><h6><b>Role descriptions: </b></h6>` +
        `<p>${project.role_descriptions}</p></div>`
    )
    $('#synopsis').append(
        // `<div class="row"><h6><b>Synopsis: </b></h6>` +
        `<p>${project.information[0].synopsis}</p></div>`
    )
    $('#starting_date').append(
        // `<div class="row"><h6><b>Filming Date: </b></h6>` +
        `<p>${project.information[0].film_date}</p></div>`
    )

    // href="${applyToRole(project.role_list.split(' '))}"

    $('#last').append(function (idx) {
        return `<a class="btn btn-light" href="${applyToRole(project.role_list.split(' '))}" style="background-color: var(--burnt-sienna); max-width: 20%; margin-left: 5%; margin-bottom: 5%">Apply</a>`
    })

    $('#available_roles').append(function (idx) {
        let button_html = ``; //<h3><b>Available Roles:</b></h3>
        const list = project.role_list.split(" ");
        list.forEach(role => {
            if (role) {
                button_html += `<div class="card card-header my-2" style="text-align: center; padding: 5px; background-color: white; color: var(--burnt-sienna); border-color: var(--burnt-sienna); border-width: 2px">${role}</div>`
            }
        });
        return button_html
    })

    // <p id="is_paid"></p>
    // <p id="creator_name"></p>
    // <p id="creator_email"></p>

    $('#is_paid').append(
        `<h6>${project.information[0].paid}</h6></div>`
    )

    $('#creator_name').append(
        `<p>${project.information[0].creator_name}</p></div>`
    )

    $('#creator_email').append(
        `<p>${project.information[0].creator_email}</p></div>`
    )

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


function applyToRole(list) {
    // console.log("ci: " + currentIndex)
    // console.log("list: " + list);
    return "/application_submission?p_id=" + (project._id).toString() + "&p_role=" + (list[currentIndex]);
}

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