// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const error_message = urlParams.get("error_message");
// const project_id = urlParams.get("p_id");
// const input = JSON.parse(urlParams.get("input")); // converting back into json


// if (project_id) {
//     $('#project_id').val(project_id);
// }

// if (error_message) {
//
//     if (error_message.includes('name')) {
//         $('#name').addClass('is-invalid text-danger');
//     }
//     if (error_message.includes('creator_name')) {
//         $('#creator_name').addClass('is-invalid text-danger');
//     }
//     if (error_message.includes('creator_email')) {
//         $('#creator_email').addClass('is-invalid text-danger');
//     }
//     if (error_message.includes('shooting_date')) {
//         $('#shooting_date').addClass('is-invalid text-danger');
//     }
//
//     if (error_message.includes('synopsis')) {
//         $('#synopsis').addClass('is-invalid text-danger');
//     }
//     if (error_message.includes('Role_des')) {
//         $('#Role_des').addClass('is-invalid text-danger');
//     }
//
//     let errList = error_message.substring(22,).split(',');
//     let output = ""
//
//     for (const err of errList) {
//         output += err.split(':')[1].substring(1,) + ", ";
//     }
//
//     $('#error_message').text(output.substring(0, output.length - 2));
// }

$('form').on('submit', function () {
    let errorMessage = null

    $.each($('input,textarea'), function () {
        $(this).removeClass('is-invalid text-danger')
    });

    if (!$('#name,textarea').val()) {
        errorMessage = "Film Name cannot be empty."
        $('#name').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false;
    }

    if ($('#name,textarea').val().length < 3) {
        errorMessage = "The film name must be at least 3 characters long."
        $('#name').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false;
    }

    if (!$('#creator_name,textarea').val()) {
        errorMessage = "Creator Name cannot be empty."
        $('#creator_name').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false;
    }

    if ($('#creator_name,textarea').val().length < 3) {
        errorMessage = "The creator's name must be at least 3 characters long."
        $('#creator_name').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false;
    }

    if (!$('#creator_email,textarea').val()) {
        errorMessage = "Creator Email cannot be empty."
        $('#creator_email').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false;
    }

    var email_pattern = /[a-z]+@[a-z]+\.[a-z]+/i
    // the email must follw the above standard email pattern
    if (!(email_pattern.test($('#creator_email,textarea').val()))) {
        errorMessage = "The email field must have correct email formatting."
        $('#creator_email').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false;
    }

    if (!$('#shooting_date,textarea').val()) {
        errorMessage = "Shooting Date cannot be empty."
        $('#shooting_date').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false;
    }

    if (!$('#synopsis,textarea').val()) {
        errorMessage = "Add some synopsis about your project."
        $('#synopsis').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false;
    }

    if ($('#synopsis,textarea').val().length < 3) {
        errorMessage = "The synopsis must be at least 3 characters long."
        $('#synopsis').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false;
    }

    if (!$('#Role_des,textarea').val()) {
        errorMessage = "Please provide some role descriptions of your project."
        $('#Role_des').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false;
    }

    if ($('#Role_des,textarea').val().length < 3) {
        errorMessage = "The role description must be at least 3 characters long."
        $('#Role_des').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false;
    }
});
