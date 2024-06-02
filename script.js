function calcularMasaCorporal() {
    const edad = document.getElementById('edad').value;
    const altura = document.getElementById('altura').value;
    const peso = document.getElementById('peso').value;
    const sexo = document.getElementById('sexo').value;

    if (!edad || !altura || !peso || !sexo) {
        alert('Por favor, rellena todos los campos.');
        return;
    }
    const alturaMetros = altura / 100;
    const imc = (peso / (alturaMetros * alturaMetros)).toFixed(1);

    document.getElementById('formulario').style.display = 'none';
    document.getElementById('resultado').style.display = 'block';

    let categoria = '';
    let color = '';
    if (imc < 18.5) {
        categoria = 'Bajo peso';
        color = '#f0ad4e';
        mostrarTips('bajo peso');
    } else if (imc >= 18.5 && imc <= 24.9) {
        categoria = 'Normal';
        color = '#5cb85c';
        mostrarTips('normal');
    } else {
        categoria = 'Sobrepeso';
        color = '#d9534f';
        mostrarTips('sobrepeso');
    }
    actualizarGrafica(imc, categoria, color);
}

function mostrarTips(categoria) {
    let tips = '';
    switch (categoria) {
        case 'bajo peso':
            tips = `
                <h2>Tips para Bajo Peso:</h2>
                <ul>
                    <li>Come con más frecuencia.</li>
                    <li>Empieza poco a poco a hacer de 5 a 6 comidas más pequeñas durante el día.</li>
                    <li>Elige alimentos con muchos nutrientes.</li>
                    <li>Prueba licuados y batidos de frutas.</li>
                    <li>Haz ejercicio.</li>
                </ul>
            `;
            break;
        case 'normal':
            tips = `
                <h2>Tips para Estado Normal:</h2>
                <ul>
                <li>Sigue con tu alimentación.</li>
                    <li>Trata de no comer tanta comida chatarra.</li>
                    <li>Haz ejercicio.</li>
                </ul>
            `;
            break;
        case 'sobrepeso':
            tips = `
                    <h2>Tips para Sobrepeso:</h2>
                <ul>
                    <li>Plan de alimentación saludable y de actividad física regular.</li>
                    <li>Cambiar los hábitos.</li>
                    <li>Programas para controlar el peso.</li>
                    <li>Medicamentos para perder peso.</li>
                    <li>Dietas especiales.</li>
                </ul>
            `;
            break;
        }
        document.getElementById('tips').innerHTML = tips;
    }
    
    function actualizarGrafica(imc, categoria, color) {
        const ctx = document.getElementById('imcChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Bajo peso', 'Normal', 'Sobrepeso'],
                datasets: [{
                    data: [
                        imc < 18.5 ? imc : 0,
                        imc >= 18.5 && imc <= 24.9 ? imc : 0,
                        imc > 24.9 ? imc : 0
                    ],
                    backgroundColor: ['#f0ad4e', '#5cb85c', '#d9534f'],
                    hoverBackgroundColor: ['#f0ad4e', '#5cb85c', '#d9534f']
                }]
            },
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return $ 
                                {context.label}; $
                                {context.raw};
                             
                            }
                        }
                    }
                }
            }
        });
    }
    
    function volver() {
        document.getElementById('formulario').style.display = 'block';
        document.getElementById('resultado').style.display = 'none';
        // Reset form inputs
        document.getElementById('edad').value = '';
        document.getElementById('altura').value = '';
        document.getElementById('peso').value = '';
        document.getElementById('sexo').value = 'masculino';
        // Clear the tips and chart
        document.getElementById('tips').innerHTML = '';
        const ctx = document.getElementById('imcChart').getContext('2d');
        if (Chart.getChart(ctx)) {
            Chart.getChart(ctx).destroy();
        }
    }
