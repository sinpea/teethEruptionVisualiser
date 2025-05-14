import { useEffect, useState } from "react";
import { teethSvgLoad } from "../controllers/teethSvgLoader";
import { convertToJson } from "../controllers/convertTextToJson";
import { dentalPathIds } from "../controllers/dentalArcPathIds";
import "./teethSvg.css"
function TeethSvg({activationState,setterMethod}){
   const colorArray = ['grey','yellow','white','sky-blue','blue'];

   const [jsonData,setJsonData] = useState(null);
    
    useEffect(()=>{
        //initial loading of jsonData
        async function loadData(){
            const data = await teethSvgLoad();
            setJsonData((prevState)=>{return Object.assign({},data)});
            //console.log(jsonData);
        }
        loadData();
    },[])
    useEffect(()=>{
        //console.log(jsonData);
    })


    return(<>
    {jsonData && 
    <div>
    <svg xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:cc="http://creativecommons.org/ns#"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns:svg="http://www.w3.org/2000/svg"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
    id="svg2"
    version="1.1"
    viewBox="0 0 800 1250"
    inkscape:version="0.48.2 r9819"
    sodipodi:docname="łuki z.svg"
    style={{transform:"scale(1)",width:"auto",height:"810px"}}>
    <title
     id="title2987">dental arches</title>
  <metadata
     id="metadata8">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title>dental arches</dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <defs
     id="defs6">
    <marker
       style={{overflow:"visible"}}
       inkscape:stockid="InfiniteLineEnd"
       id="InfiniteLineEnd"
       refX="0"
       refY="0"
       orient="auto">
      <g
         id="g4021">
        <circle
           id="circle4023"
           r="0.8000000119209"
           cy="0"
           cx="3"
           sodipodi:cx="3"
           sodipodi:cy="0"
           sodipodi:rx="0.8000000119209"
           sodipodi:ry="0.8000000119209" />
        <circle
           id="circle4025"
           r="0.8000000119209"
           cy="0"
           cx="6.5"
           sodipodi:cx="6.5"
           sodipodi:cy="0"
           sodipodi:rx="0.8000000119209"
           sodipodi:ry="0.8000000119209" />
        <circle
           id="circle4027"
           r="0.8000000119209"
           cy="0"
           cx="10"
           sodipodi:cx="10"
           sodipodi:cy="0"
           sodipodi:rx="0.8000000119209"
           sodipodi:ry="0.8000000119209" />
      </g>
    </marker>
    <marker
       inkscape:stockid="TriangleInS"
       orient="auto"
       refY="0"
       refX="0"
       id="TriangleInS"
       style={{overflow:"visible"}}>
      <path
         id="path3925"
         d="m 5.77,0 -8.65,5 0,-10 8.65,5 z"
         style={{fillRule:"evenodd",stroke:"#000000",strokeWidth:"1pt",markerStart:"none"}}
         transform="scale(-0.2,-0.2)"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       inkscape:stockid="Arrow1Sstart"
       orient="auto"
       refY="0"
       refX="0"
       id="Arrow1Sstart"
       style={{overflow:"visible"}}>
      <path
         id="path3797"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         style={{fillRule:"evenodd",stroke:"#000000",strokeWidth:"1pt",markerStart:"none"}}
         transform="matrix(0.2,0,0,0.2,1.2,0)"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       inkscape:stockid="Arrow1Lstart"
       orient="auto"
       refY="0"
       refX="0"
       id="Arrow1Lstart"
       style={{overflow:"visible"}}>
      <path
         id="path3785"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         style={{fillRule:"evenodd",stroke:"#000000",strokeWidth:"1pt",markerStart:"none"}}
         transform="matrix(0.8,0,0,0.8,10,0)"
         inkscape:connector-curvature="0" />
    </marker>
  </defs>
  <sodipodi:namedview
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1"
     objecttolerance="10"
     gridtolerance="10"
     guidetolerance="10"
     inkscape:pageopacity="0"
     inkscape:pageshadow="2"
     inkscape:window-width="1280"
     inkscape:window-height="781"
     id="namedview4"
     showgrid="false"
     inkscape:zoom="0.1208910034602"
     inkscape:cx="3020.228221961"
     inkscape:cy="2320.073200983"
     inkscape:window-x="-4"
     inkscape:window-y="-4"
     inkscape:window-maximized="1"
     inkscape:current-layer="svg2"
     showguides="true"
     inkscape:guide-bbox="true"
     fit-margin-top="100"
     fit-margin-left="100"
     fit-margin-right="100"
     fit-margin-bottom="100" />
  <g
     inkscape:groupmode="layer"
     id="layer1"
     inkscape:label="svg"
     transform="translate(0,0)" />
    <g>
    {jsonData.children.map((items)=>{
         const styleObj = {}
         let TeethName = "";
         if((items.name==="path")){
            //todo optimise later because all strokes have same id now in svg
            let isPath = false;
            for(const i in dentalPathIds){
               if(items.attributes.id === dentalPathIds[i]){
                  isPath = true;
                  TeethName = i;
                  break;
               }
            }
            Object.assign(styleObj,convertToJson(items.attributes.style));
            if(isPath){
               //set stateManagement
               //get the state from some array somewhere
               //de=deactivate,ae=activate
               //styleObj.fill = (activationState[TeethName] === "de")?'grey':'yellow';
               styleObj.fill=colorArray[activationState[TeethName]]; 
            }
         }
         return(
            <>
               {(items.name==="path") && <path onClick={(event)=>{console.log(event.target.id);setterMethod(event)}} d={items.attributes.d} id={items.attributes.id} inkscape:connector-curvature={items.attributes["inkscape:connector-curvature"]} sodipodi:nodetypes = {items.attributes["sodipodi:nodetypes"]} style={styleObj} teethType={TeethName} className="pathSvg"/>}
            </>
         )
    })}
    </g>
   </svg>
    </div>}
    </>)
}

export {TeethSvg}