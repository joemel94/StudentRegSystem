<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "studentreg";

// Create connection
$conn = new mysqli($servername, $username, $password);

$sql = "CREATE DATABASE " . $dbname;
$conn->query($sql); // Create Database

$conn = new mysqli($servername, $username, $password, $dbname);

//may underscore kasi reserved yung words na address, status
$sql = "CREATE TABLE students (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
firstname VARCHAR(50) NOT NULL,
middlename VARCHAR(50) NOT NULL,
lastname VARCHAR(50) NOT NULL,
sex VARCHAR(20) NOT NULL,
_address VARCHAR(100) NOT NULL,
_status VARCHAR(100) NOT NULL,
bday VARCHAR(100) NOT NULL,
course VARCHAR(100) NOT NULL,
email VARCHAR(80),
units VARCHAR(20) NOT NULL,
payment VARCHAR(20) NOT NULL,
balance VARCHAR(50) NOT NULL
)";
$conn->query($sql); // Create Table
?>