<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./JQuery/jquery-3.6.0.min.js"></script>
</head>
<body>
  <form onsubmit="return(insertUser())">
    Firstname: <input type="text" name="fName">
    lastname: <input type="text" name="lName">
    phone number: <input type="text" name="pNumber">
    <input type="submit" value="submit"><br>
  </form>

  <div id="ShowUser"></div>
  <script>
    function insertUser() {
      firstName = $("#fName").val();
      lastName = $("#lName").val();
      phoneNumber = $("#pNumber").val();
      $.get("./ajax.php",{"cmd": "create", "$fname" : firstName, "$lname" : lastName, "pNumber": phoneNumber}, function(data) {
        alert("HI");
	$("#showuser").html(data);
      });
      return(false);
    }
    function showuser() {
      $.get("./ajax.php",{"cmd": ""}, function(data) {
        $("#showuser").html(data);
      });
      return(false);
    }
    showuser();
  </script>
</body>
</html>
