const template = document.createElement('template');
template.innerHTML = `
<div class="dropdown-container">
    <button class="dropdown-btn">Click Me</button>
    <ul class="dropdown-content">
        <li class="dropdown-item"><a href="#">link 1</a></li>
        <li class="dropdown-item"><a href="#">link 2</a></li>
        <li class="dropdown-item"><a href="#">link 3</a></li>
    </ul> 
</div>
`

const style = document.createElement('style');
style.textContent = `
/* dropdown content (hidden by default) */
.dropdown-content{
   display: none;
}
/* show the dropdown-content on hover */
.visible{
    display: block;
}`

class DropdownMenus extends HTMLElement {
    constructor(){
        super();

        const shadow = this.attachShadow({mode: 'open'});
        shadow.appendChild(style);
        shadow.appendChild(template.content.cloneNode(true));

        const btnEle = shadow.querySelector('.dropdown-btn');
        const dropdownContEle = shadow.querySelector('.dropdown-content');

        btnEle.addEventListener('mouseover', () => { 
            dropdownContEle.classList.add('visible')
         })

        btnEle.addEventListener('mouseout', () => { 
            dropdownContEle.classList.add('visible')
         })
    }
}