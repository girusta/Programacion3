document.addEventListener('DOMContentLoaded', function () {
    // Definición de variables
    const urlServicio = 'http://localhost:3007/servicio/';
    const urlTipoVehiculo = 'http://localhost:3007/tipovehiculo/';
    const contenedor = document.querySelector('tbody');
    let resultados = '';
    let opcion = '';

    // Espera a que se cargue el contenido del DOM antes de inicializar el modal
    const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'));

    // Proceso para obtener los datos de los servicios y mostrarlos en la tabla
    fetch(urlServicio)
        .then(response => response.json())
        .then(data => mostrarServicios(data))
        .catch(error => console.log(error));

    // Event listener para abrir el formulario de creación
    document.getElementById('btnCrear').addEventListener('click', () => {
        // Limpiar el formulario y cargar los datos necesarios
        nombre.value = '';
        precio.value = '';
        tipoveh.innerHTML = '';
        modalArticulo.show();
        opcion = 'crear';

        // Obtener la lista de tipos de vehículos y cargarla en el campo "Tipo de Vehículo"
        fetch(urlTipoVehiculo)
            .then(response => response.json())
            .then(data => cargarTiposVehiculo(data))
            .catch(error => console.log(error));
    });

    // Event listener para el envío del formulario
    document.getElementById('formArticulo').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente

        const formData = new FormData(this); // Obtiene los datos del formulario

        // Convierte los datos del formulario a un objeto JSON
        const formDataJSON = {};
        formData.forEach((value, key) => {
            formDataJSON[key] = value;
        });

        // Envía los datos al servidor según la opción (crear o editar)
        if (opcion === 'crear') {
            fetch(urlServicio, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataJSON)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Nuevo registro creado:', data);
                location.reload(); // Recarga la página para mostrar el nuevo registro
            })
            .catch(error => console.error('Error al crear el registro:', error));
        } else if (opcion === 'editar') {
            // Aquí implementa la lógica para editar un registro existente
            console.log('Implementa la lógica para editar el registro');
        }

        // Cierra el modal después de enviar el formulario
        modalArticulo.hide();
    });

    // Función para mostrar los resultados en la tabla
    const mostrarServicios = (data) => {
        // Verifica si existe la propiedad "servicios" en la respuesta
        if (data.servicios && Array.isArray(data.servicios)) {
            // Itera sobre cada servicio en la lista
            data.servicios.forEach(servicio => {
                resultados += `<tr>
                                <td>${servicio.idservicio}</td>
                                <td>${servicio.nombre}</td>
                                <td>${servicio.precio}</td>
                                <td>${servicio.tipo_vehiculo}</td>
                                <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-primary">Borrar</a></td>
                              </tr>`;
            });
            contenedor.innerHTML = resultados;
        } else {
            // Si la propiedad "servicios" no está presente o no es un array, muestra un mensaje de error
            contenedor.innerHTML = '<tr><td colspan="5">Error al obtener los datos de los servicios</td></tr>';
        }
    };

    // Función para cargar la lista de tipos de vehículos en el campo "Tipo de Vehículo" del formulario
    const cargarTiposVehiculo = (tipos) => {
        tipos.forEach(tipo => {
            const option = document.createElement('option');
            option.text = tipo.nombre; // Ajusta esto según cómo se llame la propiedad del tipo de vehículo en tu backend
            option.value = tipo.id; // Ajusta esto según cómo se llame la propiedad del tipo de vehículo en tu backend
            tipoveh.appendChild(option);
        });
    };

    // Otras funciones y partes de tu código JavaScript...
    
    // Método on para los botones guardar === JQUERY === FUNCIONES PARA LOS BOTONES DE LA TABLA 
    const on = (element, event, selector, handler) => {
        element.addEventListener(event, e => {
            if (e.target.closest(selector)) {
                handler(e)
            }
        })
    }

    // Método borrar
    on(document, 'click', '.btnBorrar', e => {
        const fila = e.target.parentNode.parentNode
        const id = fila.firstElementChild.innerHTML
        alertify.confirm("This is a confirm dialog.",
            function () {
                fetch(urlServicio + id, {
                        method: 'DELETE'
                    })
                    .then(res => res.json())
                    .then(() => location.reload())
            },
            function () {
                alertify.error('Cancel');
            });
    })

    // Procedimiento editar
    let idForm = 0
    on(document, 'click', '.btnEditar', e => {
        const fila = e.target.parentNode.parentNode
        idForm = fila.children[0].innerHTML
        const nombreform = fila.children[1].innerHTML
        const precioform = fila.children[2].innerHTML
        const tipovehform = fila.children[3].innerHTML
        nombre.value = nombreform
        precio.value = precioform
        tipoveh.value = tipovehform
        opcion = 'editar'
        modalArticulo.show();
    });

});
