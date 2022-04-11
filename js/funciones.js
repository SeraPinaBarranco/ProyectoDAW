let formulario = document.getElementById('formulario');

formulario.addEventListener('submit', (e)=>{
    e.preventDefault();
    form = new FormData(formulario);

    console.log(form.get('grasas'));
    fetchText(form);

})


async function fetchText(form) {
    let response = await fetch('./controller/graba_producto.php',{
        method:'POST',
        body:form
    });

    console.log(response.status); // 200
    console.log(response.statusText); // OK

    if (response.status === 200) {
        let data = await response.json();
        // handle data        
        console.log(data.codigo);

        if(data.codigo == -1){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Datos duplicados!'
              })
        }else{
            Swal.fire(
                'Producto guardado!',
                '',            
                'success'
              )
            document.getElementById('formulario').reset();
        }

    }
}


