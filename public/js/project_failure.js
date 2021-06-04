//function that takes you back to application page
function goBack(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const checked = urlParams.get('checked');
    const name = urlParams.get('name');
    const email = urlParams.get('email');
    const date = urlParams.get('date');
    const isPaid = urlParams.get('isPaid');
    const synopsis = urlParams.get('synopsis');
    const role_descriptions = urlParams.get('role_descriptions');

    location.href = "/project_submission?name=" + name + "&email=" + email
        + "&date=" + date + "&synopsis=" + synopsis + "&role_descriptions=" + role_descriptions + "&checked=" + checked;
}