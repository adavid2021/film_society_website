
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const error_message = urlParams.get("error_message");
const project_id = urlParams.get("p_id");
const input = JSON.parse(urlParams.get("input")); // converting back into json

// invisible project id field
if (project_id) {
    console.log("id in js is currently: ",project_id);
    $('#project_id').val(project_id);
}
//this part handles the error messages from frontend part
// hightlights the box if it has an error
if (error_message) {
    if (error_message.includes('applicant_name')) {
        $('#applicant_name').addClass('is-invalid text-danger');
    }
    if (error_message.includes('applicant_email')) {
        $('#applicant_email').addClass('is-invalid text-danger');
    }
    if (error_message.includes('applicant_qualifications')) {
        $('#applicant_qualifications').addClass('is-invalid text-danger');
    }

    let errList = error_message.substring(22,).split(',');
    let output = ""

    for (const err of errList) {
        output += err.split(':')[1].substring(1,) + ", ";
    }

    $('#error_message').text(output.substring(0, output.length - 2));
}

//handles the error message and submits the page if it is successful

$('form').on('submit', function () {
    let errorMessage = null

    $.each($('input,textarea'), function () {
        $(this).removeClass('is-invalid text-danger')
    });
    //checks for applicant names

    if (!$('#applicant_name,textarea').val()) {
        errorMessage = "Name cannot be empty."
        $('#applicant_name').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false;
    }
//checks for applicants email and it's pattern
    if (!$('#applicant_email,textarea').val()) {
        errorMessage = "Email cannot be empty."
        $('#applicant_email').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false;
    }

    var email_pattern = /[a-z]+@[a-z]+\.[a-z]+/i
    // the email must follw the above standard email pattern
    if (!(email_pattern.test($('#applicant_email,textarea').val()))) {
        errorMessage = "The email field must have correct email formatting."
        $('#applicant_email').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false;
    }
    //checks for applicant qualifications

    if (!$('#applicant_qualifications,textarea').val()) {
        errorMessage = "Please provide your qualifications."
        $('#applicant_qualifications').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false;
    }
    //cheecks for applicants name length

    if ($('#applicant_name,textarea').val().length < 3) {
        errorMessage = "The name filed must be at least 3 characters long."
        $('#applicant_name').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false;
    }
    //cheecks for applicants qualifications length


    if ($('#applicant_qualifications,textarea').val().length < 3) {
        errorMessage = "The qualifications filed must be at least 3 characters long."
        $('#applicant_qualifications').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false;
    }
    //    //cheecks for applicants preferred roles

    if (!$('#preferred_roles').val()) {
        errorMessage = "Provide some of your preferred roles"
        $('#preferred_roles').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false;
    }

    if (!(formattedCorrectly())) {
        errorMessage = "In the preferred roles field, only include roles in this list: " +
            "actor, cinematographer, editor, director, producer, screenwriter (separated by spaces)"
        $('#preferred_roles').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false;
    }
  //user has to agree to submit the application
    if (!($('#checkBox').is(':checked'))) {
        errorMessage = "You must agree to submit the application."
        $('#error_message').text(errorMessage);

        return false;
    }

});

// returns false if the preferred roles section is formatted incorrectly, otherwise true
function formattedCorrectly() {
    const user_input = $('#preferred_roles').val();
    // console.log("VALUE: ", $('#preferred_roles').val());
    const input_string = user_input.split(" ");
    const correct_role_strings =
        ["actor", "Actor", "cinematographer", "Cinematographer",
            "editor", "Editor", "director", "Director", "producer", "Producer", "screenwriter",
            "Screenwriter"]

    let i_string_list = [];
    input_string.forEach(input => {
        correct_role_strings.forEach(role => {
            // console.log(input, " vs ", role);
            if (input === role) {
                i_string_list.push(input);
            }
        })
    })
    console.log("i list ", i_string_list);
    console.log("input ", input_string);
    let out = true;
    for(let i = 0; i < input_string.length; i++){
        if (input_string[i] !== i_string_list[i]){
            out = false;
        }
    }
    console.log("out ", out);

    return (out);
}
