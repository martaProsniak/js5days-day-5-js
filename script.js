class Counter {
    constructor(selector) {
        this.number = 0
        this.containerElement = document.querySelector(selector)
        this.render()
    }

    inc() {
        this.number++
        this.render()
    }

    render() {
        this.containerElement.innerText = ''

        const headerElement = document.createElement('h1')
        const btnElement = document.createElement('button')
        btnElement.addEventListener(
            'click',
           (function () {
               this.inc()
           }).bind(this) 
        )

        headerElement.innerText = this.number
        btnElement.innerText = '+'

        this.containerElement.appendChild(headerElement)
        this.containerElement.appendChild(btnElement)
    }
}
// calling constructor
const counter1 = new Counter('.counter1')
const counter2 = new Counter('.counter2')
console.log(counter1)
console.log(counter2)

