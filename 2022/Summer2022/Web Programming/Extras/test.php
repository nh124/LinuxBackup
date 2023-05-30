<?PHP
//viewing purposes only - do not copy and paste - quotes are not handled correctly
 
define( 'DB_NAME', 'nhaque2' );
define( 'DB_USER', 'nhaque2' );
define( 'DB_PASSWORD', 'nhaque2' );
define( 'DB_HOST', 'localhost' );
 
function DeleteCarEntry($id) {
 
    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    // Check connection
    if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
    }
     
    $del = "DELETE FROM Users WHERE id = '$id' ";
     
    $result = $conn->query($del);
     
    mysqli_close($conn);
}
 
function InsertMake($fname, $lname, $pnumber) {
 
    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    // Check connection
    if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
    }
     
    $sql = "INSERT INTO Users (first_name, last_name, telephone)
            VALUES ($fname, $lname, $pnumber)";
     
    $result = $conn->query($insert);
     
    mysqli_close($conn);
}
 
 
 
function ShowCars() {
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
        $delurl = "[<a href='https://codd.cs.gsu.edu/~nhaque2/test.php?cmd=delete&id={$row['id']}'>delete</a>]";
        echo $row["first_name"]. " ". $row["last_name"]. " ". $row["telephone"] " $delurl<br>";
      }
    } else {
      echo "0 results";
    }
 
    mysqli_close($conn);
}
 
?>
 
<form method="get">
  First Name: <input type="text" name="fname"><br>
  Last Name: <input type="text" name="lname"><br>
  Phone number: <input type="text" name="pnumber"><br>
  <input type="submit" value="Submit">
</form>
 
<?php
if($_GET['fname'] != '' || $_GET['lname'] != '' || $_GET['pnumber'] != '') {
    InsertMake($_GET['fname'], $_GET['lname'], $_GET['pnumber']);
}
 
if($_GET['cmd'] == 'delete') {
    $id = $_GET['id'];
    DeleteCarEntry($id);
}
 
ShowCars();
?>
