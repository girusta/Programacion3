document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const mensajeExito = document.querySelector('.mensaje-exito');
    const mensajeError = document.querySelector('.mensaje-error');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        const usuario = document.getElementById('usuario').value;
        const password = document.getElementById('password').value;

        // crea un objeto con los datos del formulario
        const data = {
            usuario: usuario,
            password: password
        };

        // Enviar solicitud al backend para verificar las credenciales
        fetch('http://localhost:3007/usuario/iniciar-sesion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        //respuesta de error 
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud al servidor');
            }
            return response.json();
        })
        //respuesta exitosa
        .then(data => {
            console.log('Respuesta del servidor:', data);
            mensajeExito.textContent = 'Inicio de sesión exitoso';
            mensajeExito.style.display = 'block';
            setTimeout(() => {
                mensajeExito.style.display = 'none';
                window.location.href = './html/v1principal.html';
            }, 1000);
        })
        .catch(error => {
            console.error('Error al iniciar sesión:', error.message);
            // Mostrar un mensaje de error en la página
            mensajeError.textContent = 'Error al iniciar sesión. Verifique.';
            mensajeError.style.display = 'block';
            setTimeout(() => {
                mensajeError.style.display = 'none';
            }, 2000);
        });
    });
});
