//checks for error messages if the form is empty or not and if length is less than 3 or not for name creater name,
// synopsis and for role descriptions sections
$('form').on('submit', function (event) {
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

    // add checkbox role checking error here using added html class "ch"

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
//checks for correct email formating
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

    if (!$('textarea#role_des').val()) {
        errorMessage = "Please provide some role descriptions of your project."
        $('#role_des').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false;
    }

    if ($('textarea#role_des').val().length < 3) {
        errorMessage = "The role description must be at least 3 characters long."
        $('#role_des').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false;
    }

    if ($('#actor_ch').prop('checked') && !((checkForRoles("Actor")[0]))) {
        errorMessage = checkForRoles("Actor")[1];
        $('#role_des').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false
    }

    if ($('#cinematographer_ch').prop('checked') && !((checkForRoles("Cinematographer")[0]))) {
        errorMessage = checkForRoles("Cinematographer")[1];
        $('#role_des').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false
    }

    if ($('#editor_ch').prop('checked') && !((checkForRoles("Editor")[0]))) {
        errorMessage = checkForRoles("Editor")[1];
        $('#role_des').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false
    }

    if ($('#director_ch').prop('checked') && !((checkForRoles("Director")[0]))) {
        errorMessage = checkForRoles("Director")[1];
        $('#role_des').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false
    }

    if ($('#producer_ch').prop('checked') && !((checkForRoles("Producer")[0]))) {
        errorMessage = checkForRoles("Producer")[1];
        $('#role_des').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false
    }

    if ($('#screenwriter_ch').prop('checked') && !((checkForRoles("Screenwriter")[0]))) {
        errorMessage = checkForRoles("Screenwriter")[1];
        $('#role_des').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false
    }
});

// takes in a single checkbox words, based on input determine which words to look for in the role description
// throw an error if the specified key word is not present
function checkForRoles(role) {
    const text = $('textarea#role_des').val();

    // console.log("text: ", text);
    let isCorrect = false;
    let msg = "";
    // console.log("role ", role)

    const actor_kw = ["actor", "Actor", "actress", "Actress"];
    const cin_kw =
        ["cinematographer", "Cinematographer", "Cameraman",
            "cameraman", "camera man", "Camera man",
            "videographer", "Videographer"];
    const editor_kw = ["editor", "Editor"];
    const director_kw = ["director", "Director"];
    const producer_kw = ["producer", "Producer"];
    const scrn_kw = ["writer", "Writer"];

    switch (role) {
        // check the role description text area text for word specified in switch case keywords
        case "Actor":
            actor_kw.forEach(keyword => {
                if (text.includes(keyword)) {
                    isCorrect = true;
                }
            });
            msg = "Role description must include a description for all of the roles checked in the roles section" +
                " (you must include one of the following words " + spaced(actor_kw) + ").";
            break;
        case "Cinematographer":
            cin_kw.forEach(keyword => {
                if (text.includes(keyword)) {
                    isCorrect = true;
                }
            });
            msg = "Role description must include a description for all of the roles checked in the roles section" +
                "(you must include one of the following words " + spaced(cin_kw) + ").";
            break;
        case "Editor":
            editor_kw.forEach(keyword => {
                if (text.includes(keyword)) {
                    isCorrect = true;
                }
            });
            msg = "Role description must include a description for all of the roles checked in the roles section" +
                "( you must include one of the following words: " + spaced(editor_kw) + ").";
            break;
        case "Director":
            director_kw.forEach(keyword => {
                if (text.includes(keyword)) {
                    isCorrect = true;
                }
            });
            msg = "Role description must include a description for all of the roles checked in the roles section" +
                "(you must include one of the following words " + spaced(director_kw) + ").";
            break;
        case "Producer":
            producer_kw.forEach(keyword => {
                if (text.includes(keyword)) {
                    isCorrect = true;
                }
            });
            msg = "Role description must include a description for all of the roles checked in the roles section" +
                "(you must include one of the following words " + spaced(producer_kw) + ").";
            break;
        case "Screenwriter":
            scrn_kw.forEach(keyword => {
                if (text.includes(keyword)) {
                    isCorrect = true;
                }
            });
            msg = "Role description must include a description for all of the roles checked in the roles section" +
                "(you must include one of the following words " + spaced(scrn_kw) + ").";
            break;
    }
    return [isCorrect, msg];
}

// spaces out string array into correct grammar
function spaced(text_array) {
    return text_array.join(", ");
}