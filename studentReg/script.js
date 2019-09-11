// Declare Variables
var units, total, dbTable, modal, btn, span;

window.onload = function(){ // Run after everything loads up

    // Setup Database
    setupDB();

    // Set DOMs
    units = $("units");
    total = $("total");
    dbTable = $("dbTable");


    // Get Modal
    modal = $("myModal");

    // Get btn to open modal
    btn = $("myBtn");

    // Get the <span> to close the modal
    span = document.getElementsByClassName("close")[0];

    // onclick btn then open the modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x) it will close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            getData();
            modal.style.display = "none";
        }
    }
    getData();
}

function setupDB() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {};
    xhttp.open("GET", "db.php", true);
    xhttp.send();
}

function addStudent() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //this.responseText
            alert("Student Added!");
        }
    };
    xhttp.open("GET", "functions.php?type=0&fname="+$("FName").value+"&mname="+$("MName").value+"&lname="+$("LName").value+"&sex="+radio("user_sex")+"&address="+$("Address").value+"&stat="+$("Status").value+"&bday="+$("BDay").value+"&course="+$("course").value+"&email="+$("email").value+"&units="+$("units").value+"&payment="+radio("user_PayStatus")+"&balance="+(units.value * 200), true);
    xhttp.send();
    getData();
}

function edit(editID){
    var data = name("data" + editID).children;
    $("FName").value = data[0].innerHTML;
    $("MName").value = data[1].innerHTML;
    $("LName").value = data[2].innerHTML;
    name("user_sex").value = data[3].innerHTML;
    $("Address").value = data[4].innerHTML;
    $("Status").value = data[5].innerHTML;
    $("BDay").value = data[6].innerHTML;
    $("course").value = data[7].innerHTML;
    $("email").value = data[8].innerHTML;
    $("units").value = data[9].innerHTML;
    $("total").value = data[10].innerHTML;
    name("user_PayStatus").value = data[11].innerHTML;
    span.click();
}

function del(delID) { // Delete Student
    var r = confirm("Do you want to delete this Student?");
    if (r == true) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert("Student Deleted!");
                data.innerHTML = "";
                getData();
            }
        };
        xhttp.open("GET", "functions.php?type=2&id="+delID, true);
        xhttp.send();
    }
}

function getData(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data.innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "functions.php?type=1", true);
    xhttp.send();
}

function compute() {
    total.innerHTML = "P " + units.value * 200;
}

function $($0){
    return document.getElementById($0);
}

function name(nameOfElement){
    return document.getElementsByName(nameOfElement)[0];
}

function radio(radio0){
    radio0 = document.getElementsByName(radio0);
    for (var i = 0, length = radio0.length; i < length; i++) {
        if (radio0[i].checked) {
            return radio0[i].value;
            break;
        }
    }
}