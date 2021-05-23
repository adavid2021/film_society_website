// function fillApplicant(applicant) {
//     // $('#checkbox').prop("checked", car.avail === "available");
//     // $('#sold').prop("checked", car.avail === "sold");
//     $('#applicant_name').val(applicant.applicant_name);
//     $('#applicant_email').val(applicant.applicant_email);
//     $('#applicant_qualifications').val(applicant.applicant_qualifications);
//     $('#preferred_roles').val(applicant.preferred_roles);
//
// }

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const error_message = urlParams.get("error_message");
const project_id = urlParams.get("p_id");
const input = JSON.parse(urlParams.get("input")); // converting back into json

// invisible project id field
if (project_id) {
    $('#project_id').val(project_id);
}

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


$('form').on('submit', function () {
    let errorMessage = null

    $.each($('input,textarea'), function () {
        $(this).removeClass('is-invalid text-danger')
    });

    if (!$('#applicant_name,textarea').val()) {
        errorMessage = "Name cannot be empty."
        $('#applicant_name').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false;
    }

    if (!$('#applicant_email,textarea').val()) {
        errorMessage = "Email cannot be empty."
        $('#applicant_email').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false;
    }

    if (!$('#applicant_qualifications,textarea').val()) {
        errorMessage = "Please provide your qualifications."
        $('#applicant_qualifications').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false;
    }

    if (!$('#preferred_roles,textarea').val()) {
        errorMessage = "Provide some of your preferred roles"
        $('#preferred_roles').addClass('is-invalid text-danger');
        $('#error_message').text(errorMessage);

        return false;
    }

    if (!($('#checkBox').is(':checked'))) {
        errorMessage = "You must agree to submit the application."
        $('#error_message').text(errorMessage);

        return false;
    }

});


