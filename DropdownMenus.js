const template = document.createElement('template');
template.innerHTML = `
<div class="dropdown-container">
    <button class="dropdown-btn"><slot name="name">Click me</slot></button>
    <ul class="dropdown-content">
        <li class="dropdown-item"><a href="#"><slot name="link1">Link 1</slot></a></li>
        <li class="dropdown-item"><a href="#"><slot name="link2">Link 2</slot></a></li>
        <li class="dropdown-item"><a href="#"><slot name="link3">Link 3</slot></a></li>
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

export default class DropdownMenus extends HTMLElement {
    constructor(){
        super();

        const shadow = this.attachShadow({mode: 'open'});
        shadow.appendChild(style);
        shadow.appendChild(template.content.cloneNode(true));

        const btnEle = shadow.querySelector('.dropdown-btn');
        const dropdownContEle = shadow.querySelector('.dropdown-content');

        // retreve the type attribute value
        let type = this.getAttribute('type');
        let eventsType = [];

        switch (type) {
            case "hover":
                eventsType = ['mouseover', 'mouseout'];
                break;
            case "click":
                eventsType = ['click'];
                break;
            default:
                eventsType = ['mouseover', 'mouseout'];
                break;
        }

        // console.log(eventsType)


       eventsType.forEach((event) => { 
        console.log(event)
            btnEle.addEventListener(event, () => {
                dropdownContEle.classList.toggle('visible');

            })
        })

        // TODO: when click outside the dropdown menu, hide the dropdown menus again

    }
}