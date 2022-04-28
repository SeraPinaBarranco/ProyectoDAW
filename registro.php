<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="styles/style_registro.css">
    <script src="js/registro.js" defer></script>
    <title>Registro</title>
</head>

<body>

    <div class="contenedor">
        <div class="campos">
            <h3>Registro de usuario</h3>
            <form action="" class="row formulario" id="formularioRegistro">
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Introduce tu nombre">
                </div>
                <div class="mb-3">
                    <label for="apellidos" class="form-label">Apellidos</label>
                    <input type="text" class="form-control" name="apellidos" id="apellidos" placeholder="Introduce tus apellidos">
                </div>
                <div class="mb-3">
                    <label for="nick" class="form-label">Nick</label>
                    <input required type="text" class="form-control" name="nick" id="nick" placeholder="Introduce tu usuario">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input required type="email" class="form-control" name="email" id="email" placeholder="Introduce tu e-mail">
                </div>
                <div class="mb-3">
                    <label for="pass" class="form-label">Contraseña</label>
                    <input required type="password" class="form-control" name="pass" id="pass" placeholder="Introduce tu contraseña">
                </div>
                <div class="mb-3">
                    <label for="rpass" class="form-label">Repite la contraseña</label>
                    <input required type="password" class="form-control" name="rpass" id="rpass" placeholder="Repite la contraseña">
                    <p hidden id="errorpass">No coinciden la contraseñas</p>
                </div>
                <div class="div-registrar">
                    <button type="submit" name="registrar" id="registrar" class="btn btn-primary">Registrar</button>
                </div>

            </form>
        </div>


    </div>

    <div class="padre">
    </div>


    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
</body>

</html>