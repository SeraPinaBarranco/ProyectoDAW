
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="styles/style_login.css">
    <script src="js/login.js" defer></script>
    <title>Login</title>
</head>
<body>
    
    <div class="contenedor">
        <div class="row div_titulo">
            <div>
                <h3>LOGIN</h3>
            </div>
        </div>
        <div class="row div_usuario col-6">
            <form method="post" id="frm_login">
                <div class="row form-floating mb-3">
                    <!-- <label class="form-control" for="user">Nombre de usuario</label> -->
                    <input class="form-control" type="text" name="user" id="user" name="user" placeholder="Usuario" style="font-size: 18pt" autocomplete="off">
                    <label for="user">Nombre de usuario</label>
                </div>
                <div class="row form-floating mb-3">
                    <input class="form-control" type="password" name="pass" id="pass" name="pass" placeholder="Contraseña">
                    <label class="pass" for="user">Contraseña</label>
                </div>
                <div class="position-relative mt-5">
                    <div class="position-absolute top-50 start-50 translate-middle">
                        <button type="submit" class="btn btn-primary btn-lg" id="btn_login">Ingresar</button>
                    </div>
                </div>
            </form>
            
        </div>
        <div class="row mt-2" id="msj">
            <p>Si aún no tienes cuenta, registrate <a href="registro.php">aquí</a> </p>
        </div>        

    </div>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
    
</body>
</html>

