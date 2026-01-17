
// Funci車n para guardar las cookies
function salvaCookies() {
  setCookie('data_lead_formulario_pagina', jQuery('.campo-pagina').val(), 3);
  setCookie('data_lead_Operadora', jQuery('.campo-operadora').val(), 3);
  setCookie('data_lead_idCapitas', jQuery('input[name=tipo-de-plano]:checked').val(), 3);
  setCookie('data_lead_edad_1', jQuery('.campo-edad').val(), 3);
  setCookie('data_lead_edad_2', jQuery('.campo-edad-pareja').val(), 3);
  setCookie('data_lead_hijos_Num', jQuery('.campo-edades-hijos').val(), 3);
  setCookie('data_lead_poseeOS', jQuery('input[name=possui-plano]:checked').val(), 3);
  setCookie('data_lead_sueldo', jQuery('.campo-sueldo').val(), 3);
  setCookie('data_lead_Name', jQuery('.campo-nome').val(), 3);
  setCookie('data_lead_telefone', jQuery('.campo-telefone').val(), 3);
  setCookie('data_lead_email', jQuery('.campo-email').val(), 3);

  function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
  }
}


function cambiarValor(valor) {
  let input = document.getElementById('Operadora');
  input.value = valor;
}


function finalizarWhats(formClass) {
  var form = document.querySelector(formClass);
  var boton = form.querySelector('#submit');
  var loader = form.querySelector('.loader-whats');

  // Deshabilitar el bot車n de env赤o y mostrar el loader
  boton.disabled = true;
  loader.style.display = 'block';

  // Obtener los valores de los campos del formulario usando jQuery
  var datawhook = {
    'formulario_pagina': $('#formulario_pagina_whats').val(),
    'Name': $('#Name_whats').val(),
    'telefone': $('#telefone_whats').val(),
  };

  // Enviar los datos al webhook de n8n
  const xhr = new XMLHttpRequest();
  
  xhr.open('POST', 'https://webhook.avalianonline.com.ar/webhook/get_data');

  xhr.onload = function () {
    if (xhr.status === 200) {
      boton.value = 'ENVIO EXITOSO!';
      loader.style.display = 'none';
      $('#contact-form-whats')[0].reset(); // Resetear el formulario

      // Redirigir a la p芍gina de agradecimiento despu谷s de 3 segundos
      setTimeout(function() {
        window.location.href = 'http://localhost/plandesalud-github.io/gracias';
        // window.location.href = 'https://plandesalud/gracias';
      }, 3000);
    }
    else {
      console.log('Error al enviar los datos');
      // Rehabilitar el bot車n y ocultar el loader en caso de error
      boton.disabled = false;
      loader.style.display = 'none';
    }
  };
  xhr.onerror = function () {
    alert('Error en la conexión');
  };
 xhr.send(JSON.stringify(datawhook));
}

function finalizar(formClass) {
  console.log('fianlizar')
  console.log(formClass)
    var form = document.querySelector(formClass);
    console.log(form)
  var boton = form.querySelector('#submit-completo');
  var loader = form.querySelector('.loader');
  console.log('2')
    // Deshabilitar el bot車n de env赤o y mostrar el loader
    boton.disabled = true;
    loader.style.display = 'block';
  
    // Obtener los valores de los campos del formulario usando jQuery
    var datawh = {
      'formulario_pagina': $('#formulario_pagina').val(),
      'Operadora': $('#Operadora').val(),
      'idCapitas': $('input[name="idCapitas"]:checked').val(),
      'edad_1': $('#edad_1').val(),
      'edad_2': $('#edad_2').val(),
      'hijos_num': $('#hijos_num').val(),
      'poseeOS': $('input[name="poseeOS"]:checked').val(),
      'sueldo': $('#sueldo').val(),
      'name': $('#Name').val(),
      'telefone': $('#telefone').val(),
      'email': $('#email').val(),
    };
  
  const xhr = new XMLHttpRequest();
  
  xhr.open('POST', 'https://webhook.avalianonline.com.ar/webhook/get_data');
  
  xhr.onload = function () {
    if (xhr.status === 200) {
      boton.value = 'ENVIO EXITOSO!';
      loader.style.display = 'none';
      $('#contact-form')[0].reset(); // Resetear el formulario

      // Redirigir a la p芍gina de agradecimiento despu谷s de 3 segundos
      setTimeout(function() {
        window.location.href = 'http://localhost/plandesalud-github.io/gracias';
        // window.location.href = 'https://plandesalud/gracias';
      }, 3000);
    } else {
      console.log('Error en la solicitud: ' + xhr.statusText);
      // Rehabilitar el bot車n y ocultar el loader en caso de error
      boton.disabled = false;
      loader.style.display = 'none';
    }
  };
  xhr.onerror = function () {
    alert('Error en la conexión');
  };
 xhr.send(JSON.stringify(datawh));
}

