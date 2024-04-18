const day = document.getElementsByClassName('day')[0];
const month = document.getElementsByClassName('month')[0];
const year = document.getElementsByClassName('year')[0];
const error_para = document.getElementsByClassName('error-para')[0];
const arrow = document.getElementById('arrow');
const input_data = document.getElementById('input-data');

   
function validateInput() {
    const userDate = parseInt(day.querySelector('input').value); // Accessing input value within the 'day' div
    const userMonth = parseInt(month.querySelector('input').value); // Accessing input value within the 'month' div
    const userYear = parseInt(year.querySelector('input').value); // Accessing input value within the 'year' div

    const isValidDay = userDate >= 1 && userDate <= 31;
    const isValidMonth = userMonth >= 1 && userMonth <= 12;
    const isValidYear = userYear >= 1900 && userYear <= new Date().getFullYear();
     

    if (!isValidDay) {
        input_data.classList.add("error"); 
        error_para.style.display = "block";
        return false;
    } else {
        input_data.classList.remove("error"); 
        error_para.style.display = "none";
        return true;
    }
}

function calculateAge() {
    // Validate user input before proceeding with age calculation
    if (!validateInput()) {
        return;
    }

    // Proceed with age calculation
    const currentDate = new Date();
    const userDate = parseInt(day.querySelector('input').value); // Accessing input value within the 'day' div
    const userMonth = parseInt(month.querySelector('input').value); // Accessing input value within the 'month' div
    const userYear = parseInt(year.querySelector('input').value); // Accessing input value within the 'year' div
    const birthDate = new Date(userYear, userMonth - 1, userDate);
    const ageDifference = currentDate - birthDate;

// Calculate age in years
     const ageInYears = Math.floor(ageDifference / (1000 * 60 * 60 * 24 * 365.25));

// Calculate remaining months
      let remainingMonths = currentDate.getMonth() - birthDate.getMonth();
           if (currentDate.getMonth() < birthDate.getMonth() || (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
         remainingMonths = 12 - birthDate.getMonth() + currentDate.getMonth() - 1;
}

// Calculate remaining days
       let remainingDays = 0;
     if (currentDate.getDate() < birthDate.getDate()) {
      const tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    remainingDays = tempDate.getDate() - birthDate.getDate() + currentDate.getDate();
} else {
    remainingDays = currentDate.getDate() - birthDate.getDate();
}



    // Update the DOM with the calculated age
    document.querySelector('.data-content').innerHTML = `
        <b><span class="desh">${ageInYears}</span> years</b>
        <b><span class="desh">${remainingMonths}</span> months</b>
        <b><span class="desh">${remainingDays}</span> days</b>
    `;
}

// Add event listeners to trigger validation and age calculation
day.addEventListener('input', calculateAge);
month.addEventListener('input', calculateAge);
year.addEventListener('input', calculateAge);

