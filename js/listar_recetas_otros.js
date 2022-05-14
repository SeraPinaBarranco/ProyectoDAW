/*
 * Cuando se de click en el ojo mostrar
 * la receta en Sweet alert
 */

function ver_receta(id, tgt) {
  //almaceno el nombre de la receta -- data-bs-toggle="modal" data-bs-target="#exampleModal"
  let nombre_receta = tgt.parentNode.previousSibling.previousSibling.innerText;

  let mTitle = document.getElementById("exampleModalLabel");
  mTitle.innerHTML = nombre_receta;

  let divDetalle = document.getElementById('div_detalle');
  divDetalle.innerHTML = "";

  let mBody = document.getElementById("modal-body");

  // TODO traer la receta que llega en el id para mostrarla
  // * URL de la peticion
  let url = "./controller/lista_recetas_otros.php";

  //* configurar la peticion. AQUI CONFIGURO LA PETICION
  let configFetch = {
    method: "POST",
    body: `id_receta=${id}`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };

  // * mandar la peticion
  let promesa = fetch(url, configFetch);

  // * Ejecutar la promesa que devuelve la peticion
  promesa
    .then((res) => res.json())
    .then((datos) => {
      let d = datos;
      console.log(datos);
      let i = 0;
      d.forEach((receta) => {
        let li = document.createElement('div');
        li.setAttribute('class','row')
        li.setAttribute('class','li_detalle')

        let span = document.createElement('span');
        span.setAttribute('class','span_detalle');
        span.innerHTML= d[i].nombre_p + " -Cantidad: " + d[i].cantidad + " g";

        li.appendChild(span) 

        let subLi = document.createElement('div');
        subLi.setAttribute('class','sub_li_detalle');



        subLi.innerHTML ="Total calorias: " + d[i].total_calorias + "g -Total grasas: " + d[i].total_grasas;
        subLi.innerHTML += "g -Total hidratos: " + d[i].total_hidratos + "g -Total proteinas: " + d[i].total_proteinas + "g"

        li.appendChild(subLi);

        divDetalle.appendChild(li);

        i++;
      });
    });
}

/*
    *AÑADIR A FAVORITAS
*/

function agregar_favorita(id_receta, evt, id_usuario) {
    // * URL de la peticion
  let url = "./controller/agregar_favorita.php";

  //* configurar la peticion. AQUI CONFIGURO LA PETICION
  let configFetch = {
    method: "POST",
    body: `id_receta=${id_receta}&id_usuario=${id_usuario}`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };

  // * mandar la peticion
  let promesa = fetch(url, configFetch);

  // * Ejecutar la promesa que devuelve la peticion
  promesa
    .then((res) => res.json())
    .then((datos) => {
      let d = datos;
      console.log(datos);     
      
      if(d.msg == 0){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Receta no añadida por error o estar ya en favoritas'
        })
      }else{
        Swal.fire({
            icon: 'success',
            title: 'Guardada',
            text: 'Receta añadida a favoritas'
        }) 
      }

    });

}