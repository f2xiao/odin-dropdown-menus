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
    width: 8rem;
    margin: 1rem 1rem 0;
    font-size: 1rem;
    align-items: start;
    justify-content: start;
  }

  .dropdown-btn {
    display: inline-block;

    width: 100%;
    padding: 10px 0;
    padding-left: 1rem;
    border-radius: 5px;
    background-color: #666;

    text-align: start;
    color: white;

    cursor: pointer;
  }

  .dropdown-btn:hover, 
  .dropdown-btn:active {
    background-color: #ccc;
  }

  .dropdown-item{
    padding: 10px 0;
    border-radius: 5px;
  }

  .dropdown-item:hover{
    background-color: #999;
  }

  .dropdown-item > a:link {
    padding-left: 1rem;

    color: #666;
    text-decoration: underline;
  }

  .dropdown-item > a:active  {
    color: white;
  }

/* dropdown content (hidden by default) */
.dropdown-content{
    display: none;
    width: 100%;
   
    font-size: 1rem;
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
        this.style.display = 'inline-block';

        const dropdownContEle = shadow.querySelector('.dropdown-content');

        // retreve the type attribute value
        let type = this.getAttribute('type');

        if(type=='hover' || type == null){
            this.addEventListener('mouseover', () => {   
                dropdownContEle.classList.toggle('visible')
             });

             this.addEventListener('mouseout', () => {   
                dropdownContEle.classList.toggle('visible')
             });
            
        }else if(type=='click'){
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