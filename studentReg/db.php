<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "studentreg"; // Database name
$tbname = "students"; // Table name

$conn = new mysqli($servername, $username, $password); // Create connection

$sql = "CREATE DATABASE " . $dbname; // create database sql
$conn->query($sql); // Create Database

$conn = new mysqli($servername, $username, $password, $dbname); // connect to database

// create table sql
//may underscore kasi reserved yung words na address, status
$sql = "CREATE TABLE " . $tbname . " (
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