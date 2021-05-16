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
        .append('<div class="card text-white bg-success mb-3">' +
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

    // note that when passing projects to the detail page we use the title as the parameter and replace
    $('.mybuttons').append(function (idx) {
        let button_html = ``;
        const list = projects[idx].role_list.split(" ");
        list.forEach(role=>{
            button_html+=`<button class="btn btn-outline-dark">${role}</button>`
        });
        return button_html
    })
        .after(function (idx) {
            return `<a href="/project_detail?project_id=${projects[idx]._id}" class="btn btn-outline-light interestbutton">I am interested!</a>`
        })
        .after(function (idx) {
            return `<p class="more_info"><b>Creator email:</b> ${projects[idx].information[0].creator_email}</p>`
        })
        .after(function (idx) {
            return `<p class="more_info"><b>Creator name:</b> ${projects[idx].information[0].creator_name}</p>`
        })
        .after(function (idx) {
            return `<p class="more_info">this project is <b>${projects[idx].information[0].paid}</b></p>`
        })
        .after(function (idx) {
            return `<p class="date"><b>Filming Date:</b> ${projects[idx].information[0].film_date}</p>`
        })

        .after(function (idx) {
            return `<p class="synopsis"><b>Synopsis:</b> ${projects[idx].information[0].synopsis}</p>`
    });


    $('.year').append(function (idx) {
        return `<p>${cars[idx].year}</p>`
    });

    $('.price').append(function (idx) {
        return `<p>${cars[idx].price}</p>`
    });

    $('.availability').append(function (idx) {
        return `<p>${cars[idx].avail}</p>`
    });

    // specific item based on object ID
    $('.carButton').on('click', function () {
        const carId = $(this).parents('li').attr("value");
        // navigates to a client page
        location.href = "detail.html?car_id=" + carId;
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
            if (filters){
                data = filterData(data, filters);
                showList(data.sort((a, b) => (a.title > b.title) ? 1 : -1));
            } else {
                showList(data["data"].sort((a, b) => (a.title > b.title) ? 1 : -1));
            }
        }
    });
});

function filterData(data, filters){
    console.log(data["data"]);
    let newData = [];

    data["data"].forEach(d=>{
        if (filters.includes("actor") && d.role_list.includes("actor")){
            newData.push(d)
        }
        if (filters.includes("writer") && d.role_list.includes("cinematographer")){
            newData.push(d)
        }
        if (filters.includes("director") && d.role_list.includes("director")){
            newData.push(d)
        }
        if (filters.includes("editor") && d.role_list.includes("editor")){
            newData.push(d)
        }
        if (filters.includes("producer") && d.role_list.includes("producer")){
            newData.push(d)
        }
        if (filters.includes("screenwriter") && d.role_list.includes("screenwriter")){
            newData.push(d)
        }
    })

    return newData
}

function searchProjects() {
    // sent to server trying to get information from server based on user input
    let current_filters = "";

    if($("#actor_checkbox").is(':checked')){
        current_filters+="actor"
    }
    if($("#cinematographer_checkbox").is(':checked')){
        current_filters+="cinematographer"
    }
    if($("#editor_checkbox").is(':checked')){
        current_filters+="editor"
    }
    if($("#director_checkbox").is(':checked')){
        current_filters+="director"
    }
    if($("#producer_checkbox").is(':checked')){
        current_filters+="producer"
    }
    if($("#screenwriter_checkbox").is(':checked')){
        current_filters+="screenwriter"
    }

    location.href = "index.html?filters=" + current_filters;
}