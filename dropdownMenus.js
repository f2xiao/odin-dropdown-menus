// Select the button Element and the dropdown-content element 
const btnEle = document.querySelector('.dropdown-btn');
const dropdownContEle = document.querySelector('.dropdown-content');

// register event handler on hover:
// show the dropdown-content 

btnEle.addEventListener('mouseover', () => { 
    dropdownContEle.classList.toggle('visible')
 })

 btnEle.addEventListener('mouseout', () => { 
    dropdownContEle.classList.toggle('visible')
 })