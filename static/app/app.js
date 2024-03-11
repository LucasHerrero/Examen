
var map;
var currentLocation = null;


// Inicialización del mapa
function initMap(){
    map = L.map('mapa').setView([36.719332, -4.423457], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
};

// Añade un punto al mapa y su correspondiente listener


// //Inicializar el mapa
initMap();
//marcadores
function addMarkers(data) {
    data.features.forEach((element) => {
        let coords = element.geometry.coordinates;
        let marker = L.marker([coords[1], coords[0]]).addTo(map);
       
        var popup = L.popup()
        .setContent("<h3>"+element.properties.DESCRIPCION+"</h3><p>"+element.properties.DIRECCION+"</p>");

        marker.bindPopup(popup).openPopup();
    });
}


//Carga de datos
fetch("static/app/datos.json")
.then((res) => res.json())
.then((data) => {
    console.log(data.features);
 
    return data; // Devuelve los datos para que puedan ser utilizados en la siguiente promesa
})
.then((data) => {
    //Otras fn
    addMarkers(data);
    insertToTable(data);
})
.catch((err) => {
    console.log("Error en el fetch");
    console.log(err);
});
// Controla el botón de la geolocalización
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( (pos) => {
            let marker = L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map);
            marker.bindPopup("Aqui estoy").openPopup();
            map.setView([pos.coords.latitude, pos.coords.longitude], 18);
            currentLocation = [pos.coords.latitude, pos.coords.longitude];
        });
    }

    var plantilla = document.querySelector("template").content;
    var tabla = document.getElementById("listaTaxis");
    function insertToTable(data){
        data.features.forEach((element) => {
            
            let nuevafila = plantilla.cloneNode(true);

            nuevafila.querySelector(".parada").textContent=element.properties.DESCRIPCION;
            nuevafila.querySelector(".direccion").textContent=element.properties.DIRECCION;
            tabla.appendChild(nuevafila);

           
        });
        
   
    }


    document.addEventListener("DOMContentLoaded", function() {
        var buttonDialogs = document.querySelectorAll("button.masInfo");
        console.log("hola");
        console.log(buttonDialogs);
        buttonDialogs.forEach(button => {
            button.addEventListener('click', (event) => {
                console.log("pres");
                var index = Array.prototype.indexOf.call(button.parentNode.children, button);
                showInfo(index);
            });
        });
    });
    
    let nuevafila2 = plantilla.cloneNode(true);

    
    nuevafila2.querySelector("button").addEventListener("click",(event)=>{
        let pos = event.target.dataset.pos;
        showInfo(pos);
    });


    function showInfo(pos){

        document.querySelector("dialog h3").textContent = listado[pos].DESCRIPCION;
        document.querySelector("dialog p").textContent = listado[pos].descripcion;
        
        document.querySelector("dialog").showModal();
    }