import {parse,stringify} from "svgson";
async function teethSvgLoad(){
    const txtData = (await fetch('/Human_dental_arches.svg').then((data)=>{return data.text()}));   

    console.log(txtData);

    //const jsonDat = await parse(txtData);
    return (await parse(txtData));
}

export {teethSvgLoad};
