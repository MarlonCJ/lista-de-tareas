
let arrTareas = [];
let guardado = localStorage.getItem('datos');
if(guardado){
    arrTareas = JSON.parse(guardado);
}

let idTarea = arrTareas.reduce((max, t) => t.id > max ? t.id : max, 0) + 1;



const formulario = document.querySelector('#formulario');
const campoText = document.querySelector('#campoText');
const btnEnviar = document.querySelector('#btnEnviar');
const lista = document.querySelector('#lista');

btnEnviar.addEventListener('click',function(e){
    e.preventDefault();

    let listaTarea = {
        id : idTarea++,
        item : campoText.value.trim(),
        completado : false
    }

    arrTareas.push(listaTarea);
    localStorage.setItem('datos', JSON.stringify(arrTareas));
    formulario.reset();
    mostrarDatos();
})

mostrarDatos();

function mostrarDatos(){
    lista.innerHTML = "";

    arrTareas.forEach(function(tarea){
        
        // AGREGAR TAREA

        const row = document.createElement('div');
        row.classList.add('row')
        row.dataset.id = tarea.id;
        const col1 = document.createElement('div');
        col1.dataset.id = tarea.id;
        const col2 = document.createElement('div');
        col2.classList.add('col');
        col2.dataset.id = tarea.id;
        const p = document.createElement('p');
        p.textContent = tarea.item +" "+ (tarea.completado ? '(Tarea Completada)' : "");
        p.dataset.id = tarea.id;

        // TAREA COMPLETADA

        const btnCompletado = document.createElement('button');
        btnCompletado.classList.add('boton','btn-completado');
        btnCompletado.dataset.id = tarea.id;
        btnCompletado.textContent = "Completar"
        btnCompletado.disabled = tarea.completado;

        //TAREA ELIMINADA

        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('boton', 'btn-eliminar');
        btnEliminar.dataset.id = tarea.id;
        btnEliminar.textContent = "Eliminar";

        //TAREA MODIFICADA

        const btnModificar = document.createElement('button');
        btnModificar.classList.add('boton', 'btn-modificar');
        btnModificar.dataset.id = tarea.id;
        btnModificar.textContent = "Modificar";

        col1.appendChild(p);
        col2.appendChild(btnCompletado);
        col2.appendChild(btnEliminar);
        col2.appendChild(btnModificar);

        row.appendChild(col1);
        row.appendChild(col2);
        lista.appendChild(row);
      
    })

}

lista.addEventListener('click',function(event){

    let id = Number(event.target.dataset.id);
    if(!id) return;

    // tarea completada

    if(event.target.classList.contains('btn-completado')){
        let tarea = arrTareas.find(t=>t.id == id);
        if(tarea && !tarea.completado){
            tarea.completado = true;
            localStorage.setItem('datos',JSON.stringify(arrTareas));
            mostrarDatos();
        }
    }

    // tarea eliminada

    if(event.target.classList.contains('btn-eliminar')){
        arrTareas = arrTareas.filter(t => t.id !== id);
        console.log(arrTareas);
        localStorage.setItem('datos',JSON.stringify(arrTareas));
        mostrarDatos();
    }

    // tara btnModificar

    if(event.target.classList.contains('btn-modificar')){
        let tareaActual = arrTareas.find(t => t.id == id);
        let tareaNueva = prompt('Modificar tarea',tareaActual.item);
        if(tareaNueva !== null && tareaNueva.item !== ""){
            tareaActual.item = tareaNueva.trim();
            console.log(tareaNueva);
            localStorage.setItem('datos',JSON.stringify(arrTareas));
            mostrarDatos();
        }
    }

})