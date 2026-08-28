async function initDashboard() {
  try {

    const response = await fetch('dados.json');
    const data = await response.json();

    renderDailyChart(data.diario);
    renderWeeklyChart(data.semanal);

    renderTableFromCSV();
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
}

function createGradient(ctx, colorStart, colorEnd) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(1, colorEnd);
  return gradient;
}

function renderDailyChart(dailyData) {
  const canvas = document.getElementById('dailyChart');
  const ctx = canvas.getContext('2d');
  const gradient = createGradient(ctx, '#38bdf8', '#0284c7');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(dailyData),
      datasets: [{
        label: 'Aberturas',
        data: Object.values(dailyData),
        backgroundColor: gradient,
        borderRadius: 4,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          ticks: { color: '#94a3b8', font: { size: 10 } },
          grid: { display: false }
        },
        y: {
          ticks: { color: '#94a3b8' },
          grid: { color: '#334155' },
          beginAtZero: true
        }
      }
    }
  });
}

function renderWeeklyChart(weeklyData) {
  const canvas = document.getElementById('weeklyChart');
  const ctx = canvas.getContext('2d');
  const gradient = createGradient(ctx, '#818cf8', '#4f46e5');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(weeklyData),
      datasets: [{
        label: 'Aberturas',
        data: Object.values(weeklyData),
        backgroundColor: gradient,
        borderRadius: 6,
        barThickness: 45
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          ticks: { color: '#94a3b8', font: { weight: 'bold' } },
          grid: { display: false }
        },
        y: {
          ticks: { color: '#94a3b8' },
          grid: { color: '#334155' },
          beginAtZero: true
        }
      }
    }
  });
}

async function renderTableFromCSV() {
  try {
    const response = await fetch('dados.csv');
    const text = await response.text();
    
    const lines = text.trim().split('\n');
    const tbody = document.getElementById('dataTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    const startIndex = lines[0].toLowerCase().includes('data') ? 1 : 0;

    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const cols = line.includes(';') ? line.split(';') : line.split(',');
      
      const data = cols[0] ? cols[0].trim() : '';
      const hora = cols[1] ? cols[1].trim() : '';
      const semana = cols[2] ? cols[2].trim() : '';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${data}</td>
        <td>${hora}</td>
        <td>${semana}</td>
      `;
      tbody.appendChild(tr);
    }
  } catch (error) {
    console.error('Erro ao ler dados.csv para a tabela:', error);
  }
}

initDashboard();