document.addEventListener('DOMContentLoaded', function() {
     // Función para cargar opciones de las listas desplegables y establecer fecha por defecto
    function cargarOpciones() {
        // Establecer la fecha por defecto al campo de fecha
        var fechaActual = obtenerFechaActual();
        document.getElementById('fecha').value = fechaActual;
    }

    // Obtener la fecha actual en formato 'YYYY-MM-DD'  
    function obtenerFechaActual() {
        var today = new Date();
        var year = today.getFullYear();
        var month = (today.getMonth() + 1 < 10 ? '0' : '') + (today.getMonth() + 1);
        var day = (today.getDate() < 10 ? '0' : '') + today.getDate();
        return year + '-' + month + '-' + day;
    }
 
// Función para cargar opciones para el campo clientes
function cargarClientes() {
    fetch('http://localhost:3007/cliente/')
        .then(response => response.json())
        .then(data => {
            // Verificar si la respuesta contiene la propiedad "vehiculos"
            if (data && data.length) {
                // Obtener el select por su ID
                const selectCliente = document.getElementById('idcliente');
                
                // Limpiar el select antes de agregar nuevas opciones
                selectCliente.innerHTML = '';

                // Agregar un elemento de opción predeterminado
                const defaultOption = document.createElement('option');
                defaultOption.text = 'Seleccione su respuesta';
                defaultOption.disabled = true; // No se puede seleccionar este elemento
                defaultOption.selected = true; // Este elemento es seleccionado por defecto
                selectCliente.appendChild(defaultOption);

                selectCliente.addEventListener('change', () => {
                    cargarDominios(selectCliente.value, null);
                  })    

                // Iterar sobre los cliente y agregar opciones al select
                data.forEach(cliente => {
                    const option = document.createElement('option');
                    option.value = cliente.idcliente;
                    option.textContent = cliente.Nombre;
                    selectCliente.appendChild(option);
                });
            } else {
                console.error('La respuesta del servidor no contiene la propiedad "cliente".');
            }
        })
        .catch(error => console.error('Error al cargar los nombres de cliente:', error));
}

    // Función para cargar opciones para el campo Dominio
    function cargarDominios(idcliente,dominio) {
        fetch('http://localhost:3007/vehiculo/')
            .then(response => response.json())
            .then(data => {
                // Verificar si la respuesta contiene la propiedad "vehiculos"
                if (data && data.vehiculos) {
                    // Obtener el select por su ID
                    const selectDominio = document.getElementById('dominio');
                    
                    // Limpiar el select antes de agregar nuevas opciones
                    selectDominio.innerHTML = '';

                    // Agregar un elemento de opción predeterminado
                    const defaultOption = document.createElement('option');
                    defaultOption.text = 'Seleccione su respuesta';
                    defaultOption.disabled = true; // No se puede seleccionar este elemento
                    defaultOption.selected = true; // Este elemento es seleccionado por defecto
                    selectDominio.appendChild(defaultOption);

                    // Iterar sobre los vehiculos y agregar opciones al select
                    data.vehiculos.forEach(vehiculo => {
                        console.log(vehiculo)
                        if (idcliente==vehiculo.idcliente){
                        const option = document.createElement('option');
                        option.value = vehiculo.idvehiculo;
                        option.textContent = vehiculo.dominio;
                        if (dominio!=null && dominio==vehiculo.dominio){
                            option.selected = true; // Este elemento es seleccionado por defecto
                        }
                        selectDominio.addEventListener("change", function(){
                            
                            cargarTipo(vehiculo.id_tipo_vehiculo)
                        })
                        selectDominio.appendChild(option);
                    }
                    });
                    
                } else {
                    console.error('La respuesta del servidor no contiene la propiedad "vehiculos".');
                }
            })
            .catch(error => console.error('Error al cargar los dominios de vehículo:', error));
    }

    // Función para cargar opciones para el campo Forma de Pago
    function cargarFormasPago() {
        fetch('http://localhost:3007/formadepago/')
            .then(response => response.json())
            .then(data => {
                // Verificar si la respuesta contiene la propiedad "formas"
                if (data && Array.isArray(data)) {
                    // Obtener el select por su ID
                    const formaPagoSelect = document.getElementById('formaPago');
                    
                    // Limpiar el select antes de agregar nuevas opciones
                    formaPagoSelect.innerHTML = '';

                    // Agregar un elemento de opción predeterminado
                    const defaultOption = document.createElement('option');
                    defaultOption.text = 'Seleccione su respuesta';
                    defaultOption.disabled = true;
                    defaultOption.selected = true;
                    formaPagoSelect.appendChild(defaultOption);

                    // Iterar sobre las formas de pago y agregar opciones al select
                    data.forEach(formaPago => {
                        const option = document.createElement('option');
                        option.value = formaPago.id_forma_pago;
                        option.textContent = formaPago.nombre;
                        formaPagoSelect.appendChild(option);
                    });
                } else {
                    console.error('La respuesta del servidor no contiene la propiedad "formas".');
                }
            })
            .catch(error => console.error('Error al cargar las formas de pago:', error));
    }

// Función para cargar opciones para el campo Estado
function cargarEstados() {
    const estadoSelect = document.getElementById('estado');
    // Limpiar el select antes de agregar nuevas opciones
    estadoSelect.innerHTML = '';

    // Agregar un elemento de opción predeterminado
    const defaultOption = document.createElement('option');
    defaultOption.text = 'Seleccione un estado';
    defaultOption.value = ''; // Asigna un valor vacío para que se pueda detectar cuando no se selecciona nada
    defaultOption.disabled = true;
    defaultOption.selected = true;
    estadoSelect.appendChild(defaultOption);

    // Opciones de estado deseadas
    // const estados = ['Entregado', 'Con turno', 'Terminado', 'En lavado'];

    const estados = [
        { id: 1, value: 'Con turno' },
        { id: 2, value: 'En lavado' },
        { id: 3, value:'Terminado'},
        { id: 4, value: 'Entregado' },
        { id: 5, value:'Cancelado'},
      ];


    // Agregar las opciones al select
    estados.forEach(estado => {
        const option = document.createElement('option');
        option.value = estado.id; // Utiliza el estado en minúsculas para comparaciones posteriores
        option.textContent = estado.value;
        estadoSelect.appendChild(option);
    });
}

    // Función para cargar opciones para el campo Usuario
    function cargarUsuarios() {
        fetch('http://localhost:3007/usuario/')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Agrega este console.log para verificar la respuesta del servidor
                // Verificar si la respuesta contiene la propiedad "usuarios"
                if (data && data.usuarios && Array.isArray(data.usuarios)) {
                    // Obtener el select por su ID
                    const usuarioSelect = document.getElementById('usuario');
                    
                    // Limpiar el select antes de agregar nuevas opciones
                    usuarioSelect.innerHTML = '';

                    // Agregar un elemento de opción predeterminado
                    const defaultOption = document.createElement('option');
                    defaultOption.text = 'Seleccione su respuesta';
                    defaultOption.disabled = true;
                    defaultOption.selected = true;
                    usuarioSelect.appendChild(defaultOption);

                    // Iterar sobre los usuarios y agregar opciones al select
                    data.usuarios.forEach(usuario => {
                        const option = document.createElement('option');
                        option.value = usuario.idusuario;
                        option.textContent = usuario.usuario;
                        usuarioSelect.appendChild(option);
                    });
                } else {
                    console.error('La respuesta del servidor no contiene la propiedad "usuarios".');
                }
            })
            .catch(error => console.error('Error al cargar los usuarios:', error));
    }

    // Función para cargar opciones para el campo tipo de vehiculo
    function cargarTipo() {
        cargarTipo(null)
    }
    function cargarTipo(idtipovehiculo) {
    console.log("cargarTipo")
        fetch('http://localhost:3007/tipovehiculo/')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Agrega este console.log para verificar la respuesta del servidor
                // Verificar si la respuesta contiene la propiedad "usuarios"
                if (data && Array.isArray(data)) {
                    // Obtener el select por su ID
                    const tipovehiculoSelect = document.getElementById('tipovehiculo');
                    
                    // Limpiar el select antes de agregar nuevas opciones
                    tipovehiculoSelect.innerHTML = '';

                    // Agregar un elemento de opción predeterminado
                    const defaultOption = document.createElement('option');
                    defaultOption.text = 'Seleccione su respuesta';
                    defaultOption.disabled = true;
                    defaultOption.selected = true;
                    tipovehiculoSelect.appendChild(defaultOption);
                    // Iterar sobre los usuarios y agregar opciones al select
                    tipovehiculoSelect.addEventListener('change', () => {
                        cargarServicios(tipovehiculoSelect.value,null);
                      })    
                    data.forEach(tipovehiculo => {
                    console.log(tipovehiculo.idtipovehiculo, idtipovehiculo)
                        if(idtipovehiculo== null || idtipovehiculo==tipovehiculo.idtipovehiculo){
                            const option = document.createElement('option');
                            option.value = tipovehiculo.idtipovehiculo;
                            option.textContent = tipovehiculo.nombre;
                            tipovehiculoSelect.appendChild(option);
                        }
                    });
                } else {
                    console.error('La respuesta del servidor no contiene la propiedad "tipos de vehiculos".');
                }
            })
            .catch(error => console.error('Error al cargar los tipos de vehiculos:', error));
    }

    // servicio seleccionado
    var servicioseleccionado = []

    // Función para cargar opciones para el campo Servicio
    function cargarServicios(idtipovehiculo,idorden) {

        console.log("http://localhost:3007/servicio/?idtipovehiculo="+idtipovehiculo)
        fetch("http://localhost:3007/servicio/?idtipovehiculo="+idtipovehiculo)
            .then(response => response.json())
            .then(data => {
                // Verificar si la respuesta contiene la propiedad "servicios"
                if (data && data.servicios && Array.isArray(data.servicios)) {
                    // Obtener el div por su ID
                    const listaServiciosDiv = document.getElementById('listaServicios');
                    
                    // Limpiar el div antes de agregar nuevas opciones
                    listaServiciosDiv.innerHTML = '';
                    
                    detalles = getDetalleServicio(idorden)

                    
                    // Iterar sobre los servicios y agregar checkboxes al div
                    data.servicios.forEach(servicio => {
                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.name = 'servicio';
                        checkbox.value = servicio.idservicio;
                        checkbox.id = 'servicio' + servicio.idservicio;
                        checkbox.addEventListener('change', (event) => {
                            if (event.currentTarget.checked) {
                                servicioseleccionado.push(servicio)
                            } else {
                                //removeValue(servicio,servicioseleccionado);
                                console.log("sacandod de la lista")
                                servicioseleccionado = servicioseleccionado.filter(function (filter) {
                                    return servicio.idservicio !== filter.idservicio;
                                });
                                console.log(servicioseleccionado)

                            }
                            calcularMontoTotal();
                          })
                        const label = document.createElement('label');
                        const precio = parseFloat(servicio.precio); // Convertir precio a número
                        label.textContent = servicio.nombre + ' - $' + precio.toFixed(2); // Agregamos el precio aquí
                        label.setAttribute('for', 'servicio' + servicio.idservicio);
                        
                        detalles.then(detallesArray =>{
                            
                            detallesArray.forEach(detalle =>{
                                console.log(detalle ,servicio)
                                if(detalle.idservicio == servicio.idservicio){
                                    checkbox.checked =true
                                }
                            } )
                            }
                        )
                        listaServiciosDiv.appendChild(checkbox);
                        listaServiciosDiv.appendChild(label);
                        listaServiciosDiv.appendChild(document.createElement('br'));
                    });
                } else {
                    console.error('La respuesta del servidor no contiene la propiedad "servicios".');
                }
            })
            .catch(error => console.error('Error al cargar los servicios:', error));
    }

    async function getDetalleServicio(idorden){
        const response = await fetch("http://localhost:3007/detalle/"+idorden)
        const data = await response.json()
        return data
    }
    // Función para calcular el monto total
    function calcularMontoTotal() {
        console.log("calcularMontoTotal");
        let total = 0;
        servicioseleccionado.forEach(servicio => {
            const precio = parseFloat(servicio.precio);
            total += precio;
        });
        document.getElementById('montoTotal').value = total.toFixed(2);
    }

    // Función para limpiar todos los campos del formulario
    function limpiarFormulario() {
        document.getElementById('fecha').value = obtenerFechaActual();
        document.getElementById('dominio').selectedIndex = 0;
        document.getElementById('fechaTurno').value = '';
        document.getElementById('horario').value = '';
        document.getElementById('formaPago').selectedIndex = 0;
        document.getElementById('estado').selectedIndex = 0;
        document.getElementById('usuario').selectedIndex = 0;

           // Limpiar checkboxes (si los hay)
           const checkboxes = document.querySelectorAll('input[type="checkbox"]');
           checkboxes.forEach(checkbox => {
               checkbox.checked = false;
           });
        document.getElementById('montoTotal').value = '';
    }


    // Llamar a la función para cargar opciones y establecer fecha por defecto al cargar la página
    cargarOpciones();
    cargarClientes();
    cargarDominios();
    cargarFormasPago();
    cargarEstados();
    cargarUsuarios();
    // cargarServicios();
    cargarTipo();
    

    // Event listener para los checkboxes de servicios
    const checkboxes = document.querySelectorAll('input[name="servicio"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calcularMontoTotal);
    });

     // Event listener para el botón cancelar
     const cancelarBtn = document.getElementById('cancel-button');
     cancelarBtn.addEventListener('click', function() {
         limpiarFormulario();
         $('#crearServicioModal').modal('hide');
     });

     // funcion mostrar en tabla
     function cargarOrdenes() {
        fetch('http://localhost:3007/orden/')
            .then(response => response.json())
            .then(data => {
                if (data && data.ordenes && Array.isArray(data.ordenes)) {
                    const ordenesOrdenadas = data.ordenes.sort((a, b) => a.idorden - b.idorden);
                    const tbody = document.getElementById('ordenes-table').querySelector('tbody');
                    tbody.innerHTML = ''; // Limpiar el contenido existente

                    const filtroFechaTurno = document.getElementById('filtroFechaTurno').value;
                    const fechaSeleccionada = filtroFechaTurno ? new Date(filtroFechaTurno).toISOString().slice(0, 10) : '';
                    const filtroCliente = document.getElementById('filtroCliente').value.toLowerCase();
                    const filtroDominio = document.getElementById('filtroDominio').value.toLowerCase();
                    const filtroEstado = document.getElementById('filtroEstado').value.toLowerCase();

                    ordenesOrdenadas.forEach(orden => {
                        const fechaTurnoFormat = formatFecha(orden.fecha_turno);

                        const clienteCoincide = orden.nombre.toLowerCase().includes(filtroCliente);
                        const fechaCoincide = filtroFechaTurno === '' || fechaTurnoFormat === fechaSeleccionada;
                        const dominioCoincide = orden.dominio.toLowerCase().includes(filtroDominio);
                        const estadoCoincide = orden.estado.toLowerCase().includes(filtroEstado);

                        if (clienteCoincide && fechaCoincide && dominioCoincide && estadoCoincide) {
                            const row = document.createElement('tr');

                            const idColumn = document.createElement('td');
                            idColumn.textContent = orden.idorden;
                            row.appendChild(idColumn);

                            const fechaCargaColumn = document.createElement('td');
                            fechaCargaColumn.textContent = formatFecha(orden.fecha_carga);
                            row.appendChild(fechaCargaColumn);

                            const nombrecliente = document.createElement('td');
                            nombrecliente.textContent = orden.nombre;
                            row.appendChild(nombrecliente);

                            const dominioColumn = document.createElement('td');
                            dominioColumn.textContent = orden.dominio;
                            row.appendChild(dominioColumn);

                            const fechaTurnoColumn = document.createElement('td');
                            fechaTurnoColumn.textContent = formatFecha(orden.fecha_turno);
                            row.appendChild(fechaTurnoColumn);

                            const horaTurnoColumn = document.createElement('td');
                            horaTurnoColumn.textContent = orden.horario_turno;
                            row.appendChild(horaTurnoColumn);

                            const montoTotalColumn = document.createElement('td');
                            montoTotalColumn.textContent = orden.monto_total;
                            row.appendChild(montoTotalColumn);

                            const formaPagoColumn = document.createElement('td');
                            formaPagoColumn.textContent = orden.forma_pago;
                            row.appendChild(formaPagoColumn);

                            const estadoColumn = document.createElement('td');
                            estadoColumn.textContent = orden.estado;
                            row.appendChild(estadoColumn);

                            const accionesColumn = document.createElement('td');
                            const editarBtn = document.createElement('button');
                            editarBtn.textContent = 'Editar';
                            editarBtn.dataset.target = "#crearServicioModal";
                            editarBtn.dataset.toggle = "modal";
                            editarBtn.classList.add('btn', 'btn-primary');
                            editarBtn.dataset.idorden = orden.idorden;
                            editarBtn.addEventListener('click', function () {
                                console.log('Editar orden con ID:', this.dataset.idorden);
                                cargarorden(this.dataset.idorden);
                            });
                            accionesColumn.appendChild(editarBtn);
                            row.appendChild(accionesColumn);

                            tbody.appendChild(row);
                        }
                    });
                } else {
                    console.error('La respuesta del servidor no contiene la propiedad "ordenes".');
                }
            })
            .catch(error => console.error('Error al cargar las ordenes:', error));
    }

    function formatFecha(fecha) {
        const date = new Date(fecha);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    }
   
const filtroClienteInput = document.getElementById('filtroCliente');
const filtroFechaTurnoInput = document.getElementById('filtroFechaTurno');
const filtroDominioInput = document.getElementById('filtroDominio');
const filtroEstadoInput = document.getElementById('filtroEstado');

filtroClienteInput.addEventListener('input', function () {
    cargarOrdenes();
});

filtroFechaTurnoInput.addEventListener('change', function () {
    cargarOrdenes();
});

filtroDominioInput.addEventListener('input', function () {
    cargarOrdenes();
});

filtroEstadoInput.addEventListener('input', function () {
    cargarOrdenes();
});

    
// Llamar a la función para cargar y mostrar los registros de orden al cargar la página
cargarOrdenes();

function limpiarFiltros() {
    document.getElementById('filtroFechaTurno').value = '';
    document.getElementById('filtroCliente').value = '';
    document.getElementById('filtroDominio').value = '';
    document.getElementById('filtroEstado').value = '';
    
    cargarOrdenes(); // Refrescar las órdenes después de limpiar los filtros
}

// Asignar evento al botón Limpiar Filtros
document.getElementById('limpiarFiltros').addEventListener('click', limpiarFiltros);




 // Event listener para el botón "Agregar Orden"
 const agregarOrdenBtn = document.getElementById('agregar-button');
 agregarOrdenBtn.addEventListener('click', function() {
    console.log('agregar-button')
    // Obtener el valor seleccionado del cliente
    const cliente = document.getElementById('idcliente').value;
     // Obtener los valores de los campos del formulario
     const fecha = document.getElementById('fecha').value;
     const dominio = document.getElementById('dominio').value;
     const fechaTurno = document.getElementById('fechaTurno').value;
     const horario = document.getElementById('horario').value;
     const formaPago = document.getElementById('formaPago').value;
     const estado = document.getElementById('estado').value;
     const usuario = document.getElementById('usuario').value;
     const montoTotal = document.getElementById('montoTotal').value;

     const servicios = servicioseleccionado;
     
     // Crear objeto con los datos del formulario
     const ordenData = {
         fecha: fecha,
         idcliente: cliente,
         idvehiculo: dominio,
         fecha_turno: fechaTurno,
         horario_turno: horario,
         id_forma_pago: formaPago,
         idestado: estado,
         idusuario: usuario,
         monto_total: montoTotal,
         servicios
     };

     // Enviar los datos al servidor
     fetch('http://localhost:3007/orden/', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(ordenData)
     })
     .then(response => {
        if (response.ok) {
            console.log('Orden agregada correctamente');
            // Cerrar el modal primero
            $('#crearServicioModal').modal('hide');
            // Luego de agregar la orden y cerrar el modal, puedes limpiar el formulario
            limpiarFormulario();
            cargarOrdenes(); // Cargar los registros en la tabla
        } else {
            console.error('Error al agregar la orden:', response.statusText);
        }
     })
     .catch(error => console.error('Error al enviar los datos al servidor:', error));
 });


 ///// -------------



     // Función para cargar los detalles de un vehiculo en el formulario para editar
     const cargarorden = async (idOrden) => {
        try {
            const response = await fetch(`http://localhost:3007/orden/${idOrden}`);
            if (!response.ok) {
                throw new Error('Error al cargar los detalles de la orden');
            }
            let orden = await response.json();
            orden = orden.orden[0][0];
            console.log(orden);

             // Convertir la fecha completa en solo la fecha
        const fechaTurno = orden.fecha_turno.split("T")[0];

            // Asignar los valores de la orden a los campos del formulario
            document.getElementById('idorden').value = idOrden;
//            document.getElementById('fecha').value = orden.fecha_carga.toISOString();            
            document.getElementById('usuario').value = orden.idusuario;
            document.getElementById('idcliente').value = orden.idcliente;
            document.getElementById('dominio').value = orden.dominio; 
            document.getElementById('montoTotal').value = orden.monto_total;
            document.getElementById('estado').value = orden.idestado;
            document.getElementById('horario').value = orden.horario_turno;
            document.getElementById('formaPago').value = orden.id_forma_pago;
            document.getElementById('tipovehiculo').value = orden.idtipovehiculo;
            document.getElementById('fechaTurno').value = fechaTurno;
        
            cargarDominios(orden.idcliente,orden.dominio);

            // Actualizar el texto del botón de enviar para indicar que se está editando
            document.getElementById('submit-button').innerText = 'Actualizar';
            cargarServicios( orden.idtipovehiculo, idOrden);
            
        } catch (error) {
            console.error('Error al cargar los detalles de l orden:', error);
            alert('Error al cargar los detalles de la orden');
        }
    };
/*
 agregarOrdenBtn.addEventListener('click', function() {
    // Obtener el valor seleccionado del cliente
    const cliente = document.getElementById('idcliente').value;
     // Obtener los valores de los campos del formulario
     const fecha = document.getElementById('fecha').value;
     const dominio = document.getElementById('dominio').value;
     const fechaTurno = document.getElementById('fechaTurno').value;
     const horario = document.getElementById('horario').value;
     const formaPago = document.getElementById('formaPago').value;
     const estado = document.getElementById('estado').value;
     const usuario = document.getElementById('usuario').value;
     const montoTotal = document.getElementById('montoTotal').value;

     const servicios = servicioseleccionado;
     
     // Crear objeto con los datos del formulario
     const ordenData = {
         fecha: fecha,
         idcliente: cliente,
         idvehiculo: dominio,
         fecha_turno: fechaTurno,
         horario_turno: horario,
         id_forma_pago: formaPago,
         idestado: estado,
         idusuario: usuario,
         monto_total: montoTotal,
         servicios
     };

     // Enviar los datos al servidor
     fetch('http://localhost:3007/orden/', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(ordenData)
     })
     .then(response => {
        if (response.ok) {
            console.log('Orden agregada correctamente');
            // Cerrar el modal primero
            $('#crearServicioModal').modal('hide');
            // Luego de agregar la orden y cerrar el modal, puedes limpiar el formulario
            limpiarFormulario();
            cargarOrdenes(); // Cargar los registros en la tabla
        } else {
            console.error('Error al agregar la orden:', response.statusText);
        }
     })
     .catch(error => console.error('Error al enviar los datos al servidor:', error));
 });
*/
 document.getElementById('submit-button').addEventListener('click', function() {
    console.log("submit-button")
    // Obtener el valor seleccionado del cliente
    const cliente = document.getElementById('idcliente').value;
     // Obtener los valores de los campos del formulario
     const fecha = document.getElementById('fecha').value;
     const dominio = document.getElementById('dominio').value;
     const fechaTurno = document.getElementById('fechaTurno').value;
     const horario = document.getElementById('horario').value;
     const formaPago = document.getElementById('formaPago').value;
     const estado = document.getElementById('estado').value;
     const usuario = document.getElementById('usuario').value;
     const montoTotal = document.getElementById('montoTotal').value;
    const idorden = document.getElementById('idorden').value;
     const servicios = servicioseleccionado;
     
     // Crear objeto con los datos del formulario
     const ordenData = {
         idorden: idorden,
         fecha: fecha,
         idcliente: cliente,
         idvehiculo: dominio,
         fecha_turno: fechaTurno,
         horario_turno: horario,
         id_forma_pago: formaPago,
         idestado: estado,
         idusuario: usuario,
         monto_total: montoTotal,
         servicios
     };

     // Enviar los datos al servidor
     fetch(`http://localhost:3007/orden/${idorden}`, {
         method: 'PUT',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(ordenData)
     })
     .then(response => {
        if (response.ok) {
            console.log('Orden ACTUALIZADA correctamente');
            // Cerrar el modal primero
            $('#crearServicioModal').modal('hide');
            // Luego de agregar la orden y cerrar el modal, puedes limpiar el formulario
            limpiarFormulario();
            cargarOrdenes(); // Cargar los registros en la tabla
        } else {
            console.error('Error al agregar la orden:', response.statusText);
        }
     })
     .catch(error => console.error('Error al enviar los datos al servidor:', error));
 });


    
});

