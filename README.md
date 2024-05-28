# feachApi
FakeStore Shopping Cart
Este proyecto es una aplicación web simple que permite a los usuarios navegar por productos de una tienda falsa, ver detalles del producto, agregar productos al carrito de compras y ver el carrito de compras. Los datos de los productos se obtienen de la API de FakeStore.

Funcionalidades
Navegar Categorías: Los usuarios pueden ver diferentes categorías de productos.
Ver Productos: Los usuarios pueden ver los productos de una categoría seleccionada.
Ver Detalles del Producto: Los usuarios pueden ver detalles específicos de un producto.
Agregar al Carrito: Los usuarios pueden agregar productos al carrito de compras.
Eliminar del Carrito: Los usuarios pueden eliminar productos del carrito de compras.
Persistencia del Carrito: El carrito de compras se guarda en localStorage para persistir entre recargas de página.
Tecnologías Utilizadas
HTML
CSS (Bootstrap)
JavaScript
FakeStore API
Instalación
Clona este repositorio en tu máquina local.

bash
Copiar código
git clone https://github.com/tu-usuario/fakestore-shopping-cart.git
cd fakestore-shopping-cart
Abre index.html en tu navegador.

Estructura del Proyecto
index.html: El archivo principal de HTML que contiene la estructura de la aplicación.
style.css: Estilos adicionales para la aplicación.
script.js: Contiene toda la lógica de JavaScript para la aplicación.
Uso
Navegar Categorías
Al cargar la página, se mostrarán las categorías de productos en un menú de navegación.
Haz clic en una categoría para ver los productos de esa categoría.
Ver Productos
Los productos de la categoría seleccionada se mostrarán en tarjetas con una imagen, título, precio y botones para ver detalles o agregar al carrito.
Ver Detalles del Producto
Haz clic en "Ver Detalles" en cualquier tarjeta de producto para ver más información sobre el producto.
En la vista de detalles del producto, puedes ajustar la cantidad y agregar el producto al carrito.
Agregar al Carrito
Haz clic en "Agregar al Carrito" en una tarjeta de producto o en la vista de detalles del producto.
El producto se añadirá al carrito de compras, y el icono del carrito mostrará el número de productos en el carrito.
Ver y Eliminar del Carrito
Haz clic en el icono del carrito para ver los productos en el carrito.
Cada producto en el carrito se mostrará con un botón "Eliminar" para quitar el producto del carrito.
