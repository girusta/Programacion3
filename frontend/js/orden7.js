document.addEventListener('DOMContentLoaded', function () {
    // Función para cargar los últimos 10 registros
    function cargarUltimos10Registros() {
        fetch('http://localhost:3007/orden/')
            .then(response => response.json())
            .then(data => {
                if (data && data.ordenes && Array.isArray(data.ordenes)) {
                    // Ordenar las órdenes por fecha (de más reciente a más antiguo)
                    const ordenesOrdenadas = data.ordenes.sort((a, b) => {
                        return new Date(b.fecha_turno) - new Date(a.fecha_turno);
                    });

                    // Mostrar solo los primeros 10 registros
                    actualizarTabla(ordenesOrdenadas.slice(0, 10));
                } else {
                    console.error('La respuesta del servidor no contiene órdenes válidas.');
                }
            })
            .catch(error => console.error('Error al cargar las órdenes:', error));
    }

    // Función para actualizar la tabla con los datos filtrados
    function actualizarTabla(ordenes) {
        const tbody = document.querySelector('#ordenes-table tbody'); // cuerpo tabla
        tbody.innerHTML = ''; // Limpiar contenido existente
        let sumaTotal = 0;
        //obtiene datos de los filtros
        const clienteFiltro = document.getElementById('filtroCliente').value.toLowerCase();
        const dominioFiltro = document.getElementById('filtroDominio').value.toLowerCase();
        const estadoFiltro = document.getElementById('filtroEstado').value.toLowerCase();
        const fechaDesde = document.getElementById('fechaDesde').value;
        const fechaHasta = document.getElementById('fechaHasta').value;
        const fechaDesdeObj = fechaDesde ? new Date(fechaDesde) : null;
        const fechaHastaObj = fechaHasta ? new Date(fechaHasta) : null;
        //filtrar ordenes
        const ordenesFiltradas = ordenes.filter(orden => {
            const fechaTurno = new Date(orden.fecha_turno);
            const estadoNormalizado = (orden.estado || '').toLowerCase().trim();
            return (
                (!clienteFiltro || orden.nombre.toLowerCase().includes(clienteFiltro)) &&
                (!dominioFiltro || orden.dominio.toLowerCase().includes(dominioFiltro)) &&
                (!estadoFiltro || estadoNormalizado === estadoFiltro) &&
                (!fechaDesdeObj || fechaTurno >= fechaDesdeObj) &&
                (!fechaHastaObj || fechaTurno <= fechaHastaObj)
            );
        });
        // Mostrar las órdenes filtradas
        ordenesFiltradas.forEach(orden => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${orden.idorden}</td>
                <td>${formatFecha(orden.fecha_carga)}</td>
                <td>${orden.nombre}</td>
                <td>${orden.dominio}</td>
                <td>${formatFecha(orden.fecha_turno)}</td>
                <td>${orden.horario_turno}</td>
                <td>${orden.monto_total}</td>
                <td>${orden.forma_pago}</td>
                <td>${orden.estado}</td>
            `;
            sumaTotal += parseFloat(orden.monto_total || 0);
            tbody.appendChild(row);
        });

        const sumaTotalElement = document.getElementById('suma-total');
        sumaTotalElement.textContent = `Total: $${sumaTotal.toFixed(2)}`;
    }

    // Función para limpiar los filtros y mostrar los últimos 10 registros
    document.getElementById('limpiarFiltrosFecha').addEventListener('click', () => {
        // Limpiar los filtros
        document.getElementById('filtroCliente').value = '';
        document.getElementById('filtroDominio').value = '';
        document.getElementById('filtroEstado').value = '';
        document.getElementById('fechaDesde').value = '';
        document.getElementById('fechaHasta').value = '';

        // Cargar los últimos 10 registros sin filtros
        cargarUltimos10Registros();
    });

    // Función para formatear la fecha a formato 'dd/mm/yyyy'
    function formatFecha(fecha) {
        const fechaObj = new Date(fecha);
        const dia = fechaObj.getDate().toString().padStart(2, '0');
        const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
        const anio = fechaObj.getFullYear();
        return `${dia}/${mes}/${anio}`;
    }

    // Llamada inicial para cargar los últimos 10 registros
    cargarUltimos10Registros();

    // Filtros en tiempo real
    document.getElementById('filtroCliente').addEventListener('input', function () {
        // Filtrar las órdenes por cliente
        fetch('http://localhost:3007/orden/')
            .then(response => response.json())
            .then(data => {
                if (data && data.ordenes && Array.isArray(data.ordenes)) {
                    const ordenesOrdenadas = data.ordenes.sort((a, b) => {
                        return new Date(b.fecha_turno) - new Date(a.fecha_turno);
                    });
                    actualizarTabla(ordenesOrdenadas);
                }
            })
            .catch(error => console.error('Error al cargar las órdenes:', error));
    });

    document.getElementById('filtroDominio').addEventListener('input', function () {
        // Filtrar las órdenes por dominio
        fetch('http://localhost:3007/orden/')
            .then(response => response.json())
            .then(data => {
                if (data && data.ordenes && Array.isArray(data.ordenes)) {
                    const ordenesOrdenadas = data.ordenes.sort((a, b) => {
                        return new Date(b.fecha_turno) - new Date(a.fecha_turno);
                    });
                    actualizarTabla(ordenesOrdenadas);
                }
            })
            .catch(error => console.error('Error al cargar las órdenes:', error));
    });

    document.getElementById('filtroEstado').addEventListener('change', function () {
        // Filtrar las órdenes por estado
        fetch('http://localhost:3007/orden/')
            .then(response => response.json())
            .then(data => {
                if (data && data.ordenes && Array.isArray(data.ordenes)) {
                    const ordenesOrdenadas = data.ordenes.sort((a, b) => {
                        return new Date(b.fecha_turno) - new Date(a.fecha_turno);
                    });
                    actualizarTabla(ordenesOrdenadas);
                }
            })
            .catch(error => console.error('Error al cargar las órdenes:', error));
    });

    document.getElementById('fechaDesde').addEventListener('change', function () {
        // Filtrar las órdenes por fecha desde
        fetch('http://localhost:3007/orden/')
            .then(response => response.json())
            .then(data => {
                if (data && data.ordenes && Array.isArray(data.ordenes)) {
                    const ordenesOrdenadas = data.ordenes.sort((a, b) => {
                        return new Date(b.fecha_turno) - new Date(a.fecha_turno);
                    });
                    actualizarTabla(ordenesOrdenadas);
                }
            })
            .catch(error => console.error('Error al cargar las órdenes:', error));
    });

    document.getElementById('fechaHasta').addEventListener('change', function () {
        // Filtrar las órdenes por fecha hasta
        fetch('http://localhost:3007/orden/')
            .then(response => response.json())
            .then(data => {
                if (data && data.ordenes && Array.isArray(data.ordenes)) {
                    const ordenesOrdenadas = data.ordenes.sort((a, b) => {
                        return new Date(b.fecha_turno) - new Date(a.fecha_turno);
                    });
                    actualizarTabla(ordenesOrdenadas);
                }
            })
            .catch(error => console.error('Error al cargar las órdenes:', error));
    });
});
