const API_URL = "http://localhost:3001/accounts";

let dishes, categories, restaurants;

const btn = document.querySelector("#btn");
btn.addEventListener("click", peticionAsyncAwait);

async function peticionAsyncAwait() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    mostrarDatos(data);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Proceso finalizado");
  }
}

function mostrarDatos(data) {
  console.log("Llamada mostrarDatos con data: ('Fake Server API')", data);
  const contenedor = document.querySelector("#datos");
  let html = `
    <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">Email</th>
      <th scope="col">Dirección</th>
      <th scope="col">Edad</th>
    </tr>
  </thead>
  <tbody>
  `;

  data.forEach(({ nombre, email, direccion, edad }) => {
    html += `
    <tr>
      <td>${nombre}</td>
      <td>${email}</td>
      <td>${direccion}</td>
      <td>${edad}</td>
    </tr>
        `;
  });
  html += `</tbody></table>`;
  contenedor.innerHTML = html;
}
