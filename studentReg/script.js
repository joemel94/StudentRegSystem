// Declare Variables
var units, total, dbTable, modal, btn, span, selectedID;

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
    getData(); // update data table
}

function setupDB() { // create db if wala pa
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {};
    xhttp.open("GET", "db.php", true);
    xhttp.send();
}

function addStudent() { // add student
    var r = confirm("Do you want to add this Student?");
    if (r == true) { // if yes
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert("Student Added!");
                location.reload(); // refresh
            }
        };
        //parameters
        //type = 0 line 13 functions.php
        xhttp.open("GET", "functions.php?type=0&fname="+$("FName").value+"&mname="+$("MName").value+"&lname="+$("LName").value+"&sex="+radio("user_sex")+"&address="+$("Address").value+"&stat="+$("Status").value+"&bday="+$("BDay").value+"&course="+$("course").value+"&email="+$("email").value+"&units="+$("units").value+"&payment="+radio("user_PayStatus")+"&balance="+$("balance").value, true);
        xhttp.send();
    }
}

function edit(editID){ // edit student
    selectedID = editID; // get student data id
    // lagay sa input yung data
    var data = name("data" + editID).children; 
    $("FName").value = data[0].innerHTML;
    $("MName").value = data[1].innerHTML;
    $("LName").value = data[2].innerHTML;
    $(data[3].innerHTML).checked = true;
    $("Address").value = data[4].innerHTML;
    $("Status").value = data[5].innerHTML;
    $("BDay").value = data[6].innerHTML;
    $("course").value = data[7].innerHTML;
    $("email").value = data[8].innerHTML;
    $("units").value = data[9].innerHTML;
    $(data[10].innerHTML).checked = true;
    $("balance").value = data[11].innerHTML;
    document.getElementsByClassName("savebtn")[0].style.display = "block"; // show save button
    span.click(); // close modal
}

function saveEdit(){ // Save edited student
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Student Modified!");
            location.reload(); // refersh
        }
    };
    // selectedID = line 69
    xhttp.open("GET", "functions.php?type=3&id="+selectedID+"&fname="+$("FName").value+"&mname="+$("MName").value+"&lname="+$("LName").value+"&sex="+radio("user_sex")+"&address="+$("Address").value+"&stat="+$("Status").value+"&bday="+$("BDay").value+"&course="+$("course").value+"&email="+$("email").value+"&units="+$("units").value+"&payment="+radio("user_PayStatus")+"&balance="+$("balance").value, true);
    xhttp.send();
}

function del(delID) { // Delete Student
    var r = confirm("Do you want to delete this Student?");
    if (r == true) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert("Student Deleted!");
                data.innerHTML = ""; // delete sa DOM table; frontend
                getData(); // fetch data para no need to refresh
            }
        };
        xhttp.open("GET", "functions.php?type=2&id="+delID, true); // delete sa database; backend
        xhttp.send();
    }
}

function getData(){ // fetch all data in database; returned as table rows
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data.innerHTML = this.responseText; // output
        }
    };
    //type 1; functions.php line 16
    xhttp.open("GET", "functions.php?type=1", true);
    xhttp.send();
}

function compute() { // compute tuition
    $("balance").value = units.value * 200;
}

function $($0){ // Get Element By ID Shortcut
    return document.getElementById($0);
}

function name(nameOfElement){ // Get Element By Name Shortcut
    return document.getElementsByName(nameOfElement)[0];
}

function radio(radio0){ // find checked radio button
    radio0 = document.getElementsByName(radio0);
    for (var i = 0, length = radio0.length; i < length; i++) {
        if (radio0[i].checked) {
            return radio0[i].value;
            break;
        }
    }
}