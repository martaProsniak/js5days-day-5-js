class ToDo {
    constructor(selector) {
        this.mainContainerElement = document.querySelector(selector)
        this.uiContainer = null //good practice to declare variables in constructor
        this.tasksContainer = null

        this.isLoading = false
        this.tasks = []
    }

    toggleCompleted(taskIndex) {
        const task = this.tasks[taskIndex]
        task.isCompleted = !task.isCompleted
        this.render()
    }
    deleteTask(taskIndex) {
        this.tasks = this.tasks.filter((task, index) => index !== taskIndex) // filter tasks and create new task table
        this.render()
    }


    renderTask(taskName, isCompleted, taskIndex) {
        const taskElement = document.createElement('div')

        taskElement.innerText = taskName

        if (isCompleted) {
            taskElement.style.textDecoration = 'line-through'
        }

        taskElement.addEventListener(
            'click',
            () => { this.toggleCompleted(taskIndex) }
        )

        taskElement.addEventListener(
            'dblclick',
            () => { this.deleteTask(taskIndex) }
        )



        return taskElement
    }

    render() {
        this.tasksContainer.innerText = ''

        if (this.isLoading) {
            this.tasksContainer.innerText = 'Loading...'
            return
        }
        if (this.tasks.length === 0) {
            this.tasksContainer.innerText = 'No tasks!'
        }
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i]
            const taskName = task.taskName
            const isCompleted = task.isCompleted
            const item = this.renderTask(taskName, isCompleted, i)
            this.tasksContainer.appendChild(item)
        }
    }

    init() {
        this.uiContainer = document.createElement('div')
        this.tasksContainer = document.createElement('div')
        this.mainContainerElement.appendChild(this.uiContainer)
        this.mainContainerElement.appendChild(this.tasksContainer)

        this.render()
    }

    saveToDb() {
        const data = JSON.stringify(this.tasks)
        fetch(
            'https://js5days-day-5-js.firebaseio.com/js5day2.json',
            {
                method: 'PUT',
                body: data
            }
        )
    }
}