window.addEventListener('load', function() {
    console.log('La página ha terminado de cargarse!!');
});



function borrar(id_producto){
    //Obtener id receta de la url
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var id_r = urlParams.get('id_receta');
    
    //capturar id del producto
    let p = id_producto;

    //OBtener el id de la receta
    let url= "./controller/elimina_ingrediente.php";       
    //configurar la peticion. AQUI CONFIGURO LA PETICION
    let configFetch={
        method:'POST',
        body:`id_r=${id_r}&ing=${p}`,       
        headers:{'Content-Type': 'application/x-www-form-urlencoded'}
    };
    //mandar la peticion
    var d;
    fetch(url,configFetch)
        .then( res => res.json())
        .then(datos => {         
            d = datos;
            console.log();
        });
}