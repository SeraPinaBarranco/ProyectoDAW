const registrar = document.querySelector('#registrar');

let form = document.forms[0];

registrar.addEventListener('click',  registrarUsuario);

function registrarUsuario(){
   let formData = new FormData(form);

   console.log(formData.get('nombre'));
}