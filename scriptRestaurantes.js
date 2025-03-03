const SERVER_URL = "http://localhost:4000";
const CATEGORIES_URL = `${SERVER_URL}/categories`;
const RESTAURANTS_URL = `${SERVER_URL}/restaurants`;
const DISHES_URL = `${SERVER_URL}/dishes`;

let dishes, categories, restaurants;

const btn = document.querySelector("#btn");
btn.addEventListener("click", peticionAsyncAwait);

async function peticionAsyncAwait() {
  try {
    // Esto se deberua hacer asincrono:
    const response1 = await fetch(CATEGORIES_URL);
    const categories = await response1.json();
    const response2 = await fetch(DISHES_URL);
    const dishes = await response2.json();
    const response3 = await fetch(RESTAURANTS_URL);
    const restaurants = await response3.json();
    // Aqui deberia hacerse sincrono:
    mostrarPlatos(categories, dishes, restaurants);
  } catch (error) {
    console.log(error);
  }
}

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
