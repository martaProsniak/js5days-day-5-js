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
        this.setState('tasks', this.tasks)
    }
    deleteTask(taskIndex) {
        const newTasks = this.tasks.filter((task, index) => index !== taskIndex) // filter tasks and create new task table
        this.setState('tasks', newTasks)
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
        this.saveToDb() // most convenient place to call this method

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
        
        this.loadFromDb()
        this.render()
    }

    makeUI(){
        const input 
        const btn 

        btn.innerText = 'Add task'
        input.addEventListener(
            
        )
    }

    setState(propName, newValue){
        this[propName] = newValue

        this.saveToDb
        this.render()
    }

    loadFromDb(){
        this.setState('isLoading', true)
        fetch('https://js5days-day-5-js.firebaseio.com/js5day2.json')
        .then(response => response.json())
        .then(value => {
            this.setState('tasks', value || [])
            this.setState('isLoading', false)
        })
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

    addTask(newTaskName){
        const newTasks = this.tasks.concat ({
            taskName: newTaskName,
            isCompleted: false
        })
        this.setState('tasks', newTasks)
        this.saveToDb()
    }
}