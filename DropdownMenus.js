const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="styles.css">
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
.dropdown-container{
    display:flex;
    flex-direction: column;
    max-width: 8rem;
    margin: 1rem;
    font-size: 1rem;
    align-items: start;
    justify-content: start;
  }

  .dropdown-btn {
    background-color: #ccc;
    color: white;
    border: none;
    display: inline-block;
    text-align: start;
    text-indent: 1rem;
    width: 100%;
    padding: 10px 0;
    border-radius: 5px;
    cursor: pointer;
  }

  .dropdown-btn:hover, 
  .dropdown-btn:active {
    background-color: #666;
  }

  .dropdown-item{
    padding: 10px 0;
    border-radius: 5px;
    width: 100%;
    
  }

  .dropdown-item:hover, 
  .dropdown-item:active{
    background-color: orange;
  }

  .dropdown-item > a {
    color: #999;
    width: 100%;
  }

/* dropdown content (hidden by default) */
.dropdown-content{
    width: 100%;
    display: none;
    font-size: 1rem;
    text-indent: 1rem;
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

        // two types of dropdown-menus: 1. default/'hover' 2. 'click' type
        if(type=='hover' || type == null){
            // 1. default/'hover' type: hover the button to show/hide the menus
            let eventsType = ['mouseover', 'mouseout'];
            eventsType.forEach((event) => { 
                    btnEle.addEventListener(event, () => {
                        dropdownContEle.classList.toggle('visible');
                    })
                })
        }else if(type == 'click'){
            // 2. 'click' type: click to show and hide the menus
            window.addEventListener('click', (event) => { 
                // click the dropdown-menus element to show/hide the menus
                if(this.contains(event.target)){
                    dropdownContEle.classList.toggle('visible');
                }else{
                    // When click outside the dropdown-menus, hide the dropdown-menus again
                    if(dropdownContEle.classList.contains('visible')){
                        dropdownContEle.classList.remove('visible');
                    }
    
                }
             })
    
        }
        
    }
}