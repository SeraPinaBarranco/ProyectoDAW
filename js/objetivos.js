window.addEventListener("load", function () {
  let fecha = document.querySelector("#fecha");
  const d = new Date();
  let mes = d.getMonth();

  if (mes.toString().length == 1) {
    // * Devuelve el mes actual condos digitos
    mes = "0" + (mes + 1);
  }

  let fecha_actual = `${d.getFullYear()}-${mes}-${d.getDate()}`;

  fecha.value = fecha_actual;
  console.log(mes);
  console.log(fecha_actual);
});

fecha.addEventListener("change", (evt) => {
  console.log(evt.target.value);
});

$(document).ready(function () {
  
  let id_usu = $('#id_usu').text();
  
  // * URL de la peticion
  let url = "./controller/listado_favoritas.php";

  //* configurar la peticion. AQUI CONFIGURO LA PETICION
  let configFetch = {
    method: "POST",
    body: `id_usuario=${id_usu}`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };

  // * mandar la peticion
  let promesa = fetch(url, configFetch);

  // * Ejecutar la promesa que devuelve la peticion
  promesa
    .then((res) => res.json())
    .then((datos) => {
    let d = [];
    //d.push((datos));
      
    datos.forEach(element => {
        d.push(JSON.stringify(element));
    });
    console.log(d);
        
    //   $("#table_id").DataTable({
    //     data: d,
    //     columns: [
    //         { title: "Name" },
    //         { title: "Position" },
            
    //     ]
    //   });


      
    });
});
