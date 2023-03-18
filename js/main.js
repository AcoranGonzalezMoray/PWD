
//Variables Globales !IMPORTANTE
var productos =[];
var baseProductos = [];

var asideOpen = 0;

var reservaServicioHora = [];
var reservaServicio     = [];
var reservadosServicioHora = [];

var imagesArray = [];

var carrito=[];


//Carrito
function actualizarCarritoGlobal(){
  var tmp_list = []
  carrito.forEach(producto =>{
    tmp_list.push(producto.outerHTML)
  })
  sessionStorage.setItem("carrito", JSON.stringify(tmp_list));
}
function añadirProductoAlCarritoSilent(producto) {
  // Anyadimos el Nodo a nuestro carrito
  carrito.push(producto)
}
function añadirProductoAlCarrito(producto) {
  if(sessionStorage.getItem('EMAIL')){
    // Anyadimos el Nodo a nuestro carrito
    carrito.push(producto)
    // Actualizamos el carrito
    renderizarCarrito();
  }else{
    window.location.href = "/PWM-TEMPLATES/pages/signIn.html";
  }
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
  console.log(carrito.length+"RENDER")
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
        console.log("AGREGA")
      })
  });
  totalCarrito();
  actualizarCarritoGlobal()

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
function logout() {
  sessionStorage.clear();
  window.location.href = '/PWM-TEMPLATES/index.html'
}
function loggin(){
  var email= document.getElementById("email").value;
  var con= document.getElementById("contrasena").value;
  var rol=false;
  var conn = false
  fetch('/PWM-TEMPLATES/json/archivo2.json')
    .then(response => response.json())
    .then(data => {
      productos = data['Usuarios'];
      //"Email": "usuario1@example.com",
      // "Password": "contraseña1"
      // Recorrer el arreglo de productos
      productos.forEach(producto => {
        if(email.localeCompare('admin1@example.com')==0){
          rol=true;
          conn=true
        }
        if(producto.Email.localeCompare(email)==0){
          /*Guardando los datos en el LocalStorage*/
          conn=true
          sessionStorage.setItem("EMAIL", email);
          sessionStorage.setItem("PS", con);

        }
      });
      if(conn){
        if (rol){
          window.location.href = "/PWM-TEMPLATES/pages/dashboard/dashboardAdmin.html";
        } else {
          window.location.href = "/PWM-TEMPLATES/index.html";
        }
      }else{
        window.location.href = "/PWM-TEMPLATES/pages/signIn.html";
      }
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));

}


// Agregar un evento click al objeto document
document.addEventListener("click", function(event) {
  // Verificar si el clic se realizó fuera del elemento
  var aside = document.querySelector('aside');
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
function header(){
  if(sessionStorage.getItem("EMAIL")){
    $.ajax({
      type: "GET",
      url: "/PWM-TEMPLATES/component/headerLog.html",
      success: function (result) {
        document.querySelector('#header').innerHTML = result;
      },
    });
    //$(function (){$('#header').load("/PWM-TEMPLATES/component/headerLog.html")});
  }else{
    $.ajax({
      type: "GET",
      url: "/PWM-TEMPLATES/component/header.html",
      success: function (result) {
        document.querySelector('#header').innerHTML = result;
      },
    });
    //$(function (){$('#header').load("/PWM-TEMPLATES/component/header.html")});
  }
}
function loadComponenHome() {
  header()
  fetch('/PWM-TEMPLATES/component/footer.html')
    .then(response => response.text())
    .then(data => {
      document.querySelector('#footer').innerHTML = data;
    });
  fetch('/PWM-TEMPLATES/component/social.html')
    .then(response => response.text())
    .then(data => {
      document.querySelector('#social').innerHTML = data;
    });
}
function loadComponenOther() {
  header()
  fetch('/PWM-TEMPLATES/component/footer.html')
    .then(response => response.text())
    .then(data => {
      document.querySelector('#footer').innerHTML = data;
    });
  fetch('/PWM-TEMPLATES/component/social.html')
    .then(response => response.text())
    .then(data => {
      document.querySelector('#social').innerHTML = data;
    });
}
function loadComponenEsc() {
  header()
  fetch('/PWM-TEMPLATES/component/footer.html')
    .then(response => response.text())
    .then(data => {
      document.querySelector('#footer').innerHTML = data;
    });
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
  if(sessionStorage.getItem('EMAIL')){
    document.getElementById('reservaFecha').placeholder = reservaServicioHora[1]
    document.getElementById('reservaServicio').placeholder = reservaServicio[1]
  }else{
    window.location.href = "/PWM-TEMPLATES/pages/signIn.html";
  }
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

function loadReserveBox() {

  var fecha = new Date('2023-03-13');
  var opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };

  var carousel = document.getElementById('carouselExample')
  var carouselInner = carousel.querySelector('.carousel-inner')
  var carouselItem = carouselInner.querySelector('.carousel-item')

  var reserveBox;
  var daysOfWeek;
  var arrayDaysOfWeek;

  fetch("/PWM-TEMPLATES/component/reserveBox.html")
    .then(response => response.text())
    .then(data1 => {
      reserveBox = new DOMParser().parseFromString(data1, "text/html").querySelector('.reserve-box');
      return fetch("/PWM-TEMPLATES/component/reserveBoxItem.html");
    })
    .then(response => response.text())
    .then(data2 => {

      var reserveBoxItem = new DOMParser().parseFromString(data2, "text/html").querySelector('.reserve-box-item')

      for (var j = 0; j < 3; j++) {
        daysOfWeek = reserveBox.querySelectorAll('.dayOfWeek')
        arrayDaysOfWeek = Array.from(daysOfWeek);

        arrayDaysOfWeek.forEach(function(day) {

          day.querySelector('.date').textContent = fecha.toLocaleDateString('es-ES', opciones);

          var hora = new Date();
          hora.setHours(8);
          hora.setMinutes(0);

          for (var i = 0; i < 20; i++) {
            reserveBoxItem.querySelector('.hour').textContent = hora.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            });
            day.appendChild(reserveBoxItem);
            reserveBoxItem = reserveBoxItem.cloneNode(true)
            hora.setMinutes(hora.getMinutes() + 30);
          }

          fecha.setDate(fecha.getDate() + 1)
        })
        carouselItem.appendChild(reserveBox)
        carouselInner.appendChild(carouselItem)
        carouselItem = carouselItem.cloneNode(false);
        carouselItem.classList.remove('active')
        reserveBox = reserveBox.cloneNode(true);
        fecha.setDate(fecha.getDate() + 2)
      }

      return fetch('/PWM-TEMPLATES/json/archivo2.json')
    })
    .then(response => response.json())
    .then(data3 => {
      const reservas = data3['Reservas Taller'];
      reservas.forEach(reserva => {

        daysOfWeek = document.querySelectorAll('.dayOfWeek')
        arrayDaysOfWeek = Array.from(daysOfWeek)

        arrayDaysOfWeek.forEach(function(day) {
          var reserveItems = day.querySelectorAll('.reserve-box-item')
          var arrayReserveItems = Array.from(reserveItems);

          arrayReserveItems.forEach(function (reserveItem) {
            if (reserveItem.querySelector('.hour').textContent === reserva.Hora &&
              day.querySelector('.date').textContent === reserva.Fecha) {
              reserveItem.style.backgroundColor = 'red';
            }
          })
        })
      });
      loadReserveBoxListeners()
    });
}

function loadReserveBoxListeners() {

  const daysOfWeek = document.querySelectorAll('.dayOfWeek')
  const arrayDaysOfWeek = Array.from(daysOfWeek);

  arrayDaysOfWeek.forEach(function(day) {
    const reserveBoxItems = day.querySelectorAll('.reserve-box-item')
    const reserveBoxItemsArray = Array.from(reserveBoxItems)
    reserveBoxItemsArray.forEach(function (reserveBoxItem) {
      reserveBoxItem.querySelector('.hour').addEventListener("click", function () {
        seleccionarHora(reserveBoxItem, day);
      });
    })
  });
}
//Pantalla de Carga
$( document ).ajaxStop(function() {

  //console.log($.parseHTML( sessionStorage.getItem("carrito") )[2])
  if(sessionStorage.getItem("carrito")){
    var tmp = sessionStorage.getItem("carrito")
    tmp = JSON.parse(tmp)
    tmp.forEach(producto => {
      console.log("a")
      añadirProductoAlCarritoSilent($.parseHTML(producto)[0])
    })
    renderizarCarrito()
  }

  setTimeout(() => {
    $('#loading').hide()
  }, 700);
  ;
});




