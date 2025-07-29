
let arrTaras = [];
let guardado = localStorage.getItem('datos');
if(guardado){
    arrTaras = JSON.parse(guardado);
}
let idTarea = arrTaras.lenght > 0 ? arrTaras[arrTaras.lenght-1].id + 1: 1;


const btnEnviar = document.querySelector('#btnEnviar');
const campoText = document.querySelector('#campoText');
const lista = document.querySelector('#lista');


btnEnviar.addEventListener('click',function(e){

    e.preventDefault();

    let tareas = {
        id : idTarea++,
        item : campoText.value.trim(),
        completado : false,
    }

    arrTaras.push(tareas);
    localStorage.setItem('datos',JSON.stringify(arrTaras));
    mostrarDatos();
    formulario.reset();
})

mostrarDatos();

function mostrarDatos(){

    lista.innerHTML = "";

    arrTaras.forEach(function(tarea){
        const li = document.createElement('li');
        li.textContent = tarea.item;
        lista.appendChild(li);
    })


}

