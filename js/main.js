
//Variables Globales !IMPORTANTE
var productos =[];
var baseProductos = [];

var aside = document.getElementById("aside");
var asideOpen = 0;

var reservaServicioHora = [];
var reservaServicio     = [];
var reservadosServicioHora = [];

var imagesArray = [];

var carrito=[];


//Carrito
function añadirProductoAlCarrito(producto) {
  // Anyadimos el Nodo a nuestro carrito
  carrito.push(producto)
  // Actualizamos el carrito
  renderizarCarrito();

}
function eliminarProductoAlCarrito(producto) {
  // Anyadimos el Nodo a nuestro carrito
  carrito.splice(carrito.indexOf(producto),1)
  // Actualizamos el carrito
  renderizarCarrito();

}
function vaciarCarrito() {
  // Actualizamos el carrito
  carrito=[]
  renderizarCarrito ()
}
function renderizarCarrito (){
  var contenedorCarrito = document.getElementById('modal-carrito')
  while(contenedorCarrito.hasChildNodes()){
    contenedorCarrito.removeChild(contenedorCarrito .firstChild);
  }
  document.getElementById('numberProducts').textContent = carrito.length
  // Recorrer el arreglo de productos
  carrito.forEach(producto => {
    fetch("/PWM-TEMPLATES/component/productoCarrito.html")
      .then(response => response.text())
      .then(data => {
        var template = new DOMParser().parseFromString(data, "text/html").querySelector('.card')
        template = template.cloneNode(true);
        template.querySelector('.card-title').textContent = producto.querySelector('.card-text').textContent
        template.querySelector('.card-text').textContent = producto.querySelector('.card-title').textContent
        template.querySelector('.img-product-cart').style.backgroundImage = producto.querySelector('.img-product').style.backgroundImage
        template.querySelector('.add-buttons').addEventListener('click',function (){añadirProductoAlCarrito(producto)});
        template.querySelector('.quite-buttons').addEventListener('click',function (){eliminarProductoAlCarrito(producto)});
        contenedorCarrito.appendChild(template)
      })
  });
  totalCarrito();

}
function abrirCarrito(){
  document.querySelector(".fade:not(.show)").style = "display:block;opacity:1;z-index:100;display:flex;align-items:center"
  document.querySelector(".dark").style = "display:block"
}
function cerrarCarrito(){
  document.querySelector(".fade:not(.show)").style = "display:none;opacity:0"
  document.querySelector(".dark").style = "display:none"
}
function totalCarrito(){
  var total=0;
  carrito.forEach(producto =>{
    total += parseFloat((producto.querySelector('.card-title').textContent).split('€')[0].replace(',','.'))
  })
  document.querySelector('#mount-cart').textContent = total.toFixed(2);


}
// Sesiones
function loggin(){
  carrito=[]
  var email= document.getElementById("email").value;
  var con= document.getElementById("contrasena").value;
  console.log("i")
  fetch('/PWM-TEMPLATES/json/archivo2.json')
    .then(response => response.json())
    .then(data => {
      productos = data['Usuarios'];
      //"Email": "usuario1@example.com",
      // "Password": "contraseña1"
      // Recorrer el arreglo de productos
      productos.forEach(producto => {
        if(producto.Email.localeCompare(email)==0){
          /*Guardando los datos en el LocalStorage*/
          sessionStorage.setItem("EMAIL", email);
          sessionStorage.setItem("PS", con);
        }
      });
      window.location.href = "/PWM-TEMPLATES/index.html";
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));

}


// Agregar un evento click al objeto document
document.addEventListener("click", function(event) {
  // Verificar si el clic se realizó fuera del elemento
  if (!aside.contains(event.target) && asideOpen === 1) {
    // Si el clic se realizó fuera del elemento, ocultarlo
    aside.style.display = "none";
    asideOpen = 0;
  }
});


//Funciones Tienda !IMPORTANTE
function loadProducts(Catalogo) {
  fetch('/PWM-TEMPLATES/json/archivo2.json')
    .then(response => response.json())
    .then(data => {
      limpiarTienda()
      productos = data[Catalogo]['Productos'];
      baseProductos = data[Catalogo]['Productos'];
      const contenedorProductos = document.getElementById('contenedor-productos');

      // Recorrer el arreglo de productos
      productos.forEach(producto => {
        fetch("/PWM-TEMPLATES/component/product.html")
          .then(response => response.text())
          .then(data => {
            var template = new DOMParser().parseFromString(data, "text/html").querySelector('.product')
            template = template.cloneNode(true);
            template.querySelector('.card-text').textContent = producto['NombreCorto'];
            template.querySelector('.card-title').textContent = producto['PVP'];
            template.querySelector('.img-product').style.backgroundImage = "url('" + producto['IMAGEN'] + "')";
            template.querySelector('.btn-color').addEventListener("click", function(){añadirProductoAlCarrito(template)});
            contenedorProductos.appendChild(template);
          })
      });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
}
function agregarProductos () {
  const contenedorProductos = document.getElementById('contenedor-productos');
  productos.forEach(producto => {
    fetch("/PWM-TEMPLATES/component/product.html")
      .then(response => response.text())
      .then(data => {
        var template = new DOMParser().parseFromString(data, "text/html").querySelector('.product')
        template = template.cloneNode(true);
        template.querySelector('.card-text').textContent = producto['NombreCorto'];
        template.querySelector('.card-title').textContent = producto['PVP'];
        template.querySelector('.img-product').style.backgroundImage = "url('" + producto['IMAGEN'] + "')";
        template.querySelector('.btn-color').addEventListener("click", function(){añadirProductoAlCarrito(template)});
        contenedorProductos.appendChild(template);
      })
  });
}
function limpiarTienda() {
  var show = document.getElementById('contenedor-productos');
  while(show.hasChildNodes()){
    show.removeChild(show.firstChild);
  }
}
function ordenar(i) {
  //ordenar por precio + a -
  if(i == 4){
    productos = productos.sort((a, b) => {if (a.PVP.split("€")[0] > b.PVP.split("€")[0]) {return -1;}});
  }
  //ordenar por precio - a +
  if(i == 3){
    productos = productos.sort((a, b) => {if (a.PVP.split("€")[0] < b.PVP.split("€")[0]) {return -1;}});
  }
  //ordenar por precio A-Z
  if(i == 2){
    productos = productos.sort((a, b) => {if (a.NombreCorto.replace(/ /g, "")> b.NombreCorto.replace(/ /g, "")) {return -1;}});
  }
  //ordenar por precio A-Z
  if(i == 1){
    productos = productos.sort((a, b) => {if (a.NombreCorto.replace(/ /g, "")< b.NombreCorto.replace(/ /g, "")) {return -1;}});
  }
  limpiarTienda();
  agregarProductos();
}
function filtrar(i, modo) {
  if(modo){
    productos = baseProductos.filter(x => {return removeAccents(x.CATEGORIA).toLowerCase().toString() === removeAccents(i).toLowerCase().toString();})
  }else{
    productos = baseProductos.filter(x => {return removeAccents(x.FAMILIA).toLowerCase().toString() === removeAccents(i).toLowerCase().toString();})
  }
  limpiarTienda();
  agregarProductos();
}
function buscar() {
  let query = document.getElementById("query").value;
  productos = baseProductos.filter(x => {
    return removeAccents(x.NombreCorto).toLowerCase().toString().includes(removeAccents(query).toLowerCase().toString());
  })

  limpiarTienda();
  agregarProductos();
}
function loadCategory(Catalogo){
  fetch('/PWM-TEMPLATES/json/archivo2.json')
    .then(response => response.json())
    .then(data => {
      var categorias = data[Catalogo]['Categorias'];
      categorias.sort((a,b)=>{if(a.Categoria < b.Categoria ){return -1;}})
      const contenedorCategoria = document.getElementById('aside');

      categorias.forEach(producto => {

        fetch("/PWM-TEMPLATES/component/aside.html")
          .then(response => response.text())
          .then(data => {
            //Categoria
            var template = new DOMParser().parseFromString(data, "text/html").querySelector('.category')
            template = template.cloneNode(true)
            template.querySelector('.nameC').textContent = producto['Categoria'];
            template.querySelector('.nameC').href = "#";
            template.querySelector('.nameC').addEventListener("click", function(){filtrar(producto['Categoria'], false);});


            //Subcategoria
            const productosS = producto['Subcategorias'];
            const categoryContent = document.createElement('div');
            categoryContent.className += "category-content";
            var click = "prueba(id);"
            productosS.forEach(p => {
              templateSubcategoria = document.createElement('a');
              templateSubcategoria.textContent = p.Subcategoria;
              templateSubcategoria.id= p.Subcategoria;
              templateSubcategoria.style="color:white;"
              templateSubcategoria.href="#";
              templateSubcategoria.addEventListener("click", function(){filtrar(p.Subcategoria, true);});
              categoryContent.appendChild(templateSubcategoria);
            })
            template.appendChild(categoryContent);
            contenedorCategoria.appendChild(template);

          })
      });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));

}

//Utilidades Carga Dinamica de Componentes, Herramientas Tratamiento String
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function loadComponenHome() {
  console.log(sessionStorage.getItem("email"))
  if(sessionStorage.getItem("EMAIL")){
    $(function (){$('#header').load("/PWM-TEMPLATES/component/headerLog.html")});
  }else{
    $(function (){$('#header').load("/PWM-TEMPLATES/component/header.html")});
  }
  $(function (){$('#footer').load("/PWM-TEMPLATES/component/footer.html")});

  $(function (){$('#social').load("/PWM-TEMPLATES/component/social.html")});
}
function loadComponenOther() {
  $(function (){$('#footer').load("/PWM-TEMPLATES/component/footer.html")});
  if(sessionStorage.getItem("EMAIL")){
    $(function (){$('#header').load("/PWM-TEMPLATES/component/headerLog.html")});
  }else{
    $(function (){$('#header').load("/PWM-TEMPLATES/component/header.html")});
  }
  $(function (){$('#social').load("/PWM-TEMPLATES/component/social.html")});
}
function loadComponenEsc() {
  $(function (){$('#footer').load("/PWM-TEMPLATES/component/footer.html")});
  if(sessionStorage.getItem("EMAIL")){
    $(function (){$('#header').load("/PWM-TEMPLATES/component/headerLog.html")});
  }else{
    $(function (){$('#header').load("/PWM-TEMPLATES/component/header.html")});
  }
}

function showCategoryMov(i){
  if(i==1) document.getElementById("aside").style="display:block;"
  else  document.getElementById("aside").style="display:none;"
  setTimeout(function() {
    asideOpen = i;
  }, 500);
}

function showServicesMov(i){
  if(i==1) document.getElementById("serviciosTaller").style="display:block;"
  else  document.getElementById("serviciosTaller").style="display:none;"
  setTimeout(function() {
    asideOpen = i;
  }, 500);
}

//Funciones Reservas Servicios
function reservarServicio(){
  document.getElementById('reservaFecha').placeholder = reservaServicioHora[1]
  document.getElementById('reservaServicio').placeholder = reservaServicio[1]
}
function seleccionarHora(i,x) {
  i.querySelector('.hour').parentElement.style="background-color:green;"
  i.querySelector('.hour').style="color:white;background-color:green;"
  let h = i.querySelector('.hour').textContent
  let d = x.querySelector('.date').textContent
  if(reservaServicioHora.length==0){
    reservaServicioHora[0] = i;
    reservaServicioHora[1] = h+" "+d;
  }else{
    //var Verificacion = true
    //for (i = 0; i < reservadosServicioHora.length; i++) {
      //if(reservadosServicioHora[i][0].localeCompare(h)==0 &&
       // reservadosServicioHora[i][1].localeCompare(d)==0) Verificacion = false;
    //}
    reservaServicioHora[0].querySelector('.hour').parentElement.style="background-color:white;"
    reservaServicioHora[0].querySelector('.hour').style="color:black;background-color:white"
    reservaServicioHora[0] = i;
    reservaServicioHora[1] = h+" "+d;

  }

}
function seleccionarServicio(i) {

  if(i.querySelector('.form-check-input[type=checkbox]').checked &&
  reservaServicio.length == 0) {
    reservaServicio[0] = i
    reservaServicio[1] = i.querySelector('.nameS').placeholder
  }else{
    reservaServicio[0].querySelector('.form-check-input[type=checkbox]').checked = false;
    reservaServicio[0] = i
    reservaServicio[1] = i.querySelector('.nameS').placeholder
  }

}
function loadServices() {
  fetch('/PWM-TEMPLATES/json/archivo2.json')
    .then(response => response.json())
    .then(data => {
      var serviciosTaller = data['ServiciosTaller'];
      serviciosTaller.sort((a, b) => {
        if (a.Descripcion < b.Descripcion) {
          return -1;
        }
      })
      const contenedorServicios = document.getElementById('serviciosTaller');

      serviciosTaller.forEach(producto => {

        fetch("/PWM-TEMPLATES/component/asideCheckBox.html")
          .then(response => response.text())
          .then(data => {
            //Categoria
            var template = new DOMParser().parseFromString(data, "text/html").querySelector('.category')
            template = template.cloneNode(true)
            template.querySelector('.nameS').placeholder = producto['Descripcion'];
            template.querySelector('.form-check-input[type=checkbox]').addEventListener("click", function(){seleccionarServicio(template);});
            contenedorServicios.appendChild(template);
          })
      });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
}
function loadReserveHours() {

  var fecha = new Date('2023-03-13');
  var opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };

  var daysOfWeek = document.querySelectorAll('.dayOfWeek')
  var arrayDaysOfWeek = Array.from(daysOfWeek);
  x=0;
// Ahora podemos trabajar con el array de elementos
  arrayDaysOfWeek.forEach(function(day) {

    day.querySelector('.date').textContent = fecha.toLocaleDateString('es-ES', opciones);

    var hora = new Date();
    hora.setHours(8);
    hora.setMinutes(0);

    for (var i = 0; i < 20; i++) {
      fetch("/PWM-TEMPLATES/component/reserveBoxItem.html")
        .then(response => response.text())
        .then(data => {
          var template = new DOMParser().parseFromString(data, "text/html").querySelector('.reserve-box-item')
          template = template.cloneNode(true);
          template.querySelector('.hour').textContent = hora.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
          template.querySelector('.hour').addEventListener("click", function(){seleccionarHora(template,day, daysOfWeek);});
          day.appendChild(template);
          hora.setMinutes(hora.getMinutes() + 30);
        })
    }
    x++;
    if(x%5==0)fecha.setDate(fecha.getDate() + 3);
    else fecha.setDate(fecha.getDate() + 1);
  });
  comprobarReservasOcupadas();
}
function comprobarReservasOcupadas(){
  setTimeout(function() {
    fetch('/PWM-TEMPLATES/json/archivo2.json')
      .then(response => response.json())
      .then(data => {
        const reservas = data['Reservas Taller'];
        reservas.forEach(reserva => {
          var daysOfWeek = document.querySelectorAll('.dayOfWeek')
          var arrayDaysOfWeek = Array.from(daysOfWeek);

          arrayDaysOfWeek.forEach(function(day) {
            var reserveItems = day.querySelectorAll('.reserve-box-item')
            var arrayReserveItems = Array.from(reserveItems);

            arrayReserveItems.forEach(function (reserveItem) {
              console.log(reserveItem.querySelector('.hour').textContent)
              console.log(day.querySelector('.date').textContent)
              if (reserveItem.querySelector('.hour').textContent === reserva.Hora &&
                day.querySelector('.date').textContent === reserva.Fecha) {
                //reservadosServicioHora.push([reserva.Hora,reserva.Fecha])
                reserveItem.style.backgroundColor = 'red';
              }
            })
          })
        });
      });
  }, 2000);
}


//No Usado
function validarFormulario() {
  // Obtener los valores de los campos del formulario
  var nombreCompleto = document.getElementById("nombreCompleto").value;
  var correoElectronico = document.getElementById("correoElectronico").value;
  var contrasena = document.getElementById("contrasena").value;
  var repetirContrasena = document.getElementById("repetirContrasena").value;


  // Validar que se haya ingresado la misma contraseña en ambos campos
  if (contrasena !== repetirContrasena) {
    alert("Las contraseñas no coinciden.");
    return false;
  }

  // Si todos los campos son válidos, crear un objeto con los datos del usuario
  var usuario = {
    "Username": nombreCompleto,
    "Email": correoElectronico,
    "Password": contrasena
  };

// Convertir el objeto a formato JSON
  var usuarioJSON = JSON.stringify(usuario);

  fetch('/PWM-TEMPLATES/json/archivo2.json')
    .then(response => response.json())
    .then(data => {
      data['Usuarios'].push(usuarioJSON);

      // Enviar la solicitud de actualización al servidor
      fetch('/PWM-TEMPLATES/json/archivo2.json', {
        method: 'PUT', // Usar el método HTTP PUT para actualizar el archivo
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Enviar el objeto JSON actualizado al servidor
      })
        .then(response => {
          if (response.ok) {
            console.log('Archivo JSON actualizado correctamente');
          } else {
            throw new Error('Error al actualizar el archivo JSON');
          }
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));

  // Mostrar un mensaje de éxito
  alert("¡Registro exitoso!");

  // Redirigir al usuario a la página de inicio de sesión
  window.location.href = "/PWM-TEMPLATES/pages/signIn.html";

  // Evitar que se envíe el formulario
  return false;
}

function loadPresentation() {
  fetch('/PWM-TEMPLATES/json/archivo2.json')
    .then(response => response.json())
    .then(data => {
      const presentacion = data['Presentacion'];
      document.querySelector(".p-justify").innerHTML = presentacion;
    });
}

function loadWhatWeDo() {
  fetch('/PWM-TEMPLATES/json/archivo2.json')
    .then(response => response.json())
    .then(data => {
      const presentacion = data['QueHacemos'];
      document.querySelector(".p-justify").innerHTML = presentacion;
    });
}
function loadCarouselImages() {

  var carousel;

  fetch('/PWM-TEMPLATES/json/archivo2.json')
    .then(response => response.json())
    .then(data1 => {
      data1['ImagenesCarouselHome'].forEach((image) => {
        imagesArray.push(image['ruta']);
      });
      return fetch('/PWM-TEMPLATES/component/carousel.html')
    })
    .then(response => response.text())
    .then(data2 => {
      carousel = new DOMParser().parseFromString(data2, "text/html").querySelector('.carousel-home');
      var carouselInner = carousel.querySelector('.carousel-inner')
      var carouselItem = carouselInner.querySelector('.carousel-item');
      var indicators = carousel.querySelector('.carousel-indicators');

      imagesArray.forEach((image, index) => {

        var button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('data-bs-target', '#carouselExampleIndicators');
        button.setAttribute('data-bs-slide-to', index);
        button.setAttribute('aria-label', 'Slide ' + (index + 1));

        if (index === 0) {
          carouselItem.style.backgroundImage = 'url(' + image + ')';
          carouselItem.querySelector('.carouselBackground').style.backgroundImage = 'url(' + image + ')';
          button.classList.add('active');
          button.setAttribute('aria-current', 'true');
        } else {
          carouselItem = carouselItem.cloneNode(true);
          carouselItem.classList.remove('active')
          carouselItem.style.backgroundImage = 'url(' + image + ')';
          carouselItem.querySelector('.carouselBackground').style.backgroundImage = 'url(' + image + ')';
        }
        carouselInner.appendChild(carouselItem)
        indicators.appendChild(button);
      })
      document.getElementById('carousel').appendChild(carousel);
    })
    .catch(error => console.error(error));
}
//Pantalla de Carga
$( document ).ajaxStop(function() {
  setTimeout(() => {
    $('#loading').hide()
  }, 700);
  ;
});


