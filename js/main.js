fetch('/PWM-TEMPLATES/component/product.html')
  .then(response => response.text())
  .then(data => {
    const htmlContent = data;
    const miContenedor = document.getElementById("contenedor-productos");
    for (let i = 0; i < 16; i++) {
      miContenedor.innerHTML += htmlContent;
    }
    console.log(htmlContent);
  });


