<?php 
    session_start();


    require_once "model/basedatos.php";
    $conn = connDB();
   
    
    if(isset($_GET['id_p']) && !empty($_GET['id_p'])){
        $id_producto = $_GET['id_p'];
        $id_r = $_GET['id_r'];
        $nombre = $_GET['nombre_p'];
        
        //echo $id_producto . " - " . $id_r . " - " . $nombre;
        
        //     echo $_SESSION['id_receta'];
        $query="select * from recetas_productos rp, recetas r, productos p 
        where rp.id_r = r.id_recetas and
        rp.id_p = p.id_producto 
        and p.id_producto= $id_producto and r.id_recetas = $id_r;";
        //echo $query;
        $resultado= consulta($conn, $query);
        
        extract($resultado);
        
        
        $_SESSION['id_p'] = $_GET['id_p'] ;
        $_SESSION['id_r'] = $_GET['id_r']  ;
        $_SESSION['cantidad'] = $cantidad;
        $_SESSION['nombre_p'] = $_GET['nombre_p'];
        cerrarBD($conn);
    }   

    if(!empty($_GET['cantidad'])){
            $_SESSION['cantidad'] = $_GET['cantidad']; 

            $query = "UPDATE recetas_productos
                        SET
                        cantidad =" .  $_GET['cantidad'] .
                        " WHERE id_p =" .  $_SESSION['id_p'] . " and id_r =" . $_SESSION['id_r'] ;

            //echo $query;
 
            $resultado= selectBBDD($conn, $query);
            
            unset($_SESSION['id_p']);
            unset($_SESSION['id_r']);
            unset($_SESSION['cantidad']);
            unset($_SESSION['nombre_p']);
            //session_destroy();
            
            cerrarBD($conn);

            header("Refresh: 3; url=" . "listar_recetas.php");
        }

    // if(isset($_GET['modificar']) && !empty($_GET['modificar']) && !empty($_SESSION['id_receta'])){
    //     $receta = $_GET['modificar'];

    //     $nombre_receta = $receta;
       
    //     $query="UPDATE recetas SET nombre_receta = '$receta' WHERE id_recetas =" . $_SESSION['id_receta'];
        
    //     $resultado= selectBBDD($conn, $query);    

    //     cerrarBD($conn);
        
    //     unset($_SESSION['id_receta']);
    //     session_destroy();
    //     header("Refresh: 3; url=" . "listar_recetas.php");
    //     //extract($resultado);
    //}
?>




<?php include_once "templates/title.html"; ?>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<link rel="stylesheet" href="styles/style_edit_receta.css">    
<title>Editar Receta</title>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edita Ingrediente</title>
</head>
<body>
<?php include_once "templates/cabecera.html"?>
<div class="container col-4">

    <div class="row mt-5">
        <h3>Modifica la cantidad</h3>
    </div>

    <div class="row mt-4">
        <form action="<?php echo  $_SERVER['PHP_SELF'];  ?>" method="get">
        <div class="mb-3">
            <label for="ingrediente" class="form-label">Ingrediente: </label>
            <input hidden type="text" class="form-control" name="id_receta" value="<?php $id_producto ?>"> 
            <input  type="text" class="form-control" name="ingrediente" id="ingrediente" 
                value="<?php 
                        if(isset($nombre)){
                            echo $nombre;  
                        }else{
                            echo $_GET['ingrediente'];
                        }
                        ?>"> 
            <label for="cantidad" class="form-label mt-3">Cantidad: </label>
            <input type="number" class="form-control" name="cantidad" id="cantidad" 
                value="<?php 
                        //if(!empty($_GET['cantidad'])){
                            echo $cantidad;  
                        //}else{
                            //echo $_GET['cantidad'];
                        //}
                    
                        ?>">          
        </div> 
        
        <div class="row m-2">
            
            
        </div>
       
        <button type="submit" class="btn btn-primary">Modificar</button>

        </form>
    </div>
</div>

    <?php include_once "templates/pie.html"; ?>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
</body>
</html>

<?php 
                
            ?>