let observer = new MutationObserver(mutations => {
    //afterLoaded();
    const toBeRemoved = [];

    //class="profileCard__slider__imgShadow"

    let elements = document.querySelectorAll('[role="img"]');

    function remove(element){
        if (element.tagName === 'IMG'){
            toBeRemoved.push(element);
        }
        else if(element.className === 'profileCard__slider__imgShadow'){
            toBeRemoved.push(element);
        }
        else if(0){
            //
        }
        
    }
    

    /**
     * 
     * @param {HTMLElement} element 
     */
    const recursiveSearch = (element) => {
        console.log(element.tagName)
        remove(element);
        
        if (element.hasChildNodes()){
            const childNodes = element.childNodes;

            for(let i = 0; i < childNodes.length; i += 1){
                recursiveSearch(childNodes[i]);
            }
        }
        
    }

    for(const mutation of mutations) {
        console.log('hi from inside mutation observer!');



         for(const addedNode of mutation.addedNodes) {
            //console.log
            //console.log('hi from inside mutation observer!');
            console.log(addedNode.tagName);
            recursiveSearch(addedNode);
        }
    }

    console.log('toBeRemoved length = ' + toBeRemoved.length);

    for(let i = 0; i < elements.length; i += 1){
        elements[i].remove();
    }

    for(let i = 0; i < toBeRemoved.length; i += 1){
        toBeRemoved[i].remove();
    }


 });

observer.observe(document, { childList: true, subtree: true });


//setTimeout(masterFunction, 5000)

restorePage();

function masterFunction(){
    hideImgs();
    
}



function hideImgs(){
    const toBeRemoved = []
    //let elements = document.getElementsByTagName("img");
    let elements = document.querySelectorAll('[role="img"]');

    elements = elements + document.getElementsByClassName('profileCard__slider__imgShadow');

    //document.querySelectorAll('[role="img"]');
    //element.className === 'profileCard__slider__imgShadow
    

    for(let i = 0; i < elements.length; i += 1){
        elements[i].remove();
    }
}

function restorePage(){
    document.body.style.opacity = 100;
}