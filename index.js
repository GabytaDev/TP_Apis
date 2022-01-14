///ELEMENTOS DEL DOM/////
const linkCharacters = document.getElementById("link-characters")
const linkEpisodes = document.getElementById("link-episodes")
const linkLocations = document.getElementById("link-locations")

const tarjetaPersonaje = document.querySelector(".tarjeta-personaje")
const tarjetaEpisodios = document.querySelector(".tarjeta-episodios")
const tarjetaUbicaciones = document.querySelector(".tarjeta-ubicaciones")

const contenedorTarjetasPersonaje = document.querySelector(".contenedor-tarjetas-personaje")
const formulario = document.querySelector("#formulario")
const botonBuscar = document.getElementById("buscar")
const inputBuscador = document.querySelector("#input-buscador")
const selectBusqueda = document.getElementById("select-busqueda")
const selectStatus = document.getElementById("select-status")
const selectGender = document.getElementById("select-gender")

const selectOrden = document.getElementById("select-orden")
////// PAGINADO ////
const seccionPaginado = document.querySelector(".seccion-paginado")
const pagePrev = document.querySelector("#page-prev")
const pageNext = document.querySelector("#page-next")
const iconoRight = document.querySelector(".fa-angle-right")
const iconoLeft = document.querySelector(".fa-angle-left")

const seccionPaginadoEpisodios = document.querySelector(".seccion-paginado-episodios")
const pagePrevEpisodios = document.querySelector("#page-prev-episodios")
const pageNextEpisodios = document.querySelector("#page-next-episodios")
const iconoLeftEpisode = document.querySelector(".icono-left-episode")
const iconoRightEpisode = document.querySelector(".icono-right-episode")

const seccionPaginadoUbicaciones = document.querySelector(".seccion-paginado-ubicaciones")
const pagePrevUbicaciones = document.querySelector("#page-prev-ubicaciones")
const pageNextUbicaciones = document.querySelector("#page-next-ubicaciones")
const iconoLeftUbicaciones = document.querySelector(".icono-left-ubicaciones")
const iconoRightUbicaciones = document.querySelector(".icono-right-ubicaciones")
let paginaActual = 1
let ultimaPagina = 0


const baseUrl = "https://rickandmortyapi.com/api/"

//vista tarjetas///
const arrayTarjetas = [
    tarjetaPersonaje,
    tarjetaEpisodios,
    tarjetaUbicaciones 
]

const mostrarTarjetas = (array, tarjeta)=>{
    for (let i = 0; i < array.length; i++) {
        if(array[i] != tarjeta){
            array[i].classList.add("ocultar")
        }else if(array[i]=== tarjeta){
            array[i].classList.remove("ocultar")
        }  
    }
}

//links nav-bar///
linkCharacters.onclick = (e)=>{
    e.preventDefault()
    mostrarTarjetas(arrayTarjetas,tarjetaPersonaje)
    todosLosPersonajes()   
   
    
}

linkEpisodes.onclick = (e)=>{
    e.preventDefault()
    mostrarTarjetas(arrayTarjetas,tarjetaEpisodios)  
    todosLosEpisodios()
   
}
linkLocations.onclick = (e)=>{
    e.preventDefault()
    mostrarTarjetas(arrayTarjetas,tarjetaUbicaciones)
    todasLasUbicaciones()
}


//Fetch todos los personajes //
const todosLosPersonajes = ()=>{
    fetch(`${baseUrl}character?page=${paginaActual}`)
    .then(res => res.json())
    .then(data =>{
        ultimaPagina = data.info.pages
        mostrarPersonajeEnHTML(data.results)
        console.log(data.results)
       ordenarAZ (data.results, selectOrden.value)
    })
}

todosLosPersonajes()


///Fetch todos los episodios///
const todosLosEpisodios = ()=>{
    fetch(`${baseUrl}episode?page=${paginaActual}`)
    .then((res)=> res.json())
    .then((data)=>{
        ultimaPagina = data.info.pages
        mostrarEpisodioEnHTML(data.results)
    })
    
}

//Fetch todas las ubicaciones //
const todasLasUbicaciones = ()=>{
    fetch(`${baseUrl}/location?page=${paginaActual}`)
    .then((res)=> res.json())
    .then((data)=>{
        mostrarUbicacionEnHTML(data.results)
    })
   
}
///FORMULARIO///
formulario.onsubmit = (event) => {
    event.preventDefault();

};

///Deshabilitar selects///
selectBusqueda.onchange = ()=>{
    if(selectBusqueda.value === "episode"){
        selectGender.disabled = true;
        selectStatus.disabled = true
    }else{
        selectGender.disabled = false;
        selectStatus.disabled = false
    }
}

botonBuscar.onclick = ()=>{
   buscador ( selectBusqueda.value, inputBuscador.value, selectStatus.value, selectGender.value)
}

///PERSONAJE EN HTML ///
const mostrarPersonajeEnHTML = (array) => {
    const html = array.reduce((acc,curr)=>{
      return acc = acc + 
      `<div class="card" data-id=${curr.id}>
       <h3>Name: ${curr.name}</h3>
       <img src="${curr.image}"></img>
       <p>Gender: ${curr.gender}</p>
       <p>Specie: ${curr.species}</p>
     </div>`
    },"")

    tarjetaPersonaje.innerHTML = html
    mostrarTarjetas(arrayTarjetas,tarjetaPersonaje)
   detalleDePersonaje(); 
   seccionPaginadoEpisodios.style.display="none"
   seccionPaginado.style.display="flex"
   seccionPaginadoUbicaciones.style.display="none"
}  


////// EPISODIOS EN HTML////
const mostrarEpisodioEnHTML = (array) => {
    const html = array.reduce((acc,curr)=>{
        return acc = acc + 
        `<div class="card" data-id=${curr.id}>
    <h3>Name: ${curr.name}</h3>
    <p>Episode: ${curr.episode}</p>
    <img src="./images/58f37726a4fa116215a92410.png">
    </div>`
      },"")

    tarjetaEpisodios.innerHTML = html  
  detalleDeEpisodio()
  mostrarTarjetas(arrayTarjetas,tarjetaEpisodios);
  seccionPaginado.style.display="none"
  seccionPaginadoEpisodios.style.display="flex"
  seccionPaginadoUbicaciones.style.display="none"
} 

///UBICACIONE EN HTML///
const mostrarUbicacionEnHTML = (array) => {
    const html = array.reduce((acc,curr)=>{
        return acc = acc +  `<div class="card" data-id=${curr.id}>
        <h3>Location: ${curr.name}</h3>
        <p>Type: ${curr.type}</p>
        <img src="./images/58f37719a4fa116215a9240e.png">
        </div>`  
    },"")
    tarjetaUbicaciones.innerHTML = html   
    detalleUbicaciones()  
    mostrarTarjetas(arrayTarjetas,tarjetaUbicaciones)
    seccionPaginadoUbicaciones.style.display="flex"
    seccionPaginado.style.display="none"
    seccionPaginadoEpisodios.style.display="none"
} 
///BUSCADOR ////

const buscador = (tipoDeBusqueda , parametroDeBusqueda)=>{
    console.log(tipoDeBusqueda, parametroDeBusqueda)
   if(tipoDeBusqueda === "character"){
    obtenerPersonaje(parametroDeBusqueda)
    tarjetaPersonaje.classList.remove("ocultar")
    tarjetaEpisodios.classList.add("ocultar")
    tarjetaUbicaciones .classList.add("ocultar")
    seccionPaginadoEpisodios.style.display="none"
    
   } else if(tipoDeBusqueda === "episode"){
    buscarEpisodio(parametroDeBusqueda)
    tarjetaEpisodios.classList.remove("ocultar")
    seccionPaginadoEpisodios.style.display="flex"
    tarjetaPersonaje.classList.add("ocultar")
    tarjetaUbicaciones .classList.add("ocultar")
    seccionPaginado.style.display="none"
   }
}

/**** Fetch que filtra por personaje *****/
const obtenerPersonaje = (nombrePersonaje)=>{
    console.log(nombrePersonaje)
    fetch(`${baseUrl}character/?name=${nombrePersonaje}&status=${selectStatus.value}&gender=${selectGender.value}`)
    .then((res) => res.json())
    .then((data) => {
        console.log (data)
        mostrarPersonajeEnHTML(data.results) 

    })   
}
/**** Fetch que filtra por episodio *****/
const buscarEpisodio = (episodio)=>{
    fetch(`${baseUrl}episode?name=${episodio}`)
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data)
        mostrarEpisodioEnHTML(data.results)
    })
   
}

//// click a tarjeta personaje////
const detalleDePersonaje = ()=>{
    const cards = document.querySelectorAll(".card")
    for (let i = 0; i < cards.length; i++) {
        cards[i].onclick = ()=>{
            const idDelpersonaje = cards[i].dataset.id
            console.log("id personaje",idDelpersonaje)
            buscarPersonajePorID(idDelpersonaje)
        }
        
    }
}

const buscarPersonajePorID = (id) =>{
    console.log(id)
    fetch(`${baseUrl}character/${id}`)
    .then((res) => res.json())
    .then((data) => {
        console.log("data id",data)
        mostrarDetallePersonajeHTML(data) 
    })  
}

//muestra detalle de 1 solo personaje
const mostrarDetallePersonajeHTML = (data)=>{
    tarjetaPersonaje.innerHTML = 
    `<div class="card">
    <h3>Name: ${data.name}</h3>
    <img src="${data.image}"></img>
    <p>Gender: ${data.gender}</p>
    <p>Specie: ${data.species}</p>
    <p>Status: ${data.status}</p>
  </div>`
}

///click tarjeta episodio///
const detalleDeEpisodio = ()=>{
    const cardEpisodio = document.querySelectorAll(".card")
    for (let i = 0; i < cardEpisodio.length; i++) {
        cardEpisodio[i].onclick = ()=>{
            const idDelEpisodio = cardEpisodio[i].dataset.id
            console.log("id episodio",idDelEpisodio)
            buscarEpisodioPorID(idDelEpisodio)
        }    
    }
}

const buscarEpisodioPorID = (id) =>{
    console.log(id)
    fetch(`${baseUrl}episode/${id}`)
    .then((res) => res.json())
    .then((data) => {
        console.log("data id",data)
        mostrarDetalleEpisodioHTML(data) 
    })  
}
//muestra detalle de 1 solo episodio
const mostrarDetalleEpisodioHTML = (data)=>{
    tarjetaEpisodios.innerHTML = 
    `<div class="card">
    <h3>Name Episode: ${data.name}</h3>
    <p>Air Date: ${data.air_date}</p>
    <p>Episode: ${data.episode}</p>
    <p>Created: ${data.created}</p>
  </div>`
  
}

///click tarjeta ubicaciones///
const detalleUbicaciones = ()=>{
    const cardUbicacion = document.querySelectorAll(".card")
    for (let i = 0; i < cardUbicacion.length; i++) {
        cardUbicacion[i].onclick = ()=>{
            const idUbicacion = cardUbicacion[i].dataset.id
            console.log("id ubicacion",idUbicacion)
            buscarUbicacionPorId(idUbicacion)
        }  
        
    }
}

const buscarUbicacionPorId = (id)=>{
    fetch(`${baseUrl}location/${id}`)
    .then((res) => res.json())
    .then((data) => {
        console.log("data id ubicacion",data)
        mostrarDetalleUbicacionHTML(data) 
    })  
}
//muestra detalle de 1 sola ubicacion
const mostrarDetalleUbicacionHTML = (data)=>{
    tarjetaUbicaciones.innerHTML = 
    `<div class="card">
    <h3>Name Episode: ${data.name}</h3>
    <p>Type: ${data.type}</p>
    <p>Dimension: ${data.dimension}</p>
    <p>Created: ${data.created}</p>
  </div>` 
}
//ordenar A/Z
selectOrden.onchange = ()=>{
    todosLosPersonajes()
}

const ordenarAZ = (data,value) =>{
    if(value === "a/z"){
        const ordenadoAZ = data.sort((a,b)=>{
            if(a.name.toLowerCase() < b.name.toLowerCase()){
                return -1
            }
            if(a.name.toLowerCase() > b.name.toLowerCase()){
                return 1
            }
            return 0
        })
        mostrarOrdenado(ordenadoAZ)
    }
    if(value === "z/a"){
        const ordenadoZA = data.sort((a,b)=>{
            if(a.name.toLowerCase() > b.name.toLowerCase()){
                return -1
            }
            if(a.name.toLowerCase() < b.name.toLowerCase()){
                return 1
            }
            return 0
        })
       mostrarOrdenado(ordenadoZA)
    }
}

const mostrarOrdenado = (array)=>{
    const html = array.reduce((acc,curr)=>{
        return acc = acc + 
        `<div class="card" data-id=${curr.id}>
         <h3>Name: ${curr.name}</h3>
         <img src="${curr.image}"></img>
         <p>Gender: ${curr.gender}</p>
         <p>Specie: ${curr.species}</p>
       </div>`
    },"")
    tarjetaPersonaje.innerHTML = html
}


pageNext.onclick = ()=>{
    paginaActual = paginaActual + 1
    if (paginaActual === ultimaPagina) {
        iconoRight.style.color = "black"
        pageNext.disabled = true
    }else{
        iconoLeft.style.color ="#ebe8e8"
        pagePrev.disabled=false
    }
    
    todosLosPersonajes() 
}

pagePrev.onclick = () => {
    paginaActual = paginaActual -1 
    if (paginaActual === 1) {
        pagePrev.disabled = true
        iconoLeft.style.color = "black"
    }else{
        iconoRight.style.color = "#ebe8e8"
        pageNext.disabled=false
    }
    todosLosPersonajes()
}
//Paginado Episodios tiene 3 paginas

pageNextEpisodios.onclick = () => {
    paginaActual = paginaActual + 1
    console.log("pagina actual next", paginaActual)
    if (paginaActual === ultimaPagina) {
        pageNextEpisodios.disabled = true
        iconoRightEpisode.style.color = "black"
    }else{
        iconoLeftEpisode.style.color ="#ebe8e8"
        pagePrevEpisodios.disabled=false
    }
    todosLosEpisodios()
};

pagePrevEpisodios.onclick = ()=> {
    paginaActual = paginaActual -1 
    console.log("pagina actual prev", paginaActual)
    if (paginaActual === 1) {
        pagePrevEpisodios.disabled = true
        iconoLeftEpisode.style.color = "black"
    }else{
        iconoRightEpisode.style.color = "#ebe8e8"
        pageNextEpisodios.disabled = false
    }
    todosLosEpisodios()
}

