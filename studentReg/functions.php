<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "studentreg"; // Database name
$tbname = "students"; // Table name

$conn = new mysqli($servername, $username, $password, $dbname);

$type = $_REQUEST["type"]; // get type

switch($_REQUEST["type"]){ // types of connection; 0 -> add a student, 1 -> Show all data, 2 -> delete a student, 3 -> modify
    case 0:
        add($conn, $tbname);
        break;
    case 1:
        show($conn, $tbname);
        break;
    case 2:
        del($conn, $tbname);
        break;
    case 3:
        edit($conn, $tbname);
        break;
    default:
}

function add($conn, $tbname){
    //dito lalabas yung parameters
    // nakuha yung $_REQUEST["fname"] sa js file line 62
    $sql = "INSERT INTO " . $tbname . "(firstname,middlename,lastname,sex,_address,_status,bday,course,email,units,payment,balance) VALUES('" . $_REQUEST["fname"] . "','" . $_REQUEST["mname"] . "','" . $_REQUEST["lname"] . "','" . $_REQUEST["sex"] . "','" . $_REQUEST["address"] . "','" . $_REQUEST["stat"] . "','" . $_REQUEST["bday"] . "','" . $_REQUEST["course"] . "','" . $_REQUEST["email"] . "','" . $_REQUEST["units"] . "','" . $_REQUEST["payment"] . "','" . $_REQUEST["balance"] . "')";
    $conn->query($sql); // Insert Student
}

function del($conn, $tbname){
    $sql = "DELETE FROM " . $tbname . " WHERE id = " . $_REQUEST["id"];
    $conn->query($sql); // Delete Student
}

function edit($conn, $tbname){
    $sql = "UPDATE " . $tbname . " SET 
    firstname = '" . $_REQUEST["fname"] . "', 
    middlename = '" . $_REQUEST["mname"] . "', 
    lastname = '" . $_REQUEST["lname"] . "', 
    sex = '" . $_REQUEST["sex"] . "', 
    _address = '" . $_REQUEST["address"] . "', 
    _status = '" . $_REQUEST["stat"] . "', 
    bday = '" . $_REQUEST["bday"] . "', 
    course = '" . $_REQUEST["course"] . "', 
    email = '" . $_REQUEST["email"] . "', 
    units = '" . $_REQUEST["units"] . "', 
    payment = '" . $_REQUEST["payment"] . "', 
    balance = '" . $_REQUEST["balance"] . "'
    WHERE id = " . $_REQUEST["id"];
    $conn->query($sql); // Edit Student
}

function show($conn, $tbname){
    $sql = "SELECT * FROM " . $tbname;
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        // output data of each row
        $dataresult = "";
        while($row = $result->fetch_assoc()) {
            $dataresult .= "<tr name='data" . $row["id"] . "'>";
            $dataresult .= "<td>" . $row["firstname"] . "</td><td>" . $row["middlename"] . "</td><td>" . $row["lastname"] . "</td><td>" . $row["sex"] . "</td><td>" . $row["_address"] . "</td><td>" . $row["_status"] . "</td><td>" . $row["bday"] . "</td><td>" . $row["course"] . "</td><td>" . $row["email"] . "</td><td>" . $row["units"] . "</td><td>" . $row["payment"] . "</td><td>" . $row["balance"] . "</td>";
            $dataresult .= "<td><button class='mini del' onclick='del(" . $row["id"] . ")'>X</button><button class='mini edit' onclick='edit(" . $row["id"] . ")'>Edit</button></td>";
            $dataresult .= "</tr>";
        }
        echo $dataresult;
    } else {
        echo "0 results";
    }
}

?>