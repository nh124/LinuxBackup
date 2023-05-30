<?php
    define( 'DB_NAME', 'nhaque2' );
    define( 'DB_USER', 'nhaque2' );
    define( 'DB_PASSWORD', 'nhaque2' );
    define( 'DB_HOST', 'localhost' );
    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    // Check connection
    if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
    }
    function deleteUserEntry($id) {
        global $conn;
        $del = "DELETE FROM Users WHERE id = '$id' ";
        $result = $conn->query($del);
    }
    function insertUser($fname, $lname, $pnumber) {
      global $conn;
        $insert = "INSERT INTO Users (first_name, last_name, telephone) VALUES ('{$fname}' , '{$lname}' , '{$pnumber}')";
        $result = $conn->query($insert);
    }

    function ShowUser() {
        global $conn;
        $sql = "SELECT id, first_name, last_name, telephone FROM Users";
        $result = mysqli_query($conn, $sql);
        if (mysqli_num_rows($result) > 0) {
        // output data of each row
            while($row = mysqli_fetch_assoc($result)) {
		$id = $row["id"];
                $delurl = "[<a href='' onclick=return(deleteUser('$id'))>delete</a>]";
        	echo  "Name: " . $row["first_name"]. " ". $row["last_name"]. "\tphone: ". $row["telephone"]. "$delurl<br>";
            }
        } else {
            echo "0 results";
        }
    }
    $cmd = $_GET['cmd'];

    if($cmd == 'create') {
        insertUser($_GET['fName'], $_GET['lName'], $_GET['pNumber']);
    } else if($cmd == 'delete') {
        $id = $_GET['id'];
	echo "ths is the ID: ". $id;
        deleteUserEntry($id);
    }

    ShowUser();

    mysqli_close($conn);
?>
