let arrTareas = [];
let idTarea = 1;

// Cargar datos desde localStorage al iniciar
cargarDatosDesdeStorage();
mostrarDatos();

// Elementos del DOM
const formulario = document.querySelector('#formulario');
const campoText = document.querySelector('#campoText');
const btnEnviar = document.querySelector('#btnEnviar');
const lista = document.querySelector('#lista');

// Eventos
btnEnviar.addEventListener('click', agregarTarea);
lista.addEventListener('click', manejarClickEnLista);

// Funciones principales

function agregarTarea(e) {
    e.preventDefault();
    const texto = campoText.value.trim();

    if (texto === "") {
        alert("Por favor ingresa una tarea");
        return;
    }

    const nuevaTarea = {
        id: idTarea++,
        item: texto,
        completado: false
    };

    arrTareas.push(nuevaTarea);
    guardarEnStorage();
    formulario.reset();
    mostrarDatos();
}

function mostrarDatos() {
    lista.innerHTML = "";

    arrTareas.forEach(tarea => {
        const row = document.createElement('div');
        row.classList.add('row');
        row.dataset.id = tarea.id;

        const col1 = document.createElement('div');
        col1.dataset.id = tarea.id;

        const p = document.createElement('p');
        p.textContent = tarea.item + (tarea.completado ? " (Tarea Completada)" : "");
        p.dataset.id = tarea.id;

        const col2 = document.createElement('div');
        col2.classList.add('col');
        col2.dataset.id = tarea.id;

        // Botones
        const btnCompletado = crearBoton('Completar', 'btn-completado', tarea.completado);
        const btnEliminar = crearBoton('Eliminar', 'btn-eliminar');
        const btnModificar = crearBoton('Modificar', 'btn-modificar');

        [btnCompletado, btnEliminar, btnModificar].forEach(btn => {
            btn.dataset.id = tarea.id;
            col2.appendChild(btn);
        });

        col1.appendChild(p);
        row.appendChild(col1);
        row.appendChild(col2);
        lista.appendChild(row);
    });
}

function manejarClickEnLista(event) {
    const id = Number(event.target.dataset.id);
    if (!id) return;

    if (event.target.classList.contains('btn-completado')) {
        completarTarea(id);
    } else if (event.target.classList.contains('btn-eliminar')) {
        eliminarTarea(id);
    } else if (event.target.classList.contains('btn-modificar')) {
        modificarTarea(id);
    }
}

function completarTarea(id) {
    const tarea = arrTareas.find(t => t.id === id);
    if (tarea && !tarea.completado) {
        tarea.completado = true;
        guardarEnStorage();
        mostrarDatos();
    }
}

function eliminarTarea(id) {
    arrTareas = arrTareas.filter(t => t.id !== id);
    guardarEnStorage();
    mostrarDatos();
}

function modificarTarea(id) {
    const tarea = arrTareas.find(t => t.id === id);
    if (tarea) {
        const nueva = prompt("Modificar tarea:", tarea.item);
        if (nueva && nueva.trim() !== "") {
            tarea.item = nueva.trim();
            guardarEnStorage();
            mostrarDatos();
        }
    }
}

function guardarEnStorage() {
    try {
        localStorage.setItem('datos', JSON.stringify(arrTareas));
    } catch (error) {
        console.error("Error al guardar en localStorage:", error);
        alert("No se pudo guardar la tarea");
    }
}

function cargarDatosDesdeStorage() {
    try {
        const guardado = localStorage.getItem('datos');
        if (guardado) {
            arrTareas = JSON.parse(guardado);
            if (arrTareas.length > 0) {
                idTarea = arrTareas[arrTareas.length - 1].id + 1;
            }
        }
    } catch (error) {
        console.error("Error al cargar desde localStorage:", error);
    }
}

function crearBoton(texto, clase, deshabilitar = false) {
    const btn = document.createElement('button');
    btn.textContent = texto;
    btn.classList.add('boton', clase);
    btn.disabled = deshabilitar;
    return btn;
}
