/* 
* Cuando se de click en el ojo mostrar 
* la receta en Sweet alert 
*/

function ver_receta(id){
    let div= document.getElementById('ver_receta');
    div.style.display = 'none';
    let ul = document.getElementById('lista_ver');
    ul.innerHTML = "";
    
    // TODO traer la receta que llega en el id para mostrarla    
    // * URL de la peticion
    let url= "./controller/lista_recetas_otros.php";
     
    //* configurar la peticion. AQUI CONFIGURO LA PETICION
    let configFetch={
        method:'POST',
        body:`id_receta=${id}`,       
        headers:{'Content-Type': 'application/x-www-form-urlencoded'}
    };
    
    // * mandar la peticion
    let promesa = fetch(url,configFetch);

    // * Ejecutar la promesa que devuelve la peticion
    promesa.then( res => res.json())
        .then(datos => {         
           let d = datos;
           console.log(datos);

            d.forEach(receta => {
                let li = document.createElement('li');
                li.innerHTML = receta.nombre_p;
                ul.appendChild(li); 
            });
            
            div.style.display = 'block';


                    
    });

}