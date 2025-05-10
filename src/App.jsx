import { useEffect, useState } from "react"
import { TeethSvg } from "./components/teethSvg"
import { dentalPathIds } from "./controllers/dentalArcPathIds"
import "./App.css"
function App() {
  const setterMethod = (e)=>{
      const a = e.target.attributes.teethType.value;
      setTeethState((prevState)=>{
        let obj = Object.create({});
        Object.assign(obj,prevState);
        obj[a] = obj[a]==="de"?"ae":"de";
        return obj;
      })
  }
  const [teethState,setTeethState] = useState(()=>{
    const teethSt = {};
    for(const key in dentalPathIds){
      teethSt[key] = "de";//de=deactivated,ae=activated
    }
    return teethSt;
  });


  useEffect(()=>{
    console.log(teethState);
  })
  return (
    <div>
      <div>
      {/*Make a teeth selector that manages the setter and activates a couple of teeth, enables the animation and freezes screen till uninvoked */}
      </div>
      <div>
      {/*put the text box for individual or grouped active teeth info here, make it scrollable */}
      </div>
      <div style={{background:"white"}}>
        <TeethSvg activationState={teethState} setterMethod={setterMethod}/>
      </div>
    </div>
  )
}

export default App
