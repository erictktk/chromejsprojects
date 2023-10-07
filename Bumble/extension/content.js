setTimeout(masterFunction, 5000)

function masterFunction(){
    hidePhotos();
    restorePage();
}

function hidePhotos(){
    let elements = document.getElementsByClassName("avatar__image-box");

    if (elements.length != 0 ){
        elements[0].innerHTML = "Me";
    }

    

    elements = document.getElementsByClassName("profile-edit-gallery__item");
    console.log(elements.length);
    if (elements.length != 0){
        for( var i = 0; i < elements.length; i += 1){
            var e = elements[i];
            console.log(e.innerHTML);
            e.innerHTML = "Photo was here";
            //e.remove;
        }
    }

    /*
    const allImages = document.getElementsByTagName("img");
    for(let i = 0; i < allImages.length; i += 1){
        const cur = allImages[i];
        cur.remove();
    }
    */
}

function restorePage(){
    document.body.style.opacity = 100;
}