<?php 
    require_once "model/basedatos.php";
    $conn = connDB();
    $id_receta = "";
    
    if(isset($_GET['id_receta']) && !empty($_GET['id_receta'])){
        $id_receta = $_GET['id_receta'];

        $query="SELECT * FROM recetas WHERE id_recetas = $id_receta";

        $resultado= consulta($conn, $query);

        extract($resultado);

        $query= "select * from recetas_productos rp, recetas r, productos p 
                    where rp.id_r = r.id_recetas and
                    rp.id_p = p.id_producto 
                    and r.id_recetas= $id_receta";
        $ing = selectBBDD($conn, $query);

        

        // while($f = mysqli_fetch_assoc($ing)){
        //     echo $f['nombre_receta'] . "<br>";
        // }
        
    }   
?>


<?php include_once "templates/title.html"; ?>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<link rel="stylesheet" href="styles/style_edit_receta.css">  

<title>Editar Receta</title>
</head>
<body>
    <?php include_once "templates/cabecera.html"?>

    <div class="contenedor_grid">
        <div class="titulo">
            <div class="edt_nombre_titulo">
                <h3>Edita Receta / Ingredientes</h3>
            </div>               
        </div>
        <div class="c_nombre">
            <div class="edt_nombre1">
                <form action="edita_nombre_receta.php" method="get">
                    <?php
                        if($id_receta !== "")echo strtoupper($nombre_receta);
                    ?>
                    
                    </div>
                    <div  class="edt_nombre2">
                        <button type="submit" name="edt_nombre" value="<?php echo $id_receta ?>"> <img src="assets/pencil.png" alt=""></button>
                    </div>
                </form>    
        </div>
        <div class="c_ingredientes">
            <div class="edt_ingrediente1">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col"><center>Ingrediente</center> </th>
                            <th scope="col"><center>Cantidad</center></th>
                            <th scope="col">Editar</th>
                            <th scope="col"><center>Borrar</center></th>
                       
                        </tr>
                    <tbody>
                        <?php
                        while($f = mysqli_fetch_assoc($ing)){
                            
                            echo "<tr>";
                            echo "<td><center>" . $f['nombre_p'] . "</center></td>";
                            echo "<td><center>" . $f['cantidad'] . "</center></td>";
                            echo "<td><a href='editar_producto_receta.php?id_p=" . $f['id_producto'] . "&id_r=" . $f['id_r'] . "&nombre_p=" . $f['nombre_p'] . " '> <img src='assets/pencil.png' alt=''></a></td>";
                            echo "<td><center><a id='borrar'onClick='borrar(" . $f['id_producto'] .")' href='#' value=''> <img src='assets/delete.png' alt=''></a></center></td>";
                            echo "</tr>";
                        }
                        ?>
                    </tbody>
                    </thead>
                </table>
                        
            </div>
            
        </div>
    </div>


    <?php include_once "templates/pie.html" ?>

    <script src="js/quitar_ing_receta.js" ></script>  
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
</body>
</html>



