// const slider = document.getElementById('electric_bill')
// const inputs = document.querySelector('[id="85w5nF28HCQZ8ew51rpU"]')

// function dispatchValue(){
//     inputs.value = slider.value
//     const InputEvent = new Event("input")
//     inputs.dispatchEvent(InputEvent)
//     console.log(InputEvent)
    
// }
// slider.addEventListener("input", dispatchValue)


const slider = document.getElementById('electric_bill');
const billOutputName = document.getElementById('billOutputName');
const billRangeProgress = document.getElementById('bill_range_progress');

function updateBillOutput(input) {
  const inputValue = parseInt(input.value, 10);
  const minValue = parseInt(input.min, 10);
  const maxValue = parseInt(input.max, 10);

  const percentage = ((inputValue - minValue) / (maxValue - minValue)) * 100;

  billOutputName.textContent = `$${inputValue}`;
  billRangeProgress.style.width = `${percentage}%`;
}

slider.addEventListener('input', function () {
  updateBillOutput(this);
});
