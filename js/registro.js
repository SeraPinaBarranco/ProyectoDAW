const registrar = document.querySelector('#registrar');
const f = document.getElementById('formularioRegistro');


f.addEventListener('submit',function(event){
   let formData = new FormData(f);
   event.preventDefault();

   //datos del formulario
   const n = formData.get('nombre');
   const ape= formData.get('apellidos');
   const nick = formData.get('nick');
   const email= formData.get('email');

   //comprobar que sean iguales
   const p = formData.get('pass');
   const rp= formData.get('rpass');

   if(p !== rp){
      console.log("No iguales");
   }

} );



