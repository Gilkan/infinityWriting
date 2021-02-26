function infinityWriting(id, fullscreen=false, speed=5, charPerSpeed = 1, backgroundColor='black', fontColor='green'){
    let container = document.getElementById(id);
    container.style.background = backgroundColor;
    container.style.color = fontColor;
    if(fullscreen){
        container.style.position = "absolute";
        container.style.top='0';
        container.style.left='0';
        container.style.height = "100%";
        container.style.width = "100%";
        container.style.WebkitScrollbar = "none";
        container.style.zIndex = '999999';
    }
    let innerText = container.innerHTML;
    container.innerHTML = "";

    var looper = setInterval(function(){writeText(container, innerText, charPerSpeed)}, speed);

    function ctrlC(keymapArray){
        if(
            keymapArray.includes('c') && keymapArray.includes('Control')
            || keymapArray.includes('C') && keymapArray.includes('Control')
        ){
            turnOff(looper, fullscreen, container);
        }
    }
    activateKeyboardMapping(ctrlC);


}
function writeText (element, fullText, charsPerRun = 2){
    let actualText = element.innerHTML;
    let ref = null;
    if(actualText.length >= fullText.length){
        ref = Math.ceil(actualText.length/fullText.length);
        let loop = 0;
        for(; loop < ref; loop++){
            fullText += fullText;
        }
    }
    let deltaText = fullText.replace(actualText, '');

    element.innerHTML = decodeHTMLEntities(actualText)+decodeHTMLEntities(deltaText).substring(0,charsPerRun);

    element.scrollIntoView(false);
}
function turnOff(setintervalToClear, isFullscreen = false, containerToRemove=null){
    if(isFullscreen){
        containerToRemove.removeAttribute("style");
        containerToRemove.parentNode.removeChild(containerToRemove);
    }
    clearInterval(setintervalToClear);
}
function decodeHTMLEntities(text) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

function activateKeyboardMapping(functionToExecuteOnMap=null){
    //activating stop listener
    var keyMapping = [];
    document.addEventListener('keydown', function (event){
        if(event.repeat){return}

        keyMapping = toggleKeyMap(event.key, keyMapping);

        //if exists functionToExecuteOnMap, run every press
        if(functionToExecuteOnMap!=null){
            functionToExecuteOnMap(keyMapping);
        }
    });
    document.addEventListener('keyup', function (event){
        if(event.repeat){return}
        keyMapping = toggleKeyMap(event.key, keyMapping);
    });

    function toggleKeyMap(key, keymap, forceAction = null){
        if(forceAction!=null){
            switch (forceAction) {

                case 'on':
                case 1:
                    keymap.push(key);
                    break;

                case 'off':
                case 0:
                    keymap.splice(keymap.indexOf(key),1);
                    break;

            }
        } else {
            if(keymap.includes(key)){ //se já tem, remover
                keymap.splice(keymap.indexOf(key),1);
            } else { //se não tem, incluir
                keymap.push(key);
            }
        }


        return keymap;
    }

    return keyMapping;
}
