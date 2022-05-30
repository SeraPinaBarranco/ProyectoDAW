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

        return json_encode(array("resultado"=>$resultado, "codigo"=>$num));
    }

    
    function guardar2($conn, $query){
        $resultado= mysqli_query($conn,$query);
        $num= mysqli_affected_rows($conn);

        if($num > 0){
            $resultado = "Guardado Correcto";
        }else{
            $resultado = "Error al guadar, revisa los datos!";
        }

        return array("resultado"=>$resultado, "codigo"=>$num);
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
    function selectBBDD($conn, $query)
    {
        $resultado= mysqli_query($conn, $query);
        return $resultado;
    }

    function consulta($conn, $query){
        $resultado= mysqli_query($conn, $query);
        $filas= mysqli_fetch_array($resultado);
        return $filas;
    }

    function consultaAssoc($conn, $query){
        $resultado= mysqli_query($conn, $query);
        $filas= mysqli_fetch_assoc($resultado);
        return $filas;
    }

    function listado($conn, $query){
        $resultado= mysqli_query($conn,$query);
        $filas = mysqli_fetch_all($resultado,MYSQLI_ASSOC);
        return $filas;
    }

    //devuelve el número de filas afectadas en la consulta previa
    function obtener_num_filas($query){
        return mysqli_num_rows($query);
	}
   
    function duplicados($conn){
        $num = mysqli_affected_rows($conn);
        return $num;

    }

    function cerrarBD($conn){
        mysqli_close($conn);
    }

?>