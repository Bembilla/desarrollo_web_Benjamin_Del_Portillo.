const detalleDiv = document.getElementById("detalle");
const fotosDiv = document.getElementById("fotos-container");
const aviso = JSON.parse(localStorage.getItem("avisoSeleccionado"));

if (!aviso) {
  detalleDiv.innerHTML = "<p>No se encontró información del aviso.</p>";
} else {
  detalleDiv.innerHTML = `
    <p><b>Fecha de Publicación:</b> ${aviso.fechaPublicacion}</p>
    <p><b>Fecha de Entrega:</b> ${aviso.fechaEntrega}</p>
    <p><b>Comuna:</b> ${aviso.comuna}</p>
    <p><b>Sector:</b> ${aviso.sector}</p>
    <p><b>Cantidad:</b> ${aviso.cantidad}</p>
    <p><b>Tipo:</b> ${aviso.tipo}</p>
    <p><b>Edad:</b> ${aviso.edad}</p>
    <p><b>Nombre de Contacto:</b> ${aviso.nombre}</p>
    <p><b>Total de Fotos:</b> ${aviso.fotos}</p>
  `;

  for (let i = 1; i <= aviso.fotos; i++) {
    let img = document.createElement("img");
    img.src = "";
    img.width = 320;
    img.height = 240;
    img.className = "foto";
    fotosDiv.appendChild(img);

    img.addEventListener("click", () => {
      const modal = document.getElementById("modal");
      const modalImg = document.getElementById("modal-img");
      modal.style.display = "block";
      modalImg.src = "";
    });
  }
}

document.getElementById("cerrar").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});