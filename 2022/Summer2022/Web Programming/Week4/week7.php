<?php

    if(!isset($_COOKIE['show'])) {
  	header("Location: register.php");
    } else {
  	echo "show: {$_COOKIE['show']}<br>";
    }
    define( 'DB_NAME', 'nhaque2' );
    define( 'DB_USER', 'nhaque2' );
    define( 'DB_PASSWORD', 'nhaque2' );
    define( 'DB_HOST', 'localhost' );
    function deleteUser($id) {
        $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        // Check connection
        if (!$conn) {
          die("Connection failed: " . mysqli_connect_error());
        }
        $del = "DELETE FROM Users WHERE id = '$id' "; 
        $result = $conn->query($del);
        mysqli_close($conn);
    }
    function insertUser($fname, $lname, $pnumber) {
        $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        // Check connection
        if (!$conn) {
          die("Connection failed: " . mysqli_connect_error());
        }
         
        $insert = "INSERT INTO Users (first_name, last_name, telephone) VALUES ('{$fname}' , '{$lname}' , '{$pnumber}')";
        $result = $conn->query($insert);
	print($result);
         
        mysqli_close($conn);
    }

    function ShowUser() {
        // Create connection
        $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        // Check connection
        if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
        }
    
        $sql = "SELECT first_name, last_name, telephone FROM Users";
        $result = mysqli_query($conn, $sql);
    
        if (mysqli_num_rows($result) > 0) {
        // output data of each row
            while($row = mysqli_fetch_assoc($result)) {
                $delurl = "[<a href='https://codd.cs.gsu.edu/~nhaque2/week5.php?cmd=delete&id={$row['id']}'>delete</a>]";
                echo  "Name: " . $row["first_name"]. " ". $row["last_name"]. "\tphone: ". $row["telephone"]. "$delurl<br>";
            }   
        } else {
            echo "0 results";
        }
    
        mysqli_close($conn);
    }
?>

<form method="get">
    Firstname: <input type="text" name="fName">
    lastname: <input type="text" name="lName">
    phone number: <input type="text" name="pNumber">
    <input type="submit" value="submit"><br>
<form>

<?php
    if($_GET['fName'] == '' && $_GET['lName'] == '' && $_GET['pNumber'] == '') {
	echo "no data". "<br>";
    }else{
	insertUser($_GET['fName'], $_GET['lName'], $_GET['pNumber']);
	echo data;
    }
    
    if($_GET['cmd'] == 'delete') {
        $id = $_GET['id'];
        deleteUser($id);
    }
    
    ShowUser();
?>
