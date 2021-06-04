//function that takes you back to application page
function goBack(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const project_id = urlParams.get("p_id");
    location.href = "/project_submission?p_id=" + project_id
}