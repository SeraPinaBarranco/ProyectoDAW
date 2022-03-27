window.onload = function(){
    fetchText();
}


async function fetchText() {
    let response = await fetch('./controller/lista_productos.php');
    
    console.log(response.status); // 200
    console.log(response.statusText); // OK

    if (response.status === 200) {
        let data = await response.json();
        // handle data
        console.log(data);
    }

}