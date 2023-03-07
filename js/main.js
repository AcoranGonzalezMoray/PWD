
// Cargar el archivo JSON con fetch
fetch('/PWM-TEMPLATES/json/archivo.json')
  .then(response => response.json())
  .then(data => {
    const productos = data['Catalogo Tienda']['Productos'];
    const contenedorProductos = document.getElementById('contenedor-productos');
    const productTemplate = document.querySelector('.product');

    // Recorrer el arreglo de productos
    productos.forEach(producto => {
      // Clonar el contenido del componente product
      const productClone = productTemplate.cloneNode(true);
      // Reemplazar los valores del nombre corto y el PVP con los valores del producto actual
      productClone.querySelector('.card-text').textContent = producto['Nombre Corto'];
      productClone.querySelector('.card-title').textContent = producto['PVP'];
      productClone.querySelector('.card-img-top').setAttribute('src', producto['Imagen']);
      // Agregar el clon al contenedor de productos
      contenedorProductos.appendChild(productClone);
    });
  })
  .catch(error => console.error('Error al cargar el archivo JSON:', error));

fetch('/PWM-TEMPLATES/json/archivo.json')
  .then(response => response.json())
  .then(data => {
    const productos = data['Catalogo Taller']['Productos'];
    const contenedorProductos = document.getElementById('contenedor-productos-taller');
    const productTemplate = document.querySelector('.product');

    // Recorrer el arreglo de productos
    productos.forEach(producto => {
      // Clonar el contenido del componente product
      const productClone = productTemplate.cloneNode(true);
      // Reemplazar los valores del nombre corto y el PVP con los valores del producto actual
      productClone.querySelector('.card-text').textContent = producto['Nombre Corto'];
      productClone.querySelector('.card-title').textContent = producto['PVP'];
      productClone.querySelector('.card-img-top').setAttribute('src', producto['Imagen']);
      // Agregar el clon al contenedor de productos
      contenedorProductos.appendChild(productClone);
    });
  })
  .catch(error => console.error('Error al cargar el archivo JSON:', error));


