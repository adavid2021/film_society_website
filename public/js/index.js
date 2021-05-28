function showList(projects) {
    // console.log("projects: " + projects);

    $('#project_list').empty();

    for (let i = 0; i < projects.length; i++) {
        $('#project_list').append("<li class='list-group-item'></li>");
    }

    // added ObjectId to each object, now accessible on client side
    $('#project_list li')
        .attr("value", function (idx) {
            return projects[idx]._id;
        })
        .append("<div class='row'></div>");

    $('#project_list .row').addClass(function (idx) {
        if (idx % 2 === 0) {
            return 'even_row';
        } else {
            return 'odd_row';
        }
    });

    $('#project_list .row')
        .append('<div class="card text-white" style="background-color: var(--cadet)">' +
            '  <div class="card-body">' +
            '    <h5 class="card-title title"></h5>' +
            '    <div class="row justify-content-between"></div>' +
            '       <div class="btn-group mybuttons" role="group">' +
            '    </div>' +
            '  </div>' +
            '</div>')

    $('.title').append(function (idx) {
        return `<p>${projects[idx].title}</p>`
    });

    // note that when passing projects to the detail page we use the title as the parameter and replace spaces with "~"
    $('.mybuttons').append(function (idx) {
        let button_html = `<p><b>Available Roles: &nbsp &nbsp</b></p>`;
        const list = projects[idx].role_list.split(" ");
        list.forEach(role => {
            if (role) {
                button_html += `<button class="btn btn-outline-dark" style="background-color: white; color: var(--burnt-sienna); border-color: var(--burnt-sienna); border-width: 2px">${role}</button>`
            }
        });
        return button_html
    })
        .after(function (idx) {
            return `<a href="/project_detail?project_id=${projects[idx]._id}" class="btn btn-outline-light interestbutton mt-4" style="background-color: var(--burnt-sienna)">I am interested!</a>`
        })
        .after(function (idx) {
            return `<p class="date"><b>Filming Date:</b> ${projects[idx].information[0].film_date}</p>`
        })
        .after(function (idx) {
            return `<p class="synopsis"><b>Synopsis:</b> ${projects[idx].information[0].synopsis}</p>`
        });
}

//when entire page has been loaded execute this function
$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const filters = urlParams.get('filters');
    console.log(filters);
    $.getJSON("/get_all_projects").done(function (data) {
        if (data.message === "success") {
            console.log(data["data"]);
            if (filters) {
                data = filterData(data, filters);
                showList(data.sort((a, b) => (a.title > b.title) ? 1 : -1));
            } else {
                showList(data["data"].sort((a, b) => (a.title > b.title) ? 1 : -1));
            }
        }
    });
});

function filterData(data, filters) {
    console.log(data["data"]);
    let newData = [];

    data["data"].forEach(d => {
        if (filters.includes("actor") && d.role_list.includes("actor")) {
            newData.push(d)
        }
        if (filters.includes("cinematographer") && d.role_list.includes("cinematographer")) {
            newData.push(d)
        }
        if (filters.includes("director") && d.role_list.includes("director")) {
            newData.push(d)
        }
        if (filters.includes("editor") && d.role_list.includes("editor")) {
            newData.push(d)
        }
        if (filters.includes("producer") && d.role_list.includes("producer")) {
            newData.push(d)
        }
        if (filters.includes("screenwriter") && d.role_list.includes("screenwriter")) {
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

    location.href = "index.html?filters=" + current_filters;
}