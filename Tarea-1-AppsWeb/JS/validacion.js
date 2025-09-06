const validarRegion = (region) => {
  if (!region) return false;
  return region.trim() !== "";
}

const validarComuna = (comuna) => {
  if (!comuna) return false;
  return comuna.trim() !== "";
}

const validarSector = (sector) => {
  if (!sector) return true;
  return sector.trim().length <= 100;
}

const validarNombre = (nombre) => {
  if (!nombre) return false;
  return nombre.trim().length >= 3 && nombre.trim().length <= 200;
}

const validarMail = (email) => {
  if (!email) return false;
  let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let formatValid = re.test(email);
  return email.length <= 100 && formatValid;
}

const validarTelefono = (telefono) => {
  if (!telefono) return true;
  let re = /^\+\d{1,3}\.\d{8,12}$/;
  let formatValid = re.test(telefono)
  return formatValid;
}

const validarContactoExtra = (seleccionados) => {
  if (seleccionados.length === 0) return true;
  for (let chk of seleccionados) {
    const extraField = document.getElementById(`extra-contacto-${chk.value}`);
    const val = extraField ? extraField.value.trim() : "";
    if (val.length < 4 || val.length > 50) {
      return false;
    }
  }
  return true;
};

const validarTipo = (tipo) => {
    if (!tipo) return false;
    return tipo.trim() !== "";
}

const validarCantidad = (cantidad) => {
  if (!cantidad) return false;
  return Number.isInteger(Number(cantidad)) && Number(cantidad) >= 1;
}

const validarEdad = (edad) => {
  if (!edad) return false;
  return Number.isInteger(Number(edad)) && Number(edad) >= 1;
}

const validarUnidadEdad = (unidad) => {
  if (!unidad) return false;
  return ["meses", "años"].includes(unidad);
}

const validarFecha = (fecha) => {
    if (!fecha) return false;
    
    const ahora = new Date();
    ahora.setHours(ahora.getHours() + 3);
    const fechaMinima = ahora.toISOString().slice(0, 16);
    
    return new Date(fecha) >= new Date(fechaMinima);
}

const validarFoto = (files) => {
  if (!files || files.length == 0) return false;
  if (files.length > 5) return false; 
  return true;
}

const validarForm = () => {
  let myForm = document.forms["myForm"];
  let fotoInputs = document.querySelectorAll('.foto-input');

  const region = myForm["seleccionar-region"].value;
  const comuna = myForm["seleccionar-comuna"].value;
  const sector = myForm["sector"].value;
  const nombre = myForm["nombre"].value;
  const email = myForm["email"].value;
  const telefono = myForm["celu"].value;
  const seleccionados = document.querySelectorAll('#contactar-por input[type="checkbox"]:checked');
  const tipo = myForm["tipo"].value;
  const cantidad = myForm["cantidad"].value;
  const edad = myForm["edad"].value;
  const unidadEdad = myForm["unidad-medida-edad"].value;
  const fecha = myForm["fechaDisponible"].value;
  const fotos = Array.from(fotoInputs).filter(input => input.files.length > 0).flatMap(input => Array.from(input.files));


  let invalidInputs = [];
  let isValid = true;

  const setInvalidInput = (inputName) => {
    invalidInputs.push(inputName);
    isValid &&= false;
  };

  if (!validarRegion(region)) setInvalidInput("Región");
  if (!validarComuna(comuna)) setInvalidInput("Comuna");
  if (!validarSector(sector)) setInvalidInput("Sector");
  if (!validarNombre(nombre)) setInvalidInput("Nombre");
  if (!validarMail(email)) setInvalidInput("Email");
  if (!validarTelefono(telefono)) setInvalidInput("Teléfono");
  if (!validarTipo(tipo)) setInvalidInput("Tipo de mascota");
  if (!validarCantidad(cantidad)) setInvalidInput("Cantidad");
  if (!validarEdad(edad)) setInvalidInput("Edad");
  if (!validarUnidadEdad(unidadEdad)) setInvalidInput("Unidad de medida de edad");
  if (!validarFecha(fecha)) setInvalidInput("Fecha disponible (mínimo 3 horas futuras)");
  if (!validarFoto(fotos)) setInvalidInput("Fotos");
  if (!validarContactoExtra(seleccionados)) setInvalidInput("Información de contacto adicional (4-50 caracteres)");

  const valBox = document.getElementById("val-box");
  const valMsg = document.getElementById("val-msg");
  const valList = document.getElementById("val-list");

  if (!isValid) {
    valList.textContent = "";
    for (let input of invalidInputs) {
      let li = document.createElement("li");
      li.innerText = input;
      valList.append(li);
    }

    valMsg.innerText = "Los siguientes campos son inválidos:";
    valBox.style.backgroundColor = "#ffdddd";
    valBox.style.borderLeftColor = "#f44336";
    valBox.hidden = false;
  } else {
    myForm.style.display = "none";
    valMsg.innerText = "¿Está seguro que desea agregar este aviso de adopción?";
    valList.textContent = "";

    valBox.style.backgroundColor = "#ddffdd";
    valBox.style.borderLeftColor = "#4CAF50";

    let submitButton = document.createElement("button");
    submitButton.innerText = "Enviar";
    submitButton.style.marginRight = "10px";
    submitButton.addEventListener("click", () => {
      alert("Hemos recibido la información de adopción, muchas gracias y suerte!");
      window.location.href = "index.html";
    });

    let backButton = document.createElement("button");
    backButton.innerText = "Volver";
    backButton.addEventListener("click", () => {
      myForm.style.display = "block";
      valBox.hidden = true;
    });

    valList.appendChild(submitButton);
    valList.appendChild(backButton);
    valBox.hidden = false;
  }
};

const ahora = new Date();
ahora.setHours(ahora.getHours() + 3);
const fechaMinima = ahora.getFullYear() + "-" +
  String(ahora.getMonth() + 1).padStart(2, "0") + "-" +
  String(ahora.getDate()).padStart(2, "0") + "T" +
  String(ahora.getHours()).padStart(2, "0") + ":" +
  String(ahora.getMinutes()).padStart(2, "0");

const fechaInput = document.getElementById('fechaDisponible');
if (fechaInput) {
  fechaInput.min = fechaMinima;
  fechaInput.value = fechaMinima;
}

document.getElementById('agregar-foto').addEventListener('click', () => {
  const container = document.getElementById('fotos-container');
  const inputs = container.querySelectorAll('input[type="file"]');
  if (inputs.length >= 5) {
    alert('Máximo 5 fotos permitidas');
    return;
  }
  const newInput = document.createElement('input');
  newInput.type = 'file';
  newInput.name = 'foto[]';
  newInput.accept = 'image/*';
  newInput.className = 'foto-input';
  container.appendChild(newInput);
});

const extraContainer = document.getElementById('extra-contacto-container');
const checkboxes = document.querySelectorAll('#contactar-por input[type="checkbox"]');

const updateExtraVisibility = () => {
  const any = document.querySelectorAll('#contactar-por input[type="checkbox"]:checked').length > 0;
  extraContainer.style.display = any ? 'block' : 'none';
  if (!any) extraContainer.innerHTML = '';
};

checkboxes.forEach(chk => {
  chk.addEventListener('change', () => {
    const seleccionados = document.querySelectorAll('#contactar-por input[type="checkbox"]:checked');
    if (seleccionados.length > 5) {
      chk.checked = false;
      alert("Máximo 5 medios de contacto");
      return;
    }

    const id = `extra-${chk.value}`;
    if (chk.checked) {
      const wrapper = document.createElement("div");
      wrapper.id = id;
      wrapper.innerHTML = `
        <label for="extra-contacto-${chk.value}">ID/URL para ${chk.value}*</label>
        <input type="text" id="extra-contacto-${chk.value}"
               name="extra-contacto-${chk.value}"
               minlength="4" maxlength="50"
               placeholder="Usuario o URL">
      `;
      extraContainer.appendChild(wrapper);
    } else {
      const toRemove = document.getElementById(id);
      if (toRemove) toRemove.remove();
    }

    updateExtraVisibility();
  });
});

updateExtraVisibility();

let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", validarForm);