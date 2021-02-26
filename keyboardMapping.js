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
