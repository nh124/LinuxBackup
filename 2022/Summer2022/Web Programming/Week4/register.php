<?php
    define( 'DB_NAME', 'nhaque2' );
    define( 'DB_USER', 'nhaque2' );
    define( 'DB_PASSWORD', 'nhaque2' );
    define( 'DB_HOST', 'localhost' );

    function insertUser($username, $password) {
        $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        // Check connection
        if (!$conn) {
          die("Connection failed: " . mysqli_connect_error());
        }

        $insert = "INSERT INTO UserLogin (username, password) VALUES ('{$username}' , '{$password}')";
        $result = $conn->query($insert);
        print($result);

        mysqli_close($conn);
    }
    function checkUser($username){
	$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        // Check connection
        if (!$conn) {
          die("Connection failed: " . mysqli_connect_error());
        }
        $select = "SELECT username FROM UserLogin WHERE username='{$username}'";
	$result = $conn->query($select);
	if(mysqli_num_rows($result) > 0){
	    echo "result found!";
	    setcookie('show', 'Car', time() + (86400 * 30), "/"); // 86400 = 1 day
            header("Location: week7.php");
	}else{
		echo "Incorrect Cradentials!";
	}
    }
   
?>

<form method="post">
    Username: <input type="text" name="username">
    Password: <input type="text" name="password">
    <input type="submit" value="submit"><br>
<form>

<?php
    if($_POST['username'] == '' && $_POST['password'] == '') {
        echo "no data". "<br>";
    }else{
        //insertUser($_POST['username'], $_POST['password']);
	checkUser($_POST['username']);
    }
    // if($_GET['cmd'] == 'delete') {
    //     $id = $_GET['id'];
    // }
?>
