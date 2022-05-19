<?php 
    session_start();
   
?>
<?php 
    if(isset($_POST['si']) && !empty($_POST['si'])){
        unset($_SESSION);
        session_destroy();
    }elseif(isset($_POST['no']) && !empty($_POST['no'])){                    
        
        echo ("<script>window.location.replace('https://localhost/ProyectoDAW/index.php')</script>");

    }
?>

<?php include_once "templates/title.html" ?>
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<link rel="stylesheet" href="styles/style_logout.css">

</head>

<body>
<?php include_once "templates/cabecera.html" ?>

<div class="contenedor">
        <div class="row div_titulo">
            <div>
                <h3>CERRAR SESIÓN?</h3>
            </div>
        </div>
        <div class="row div_usuario col-6">
            <form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post" id="frm_login">
                
                <div class="position-relative mt-5">
                    <div class="position-absolute top-50 start-50 translate-middle">
                        <button type="submit" class="btn btn-primary btn-lg" name="si" id="si" value="si">SI</button>
                        <button type="submit" class="btn btn-primary btn-lg" name="no" id="no" value="no">NO</button>
                    </div>
                </div>
            </form>
            
        </div>
        <div class="row" id="msj">
        </div>        

    </div>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
    

<?php include_once "templates/pie.html" ?>
</body>

</html>

