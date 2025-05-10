import { useEffect, useState } from "react"
import { TeethSvg } from "./components/teethSvg"
import { dentalPathIds } from "./controllers/dentalArcPathIds"
import { animationLoopData } from "./controllers/animationManager"
import "./App.css"
function App() {
  const [teethState,setTeethState] = useState(()=>{
    const teethSt = {};
    for(const key in dentalPathIds){
      teethSt[key] = "de";//de=deactivated,ae=activated
    }
    return teethSt;
  });
  //animationStateManager
  const [animationState,setAnimationFrame] = useState([false,0]);
  const [frameRate,setFrameRate] = useState(0.5);//in fps


  const setterMethod = (e)=>{
    const a = e.target.attributes.teethType.value;
    setTeethState((prevState)=>{
      let obj = Object.create({});path4454
      Object.assign(obj,prevState);
      obj[a] = obj[a]==="de"?"ae":"de";
      return obj;
    })
  };

  const setterMethodUnderAnimation = (changeObj)=>{
    for(const i in changeObj){
      setTeethState((prevState)=>{
        let obj = Object.create({});
        Object.assign(obj,prevState);
        obj[i] = changeObj[i];
        return obj;
      }); 
    }
  }

  const setPlay=()=>{
    setAnimationFrame((prevState)=>{return[true,prevState[1]]})
  }

  const resetAnim=()=>{
    setAnimationFrame((prevState)=>{return[false,0]});
    setterMethodUnderAnimation(animationLoopData[0].changes)
    
  }
  const setPause=()=>{
    setAnimationFrame((prevState)=>{return[false,prevState[1]]})
  }

  useEffect(()=>{
    console.log(teethState);
  })

  //this runs after every render
  useEffect(()=>{
    //todo -> 
    const sleep = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
    async function frameCompute(){
      if(animationState[0] == true){
        //set animation state with respect to state
        if(animationState[1] == animationLoopData.length){
          setPause();
          return;
        }
        console.log(animationLoopData[0])
        setterMethodUnderAnimation(animationLoopData[Number(animationState[1])].changes);
        //wait some time
        await sleep(frameRate*1000)
        setAnimationFrame((prevState)=>{console.log(`frame:${prevState[1]}`);return [prevState[0],(prevState[0])?(prevState[1]+1):prevState[1]]})
      }
    }
    if(animationState[0]){
      frameCompute();
    }
  },[animationState])
  return (
    <div className="parentContainer">
      <div>
      <button onClick={()=>{setPlay()}}>Play</button>
      <button onClick={()=>{setPause()}}>Pause</button>
      <button onClick={()=>{resetAnim()}}>Reset</button>
      <div>{`Is Playing = ${animationState[0]}`}</div>
      <div>{`Frame No. = ${animationState[1]}`}</div>
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
