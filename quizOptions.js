
function submitForm() {
    var form = document.getElementById("quiz");

    if (form.option[0].checked) {
        form.action = "quizResults/red.html";
    } else if (form.option[1].checked) {
        form.action = "quizResults/orange.html";
    } else if (form.option[2].checked) {
        form.action = "quizResults/yellow.html";
    } else if (form.option[3].checked) {
        form.action = "quizResults/green.html";
    } else if (form.option[4].checked) {
        form.action = "quizResults/blue.html";
    } else if (form.option[5].checked) {
        form.action = "quizResults/purple.html";
    }
    
}