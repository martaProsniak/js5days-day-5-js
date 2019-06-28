class Counter {
    constructor(){
        this.number = 0
        // function render() is inside of Counter class -> must be called with keyword this
        this.render()
    }

    inc(){
        this.number++
    }

    render(){
        const headerElement = document.createElement('h1')
        const btnElement = document.createElement('button')

        headerElement.innerText = this.number
        btnElement.innerText = '+'

        document.body.appendChild(headerElement)
        document.body.appendChild(btnElement)

    }
}

const counter1 = new Counter()
const counter2 = new Counter()
console.log(counter1)
console.log(counter2)

