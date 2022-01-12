// declare global variables
let animationElements;
let revertAnimationClass = "run-revert-animation" // not necessary anymore probably
let boodleOptions = {
    offscreenPause: false,
    playOnce: true,
    testOption: "werkt"
}

function boodleInit(_options) {

    for (let key of Object.keys(_options)) {
        // console.log(_key + " -> " +÷ p[_key])
        boodleOptions[key] =  _options[key];
    }




    window.addEventListener("DOMContentLoaded", e => {
        animationElements = document.querySelectorAll("[data-boodle-animation]");
        animationElements.forEach(aniElement => {
            // setup datasets
            let boodleAnimation = aniElement.dataset.boodleAnimation
            let boodleDuration = aniElement.dataset.boodleDuration;
            let boodleTiming = aniElement.dataset.boodleTiming;
            let boodleDelay = aniElement.dataset.boodleDelay;
            // console.dir(aniElement)
            aniElement.classList.add("boodle-" + boodleAnimation);
            aniElement.classList.add("boodle-animation");
            aniElement.style.animationDuration = boodleDuration + "ms";
            aniElement.style.animationTimingFunction = boodleTiming;
            aniElement.style.animationDelay = boodleDelay + "ms";



            // check if anielements already on screen
            if ( checkElementOnScreen(aniElement) ) {
                $(aniElement).addClass('run-animation');
            }



        })

        imageSizeCalc();
    })



    $(window).scroll(function() {

        animationElements.forEach(element => {
            // console.log(element)
            // if this element returns a true for check add run animation class

            if ( checkElementOnScreen(element) && !element.classList.contains(revertAnimationClass) ) {


                if (!$(element).hasClass('boodle-' + element.dataset.boodleAnimation)) {
                    $(element).addClass('boodle-' + element.dataset.boodleAnimation);
                }
                $(element).addClass('run-animation');

            }


            if(boodleOptions.offscreenPause == true || boodleOptions.playOnce == false) {
                if ($(element).is(':offscreen')){

                    if (element.classList.contains("run-animation")) {
                        element.classList.remove("run-animation")
                        // element.classList.remove("boodle-" + element.dataset.boodleAnimation)
                        // element.classList.add(revertAnimationClass)

                        // element.style.setProperty("animation-name", "none", "important")
                        // element.style.setProperty("animation-name", "boodle-" + element.dataset.boodleAnimation, "important")
                        // element.style.animationName = "boodle-" + element.dataset.boodleAnimation + "!important";


                        // console.log("adding class to:" + element.className)
                        // $(element).removeClass('run-animation');
                        // $(element).addClass('run-revert-animation');
                    }



                }
            }
        });


    });


    function checkElementOnScreen(ele) {

        let boodleOffset = ele.dataset.boodleOffset;


        // oTop offsetTop of the element
        let oTop = $(ele).offset().top - window.innerHeight;
        oTop = oTop+window.innerHeight/3;
        if(boodleOffset !== undefined) {
            boodleOffset = parseInt(boodleOffset);
            // console.log(typeof boodleOffset);
            // console.log( boodleOffset);
            oTop = oTop + boodleOffset;
            // console.log(oTop);
        }

        // if element reaches 1/3 of screen return true  then play
        if(boodleOptions.offscreenPause == false) {
            if ($(window).scrollTop() > oTop) {
                return true;
            }
        }


        // if element reaches 1/3 of screen return true && is not offscreen  then play
        if(boodleOptions.offscreenPause == true) {
            if ($(window).scrollTop() > oTop && $(ele).is(':offscreen') == false) {
                return true;
            }
        }

    }

    function checkElementOffScreen(ele) {

        // let boodleOffset = ele.dataset.boodleOffset;


        // oTop offsetTop of the element
        let oTop = $(ele).offset().top;
        // oTop = oTop+window.innerHeight/3;
        // console.dir(oTop)
        // if(boodleOffset !== undefined) {
        //     boodleOffset = parseInt(boodleOffset);
        //     console.log(typeof boodleOffset);
        //     console.log( boodleOffset);
        //     oTop = oTop + boodleOffset;
        //     console.log(oTop);
        // }
        // if element reaches 1/3 of screen return true
        // if ($(window).scrollTop() > oTop) {
        //     return true;
        // }
    }

    // offscreen filter jquery
    jQuery.expr.filters.offscreen = function(el) {
        var rect = el.getBoundingClientRect();
        return (
            (rect.x + rect.width) < 0
            || (rect.y + rect.height) < 0
            || (rect.x > window.innerWidth || rect.y > window.innerHeight)
        );
    };


    // calculate parents height for the absolute child
    function imageSizeCalc() {
        let imageAniElements = document.querySelectorAll("[data-boodle-animation*='image']");
        imageAniElements.forEach(element => {
            let computedStyle = getComputedStyle(element.parentElement);
            let elementParentWidth = element.parentElement.clientWidth;   // width with padding
            elementParentWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
            let img  = element.querySelector("img");
            let figure  = element.querySelector("figure");
            // console.dir(element.parentElement.clientWidth);
            // console.dir(img);
            element.parentElement.style.position = "relative";
            if(img !== null) {
                img.style.height = element.parentElement.clientHeight + "px";
                img.style.width = elementParentWidth + "px";
            }
            if(figure !== null) {
                figure.style.height = element.parentElement.clientHeight + "px";
                figure.style.width = elementParentWidth + "px";
            }

            // img.classList.add("boodle-zoom-in")
            // element.childElement
        })
        // console.dir(imageAniElements);

    }
}