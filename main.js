// Función para agregar productos al carrito (actualizada)
function agregarAlCarrito(nombre, precio, imagen, descripcion) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Buscar si el producto ya existe en el carrito
  const productoExistente = carrito.find(p => p.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad += 1; // Incrementar cantidad si existe
  } else {
    // Agregar nuevo producto con todas las propiedades necesarias
    carrito.push({
      nombre,
      precio,
      imagen,
      descripcion,
      cantidad: 1 // Inicializar cantidad en 1
    });
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert('Producto agregado al carrito');
}


// Muestra todos los productos del carrito en forma de lista, con botones para cambiar cantidad
function mostrarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalCarrito = document.getElementById('total-carrito');
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  lista.innerHTML = '';
  let total = 0;

  carrito.forEach((producto, index) => {
    const li = document.createElement('li');

    li.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <div class="detalles">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p>Precio: $${producto.precio.toFixed(2)}</p>
        <div class="cantidad-controles">
          <button onclick="cambiarCantidad(${index}, -1)">➖</button>
          <span>${producto.cantidad}</span>
          <button onclick="cambiarCantidad(${index}, 1)">➕</button>
        </div>
        <p>Subtotal: $${(producto.precio * producto.cantidad).toFixed(2)}</p>
      </div>
      <div class="precio-cantidad">
        <button class="btn-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
      </div>
    `;

    total += producto.precio * producto.cantidad;
    lista.appendChild(li);
  });

  totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
}

// Elimina un producto del carrito
function eliminarProducto(indice) {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.splice(indice, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

// Cambia la cantidad del producto en el carrito (+1 o -1)
function cambiarCantidad(indice, cambio) {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const nuevaCantidad = carrito[indice].cantidad + cambio;

  // No permite cantidad menor a 1
  if (nuevaCantidad >= 1) {
    carrito[indice].cantidad = nuevaCantidad;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
  }
}

// Simula la confirmación de una compra
function confirmarCompra() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  if (carrito.length === 0) {
    alert('🛍️ Tu carrito está vacío.');
    return;
  }

  const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
  alert(`✅ ¡Gracias por tu compra!\nTotal pagado: $${total.toFixed(2)}`);

  localStorage.removeItem('carrito'); // Vacía el carrito
  mostrarCarrito();
}

// Lógica para cuando se carga la página del carrito
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('lista-carrito')) {
    mostrarCarrito();

    // Escucha el botón de confirmación
    document.getElementById('btn-confirmar').addEventListener('click', confirmarCompra);
  }
});



// Función que filtra productos en base al texto ingresado
function filtrarProductos() {
  const texto = document.getElementById('buscador').value.toLowerCase();

  // Seleccionamos todas las figuras de producto
  const productos = document.querySelectorAll('.producto');

  productos.forEach((producto) => {
    // Obtenemos el nombre del producto
    const nombre = producto.querySelector('h3').textContent.toLowerCase();

    // Mostramos o ocultamos según si coincide con el texto buscado
    if (nombre.includes(texto)) {
      producto.style.display = '';
    } else {
      producto.style.display = 'none';
    }
  });
}

