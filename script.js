/* const btn = document.querySelector("#btn");
btn.addEventListener("click", () => {
  alert("You clicked me!");
}); */

const btn = document.querySelector("#btn");
//btn.addEventListener("click", peticionConPromesas);
btn.addEventListener("click", peticionAsyncAwait);

// Obtenemos los usuarios de la API
fetch("https://jsonplaceholder.typicode.com/users")
  /* .then((response) => {
    console.log(response);
  }) */

  .then((response) => {
    return response.json();
  })

  .then((users) => {
    mostrarDatos(users);
  })

  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("Proceso finalizado");
  });

// Mostramos los datos en el HTML
function mostrarDatos(users) {
  const contenido = document.querySelector("#datos");
  let html = "";

  users.forEach(({ name, email, address }) => {
    html += `
    <h3>Nombre: ${name}</p>
    <p>Email: ${email}</p>
    <p>Dirección: ${address.city}</p>
    <hr>
    `;
  });
  contenido.innerHTML = html;
}

async function peticionAsyncAwait() {
  try {
    const respose = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await respose.json();
    mostrarDatos(users);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Proceso finalizado");
  }
}
