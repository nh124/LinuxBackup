<?php
define( 'DB_NAME', 'nhaque2' );
define( 'DB_USER', 'nhaque2' );
define( 'DB_PASSWORD', 'nhaque2' );
define( 'DB_HOST', 'localhost' );
$type = $_GET['carmake'];

function insert($data){
    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    $insert = "INSERT INTO ICars SET make = '$make' ";
    echo $make;   
    $result = $conn->query($insert);
    
    mysqli_close($conn);
}
function display(){
    // Create connection
     $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT id, make FROM ICars";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo "id: " . $row["id"]. " - Make: " . $row["make"]. "<br>";
        }
    } else {
        echo "0 results";
    }
    $conn->close();
}
?>

<form method="get">
   Car Make: <input type="text" name="carmake" ><br>
   <input type="submit" value="Submit">
</form>


<?php
if($_GET['carmake'] != '') {
    insert($_GET['carmake']);
}
display();
?>
