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
        if(type=='hover' || type == null){
            // default/'hover' type: hover the button to show/hide the menus
            let eventsType = ['mouseover', 'mouseout'];
            eventsType.forEach((event) => { 
                console.log(event)
                    btnEle.addEventListener(event, () => {
                        dropdownContEle.classList.toggle('visible');
                    })
                })
        }else if(type == 'click'){
            // 'click' type: click to show and hide the menus
            // When click outside the dropdown menu, hide the dropdown menus again
            window.addEventListener('click', (event) => { 
                // check if the btnEle is clicked
                if(this.contains(event.target)){
                    dropdownContEle.classList.toggle('visible');
                }else{
                    if(dropdownContEle.classList.contains('visible')){
                        dropdownContEle.classList.remove('visible');
                    }
    
                }
             })
    
        }
        
    }
}