const frm = document.getElementById('frm_login');

frm.addEventListener('submit', (e)=>{    
    e.preventDefault();

    let user = document.querySelector('#user').value;
    let pass = document.querySelector('#pass').value;

    if(user !== "" && pass !== ""){        
        //URL de la peticion
        let url = "./controller/login_usuario.php";

        //configurar la peticion. AQUI CONFIGURO LA PETICION
        let configFetch = {
            method: "POST",
            body: `user=${user}&pass=${pass}`,

            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        };
        
        //mandar la peticion
        let promesa = fetch(url, configFetch);

        //Ejecutar la promesa que devuelve la peticion
        promesa
        .then((res) => res.json())
        .then((datos) => {
            let d = datos;
            console.log( datos); 
            if(datos.codigo == "1"){
                window.location.href = "./index.php";
            }    

        });
            
        }else{
            console.log("no grabar");
        }

});


// if(d.codigo == "1"){
        //     Swal.fire(
        //         'Usuario Registrado con éxito!!',
        //         '',            
        //         'success'
        //     )
        //     //Redirigir al indice
        //     setInterval(() => {
        //         window.location.href = "./login.php";
        //     }, 2000);


            
        // }else{
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Error',
        //         text: 'No se ha podido guardar el usuario!'
        //     })
        // }