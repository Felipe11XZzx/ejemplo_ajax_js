const SERVER_URL = "http://localhost:4000";
const CATEGORIES_URL = `${SERVER_URL}/categories`;
const RESTAURANTS_URL = `${SERVER_URL}/restaurants`;
const DISHES_URL = `${SERVER_URL}/dishes`;

let dishes, categories, restaurants;

const btn = document.querySelector("#btn");
btn.addEventListener("click", peticionAsyncAwait);

async function peticionAsyncAwait() {
  try {
    // Ejecutar todas las peticiones en paralelo ("En modo Asíncrono").
    const [response1, response2, response3] = await Promise.all([
      fetch(CATEGORIES_URL),
      fetch(DISHES_URL),
      fetch(RESTAURANTS_URL),
    ]);

    // Convertir las respuestas a JSON de forma Asincrona ("En modo Asíncrono").
    const [categories, dishes, restaurants] = await Promise.all([
      response1.json(),
      response2.json(),
      response3.json(),
    ]);

    // Función que se ejecuta de forma sincrona para visualizar los platos.
    mostrarPlatos(categories, dishes, restaurants);

    // Codigo anterior donde se implementa el uso de "fetch" de forma secuencial .
    /*
    const respose = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await respose.json();
    mostrarDatos(users);*/
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Proceso finalizado correctamente");
  }
}

function mostrarPlatos(categories, dishes, restaurants) {
  dishes.forEach((dish) => {
    dish.categoria = categories.find(
      ({ categoriaID: id }) => id === dish.categoriaID
    ).categoria;
    dish.restaurante = restaurants.find(
      ({ restauranteID: id }) => id === dish.restauranteID
    ).restaurante;
  });
  const contenedor = document.querySelector("#datos");
  let html = "";
  dishes.forEach(({ plato, descripcion, precio, categoria, restaurante }) => {
    html += `
        <h3>${plato}</h3>
        <p>Descripción: ${descripcion || "-"}</p>
        <p>Precio: ${precio} <br/> Categoria: ${categoria} <br/> Restaurante: ${restaurante}</p>
        <hr>
      `;
  });
  contenedor.innerHTML = html;
}

// Codigo anterior donde se implementa el uso de "fetch" de forma secuencial .
/*
fetch(DISHES_URL)
  .then((response) => {
    return response.json(); // no olvidar el return si hay llaves en la función
  })
  .then((data) => {
    dishes = data;
    fetch(CATEGORIES_URL)
      .then((response) => {
        return response.json(); // no olvidar el return si hay llaves en la función
      })
      .then((data) => {
        categories = data;

        fetch(RESTAURANTS_URL)
          .then((response) => {
            return response.json(); // no olvidar el return si hay llaves en la función
          })
          .then((dishes) => {
            mostrarPlatos(dishes);
            // restaurants = data;
            // ya he recibido todo, voy a "juntar los datos"
            //console.log(dishes, categories, restaurants);
          });
      });
  });
  */
