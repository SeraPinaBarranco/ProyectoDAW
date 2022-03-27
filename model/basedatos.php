<?php
    
    function connDB()
    {
        $server= "localhost";
        $user="root";
        $pass="";
        $db="schemadaw_m12";

        $mysqli = mysqli_connect($server,$user,$pass,$db)or die("Failed to connect to MySQL: ") ;

        return $mysqli;
    }

    function guardar($conn, $query){
        $resultado= mysqli_query($conn,$query);
        return $resultado;
    }

?>