document.addEventListener('DOMContentLoaded', function () {
    // Selección de elementos del DOM
    const fechaDesdeInput = document.getElementById('fechaDesde');
    const fechaHastaInput = document.getElementById('fechaHasta');
    const filtroDominioInput = document.getElementById('filtroDominio');
    const filtroEstadoInput = document.getElementById('filtroEstado');
    const filtroClienteInput = document.getElementById('filtroCliente');
    const limpiarFiltrosFechaBtn = document.getElementById('limpiarFiltrosFecha');
    const mostrarTodosBtn = document.getElementById('mostrarTodosBtn'); // Botón "Mostrar Todos"
    const sumaTotalElement = document.getElementById('suma-total');

    let ordenesOriginales = []; // Almacena todos los registros cargados inicialmente

    // Configuración inicial de fechas
    function formatFecha(fecha) {
        const year = fecha.getFullYear();
        const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const day = fecha.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Fechas iniciales: 1 de noviembre de 2024 a 30 de noviembre de 2024
    const primerDiaMesAnterior = new Date(2024, 10, 1); // 1 de noviembre de 2024
    const ultimoDiaMesActual = new Date(2024, 10, 30); // 30 de noviembre de 2024

    fechaDesdeInput.value = formatFecha(primerDiaMesAnterior);
    fechaHastaInput.value = formatFecha(ultimoDiaMesActual);

    // Cargar órdenes desde el servidor
    function cargarOrdenes() {
        fetch('http://localhost:3007/orden/')
            .then(response => response.json())
            .then(data => {
                if (data && data.ordenes && Array.isArray(data.ordenes)) {
                    ordenesOriginales = data.ordenes; // Guardar todas las órdenes
                    mostrarOrdenes(ordenesOriginales); // Mostrar las órdenes filtradas por las fechas iniciales
                } else {
                    console.error('La respuesta del servidor no contiene la propiedad "ordenes".');
                }
            })
            .catch(error => console.error('Error al cargar las órdenes:', error));
    }

    // Mostrar órdenes en la tabla
    function mostrarOrdenes(ordenes, aplicarFiltroFechas = true) {
        const tbody = document.getElementById('ordenes-table').querySelector('tbody');
        tbody.innerHTML = ''; // Limpiar tabla
        let sumaTotal = 0;

        let fechaDesde = new Date(fechaDesdeInput.value);
        let fechaHasta = new Date(fechaHastaInput.value);

        ordenes
            .filter(orden => {
                if (aplicarFiltroFechas) {
                    const fechaOrden = new Date(orden.fecha_turno);
                    return fechaOrden >= fechaDesde && fechaOrden <= fechaHasta;
                }
                return true; // Si no se aplican filtros, devolver todas
            })
            .sort((a, b) => {
                // Ordenar por fecha de turno en forma ascendente
                const fechaA = new Date(a.fecha_turno);
                const fechaB = new Date(b.fecha_turno);
                return fechaA - fechaB;
            })
            .forEach(orden => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="hidden-column">${orden.idorden}</td>
                    <td>${formatFecha(new Date(orden.fecha_carga))}</td>
                    <td>${orden.nombre}</td>
                    <td>${orden.dominio}</td>
                    <td>${formatFecha(new Date(orden.fecha_turno))}</td>
                    <td>${orden.horario_turno}</td>
                    <td>${orden.monto_total}</td>
                    <td>${orden.forma_pago}</td>
                    <td>${orden.estado}</td>
                `;
                tbody.appendChild(row);
                sumaTotal += parseFloat(orden.monto_total);
            });

        sumaTotalElement.textContent = 'Total: $' + sumaTotal.toFixed(2);
    }

    // Mostrar todas las órdenes (sin filtros)
    function mostrarTodasLasOrdenes() {
        mostrarOrdenes(ordenesOriginales, false); // Mostrar todas las órdenes sin aplicar filtro de fechas
    }

    // Limpiar filtros y mostrar registros según rango inicial
    function limpiarFiltrosFecha() {
        fechaDesdeInput.value = formatFecha(primerDiaMesAnterior);
        fechaHastaInput.value = formatFecha(ultimoDiaMesActual);
        filtroDominioInput.value = '';
        filtroEstadoInput.value = '';
        filtroClienteInput.value = '';
        mostrarOrdenes(ordenesOriginales); // Mostrar órdenes filtradas por fechas iniciales
    }

    // Filtrar por dominio, estado y cliente
    function aplicarFiltros(tipoFiltro, valorFiltro) {
        const filas = document.querySelectorAll('#ordenes-table tbody tr');
        let sumaTotal = 0;

        filas.forEach(fila => {
            const textoFila = fila.querySelector(`td:nth-child(${tipoFiltro === 'dominio' ? 4 : tipoFiltro === 'cliente' ? 3 : 9})`).textContent.toLowerCase();
            if (valorFiltro === '' || textoFila.includes(valorFiltro.toLowerCase())) {
                fila.style.display = '';
                sumaTotal += parseFloat(fila.querySelector('td:nth-child(7)').textContent);
            } else {
                fila.style.display = 'none';
            }
        });

        sumaTotalElement.textContent = 'Total: $' + sumaTotal.toFixed(2);
    }

    // Eventos de cambio y entrada
    filtroDominioInput.addEventListener('input', () => aplicarFiltros('dominio', filtroDominioInput.value));
    filtroEstadoInput.addEventListener('change', () => aplicarFiltros('estado', filtroEstadoInput.value));
    filtroClienteInput.addEventListener('input', () => aplicarFiltros('cliente', filtroClienteInput.value));
    fechaDesdeInput.addEventListener('input', () => mostrarOrdenes(ordenesOriginales));
    fechaHastaInput.addEventListener('input', () => mostrarOrdenes(ordenesOriginales));

    // Eventos para botones
    limpiarFiltrosFechaBtn.addEventListener('click', limpiarFiltrosFecha);
    mostrarTodosBtn.addEventListener('click', mostrarTodasLasOrdenes);

    // Cargar las órdenes al iniciar y aplicar filtro de fechas
    cargarOrdenes();
});
