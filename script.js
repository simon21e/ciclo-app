function salvaDati(e) {
  e.preventDefault();
  const temp = document.getElementById('temperatura').value;
  const muco = document.getElementById('muco').value;
  const oggi = new Date().toISOString().split('T')[0];

  let dati = JSON.parse(localStorage.getItem('ciclo')) || {};
  dati[oggi] = { temperatura: parseFloat(temp), muco };
  localStorage.setItem('ciclo', JSON.stringify(dati));
  alert("Dati salvati!");
}

function disegnaGrafico() {
  const ctx = document.getElementById('grafico').getContext('2d');
  const dati = JSON.parse(localStorage.getItem('ciclo')) || {};
  const giorni = Object.keys(dati).sort();
  const temperature = giorni.map(g => dati[g].temperatura);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: giorni,
      datasets: [{
        label: 'Temperatura',
        data: temperature,
        borderColor: 'red',
        tension: 0.3,
        fill: false
      }]
    }
  });
}

function analizzaCiclo() {
  const dati = JSON.parse(localStorage.getItem('ciclo')) || {};
  const giorni = Object.keys(dati).sort();
  const temperature = giorni.map(g => dati[g].temperatura);
  let output = "Numero giorni registrati: " + giorni.length;

  // Esempio semplificato: individua picco temporaneo
  if (temperature.length >= 6) {
    const base = average(temperature.slice(0, 6));
    output += `<br>Media prime 6 temperature: ${base.toFixed(2)}°C`;
  }

  document.getElementById('risultato-analisi').innerHTML = output;
}

function average(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}
