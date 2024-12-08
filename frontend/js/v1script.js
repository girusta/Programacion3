//Ejecutar función en el evento click
document.getElementById("btn_open").addEventListener("click", open_close_menu);

//Declaramos variables
var side_menu = document.getElementById("menu_side");
var btn_open = document.getElementById("btn_open");
var body = document.getElementById("body");

//Evento para mostrar y ocultar menú
    function open_close_menu(){
        body.classList.toggle("body_move");
        side_menu.classList.toggle("menu__side_move");
    }

//Si el ancho de la página es menor a 760px, ocultará el menú al recargar la página

if (window.innerWidth < 760){
    body.classList.add("body_move");
    side_menu.classList.add("menu__side_move");
}

//Haciendo el menú responsive(adaptable)

window.addEventListener("resize", function(){

    if (window.innerWidth > 760){

        body.classList.remove("body_move");
        side_menu.classList.remove("menu__side_move");
    }

    if (window.innerWidth < 760){

        body.classList.add("body_move");
        side_menu.classList.add("menu__side_move");
    }

});

// Evento para manejar el clic en el enlace de salir
document.getElementById('exit-link').addEventListener('click', function(event) {
    event.preventDefault(); // Previene el comportamiento predeterminado del enlace
    // Mostrar el cuadro de diálogo personalizado
    document.getElementById('confirmation-dialog').style.display = 'flex';
});

// Manejadores para los botones del cuadro de diálogo
document.getElementById('confirm-yes').addEventListener('click', function() {
    window.location.href = '../index.html';
});

document.getElementById('confirm-no').addEventListener('click', function() {
    // Ocultar el cuadro de diálogo
    document.getElementById('confirmation-dialog').style.display = 'none';
});

// Función para obtener y mostrar el clima
async function fetchWeather() {
    const apiKey = '4ddce69cdacde09f4d122b3b1f947c13';
    const city = 'Villa Maria';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const weatherInfo = document.getElementById('weather');
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        weatherInfo.innerHTML = `
            <i><img src="${icon}" alt="weather icon"></i>
            <span>${temp}°C</span>
            <span>${description}</span>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Llamada a la función para obtener el clima al cargar la página
document.addEventListener('DOMContentLoaded', fetchWeather);

// Función para obtener y mostrar la fecha actual
function displayCurrentDate() {
    const currentDateElement = document.getElementById('current-date');
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('es-ES', options);
    currentDateElement.textContent = formattedDate;
}

// Función para obtener y mostrar la hora actual
function displayCurrentTime() {
    const currentTimeElement = document.getElementById('current-time');
    const currentTime = new Date();
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formattedTime = currentTime.toLocaleTimeString('es-ES', options);
    currentTimeElement.textContent = formattedTime;
}

// Llamada a las funciones para mostrar la fecha y la hora actuales al cargar la página
document.addEventListener('DOMContentLoaded', displayCurrentDate);
setInterval(displayCurrentTime, 1000); // Actualizar la hora cada segundo

