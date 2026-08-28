async function initDashboard() {
  try {
    const response = await fetch('dados.json');
    const data = await response.json();

    renderDailyChart(data.diario);
    renderWeeklyChart(data.semanal);
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

initDashboard();