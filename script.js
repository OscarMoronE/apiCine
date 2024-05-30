let viewOpcions = document.getElementById("viewOpcions");
let inputWatch = document.getElementById("queVeras");
let buscar = document.getElementById("buscar");
let lista = document.getElementById("lista");
let conteBtn = document.getElementById("conteBtn");

//Capturas de opciones peliculas o series
viewOpcions.addEventListener("change", variableCambio);
viewOpcions.addEventListener("mostrarAlert", cambio)

function variableCambio() {
    let cambioDeOpcion = viewOpcions.value;
    let eventoPer = new CustomEvent("mostrarAlert");
    viewOpcions.dispatchEvent(eventoPer);
}

function cambio() {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: ` Se modifico el archivo base a ${viewOpcions.value}`,
        showConfirmButton: false,
        timer: 1500
    });
}

//deshabilitar btn buscar en caso de que el usuario, aun no escriba en el input
inputWatch.addEventListener("input", function () {
    if (inputWatch.value !== "") {
        buscar.disabled = false;
    } else {
        buscar.disabled = true;
    }
});

//Verificar si es numero o letra
inputWatch.addEventListener("keydown", noNumeros);

function noNumeros(event) {
    if ((event.keyCode < 65 || event.keyCode > 90) && event.keyCode != 8 && event.keyCode != 32) {
        event.preventDefault();
    }
}

buscar.addEventListener("click", btnBuscar);

function btnBuscar() {
    lista.innerHTML = "";
    let p;

    //obtener Json
    let urlPeliculas = 'peliculas.json';
    let urlSeries = 'series.json';

    //jsonPeliculas
    fetch(urlPeliculas)
        .then(res => res.json())
        .then((salida => {
            datosPelicula = salida;
            for (let item of datosPelicula.data) {
                if (item.nombre.startsWith(inputWatch.value.toUpperCase())) {
                    console.log("Movies Work!!");
                    let parrafoPeli = document.createElement("p");
                    parrafoPeli.textContent = `Sipnosis de ${item.nombre}:  ${item.sinopsis}`;
                    parrafoPeli.style.display = "none";
                    let li = document.createElement("li");
                    li.textContent = item.nombre;
                    li.addEventListener('mouseover', function () {
                        parrafoPeli.style.display = 'block';
                    });

                    lista.appendChild(li);
                    lista.appendChild(parrafoPeli);

                    let btnTrailer = document.createElement("a");
                    btnTrailer.classList.add("btnTrailer");
                    btnTrailer.setAttribute("href", item.trailer);
                    btnTrailer.innerHTML = 'Ver Trailer <i class="fa-brands fa-youtube"></i>';
                    lista.appendChild(btnTrailer);
                }
            }
        }))

    //jsonSeries
    fetch(urlSeries)
        .then(response => response.json())
        .then((exit => {
            datosSerie = exit;
            for (let item of datosSerie.data) {
                if (item.nombre.startsWith(inputWatch.value.toUpperCase())) {
                    console.log("series work!!");
                    let parrafo = document.createElement("p");
                    parrafo.textContent = `Sipnosis de ${item.nombre}:  ${item.sinopsis}`;
                    parrafo.style.display = "none";
                    let li = document.createElement("li");
                    li.textContent = item.nombre;
                    li.addEventListener('mouseover', function () {
                        parrafo.style.display = 'block';
                    });

                    lista.appendChild(li);
                    lista.appendChild(parrafo);

                    let btnTrailer = document.createElement("a");
                    btnTrailer.classList.add("btnTrailer");
                    btnTrailer.setAttribute("href", item.trailer);
                    btnTrailer.innerHTML = 'Ver Trailer <i class="fa-brands fa-youtube"></i>';
                    lista.appendChild(btnTrailer);
                }
            }
        }))
        .catch(function (error) {
            console.log(error);
        })
}
