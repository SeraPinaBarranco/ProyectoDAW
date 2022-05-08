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

//^Crear una tabla editable para el listado
//^Con sumatorio total
function crearTablaEditable(aT){
    //console.log(aT)
    let tabla = document.getElementById('tablaADD')       

    if(col4.childElementCount > 0)console.log("TENGO HIJOS")
    
    let tbody = document.querySelector('#tablaADD tbody')
    let trB = document.createElement('tr')

    for (let i = 0; i < aT.length; i++) {
        //console.log(aT[i].nombre_receta);
        //console.log("dd");
        let tdN= document.createElement('td')
        tdN.innerHTML= aT[i].nombre_receta

        let tdC= document.createElement('td')
        tdC.innerHTML= aT[i].tcalorias

        let tdG= document.createElement('td')
        tdG.innerHTML= aT[i].tgrasas

        let tdH= document.createElement('td')
        tdH.innerHTML= aT[i].thidratos

        let tdP= document.createElement('td')
        tdP.innerHTML= aT[i].tproteinas

        let tdA= document.createElement('td')
        tdA.innerHTML= "Accion"

        trB.appendChild(tdN)
        trB.appendChild(tdC)
        trB.appendChild(tdG)
        trB.appendChild(tdH)
        trB.appendChild(tdP)
        trB.appendChild(tdA)

        tbody.appendChild(trB)        
    }
        
    tabla.appendChild(tbody)
    
    //col4.appendChild(tabla)
    col4.setAttribute('style','display:flex')

    
}

function devuelveFilaTabla(fila){
    return  fila.tcalorias
}

//^Trae trae el objetivo 
function traeObjetivo(){
    
}