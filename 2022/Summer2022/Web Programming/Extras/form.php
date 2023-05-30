<DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form method="POST">
        Firstname: <input type="text" name="fName">
        lastname: <input type="text" name="lName">
        phone number: <input type="text" name="pnumber">
        <input type="submit" value="submit">
    </form>

    <?php
        define( 'DB_NAME', 'nhaque2' );
        define( 'DB_USER', 'nhaque2' );
        define( 'DB_PASSWORD', 'nhaque2' );
        define( 'DB_HOST', 'localhost' );
        $fname = $_POST['fname']; 
        $lname = $_POST['lname']; 
        $pnumber = $_POST['pnumber']; 

        function insert($fnmae, $lname, $pnumber){
            $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
            if (!conn) {
                die("Connection failed: " . $mysqli_connect_error());
            }
            $insert = "INSERT INTO Users($fnmae, $lname, $pnumber)";
            $result = $conn->query($insert);
            mysqli_close($conn);
        }
        function display(){
            // Create connection
            $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
            // Check connection
            if (!conn) {
                die("Connection failed: " . $mysqli_connect_error());
            }

            $sql = "SELECT id, first_name, last_name, telephone  FROM Users";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                // output data of each row
                while($row = $result->fetch_assoc()) {
                    echo  "Name: " . $row["first_name"]. " ". $row["last_name"]. "\tphone: ". $row["telephone"]. "<br>";
                }   
            } else {
                echo "0 results";
            }   
            $conn->close();
        }
        insert($fnmae, $lname, $pnumber);
        display();
        
    ?>  
</body>
</html>

