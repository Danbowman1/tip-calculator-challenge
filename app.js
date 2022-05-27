const billInput = document.getElementById('bill-input')
const peopleInput = document.getElementById('people-input')
const customInput = document.getElementById('custom-input')
const tipPerPerson = document.getElementById('tip-per-person')
const totalPerPerson = document.getElementById('total-per-person')
const tipBtn = document.querySelectorAll('.tipBtn')
const resetBtn = document.getElementById('resetBtn')
const error = document.getElementById('error')


billInput.addEventListener('input', billInputHandler)
peopleInput.addEventListener('input', peopleInputHandler)
tipBtn.forEach(function(val){
    val.addEventListener('click', handleClick)
})

customInput.addEventListener('input', tipInputHandler)

resetBtn.addEventListener('click', reset)

billInput.value = '0'
peopleInput.value = '1'
tipPerPerson.innerHTML = '$' + (0.0).toFixed(2)
totalPerPerson.innerHTML = '$' + (0.0).toFixed(2)

let billValue;
let peopleValue = 1
let tipValue;

function billInputHandler() {
    billValue = parseFloat(billInput.value)
    calculateTip()
    resetBtn.disabled = false
}

function peopleInputHandler() {
    peopleValue = parseFloat(peopleInput.value)
    calculateTip()

    if(peopleValue < 1){
        error.hidden = false
        peopleInput.style.border = '2px solid hsl(24, 80%, 52%)'
        peopleInput.blur()
    } else {
        error.hidden = true
        peopleInput.style.border = 'none'
    }

}

function tipInputHandler() {
    tipValue = parseFloat(customInput.value / 100)

    tipBtn.forEach(function(val){
        val.classList.remove('active-tip')
    })
    calculateTip()
}

function handleClick(e) {
    tipBtn.forEach(function(val){
        val.classList.remove('active-tip')
        if(e.target.innerHTML == val.innerHTML){
            val.classList.add('active-tip')
            tipValue = parseFloat(val.innerHTML) / 100
        }
    })
    calculateTip()
}

function calculateTip() {
    if(peopleValue >= 1){
        let tipAmount = (billValue * tipValue) / peopleValue
        let total = (billValue + tipAmount) / peopleValue
        tipPerPerson.innerHTML = '$' + tipAmount.toFixed(2)
        totalPerPerson.innerHTML = '$' + total.toFixed(2)
    }
    if(tipPerPerson.innerHTML === '$NaN'){
        tipPerPerson.innerHTML = '$0.00'
        totalPerPerson.innerHTML = '$0.00'
    }
}

function reset() {
    billInput.value = '0'
    peopleInput.value = '1'
    customInput.value = 'Custom'
    billInputHandler()
    resetBtn.disabled = true
}


