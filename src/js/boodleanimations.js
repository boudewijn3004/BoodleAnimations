$(window).scroll(function() {
    let animationElements =  $('.animate-element');
    console.log(animationElements);
    for (animationElements of aniElement ) {
        // if this element returns a true for check add run animation class
        if ( checkElementOnScreen(aniElement) ) {
            $(aniElement).addClass('run-animation');
        }
    }


    // let oTop = $('.animate-element').offset().top - window.innerHeight;
    // oTop = oTop+300;
    // if ($(window).scrollTop() > oTop) {
    //     $('.step-stats-image').addClass('step-animate');
    // }
});


function checkElementOnScreen(ele) {
    // oTop offsetTop of the element 
    let oTop = $(ele).offset().top - window.innerHeight;
    oTop = oTop+window.innerHeight/3;
    // if element reaches 1/3 of screen return true 
    if ($(window).scrollTop() > oTop) {
        return true;
    }
}