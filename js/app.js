//Variables
const container = document.querySelector(".container");
const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");

//Eventos
window.addEventListener("load", () => {
  formulario.addEventListener("submit", obtenerClima);
});
//Funciones
function obtenerClima(e) {
  e.preventDefault();

  //Validar
  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  console.log(ciudad);
  console.log(pais);
  if (ciudad === "" || pais === "") {
    //Hubo un error
    mostrarError("Todos los campos son obligatorios");
    return;
  }
  //Consultar API
  consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
  const alerta = document.querySelector(".bg-red-100");

  if (!alerta) {
    //Crear una alerta
    const alerta = document.createElement("div");

    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center"
    );

    alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
    `;

    container.appendChild(alerta);

    //Se elimina la alerta después de 5 segundos
    setTimeout(() => {
      alerta.remove();
    }, 5000);
  }
}

function consultarAPI(ciudad, pais) {
  const appId = "27eeb07b6cccc20a8c35ed888abaf41b";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

  Spinner(); //Muestra el spinner de carga

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      limpiarHTML(); //Limpia el HTML previo

      if (datos.cod === "404") {
        mostrarError("Ciudad no encontrada");
        return;
      }

      //Imprime la respuesta en el HTML
      mostrarClima(datos);
    });
}

function mostrarClima(datos) {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = datos;

  const centigrados = kelvinACentigrados(temp);
  const max = kelvinACentigrados(temp_max);
  const min = kelvinACentigrados(temp_min);

  const nombreCiudad = document.createElement("p");
  nombreCiudad.textContent = `Clima en ${name}`;
  nombreCiudad.classList.add("font-bold", "text-2xl");

  const actual = document.createElement("p");
  actual.innerHTML = `${centigrados} &#8451;`;
  actual.classList.add("font-bold", "text-6xl");

  const tempMaxima = document.createElement("p");
  tempMaxima.innerHTML = `Max: ${max} &#8451;`;
  tempMaxima.classList.add("text-xl");

  const tempMinima = document.createElement("p");
  tempMinima.innerHTML = `Min: ${min} &#8451;`;
  tempMinima.classList.add("text-xl");

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMaxima);
  resultadoDiv.appendChild(tempMinima);

  resultado.appendChild(resultadoDiv);
}

const kelvinACentigrados = (grados) => parseInt(grados - 273.15);

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function Spinner() {
  limpiarHTML();
  const divSpinner = document.createElement("div");
  divSpinner.classList.add("sk-fading-circle");

  divSpinner.innerHTML = `
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
  `;

  resultado.appendChild(divSpinner);
}
