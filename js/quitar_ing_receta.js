$(document).ready(function () {
    $('.borrar').click(borrar);    
})


function borrar(){
    
    //Obtener id receta de la url
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var id_r = urlParams.get('id_receta');
    
    //capturar id del producto
    const p = $(this).attr('value');
    
    //console.log($(this).parent().remove());//elimina la fila del td seleccionado

    //configurar la peticion. AQUI CONFIGURO LA PETICION
    let url= "./controller/elimina_ingrediente.php";       
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
            mostrarMensaje(d.codigo,$(this).parent() )
    });

}

function mostrarMensaje(codigo, fila) {
    if(codigo == 1){
        Swal.fire(
            'Producto Eliminado!',
            '',            
            'info'
        )
        fila.remove();
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se ha podido eliminar el ingrediente!'
        })
    }
}