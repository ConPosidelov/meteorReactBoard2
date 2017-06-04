//

// тормозилка (от Кантора)
export const throttle = function (func, ms) {
    let isThrottled = false,
        savedArgs,
        savedThis;
    function wrapper() {
        if (isThrottled) {
          savedArgs = arguments;
          savedThis = this;
          return;
        }
        func.apply(this, arguments);
        isThrottled = true;
        setTimeout(function() {
          isThrottled = false;
          if (savedArgs) {
            wrapper.apply(savedThis, savedArgs);
            savedArgs = savedThis = null;
          }
        }, ms);
    };
    return wrapper;
};

// обновление размеров элемента при ресайзе

export const elDimResizeUpdate = (el, elDim, tic) => {
    elDim.os = el.offset();
    elDim.width = el.outerWidth();
    elDim.height = el.outerHeight();
    const resize = (e) =>{
        elDim.os = el.offset();
        elDim.width = el.outerWidth();
        elDim.height = el.outerHeight();
    };
    const resizeTic = throttle(resize, tic);
    $(window).off("resize").on("resize", resizeTic);

};

// обновление размера элемента 
export const elDimUpdate = (el, elDim) => {
    elDim.os = el.offset();
    elDim.width = el.outerWidth();
    elDim.height = el.outerHeight();
   //console.log('elDim.height1=', elDim.height);
    
};