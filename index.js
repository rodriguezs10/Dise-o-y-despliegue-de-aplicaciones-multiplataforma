document.addEventListener("DOMContentLoaded", () => {
    
    const tarea = document.getElementById('tarea');
    const boton = document.getElementById('añadirTarea');
    const tablaTareas = document.getElementById('tablaTareas');

    cargarTareas();

    boton.addEventListener("click", añadirTarea);

    //----------------------------------------------------------------------------
    function añadirTarea() {
        const texto = document.getElementById('tarea').value;

        if (texto.trim() === "") {
            tarea.style.background = "#fbc0d4";
            document.getElementById('mensajeTarea').style.color = "red";
            document.getElementById('mensajeTarea').textContent = "La tarea no puede quedar vacía.";
            return;
        } else {
            tarea.style.background = "#fff";
            document.getElementById('mensajeTarea').textContent = "";
        }

        const fila = crearTarea(texto);
        tablaTareas.appendChild(fila);

        guardarTareas();
        tarea.value = "";
    }

    //----------------------------------------------------------------------------
    function crearTarea(texto, completado) {
        const fila = document.createElement('tr');

        const tick = document.createElement('td');
        tick.textContent = completado ? "✔" : "";
        tick.style.color = "green";
        tick.style.textAlign = "center";

        const nombreCelda = document.createElement('td');
        nombreCelda.textContent = texto;

        const acciones = document.createElement('td');

        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.checked = completado === true;

        checkbox.addEventListener('change', () => {
            tick.textContent = checkbox.checked ? "✔" : "";
            guardarTareas();
        });

        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.addEventListener('click', () => {
            fila.remove();
            guardarTareas();
        });

        acciones.appendChild(checkbox);
        acciones.appendChild(eliminarBtn);

        fila.appendChild(tick);
        fila.appendChild(nombreCelda);
        fila.appendChild(acciones);

        return fila;
    }

    //----------------------------------------------------------------------------
    function guardarTareas() {
        const tareas = [];

        tablaTareas.querySelectorAll('tr').forEach(tr => {
            const nombre = tr.children[1].textContent;
            const completado = tr.children[0].textContent === "✔";
            tareas.push({ nombre, completado });
        });

        localStorage.setItem("tareas", JSON.stringify(tareas));
    }

    //----------------------------------------------------------------------------
    function cargarTareas() {
        const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
        
        tareas.forEach(i => {
            const fila = crearTarea(i.nombre, i.completado);
            tablaTareas.appendChild(fila);
        });
    }
});
