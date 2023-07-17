//Variable de la tabla2x2 = matriz
const tabla2x2 = document.getElementById('2x2');
const tabla3x3 = document.getElementById('3x3');
const tabla4x4 = document.getElementById('4x4');

//Variables de las filas == filas de la matriz
const filas2x2 = tabla2x2.getElementsByClassName('fila2x2');
const filas3x3 = tabla3x3.getElementsByClassName('fila3x3');
const filas4x4 = tabla4x4.getElementsByClassName('fila4x4');

// Crear variables para los botones calcular matrices
let btn2x2 = document.querySelector('#btn2x2');
let btn3x3 = document.querySelector('#btn3x3');
let btn4x4 = document.querySelector('#btn4x4');

// Crear botones para limpiar los casilleros de las matrices
let limpiar2x2 = document.querySelector('#limpiar2x2');
let limpiar3x3 = document.querySelector('#limpiar3x3');
let limpiar4x4 = document.querySelector('#limpiar4x4');

//Crear varibles para los resultados
let resultado2x2 = document.querySelector('#resultado2x2');
let resultado3x3 = document.querySelector('#resultado3x3');

//Crear variables para las determinantes
let resultado_determinante2x2 = document.querySelector('#resultado_determinante2x2');
let resultado_determinante3x3 = document.querySelector("#resultado_determinante3x3")
let resultado4x4 = document.querySelector('#resultado_determinante4x4');

//Creamos arrays multidimensionales
const matriz2x2 = [];
const matriz3x3 = [];
const matriz4x4 = [];

//Funcion para vaciar inputs cuando se recarga la pagina
window.addEventListener('load', function() {
  // Obtener todos los elementos de entrada
  var inputs = document.querySelectorAll('input');

  // Limpiar los valores de los campos de entrada
  inputs.forEach(function(input) {
    input.value = '';
  });
});

//Funcion para llenar matrices
function llenar_matriz(filas) {
  const matriz = [];
  for (let i = 0; i < filas.length; i++) {
    const fila = filas[i];
    const celdas = fila.getElementsByTagName('input');
    const filaArray = [];
    for (let j = 0; j < celdas.length; j++) {
      const valor = celdas[j].value;
      filaArray.push(Number(valor));
    }
    matriz.push(filaArray);
  }
  return matriz;
}

// Obtener determinante de una matriz 2x2
function determinante2x2(matriz) {
  return matriz[0][0] * matriz[1][1] - matriz[0][1] * matriz[1][0];
}

// Obtener determinante de una matriz 3x3
function determinante3x3(matriz) {
  let det =
    matriz[0][0] * matriz[1][1] * matriz[2][2] +
    matriz[0][1] * matriz[1][2] * matriz[2][0] +
    matriz[0][2] * matriz[1][0] * matriz[2][1] -
    matriz[0][2] * matriz[1][1] * matriz[2][0] -
    matriz[0][0] * matriz[1][2] * matriz[2][1] -
    matriz[0][1] * matriz[1][0] * matriz[2][2];
  return det;
}

// Obtener determinante de una matriz 4x4 (método de Laplace)
function determinante4x4(matriz) {
  let det =
    matriz[0][0] *
      (matriz[1][1] *
        (matriz[2][2] * matriz[3][3] - matriz[2][3] * matriz[3][2]) -
        matriz[1][2] *
          (matriz[2][1] * matriz[3][3] - matriz[2][3] * matriz[3][1]) +
        matriz[1][3] *
          (matriz[2][1] * matriz[3][2] - matriz[2][2] * matriz[3][1])) -
    matriz[0][1] *
      (matriz[1][0] *
        (matriz[2][2] * matriz[3][3] - matriz[2][3] * matriz[3][2]) -
        matriz[1][2] *
          (matriz[2][0] * matriz[3][3] - matriz[2][3] * matriz[3][0]) +
        matriz[1][3] *
          (matriz[2][0] * matriz[3][2] - matriz[2][2] * matriz[3][0])) +
    matriz[0][2] *
      (matriz[1][0] *
        (matriz[2][1] * matriz[3][3] - matriz[2][3] * matriz[3][1]) -
        matriz[1][1] *
          (matriz[2][0] * matriz[3][3] - matriz[2][3] * matriz[3][0]) +
        matriz[1][3] *
          (matriz[2][0] * matriz[3][1] - matriz[2][1] * matriz[3][0])) -
    matriz[0][3] *
      (matriz[1][0] *
        (matriz[2][1] * matriz[3][2] - matriz[2][2] * matriz[3][1]) -
        matriz[1][1] *
          (matriz[2][0] * matriz[3][2] - matriz[2][2] * matriz[3][0]) +
        matriz[1][2] *
          (matriz[2][0] * matriz[3][1] - matriz[2][1] * matriz[3][0]));
  return det;
}

//Agregar funcion limpiar casilleros
function limpiar_casilleros(filas) {
  for (let i = 0; i < filas.length; i++) {
    const elementos = filas[i].getElementsByTagName('input');
    for (let j = 0; j < elementos.length; j++) {
      elementos[j].value = "";
    }
  }

}

//Función para visualizar el botón de limpiar que está oculto 
function ver_boton_limpiar(ordenMatriz) {
  let botonesLimpiar = document.getElementById(`limpiar${ordenMatriz}`);
  botonesLimpiar.style.display = "block";
}

// Agregar funcion que determina si la matriz esta completamente llena
function verificar_matriz_llena(matriz) {
  if (matriz.length === 0) {
    return false; // La matriz está vacía, retorna false
  }
  
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      if (isNaN(matriz[i][j]) || matriz[i][j] === ""  || matriz[i][j] === null) {
        return false; // Se encontró un valor no numérico o vacío, retorna false
      }
    }
  }
  
  return true; // Todos los casilleros son numéricos y no están vacíos
}


// Función para calcular los resultados de una matriz 2x2
function calcularResultados2x2() {
  const matriz2x2 = llenar_matriz(filas2x2);

  let det = determinante2x2(matriz2x2);

  if(!verificar_matriz_llena(matriz2x2)) {
    resultado2x2.textContent = 'Por favor ingrese valores numericos en todos los casilleros';
    resultado_determinante2x2.textContent = ''
    return;
  }
  
  if (det !== 0) {
    let x = (matriz2x2[0][2] * matriz2x2[1][1] - matriz2x2[0][1] * matriz2x2[1][2]) / det;
    let y = (matriz2x2[0][0] * matriz2x2[1][2] - matriz2x2[0][2] * matriz2x2[1][0]) / det;
    resultado2x2.textContent = `El valor de x es: ${x.toFixed(2)} y el valor de y es: ${y.toFixed(2)}`;
    resultado_determinante2x2.textContent = `La determinante de la matriz es: ${det.toFixed(2)}`;
  } else {
    resultado2x2.textContent = 'El sistema no tiene solución única (determinante = 0)';
  }
}

// Función para calcular los resultados de una matriz 3x3
function calcularResultados3x3() {
  const matriz3x3 = llenar_matriz(filas3x3);
  // Verificar si todos los casilleros contienen valores numéricos y no están vacíos
  if(!verificar_matriz_llena(matriz3x3)) {
    resultado3x3.textContent = 'Por favor ingrese valores numericos en todos los casilleros';
    resultado_determinante3x3.textContent = ''
    return;
  }

  let det = determinante3x3(matriz3x3);

  if (det !== 0) {
    const matrizX = [[matriz3x3[0][3], matriz3x3[0][1], matriz3x3[0][2]],
                       [matriz3x3[1][3], matriz3x3[1][1], matriz3x3[1][2]],
                       [matriz3x3[2][3], matriz3x3[2][1], matriz3x3[2][2]]];
    const matrizY = [[matriz3x3[0][0], matriz3x3[0][3], matriz3x3[0][2]],
                       [matriz3x3[1][0], matriz3x3[1][3], matriz3x3[1][2]],
                       [matriz3x3[2][0], matriz3x3[2][3], matriz3x3[2][2]]];
    const matrizZ = [[matriz3x3[0][0], matriz3x3[0][1], matriz3x3[0][3]],
                       [matriz3x3[1][0], matriz3x3[1][1], matriz3x3[1][3]],
                       [matriz3x3[2][0], matriz3x3[2][1], matriz3x3[2][3]]];
    let x = determinante3x3(matrizX) / det;
    let y = determinante3x3(matrizY) / det;
    let z = determinante3x3(matrizZ) / det;
    resultado3x3.textContent = `El valor de x es: ${x.toFixed(2)}, el valor de y es: ${y.toFixed(2)} y el valor de z es: ${z.toFixed(2)}`;
    resultado_determinante3x3.textContent = `La determinante de la matriz es: ${det.toFixed(2)}`;
  } else {
    resultado3x3.textContent = 'El sistema no tiene solución única (determinante = 0)';
  }
}

// Función para calcular el determinante de una matriz 4x4
function calcularDeterminante4x4() {
  const matriz4x4 = llenar_matriz(filas4x4);
  
  // Verificar si todos los casilleros contienen valores numéricos y no están vacíos
  if (!verificar_matriz_llena(matriz4x4)) {
    resultado4x4.textContent = 'Por favor, ingresa valores numéricos en todos los casilleros';
    return; // Salir de la función si la verificación falla
  }

  resultado4x4.textContent = `La determinante de la matriz es: ${determinante4x4(matriz4x4).toFixed(2)}`;
}


btn2x2.addEventListener('click', function() {
  // Verificar si todos los casilleros son numéricos antes de calcular los resultados
  if (!verificar_matriz_llena(matriz2x2)) {
    calcularResultados2x2();
  } else {
    // Mostrar un mensaje de error indicando que la matriz no tiene valores numéricos
    resultado2x2.textContent = "Ingrese un valor numerico en todos los casilleros";
  }
});

btn3x3.addEventListener('click', function() {
  // Verificar si todos los casilleros son numéricos antes de calcular los resultados
  if (!verificar_matriz_llena(matriz3x3)) {
    calcularResultados3x3();
  } else {
    // Mostrar un mensaje de error indicando que la matriz no tiene valores numéricos
    resultado3x3.textContent = "Ingrese un valor numerico en todos los casilleros";
  }
});

btn4x4.addEventListener('click', function() {
  // Verificar si todos los casilleros son numéricos antes de calcular los resultados
  if (!verificar_matriz_llena(matriz4x4)) {
    calcularDeterminante4x4();
  } else {
    // Mostrar un mensaje de error indicando que la matriz no tiene valores numéricos
    resultado4x4.textContent = "Ingrese un valor numerico en todos los casilleros";
  }
});

limpiar2x2.addEventListener('click', () => {
  limpiar_casilleros(filas2x2);
  resultado2x2.textContent = '';
  resultado_determinante2x2.textContent = '';
  limpiar2x2.style.display = "none";
});

limpiar3x3.addEventListener('click', () => {
  limpiar_casilleros(filas3x3);
  resultado3x3.textContent = '';
  resultado_determinante3x3.textContent = '';
  limpiar3x3.style.display = "none";
});

limpiar4x4.addEventListener('click', () => {
  limpiar_casilleros(filas4x4);
  resultado4x4.textContent = '';
  limpiar4x4.style.display = "none";
});