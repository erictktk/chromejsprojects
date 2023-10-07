setTimeout(masterFunction, 5000);

function masterFunction(){
    hidePhotos();
    restorePage();
}

function hidePhotos(){
    //let elements = document.querySelectorAll('[aria-label="Profile Photo"]');
    let elements = document.querySelectorAll('[title="My Profile"]');

    if (elements.length != 0 ){
        for (let i = 0; i < elements.length; i += 1){
            elements[i].innerHTML = "Me";
            /*
            var child = elements[i].lastElementChild; 
            let i = 0;
            while (child && i < 100000) {
                e.removeChild(child);
                child = e.lastElementChild;
                i += 1;
            }*/
        }
    }

    
    /*
    elements = document.getElementsByClassName("profile-edit-gallery__item");
    console.log(elements.length);
    if (elements.length != 0){
        for( var i = 0; i < elements.length; i += 1){
            var e = elements[i];
            console.log(e.innerHTML);
            e.innerHTML = "Photo was here";
            //e.remove;
        }
    }*/

    /*
    const allImages = document.getElementsByTagName("img");
    for(let i = 0; i < allImages.length; i += 1){
        const cur = allImages[i];
        cur.remove();
    }
    */
}

function restorePage(){
    console.log("hi from restore page!");
    document.body.style.opacity = 100;
}