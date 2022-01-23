class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
        this.currentOperandTextElement.innerText = "0"
        this.previousOperandTextElement.innerText = "Start entering numbers"
    }

    clear(){
        this.currentOperand = '0'
        this.previousOperand = 'Start entering numbers'
        this.operation = undefined
        this.previousOperandTextElement.innerText = ''
        this.currentOperandTextElement.innerText = ''
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if (this.currentOperand === '') return
        if (this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.clear()
        this.currentOperand = computation
    }

    getDisplayNumber(number){
        // const floatNumber = parseFloat(number)
        // const integerDigits = parseFloat(stringNumber.split('.')[0])
        // const decimalDigits = stringNumber.split('.')[1]
        // let integerDisplay
        // if (NaN(integerDigits)){
        //     integerDisplay = ''
        // } else {
        //     integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        // }
        // if (decimalDigits != null){
        //     return `${integerDisplay}.${decimalDigits}`
        // } else {
        //     return integerDisplay
        // }
        return number
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand
        if (this.operation!=null){
            this.previousOperandTextElement.innerText = 
            `${this.previousOperand} ${this.operation}`
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number')
const operationButtons = document.querySelectorAll('[data-operation')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (previousOperandTextElement.innerText === "Start entering numbers"){
            previousOperandTextElement.innerText = ""
        }
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (previousOperandTextElement.innerText === "Start entering numbers"){
            previousOperandTextElement.innerText = ""
        }
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})