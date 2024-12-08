// Definir la variable vehiculos en el ámbito global
let vehiculos = [];

document.addEventListener('DOMContentLoaded', function() {
    // Función para cargar las opciones de clientes en el select
    const cargarClientes = async () => {
        const selectCliente = document.getElementById('idcliente');
        try {
            const response = await fetch('http://localhost:3007/cliente');
            if (!response.ok) {
                throw new Error('Error al cargar los clientes');
            }
            const clientes = await response.json();

            selectCliente.innerHTML = '';

            // agregar una opcion por defecto
            const optionDefault = document.createElement('option');
            optionDefault.text = 'Seleccione el cliente';
            optionDefault.value = '';
            selectCliente.appendChild(optionDefault);
            console.log(clientes);
            // agregar cada cliente como una opcion en el select
            clientes.forEach(cliente => {
                const option = document.createElement('option');
                option.text = cliente.Nombre; // Suponiendo que el nombre del cliente está en la propiedad "Nombre"
                option.value = cliente.idcliente; // Suponiendo que el ID del cliente está en la propiedad "idcliente"
                selectCliente.appendChild(option);
            });

            // Event listener para asignar el valor seleccionado al campo del formulario
            selectCliente.addEventListener('change', (event) => {
                const clienteSeleccionado = event.target.value;
                document.getElementById('idcliente').value = clienteSeleccionado; // Ajusta 'campoCliente' al ID de tu campo de formulario correspondiente
            });

        } catch (error) {
            console.error('error al cargar los clientes:', error);
            alert('error al cargar los clientes');
        }
    };

    // Función para cargar las opciones de modelos en el select
    const cargarModelos = async () => {
        const selectModelo = document.getElementById('idmodelo');

        try {
            const response = await fetch('http://localhost:3007/modelo/');
            console.log(response); // Verificar la respuesta del servidor

            if (!response.ok) {
                throw new Error('Error al cargar los modelos');
            }

            const data = await response.json();
            const modelos = data.modelos; // Acceder a la propiedad 'modelos' de la respuesta

            selectModelo.innerHTML = ''; // Limpiar el contenido actual del select

            // Agregar una opción por defecto
            const optionDefault = document.createElement('option');
            optionDefault.text = 'Seleccionar Modelo';
            optionDefault.value = '';
            selectModelo.add(optionDefault);

            // Agregar cada modelo como una opción en el select
            modelos.forEach(modelo => {
                const option = document.createElement('option');
                option.text = modelo.nombre_modelo; // Acceder al nombre del modelo
                option.value = modelo.idmodelo;
                selectModelo.add(option);
            });
        } catch (error) {
            console.error('Error al cargar los modelos:', error);
            alert('Error al cargar los modelos');
        }
    };

    // Función para cargar las opciones de tipos de vehiculos en el select
    const cargarTipos = async () => {
        const selectTipo = document.getElementById('idtipovehiculo');

        try {
            const response = await fetch('http://localhost:3007/tipovehiculo/');
            if (!response.ok) {
                throw new Error('Error al cargar los tipos de vehiculos');
            }
            const tipos = await response.json();

            selectTipo.innerHTML = ''; // Limpiar el contenido actual del select

            // Agregar una opción por defecto
            const optionDefault = document.createElement('option');
            optionDefault.text = 'Seleccionar Tipo de vehiculo';
            optionDefault.value = '';
            selectTipo.add(optionDefault);

            // Agregar cada tipo como una opción en el select
            tipos.forEach(tipovehiculo => {
                const option = document.createElement('option');
                option.text = tipovehiculo.nombre;
                option.value = tipovehiculo.idtipovehiculo;
                selectTipo.add(option);
            });
        } catch (error) {
            console.error('Error al cargar los tipos de vehiculos:', error);
            alert('Error al cargar los tipos de vehiculos');
        }
    };

    // Función para cargar la lista de vehiculos en una tabla
    const cargarListaVehiculos = async () => {
        try {
            const response = await fetch('http://localhost:3007/vehiculo');
            if (!response.ok) {
                throw new Error('Error al cargar los vehiculos');
            }
            const responseData = await response.json();

            // Verificar si responseData.vehiculos es un array
            if (Array.isArray(responseData.vehiculos)) {
                vehiculos = responseData.vehiculos; // Asignar los vehículos a la variable global
                const vehiculosTableBody = document.querySelector('#vehiculos-table tbody');
                vehiculosTableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

                vehiculos.forEach(vehiculo => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${vehiculo.dominio}</td>
                        <td>${vehiculo.nombre_cliente}</td>
                        <td>${vehiculo.nombre_modelo}</td>
                        <td>${vehiculo.nombre_tipo_vehiculo}</td>
                        <td>${vehiculo.estado}</td>
                        <td><button class="editar-vehiculo" data-id="${vehiculo.idvehiculo}">Editar</button></td> <!-- Botón de editar -->
                    `;
                    vehiculosTableBody.appendChild(row);
                });
            } else {
                throw new Error('Los datos de vehículos no son válidos');
            }
        } catch (error) {
            console.error('Error al cargar los vehiculos:', error);
            alert('Error al cargar los vehiculos');
        }
    };

    // Cargar la lista de clientes, modelos y tipos al cargar la página
    window.onload = async () => {
        await cargarClientes();
        await cargarModelos();
        await cargarTipos();
        await cargarListaVehiculos();
    };

    // Función para filtrar la tabla de vehiculo por estado
    const filtrarVehiculosPorEstado = () => {
        const filterEstado = document.getElementById('filter-estado').value;
        const rows = document.querySelectorAll('#vehiculos-table tbody tr');

        rows.forEach(row => {
            const estadoCell = row.querySelector('td:nth-child(5)'); // Obtener la celda que contiene el estado
            const estado = estadoCell.textContent.trim().toLowerCase(); // Obtener el estado del vehiculo y limpiar espacios

            if (filterEstado === '' || estado === filterEstado) {
                row.style.display = ''; // Mostrar la fila si el estado coincide con el filtro o si el filtro está vacío
            } else {
                row.style.display = 'none'; // Ocultar la fila si el estado no coincide con el filtro
            }
        });
    };

    // Función para filtrar la tabla de vehiculo por cliente
    const filtrarVehiculosPorCliente = () => {
        const filterCliente = document.getElementById('filter-cliente').value.toLowerCase();
        const rows = document.querySelectorAll('#vehiculos-table tbody tr');

        rows.forEach(row => {
            const clienteCell = row.querySelector('td:nth-child(2)'); // Obtener la celda que contiene el nombre del cliente (segunda columna)
            const nombre = clienteCell.textContent.trim().toLowerCase(); // Obtener el nombre del cliente y limpiar espacios

            if (nombre.includes(filterCliente)) {
                row.style.display = ''; // Mostrar la fila si el nombre del cliente incluye el filtro
            } else {
                row.style.display = 'none'; // Ocultar la fila si el nombre del cliente no incluye el filtro
            }
        });
    };

    // Event listener para cambiar el filtro de estado
    document.getElementById('filter-estado').addEventListener('change', filtrarVehiculosPorEstado);

    // Event listener para cambiar el filtro de cliente
    document.getElementById('filter-cliente').addEventListener('input', filtrarVehiculosPorCliente);

    // Función para mostrar u ocultar el formulario de agregar vehiculo
    const toggleVehForm = () => {
        const formContainer = document.getElementById('add-veh-form-container');
        formContainer.classList.toggle('d-none');
        // Limpiar el formulario después de cerrarlo
        if (formContainer.classList.contains('d-none')) {
            document.getElementById('add-veh-form').reset();
        }
    };

    // Event listener para el botón "Crear Vehiculo"
    document.getElementById('open-veh-form').addEventListener('click', () => {
        toggleVehForm();
    });

    // Event listener para el botón "Cancelar"
    document.getElementById('cancel-button').addEventListener('click', () => {
        toggleVehForm();
    });

    // Event listener para el formulario de agregar vehiculo
    document.getElementById('add-veh-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        await enviarVehiculo(data);
        toggleVehForm(); // Cerrar el formulario después de enviar los datos del cliente
    });

    // Event listener para el botón "Actualizar"
    document.getElementById('submit-button').addEventListener('click', async () => {
        const formData = new FormData(document.getElementById('add-veh-form'));
        const data = Object.fromEntries(formData.entries());
        await enviarVehiculo(data);
        toggleVehForm(); // Cerrar el formulario después de actualizar el cliente
    });

    // Event listener para el botón de cancelar
    const cancelButton = document.getElementById('cancel-button');

    // Agregar un event listener al botón de cancelar
    cancelButton.addEventListener('click', () => {
        // Limpiar el formulario
        document.getElementById('add-veh-form').reset();
    });

    // Función para cargar los detalles de un vehiculo en el formulario para editar
    const cargarVehiculoEnFormulario = async (idVehiculo) => {
        try {
            const response = await fetch(`http://localhost:3007/vehiculo/${idVehiculo}`);
            if (!response.ok) {
                throw new Error('Error al cargar los detalles del vehiculo');
            }
            const vehiculo = await response.json();
            console.log(vehiculo);
            // Asignar los valores del vehículo a los campos del formulario
            document.getElementById('idvehiculo').value = idVehiculo;
            document.getElementById('dominio').value = vehiculo.dominio;
            document.getElementById('idcliente').value = vehiculo.idcliente;
            document.getElementById('idmodelo').value = vehiculo.idmodelo;
            document.getElementById('idtipovehiculo').value = vehiculo.idtipovehiculo;
    
            // Seleccionar el estado del vehiculo
            const estadoActivo = document.getElementById('estado-activo');
            const estadoBaja = document.getElementById('estado-baja');
            if (vehiculo.estado === 'activo') {
                estadoActivo.checked = true;
            } else if (vehiculo.estado === 'baja') {
                estadoBaja.checked = true;
            }
    
            // Actualizar el texto del botón de enviar para indicar que se está editando
            document.getElementById('submit-button').innerText = 'Actualizar Vehiculo';
    
            // Mostrar el formulario
            toggleVehForm();
        } catch (error) {
            console.error('Error al cargar los detalles del vehiculo:', error);
            alert('Error al cargar los detalles del vehiculo');
        }
    };

    // Agregar un manejador de eventos para los botones de editar
    document.addEventListener('click', async (event) => {
        console.log('Se ha activado el evento de clic en un botón de editar');
        if (event.target.classList.contains('editar-vehiculo')) {
            const idVehiculo = event.target.dataset.id;
            await cargarVehiculoEnFormulario(idVehiculo);
        }
    });

    // Función para enviar los registros del vehiculo al backend
    const enviarVehiculo = async (data) => {
        // Validar que los campos obligatorios estén llenos
        if (!data.dominio || !data.idcliente || !data.idmodelo || !data.idtipovehiculo || !data.estado) {
            alert('Todos los campos son obligatorios');
            return;
        }

        try {
            let url = 'http://localhost:3007/vehiculo';
            let method = 'POST';

            // Determinar si estamos agregando un nuevo veh o actualizando uno existente
            if (data.idvehiculo) {
                url += `/${data.idvehiculo}`;
                method = 'PUT'; // Usar PUT para actualizar un veh existente
            }
            console.log(url,JSON.stringify(data));
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)  // Convertir los datos a JSON antes de enviarlos
            });

            if (response.ok) {
                if (data.idvehiculo) {
                    // alert('veh actualizado exitosamente');
                    document.getElementById('mensajeExito').textContent = 'veh actualizado exitosamente.';
                } else {
                    // alert('veh agregado exitosamente');
                    document.getElementById('mensajeExito').textContent = 'veh agregado exitosamente.';
                }
                // Mostrar el mensaje de éxito
                document.getElementById('mensajeExito').style.display = 'block';

                // Ocultar el mensaje de éxito después de 3 segundos
                setTimeout(() => {
                    document.getElementById('mensajeExito').style.display = 'none';
                }, 3000);

                // Limpiar el formulario después de agregar o actualizar el cliente
                document.getElementById('add-veh-form').reset();
                // Actualizar la lista de veh
                await cargarListaVehiculos();

                // Ocultar el formulario después de enviar los datos a la base de datos
                toggleVehForm();
            } else {
                alert('Error al agregar o actualizar vehiculo');
            }
        } catch (error) {
            console.error('Error al agregar o actualizar vehiculo:', error);
            alert('Error al agregar o actualizar vehiculo');
        }
    };
});
