<!doctype html>
<html>
    <head>
        <script src="./JQuery/jquery-3.6.0.min.js"></script>
    </head>
    <body>
        This is an ajax example<p>
         
        <form onsubmit="return(insertUser())">
            <input type=text id=fName>
	    <input type=text id=lName>
            <input type=text id=pNumber>
            <input type=submit value=submit>
        </form>
         
        <div id=showcars></div>
        <script>
            function insertUser() {
               	First_Name = $("#fName").val();
		Last_Name = $("#lName").val();
		phone_number = $("#pName").val();
                $.get("./ajax.php",{"cmd": "create", "fName" : First_Name, "lName" : Last_Name, "pNumber" : phone_number}, function(data) {
                    $("#showcars").html(data);
                });
                return(false);
            }
            function deleteUser(id) {
                $.get("./ajax.php",{"cmd": "delete", "id" : id}, function(data) {
                    $("#showcars").html(data);
                });
                return(false);
            }
            function showuser() {
                $.get("./ajax.php",{"cmd": ""}, function(data) {
                    $("#showcars").html(data);
                });
                return(false);
            }
            showuser();
         
        </script>
    <body>
</html>
