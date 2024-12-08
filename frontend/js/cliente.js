document.addEventListener('DOMContentLoaded', function() {

    let clientes = []; // Declarar la variable clientes para almacenar los datos


// Función para cargar las opciones de localidades en el filtro
const cargarLocalidadesEnFiltro = async () => {
    const selectLocalidad = document.getElementById('filter-localidad');

    try {
        const response = await fetch('http://localhost:3007/localidad/');
        if (!response.ok) {
            throw new Error('Error al cargar las localidades');
        }
        const localidades = await response.json();

        // Limpiar el contenido actual del select
        selectLocalidad.innerHTML = '<option value="">Todas las Localidades</option>';

        // Agregar cada localidad como una opción en el select
        localidades.forEach(localidad => {
            const option = document.createElement('option');
            option.text = localidad.localidad;
            option.value = localidad.localidad; // Usar el nombre de la localidad como valor
            selectLocalidad.add(option);
        });
    } catch (error) {
        console.error('Error al cargar las localidades:', error);
        alert('Error al cargar las localidades');
    }
};

  // Función para filtrar la tabla de clientes por localidad
    const filtrarClientesPorLocalidad = () => {
        const filterLocalidad = document.getElementById('filter-localidad').value;
        const rows = document.querySelectorAll('#clientes-table tbody tr');

        rows.forEach(row => {
            const localidadCell = row.querySelector('td:nth-child(3)'); // Obtener la celda que contiene la localidad
            const localidad = localidadCell.textContent.trim(); // Obtener la localidad del cliente y limpiar espacios

            if (filterLocalidad === '' || localidad === filterLocalidad || filterLocalidad === 'Todas las Localidades') {
                row.style.display = ''; // Mostrar la fila si la localidad coincide con el filtro o si el filtro está vacío
            } else {
                row.style.display = 'none'; // Ocultar la fila si la localidad no coincide con el filtro
            }
        });
    };
// Event listener para cambiar el filtro de localidad
document.getElementById('filter-localidad').addEventListener('change', filtrarClientesPorLocalidad);

    
    // Función para cargar las opciones de localidades en el select
    const cargarLocalidades = async () => {
        const selectLocalidad = document.getElementById('idlocalidad');

        try {
            const response = await fetch('http://localhost:3007/localidad/');
            if (!response.ok) {
                throw new Error('Error al cargar las localidades');
            }
            const localidades = await response.json();

            selectLocalidad.innerHTML = ''; // Limpiar el contenido actual del select

            // Agregar una opción por defecto
            const optionDefault = document.createElement('option');
            optionDefault.text = 'Seleccionar Localidad';
            optionDefault.value = '';
            selectLocalidad.add(optionDefault);

            // Agregar cada localidad como una opción en el select
            localidades.forEach(localidad => {
                const option = document.createElement('option');
                option.text = localidad.localidad;
                option.value = localidad.idlocalidad;
                selectLocalidad.add(option);
            });
        } catch (error) {
            console.error('Error al cargar las localidades:', error);
            alert('Error al cargar las localidades');
        }
    };

    // Función para cargar la lista de clientes en una tabla
    const cargarListaClientes = async () => {
        try {
            const response = await fetch('http://localhost:3007/cliente');
            if (!response.ok) {
                throw new Error('Error al cargar los clientes');
            }
            const clientes = await response.json(); // Asignar los clientes obtenidos al array clientes
            const clientesTableBody = document.querySelector('#clientes-table tbody');
            clientesTableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
            clientes.forEach(cliente => {
                // Mapear valores nulos a cadenas vacías
                const email = cliente.Email || ''; // Si cliente.Email es null, se asigna una cadena vacía
                const observaciones = cliente.Observaciones || ''; // Si cliente.Observaciones es null, se asigna una cadena vacía
    
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${cliente.Nombre}</td>
                    <td>${cliente.Domicilio}</td>
                    <td>${cliente.Localidad}</td>
                    <td>${cliente.Telefono}</td>
                    <td>${email}</td> <!-- Mostrar cadena vacía en lugar de null para email -->
                    <td>${cliente.Estado}</td>
                    <td>${observaciones}</td> <!-- Mostrar cadena vacía en lugar de null para observaciones -->
                    <td><button class="editar-cliente" data-id="${cliente.idcliente}">Editar</button></td> <!-- Botón de editar -->
                `;
                clientesTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error al cargar los clientes:', error);
            alert('Error al cargar los clientes');
        }
    };

    // Función para filtrar la tabla de clientes por estado
    const filtrarClientesPorEstado = () => {
        const filterEstado = document.getElementById('filter-estado').value;
        const rows = document.querySelectorAll('#clientes-table tbody tr');

        rows.forEach(row => {
            const estadoCell = row.querySelector('td:nth-child(6)'); // Obtener la celda que contiene el estado
            const estado = estadoCell.textContent.trim().toLowerCase(); // Obtener el estado del cliente y limpiar espacios
            
            if (filterEstado === '' || estado === filterEstado) {
                row.style.display = ''; // Mostrar la fila si el estado coincide con el filtro o si el filtro está vacío
            } else {
                row.style.display = 'none'; // Ocultar la fila si el estado no coincide con el filtro
            }
        });
    };

    // Función para filtrar la tabla de clientes por nombre
    const filtrarClientesPorNombre = () => {
        const filterNombre = document.getElementById('filter-nombre').value.toLowerCase();
        const rows = document.querySelectorAll('#clientes-table tbody tr');

        rows.forEach(row => {
            const nombreCell = row.querySelector('td:nth-child(1)'); // Obtener la celda que contiene el nombre
            const nombre = nombreCell.textContent.trim().toLowerCase(); // Obtener el nombre del cliente y limpiar espacios
            
            if (nombre.includes(filterNombre)) {
                row.style.display = ''; // Mostrar la fila si el nombre del cliente incluye el filtro
            } else {
                row.style.display = 'none'; // Ocultar la fila si el nombre del cliente no incluye el filtro
            }
        });
    };

    // Función para limpiar los filtros
    const limpiarFiltros = () => {
        const filtros = ['filter-localidad', 'filter-estado', 'filter-nombre'];
        filtros.forEach(filtro => {
            document.getElementById(filtro).value = '';
        });
        filtrarClientesPorLocalidad();
        filtrarClientesPorEstado();
        filtrarClientesPorNombre();
   };

    // Event listener para cambiar el filtro de estado
    document.getElementById('filter-estado').addEventListener('change', filtrarClientesPorEstado);
    // Event listener para cambiar el filtro de nombre
    document.getElementById('filter-nombre').addEventListener('input', filtrarClientesPorNombre);
    // Event listener para limpiar los filtros
    document.getElementById('clear-filters').addEventListener('click', limpiarFiltros);

    // Cargar la lista de clientes al cargar la página
    window.onload = async () => {
        await cargarLocalidadesEnFiltro();
        await cargarLocalidades();
        await cargarListaClientes();
    };

    // Función para mostrar u ocultar el formulario de agregar cliente
    const toggleClientForm = () => {
        const formContainer = document.getElementById('add-client-form-container');
        
        formContainer.classList.toggle('d-none');
        // Limpiar el formulario después de cerrarlo
        if (formContainer.classList.contains('d-none')) {
            document.getElementById('add-client-form').reset();
        }
    };

    // Event listener para el botón "Crear Cliente"
    document.getElementById('open-client-form').addEventListener('click', () => {
        toggleClientForm();
    });

    // Event listener para el botón "Cancelar"
    document.getElementById('cancel-button').addEventListener('click', () => {
        toggleClientForm();
    });

    // Event listener para el formulario de agregar cliente
    document.getElementById('add-client-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        await enviarCliente(data);
        toggleClientForm(); // Cerrar el formulario después de enviar los datos del cliente
    });

    // Event listener para el botón "Actualizar"
    document.getElementById('submit-button').addEventListener('click', async () => {
        const formData = new FormData(document.getElementById('add-client-form'));
        const data = Object.fromEntries(formData.entries());
        await enviarCliente(data);
        toggleClientForm(); // Cerrar el formulario después de actualizar el cliente
    });

    // Obtener el botón de cancelar
    const cancelButton = document.getElementById('cancel-button');

    // Agregar un event listener al botón de cancelar
    cancelButton.addEventListener('click', () => {
        // Mostrar un mensaje de confirmación
     //   const confirmCancel = confirm('¿Estás seguro de que deseas cancelar?');
        if (confirmCancel) {
            // Limpiar el formulario
            document.getElementById('add-client-form').reset();
        }
    });


    

    // Función para cargar los detalles de un cliente en el formulario para editar
    const cargarClienteEnFormulario = async (idCliente) => {
        try {
            const response = await fetch(`http://localhost:3007/cliente/${idCliente}`);
            if (!response.ok) {
                throw new Error('Error al cargar los detalles del cliente');
            }
            const cliente = await response.json();

            // Rellenar el formulario con los datos del cliente
            document.getElementById('idcliente').value = idCliente;
            document.getElementById('nombre').value = cliente.nombre;
            document.getElementById('telefono').value = cliente.telefono;
            document.getElementById('email').value = cliente.email;
            document.getElementById('domicilio').value = cliente.domicilio;
            document.getElementById('idlocalidad').value = cliente.idlocalidad;

            // Seleccionar el estado del cliente
            const estadoActivo = document.getElementById('estado-activo');
            const estadoBaja = document.getElementById('estado-baja');
            if (cliente.estado === 'activo') {
                estadoActivo.checked = true;
            } else if (cliente.estado === 'baja') {
                estadoBaja.checked = true;
            }

            document.getElementById('observaciones').value = cliente.observaciones;

            // Actualizar el texto del botón de enviar para indicar que se está editando
            document.getElementById('submit-button').innerText = 'Actualizar Cliente';

            // Mostrar el formulario
            toggleClientForm();
        } catch (error) {
            console.error('Error al cargar los detalles del cliente:', error);
            alert('Error al cargar los detalles del cliente');
        }
    };

    // Agregar un manejador de eventos para los botones de editar
    document.addEventListener('click', async (event) => {
        if (event.target.classList.contains('editar-cliente')) {
            const idCliente = event.target.dataset.id;
            await cargarClienteEnFormulario(idCliente);
    
            // Desplazar el formulario hacia la vista
            const formContainer = document.getElementById('add-client-form-container');
            formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

  // Función para enviar los registros del cliente al backend
const enviarCliente = async (data) => {
    // Validar que los campos obligatorios estén llenos
    if (!data.nombre || !data.telefono || !data.domicilio || !data.idlocalidad || !data.estado) {
        alert('Todos los campos son obligatorios');
        return;
    }

    // Verificar si el campo de observaciones está vacío o undefined y establecerlo como null
    if (data.observaciones === '' || data.observaciones === undefined) {
        data.observaciones = null;
    }

    try {
        let url = 'http://localhost:3007/cliente';
        let method = 'POST';

        // Determinar si estamos agregando un nuevo cliente o actualizando uno existente
        if (data.idcliente) {
            url += `/${data.idcliente}`;
            method = 'PUT'; // Usar PUT para actualizar un cliente existente
        }

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            if (data.idcliente) {
                document.getElementById('mensajeExito').textContent = 'Cliente actualizado exitosamente.';
            } else {
                document.getElementById('mensajeExito').textContent = 'Cliente agregado exitosamente.';
            }
            // Mostrar el mensaje de éxito
            document.getElementById('mensajeExito').style.display = 'block';

            // Ocultar el mensaje de éxito después de 3 segundos
            setTimeout(() => {
                document.getElementById('mensajeExito').style.display = 'none';
                document.getElementById('add-client-form').reset(); // Limpiar formulario
                toggleClientForm(); // Cerrar el formulario después de agregar o actualizar el cliente y mostrar el mensaje de éxito
            }, 3000);

            // Actualizar la lista de clientes
            await cargarListaClientes();

            // Ocultar el formulario después de enviar los datos a la base de datos
            toggleClientForm();
        } else {
            alert('Error al agregar o actualizar cliente');
        }
    } catch (error) {
        console.error('Error al agregar o actualizar cliente:', error);
        alert('Error al agregar o actualizar cliente');
    }
};

    

    // Función para manejar cambios en el formulario y mostrar el botón de "Actualizar"
    const manejarCambiosFormulario = () => {

        // Obtener el elemento #idcliente
    const idClienteInput = document.getElementById('idcliente');
 // Verificar si el elemento existe antes de intentar acceder a su valor
 if (idClienteInput) {
    const idCliente = idClienteInput.value;
    const clienteOriginal = clientes.find(cliente => cliente.id === idCliente);


         // Comparar los valores actuales con los originales para detectar cambios
         const formData = new FormData(document.getElementById('add-client-form'));
         const data = Object.fromEntries(formData.entries());
         const cambios = Object.keys(data).some(key => data[key] !== clienteOriginal[key]);

//        const cambios = Object.keys(data).some(key => data[key] !== clienteOriginal[key]);

        // Mostrar u ocultar el botón de "Actualizar" según si hay cambios
        const botonActualizar = document.getElementById('submit-button');
        if (cambios) {
            botonActualizar.classList.remove('d-none'); // Mostrar el botón de "Actualizar"
        } else {
            botonActualizar.classList.add('d-none'); // Ocultar el botón de "Actualizar"
        }
    };
}

    // Event listeners para detectar cambios en el formulario
    document.querySelectorAll('#add-client-form input, #add-client-form select').forEach(input => {
        input.addEventListener('input', manejarCambiosFormulario);
    });

});
