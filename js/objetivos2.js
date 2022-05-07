$(document).ready(function(){

   


})

function myFetch(myurl, mybody){

    //URL de la peticion
    let url = myurl;
    let d;
    //configurar la peticion. AQUI CONFIGURO LA PETICION
    let configFetch = {
        method: "POST",
        body: mybody,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };

    //mandar la peticion
    let promesa = fetch(url, configFetch);

    //Ejecutar la promesa que devuelve la peticion  
    promesa
        .then((res) => res.text())
        .then((datos) => {
            d = datos;        
            //console.log(datos) 
            col4.innerHTML=datos
            col4.setAttribute('style','display:inline-block')
            //return datos  
            //id_obj = datos.id_objetivo    
    }).finally(()=>{
        return d        
    });
    return d
}

//^Trae trae el objetivo 
function traeObjetivo(){
    
}