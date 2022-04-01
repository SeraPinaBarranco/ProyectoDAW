<?php
    
    function connDB()
    {
        $server= "localhost";
        $user="root";
        $pass="usbw";
        $db="schemadaw_m12";

        $mysqli = mysqli_connect($server,$user,$pass,$db)or die("Failed to connect to MySQL: ") ;

        return $mysqli;
    }

    function guardar($conn, $query){
        $resultado= mysqli_query($conn,$query);
        $num= mysqli_affected_rows($conn);

        if($num > 0){
            $resultado = "Guardado Correcto";
        }else{
            $resultado = "Error al guadar, revisa los datos!";
        }

        return json_encode(array("resultado"=>$resultado,"codigo"=>$num));
    }

    function borrar($conn, $query){
        $resultado= mysqli_query($conn,$query);
        $num= mysqli_affected_rows($conn);

        if($num > 0){
            $resultado = "eliminado Correcto";
        }else{
            $resultado = "Error al borrar, revisa los datos!";
        }

        return json_encode(array("resultado"=>$resultado,"codigo"=>$num));

    }

    function listado($conn, $query){
        $resultado= mysqli_query($conn,$query);
        $filas = mysqli_fetch_all($resultado,MYSQLI_ASSOC);
        return $filas;
    }

    function obtener_num_filas($resultado){
		return mysqli_num_rows($resultado);
	}

    function duplicados($conn, $query){
        $num = mysqli_affected_rows($conn,$query);
        return $num;

    }

?>