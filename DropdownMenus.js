export default function(){
    // Select the button Element and the dropdown-content element 
    const btnEle = document.querySelectorAll('.dropdown-btn');
    const dropdownContEle = document.querySelectorAll('.dropdown-content');
    

    // register event handler on hover:
    // show the dropdown-content 

    btnEle.forEach((btn,index) => { 
        
        btn.addEventListener('mouseover', () => { 
            dropdownContEle[index].classList.toggle('visible')
        });

        btn.addEventListener('mouseout', () => { 
            dropdownContEle[index].classList.toggle('visible')
        })
        
    })
}

