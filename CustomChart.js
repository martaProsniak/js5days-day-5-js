class CustomChart {
    constructor(chartContainer) {
      this.chartContainer = chartContainer
      this.canvasElement = null
  
      this.tasks = []
  
      this.chart = null
  
      this.init()
    }
  
    init = () => {
      this.canvasElement = document.createElement('canvas')
      this.chartContainer.appendChild(this.canvasElement)
  
      const ctx = this.canvasElement.getContext('2d')
  
      this.chart = new Chart(
        ctx,
        {
          type: 'bar',
          data: {
            labels: ['Wszystkich zadań', 'Nie zakończone', 'Zakończone'],
            datasets: [{
              label: 'Statystyki',
              data: this.calculateStats(),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
              ],
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        }
      )
    }
  
    calculateStats = () => {
      return [
        this.tasks.length,
        this.tasks.filter(task => !task.isCompleted).length,
        this.tasks.filter(task => task.isCompleted).length,
      ]
    }
  
    updateTasks = (newTasks) => {
      this.tasks = newTasks
  
      this.chart.data.datasets.forEach((dataset) => {
        dataset.data = this.calculateStats()
      })
  
      this.chart.update()
    }
  }