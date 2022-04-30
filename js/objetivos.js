
window.addEventListener('load', function() {
    let fecha = document.querySelector('#fecha');
    const d = new Date();
    let mes = d.getMonth(); 
    
    if(mes.toString().length == 1){ // * Devuelve el mes actual condos digitos
        mes = "0" + (mes + 1) ;
    }
   
    let fecha_actual = `${d.getFullYear()}-${mes}-${d.getDate()}`;

    fecha.value = fecha_actual;
    console.log(mes);
    console.log(fecha_actual);
});

fecha.addEventListener('change', (evt)=>{
    console.log(evt.target.value);
})