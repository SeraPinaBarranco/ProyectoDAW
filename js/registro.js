const registrar = document.querySelector("#registrar");
const f = document.getElementById("formularioRegistro");

f.addEventListener("submit", function (event) {
  let formData = new FormData(f);
  event.preventDefault();

  //datos del formulario
  const n = formData.get("nombre");
  const ape = formData.get("apellidos");
  const nick = formData.get("nick");
  const email = formData.get("email");

  //comprobar que sean iguales
  const p = formData.get("pass");
  const rp = formData.get("rpass");

  if (p !== rp) {
    let rpass = document.querySelector("#rpass");
    rpass.style.backgroundColor = "#ff6666";
    rpass.focus();
    document.querySelector("#errorpass").hidden = false;
    return;
  } else {
    document.querySelector("#errorpass").hidden = true;
  }

  //si pasa la validación envia la peticion al servidor

  //URL de la peticion
  let url = "./controller/registrar_usuario.php";
  //let d;
  //configurar la peticion. AQUI CONFIGURO LA PETICION
  let configFetch = {
    method: "POST",
    body: `nombre=${n}&apellidos=${ape}&nick=${nick}&email=${email}&pass=${p}`,

    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };

  //mandar la peticion
  let promesa = fetch(url, configFetch);

  //Ejecutar la promesa que devuelve la peticion
   promesa
      .then((res) => res.json())
      .then((datos) => {
         let d = datos;
         console.log(datos.codigo);
         if(d.codigo == "1"){
            Swal.fire(
                'Usuario Registrado con éxito!!',
                '',            
                'success'
            )
            //Redirigir al indice
            setInterval(() => {
                window.location.href = "./login.php";
            }, 2000);


            
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se ha podido guardar el usuario!'
            })
        }

   });
});

//Pone el fondo rojo si el input nick esta vacio
const nick = document
  .getElementById("nick")
  .addEventListener("focusout", (e) => {
    if (e.target.value == "") {
      e.target.style.backgroundColor = "#ff6666";
    } else {
    }
  });

//implementar validacion de campos
