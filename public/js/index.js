function showList(projects) {
    // console.log("projects: " + projects);

    $('#left_list').empty();
    $('#right_list').empty();

    if(projects.length === 0){
    //    <h3><i>No projects match the search specifications.</i></h3>
        $('#filters').append("<h3 style='text-align: center'><i>No projects match the search specifications.</i></h3>");
    }

    for (let i = 0; i < projects.length; i++) {
        if (i % 2 === 0) {
            $('#left_list').append("<li class='list-group-item'></li>");
        } else {
            $('#right_list').append("<li class='list-group-item'></li>");
        }
    }

    // added ObjectId to each object, now accessible on client side
    $('#left_list li')
        .attr("value", function (idx) {
            return projects[idx * 2]._id;
        })
        .append("<div class='row'></div>");

    $('#right_list li')
        .attr("value", function (idx) {
            return projects[(idx * 2) + 1]._id;
        })
        .append("<div class='row'></div>");

    // $('#left_list .row').addClass(function (idx) {
    //     if (idx % 2 === 0) {
    //         return 'even_row';
    //     } else {
    //         return 'odd_row';
    //     }
    // });

    $('#left_list .row')
        .append('<div class="card text-white" style="background-color: var(--cadet)">' +
            '  <div class="card-body">' +
            '    <h5 class="card-title title_left"></h5>' +
            '    <div class="row justify-content-between"></div>' +
            '       <div class="btn-group mybuttons_left" role="group">' +
            '    </div>' +
            '  </div>' +
            '</div>')

    $('#right_list .row')
        .append('<div class="card text-white" style="background-color: var(--cadet)">' +
            '  <div class="card-body">' +
            '    <h5 class="card-title title_right"></h5>' +
            '    <div class="row justify-content-between"></div>' +
            '       <div class="btn-group mybuttons_right" role="group">' +
            '    </div>' +
            '  </div>' +
            '</div>')

    $('.title_left').append(function (idx) {
        return `<p>${projects[idx * 2].title}</p>`
    });

    $('.title_right').append(function (idx) {
        return `<p>${projects[(idx * 2) + 1].title}</p>`
    });

    // note that when passing projects to the detail page we use the title as the parameter and replace spaces with "~"
    $('.mybuttons_left').append(function (idx) {
        let button_html = `<p><b>Available Roles: &nbsp &nbsp</b></p>`;
        const list = projects[idx * 2].role_list.split(" ");
        list.forEach(role => {
            if (role) {
                button_html += `<div class="card card-header" style="white-space: nowrap; padding: 5px; background-color: white; color: var(--burnt-sienna); border-color: var(--burnt-sienna); border-width: 2px">${role}</div>`
            }
        });
        return button_html
    })
        .after(function (idx) {
            return `<a href="/project_detail?project_id=${projects[idx * 2]._id}" class="btn btn-outline-light interestbutton mt-4" style="background-color: var(--burnt-sienna)">I am interested!</a>`
        })
        .after(function (idx) {
            return `<p class="date"><b>Filming Date:</b> ${projects[idx * 2].information[0].film_date}</p>`
        })
        .after(function (idx) {
            return `<div class="synopsis" style="margin-bottom: 20px"> ${projects[idx * 2].information[0].synopsis}</div>`
        })
        .after(function(){
            return `<div><b>Synopsis:</b></div>`
        });

    //                button_html += `<button class="btn btn-outline-dark" style="background-color: white; color: var(--burnt-sienna); border-color: var(--burnt-sienna); border-width: 2px">${role}</button>`
    $('.mybuttons_right').append(function (idx) {
        let button_html = `<p><b>Available Roles: &nbsp &nbsp</b></p>`;
        const list = projects[(idx * 2) + 1].role_list.split(" ");
        list.forEach(role => {
            if (role) {
                button_html += `<div class="card card-header" style="white-space: nowrap; padding: 5px; background-color: white; color: var(--burnt-sienna); border-color: var(--burnt-sienna); border-width: 2px">${role}</div>`
            }
        });
        return button_html
    })
        .after(function (idx) {
            return `<a href="/project_detail?project_id=${projects[(idx * 2) + 1]._id}" class="btn btn-outline-light interestbutton mt-4" style="background-color: var(--burnt-sienna)">I am interested!</a>`
        })
        .after(function (idx) {
            return `<p class="date"><b>Filming Date:</b> ${projects[(idx * 2) + 1].information[0].film_date}</p>`
        })
        .after(function (idx) {
            return `<div class="synopsis" style="margin-bottom: 20px"> ${projects[(idx * 2) + 1].information[0].synopsis}</div>`
        })
        .after(function(){
            return `<div><b>Synopsis:</b></div>`
        });
}


//when entire page has been loaded execute this function
$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const filters = urlParams.get('filters');
    // console.log(filters);
    $.getJSON("/get_all_projects").done(function (data) {
        if (data.message === "success") {
            console.log(data["data"]);
            if (filters) {
                recheckBoxes(filters);
                data = filterData(data, filters);
                showList(data.sort((a, b) => (a.title > b.title) ? 1 : -1));
            } else {
                showList(data["data"].sort((a, b) => (a.title > b.title) ? 1 : -1));
            }
        }
    });
});

function recheckBoxes(f){
    if (f.includes("actor")){
        $('#actor_checkbox').prop("checked",true);
    }
    if (f.includes("cinematographer")){
        $('#cinematographer_checkbox').prop("checked",true);
    }
    if (f.includes("director")){
        $('#director_checkbox').prop("checked",true);
    }
    if (f.includes("editor")){
        $('#editor_checkbox').prop("checked",true);
    }
    if (f.includes("screenwriter")){
        $('#screenwriter_checkbox').prop("checked",true);
    }
    if (f.includes("producer")){
        $('#producer_checkbox').prop("checked",true);
    }
}

// determines if a project is already in the list of all projects
function dataContainsThisProject(new_project, allData) {
    let output = false;
    allData.forEach(d=>{
        if(d.title === new_project.title){
            output = true;
        }
    })
    return output;
}

function filterData(data, filters) {
    let newData = [];

    data["data"].forEach(d => {
        if (filters.includes("actor") && d.role_list.includes("actor")) {
            newData.push(d)
        }
        if (!dataContainsThisProject(d,newData) && filters.includes("cinematographer") && d.role_list.includes("cinematographer")) {
            newData.push(d)
        }
        if (!dataContainsThisProject(d,newData) && filters.includes("director") && d.role_list.includes("director")) {
            newData.push(d)
        }
        if (!dataContainsThisProject(d,newData) && filters.includes("editor") && d.role_list.includes("editor")) {
            newData.push(d)
        }
        if (!dataContainsThisProject(d,newData) && filters.includes("producer") && d.role_list.includes("producer")) {
            newData.push(d)
        }
        if (!dataContainsThisProject(d,newData) && filters.includes("screenwriter") && d.role_list.includes("screenwriter")) {
            newData.push(d)
        }
    })

    return newData
}

function searchProjects() {
    // sent to server trying to get information from server based on user input
    let current_filters = "";

    if ($("#actor_checkbox").is(':checked')) {
        current_filters += "actor"
    }
    if ($("#cinematographer_checkbox").is(':checked')) {
        current_filters += "cinematographer"
    }
    if ($("#editor_checkbox").is(':checked')) {
        current_filters += "editor"
    }
    if ($("#director_checkbox").is(':checked')) {
        current_filters += "director"
    }
    if ($("#producer_checkbox").is(':checked')) {
        current_filters += "producer"
    }
    if ($("#screenwriter_checkbox").is(':checked')) {
        current_filters += "screenwriter"
    }

    location.href = "current_projects.html?filters=" + current_filters;
}