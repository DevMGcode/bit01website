'use strict';

window.addEventListener('load', function () {

  const especialistasNombres = [
    "Luis Alvarez",
    "Gisell Dominguez",
    "Jessica Maria Valbuena",
    "Isabella Torrez",
    "Oscar Arturo Gonzales",
    "Gustavo Alarcon Vanegas",
    "Maribel Rosado Fernandez",
    "Isabella Torrez"
  ];

  const campos = {
    nombres:       document.getElementById('nombres'),
    apellidos:     document.getElementById('apellidos'),
    correo:        document.getElementById('correo'),
    celular:       document.getElementById('celular'),
    especialistas: document.getElementById('especialistas'),
    fecha:         document.getElementById('fecha')
  };

  const errores = {
    nombres:       document.getElementById('error1'),
    apellidos:     document.getElementById('error2'),
    correo:        document.getElementById('error3'),
    celular:       document.getElementById('error4'),
    especialistas: document.getElementById('error5'),
    fecha:         document.getElementById('error6')
  };

  const mensajes = {
    nombres:       'Ingresa tu nombre (mínimo 4 letras)',
    apellidos:     'Ingresa tus apellidos (mínimo 5 letras)',
    correo:        'Ingresa un correo válido',
    celular:       'Ingresa un número de 10 a 13 dígitos',
    especialistas: 'Selecciona un especialista',
    fecha:         'Selecciona la fecha del paseo'
  };

  const patrones = {
    nombres:       /^[a-zA-ZÀ-ÿ\s]{4,40}$/,
    apellidos:     /^[a-zA-ZÀ-ÿ\s]{5,40}$/,
    correo:        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    celular:       /^\d{10,13}$/,
    especialistas: /^.+$/,
    fecha:         /^.+$/
  };

  /* --- Valida un campo individual --- */
  const validarCampo = (key) => {
    const input = campos[key];
    const errorEl = errores[key];
    const valor = input ? input.value.trim() : '';
    const ok = valor && patrones[key].test(valor);

    if (input && input.tagName === 'INPUT') {
      input.classList.toggle('is-valid', ok);
      input.classList.toggle('is-invalid', !ok);
    }

    if (errorEl) {
      errorEl.textContent = ok ? '' : mensajes[key];
    }

    return ok;
  };

  /* --- Validación en tiempo real --- */
  Object.keys(campos).forEach(key => {
    const input = campos[key];
    if (!input) return;
    const evt = input.tagName === 'SELECT' ? 'change' : 'blur';
    input.addEventListener(evt, () => validarCampo(key));
    if (input.tagName === 'INPUT') {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) validarCampo(key);
      });
    }
  });

  /* --- Envío del formulario --- */
  const aceptarBtn = document.getElementById('aceptar');
  if (!aceptarBtn) return;

  aceptarBtn.addEventListener('click', () => {

    const todosValidos = Object.keys(campos).map(k => validarCampo(k)).every(Boolean);
    if (!todosValidos) return;

    const idx = parseInt(campos.especialistas.value) - 1;
    const datos = {
      nombres:       campos.nombres.value.trim(),
      apellidos:     campos.apellidos.value.trim(),
      correo:        campos.correo.value.trim(),
      celular:       campos.celular.value.trim(),
      especialista:  parseInt(campos.especialistas.value),
      nombreEsp:     especialistasNombres[idx] || 'Especialista',
      fecha:         campos.fecha.value
    };

    localStorage.setItem('programacionDatos', JSON.stringify(datos));

    /* Mostrar tarjeta de éxito */
    const formCard    = document.getElementById('form-card');
    const successCard = document.getElementById('form-success');
    const details     = document.getElementById('success-details');

    if (formCard)    formCard.classList.add('oculto');
    if (successCard) successCard.classList.remove('oculto');

    if (details) {
      const etiquetas = {
        nombres:   'Nombre',
        apellidos: 'Apellidos',
        correo:    'Correo',
        celular:   'Celular',
        nombreEsp: 'Especialista',
        fecha:     'Fecha del paseo'
      };
      details.innerHTML = Object.entries(etiquetas)
        .map(([k, lbl]) => `<p><strong>${lbl}:</strong> ${datos[k]}</p>`)
        .join('');
    }

    /* Redirigir al cronograma después de 3 s */
    setTimeout(() => {
      window.location.href = 'cronograma.html';
    }, 3000);
  });
});
