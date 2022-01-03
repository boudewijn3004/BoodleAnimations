let animationElements;
window.addEventListener("DOMContentLoaded", e => {
    animationElements = document.querySelectorAll(".boodle-animation");
    animationElements.forEach(aniElement => {
        // setup datasets
        let boodleDuration = aniElement.dataset.boodleDuration;
        let boodleTiming = aniElement.dataset.boodleTiming;
        console.dir(aniElement)
        aniElement.style.animationDuration = boodleDuration + "ms";
        aniElement.style.animationTimingFunction = boodleTiming;

    })
})



$(window).scroll(function() {
    
    // console.log(animationElements);
    animationElements.forEach(element => {
        // console.log(element)
        // if this element returns a true for check add run animation class
        
        if ( checkElementOnScreen(element) ) {    
            $(element).addClass('run-animation');
        }
    }); 

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