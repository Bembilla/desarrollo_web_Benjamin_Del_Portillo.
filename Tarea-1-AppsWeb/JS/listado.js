document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("table");
  const headers = table.querySelectorAll("th");
  let direccionDeSorteo = 1;
  let columnaSorteada = null;

  headers.forEach((header, index) => {
    header.style.cursor = "pointer";
    header.addEventListener("click", () => {
      const tbody = table.querySelector("tbody");
      const rows = Array.from(tbody.querySelectorAll("tr"));
      const tipo = header.dataset.tipo || "string";

      if (columnaSorteada === index) {
        direccionDeSorteo *= -1;
      } else {
        direccionDeSorteo = 1;
      }
      columnaSorteada = index;

      const sortedRows = rows.sort((a, b) => {
        let aText = a.children[index].innerText.trim();
        let bText = b.children[index].innerText.trim();

        if (tipo === "number") return direccionDeSorteo * (Number(aText) - Number(bText));
        if (tipo === "date") return direccionDeSorteo * (new Date(aText) - new Date(bText));
        return direccionDeSorteo * aText.localeCompare(bText, "es");
      });

      tbody.innerHTML = "";
      sortedRows.forEach(row => tbody.appendChild(row));

      headers.forEach(h => h.classList.remove("sorted-asc", "sorted-desc"));
      header.classList.add(direccionDeSorteo === 1 ? "sorted-asc" : "sorted-desc");
    });
  });

  const rows = table.querySelectorAll("tbody tr");
  rows.forEach(row => {
    row.addEventListener("click", () => {
      const datos = Array.from(row.children).map(td => td.innerText);

      const aviso = {
        fechaPublicacion: datos[0],
        fechaEntrega: datos[1],
        comuna: datos[2],
        sector: datos[3],
        cantidad: datos[4],
        tipo: datos[5],
        edad: datos[6],
        nombre: datos[7],
        fotos: Number(datos[8])
      };

      localStorage.setItem("avisoSeleccionado", JSON.stringify(aviso));

      window.location.href = "informacion_adicional.html";
    });
  });
});