// ===== Variables y estado inicial =====
let arrTareas = [];
let idTarea = 1;

// ===== Elementos del DOM =====
const formulario = document.querySelector('#formulario');
const campoText = document.querySelector('#campoText');
const btnEnviar = document.querySelector('#btnEnviar');
const lista = document.querySelector('#lista');

// ===== Inicialización =====
cargarTareasDesdeStorage();
mostrarDatos();

// ===== Eventos =====
btnEnviar.addEventListener('click', agregarTarea);
lista.addEventListener('click', manejarClickEnLista);

// ===== Funciones =====

function cargarTareasDesdeStorage() {
    try {
        const guardado = localStorage.getItem('datos');
        if (guardado) {
            arrTareas = JSON.parse(guardado);
            idTarea = arrTareas.reduce((max, t) => t.id > max ? t.id : max, 0) + 1;
        }
    } catch (error) {
        console.error("Error al cargar datos del localStorage:", error);
        arrTareas = [];
    }
}

function guardarEnStorage() {
    localStorage.setItem('datos', JSON.stringify(arrTareas));
}

function agregarTarea(e) {
    e.preventDefault();

    const texto = campoText.value.trim();
    if (texto === "") {
        alert("La tarea no puede estar vacía.");
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
        const col2 = document.createElement('div');
        col2.classList.add('col');

        const p = document.createElement('p');
        p.textContent = tarea.item + (tarea.completado ? " (Tarea Completada)" : "");
        if (tarea.completado) {
            p.style.textDecoration = "line-through";
            p.style.color = "#888";
        }

        const btnCompletado = crearBoton('Completar', ['boton', 'btn-completado'], tarea.id);
        btnCompletado.disabled = tarea.completado;

        const btnEliminar = crearBoton('Eliminar', ['boton', 'btn-eliminar'], tarea.id);
        const btnModificar = crearBoton('Modificar', ['boton', 'btn-modificar'], tarea.id);

        col1.appendChild(p);
        col2.append(btnCompletado, btnEliminar, btnModificar);

        row.append(col1, col2);
        lista.appendChild(row);
    });
}

function crearBoton(texto, clases, id) {
    const btn = document.createElement('button');
    btn.textContent = texto;
    btn.classList.add(...clases);
    btn.dataset.id = id;
    return btn;
}

function manejarClickEnLista(event) {
    const id = Number(event.target.dataset.id);
    if (!id) return;

    if (event.target.classList.contains('btn-completado')) {
        completarTarea(id);
    }

    if (event.target.classList.contains('btn-eliminar')) {
        eliminarTarea(id);
    }

    if (event.target.classList.contains('btn-modificar')) {
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
    if (!tarea) return;

    const nueva = prompt("Modificar tarea:", tarea.item);
    if (nueva !== null && nueva.trim() !== "") {
        tarea.item = nueva.trim();
        guardarEnStorage();
        mostrarDatos();
    }
}
