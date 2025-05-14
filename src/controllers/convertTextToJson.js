const convertToJson = (txt)=>{
    const json = {};
    let count = 0;
    for(let i = 0;i < txt.length;i++){
        if(txt[i] == ':'){
            count++;
        }
    }
    //console.log(count);
    for(let i = 0;i < count;i++){
        json[txt.substring(0,txt.indexOf(':'))] = txt.substring(txt.indexOf(':')+1,txt.indexOf(';'))
        txt = txt.substring(txt.indexOf(';')+1);
    }
    return json;
}

export {convertToJson};