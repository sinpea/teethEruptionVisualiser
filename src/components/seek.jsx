import { useState,useRef,useEffect } from "react";
import "./seek.css";
function Seek({setFrameFromSeek,setReset,setIsEnd,seekPosition,isReset,isEnded}){
    const [offset, setOffSet] = useState({ dx: 0, dy: 0 });
    const width = 300;
    const ele = useRef(null);
    const startPosition = {x:0,y:0}
    useEffect(() => {
      //set seek position after every render
      if(ele.current != null){ele.current.style.transform = `translate(${seekPosition}px,0px)`}
    });

    useEffect(()=>{
      if(isReset){
        //set seek position, everything to zero
        setOffSet((prevState)=>{return {dx:0,dy:0}})
        setFrameFromSeek(0);
        setReset();
      }
    },[isReset])

    useEffect(()=>{
      const setDisplaceMent = (dxVal)=>{
        setOffSet((prevState)=>{return {dx:dxVal,dy:0}})
      }
      if(isEnded){
        setDisplaceMent(width);
        setIsEnd();
      }
    },[isEnded])
    
    const handleMouseDown = (e) => {
      
      startPosition.x= e.clientX - offset.dx;
      startPosition.y= e.clientY - offset.dy;
      
  
      const handleMouseMove = (event) => {
        //do only if ele exists/has been loaded
        if(isReset){
          console.log("SKIPPY BYG");

          //setReset only works when new frame is rendered but we donr
          //do that here
          setReset();
        } 
        if (!ele.current) {
          return;
        }
  
        const dx1 = event.clientX - startPosition.x;
        const dy1 = event.clientY - startPosition.y;

        //checks for if mouse pointer is within range of seek and handles exceptions
        if(dx1/width >= 1){
          setFrameFromSeek(1);
        }
        else if(dx1/width <= 0){
          setFrameFromSeek(0);
        }
        else{
          setFrameFromSeek(dx1/width);
        }
        setOffSet((prevState) => {
          return { dx: dx1, dy: dy1 };
        });        
      };
      const handleMouseUp = (event) => {

        //handles the reset button press and subsequent mouse operations
        if(isReset){
          
        }
        const dx1 = event.clientX - startPosition.x;
        console.log(`dx1 ${startPosition.x}`);
        if(dx1/width >= 1){
          setFrameFromSeek(1);
        }
        else if(dx1/width <= 0){
          setFrameFromSeek(0);
        }
        else{
          setFrameFromSeek(dx1/width);
          console.log(dx1/width);
        }
        //ele.current.style={transform:`translate(${seekPosition * 300}px,0px)`};
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }; 
    return (
      <div className="seek">
        <div className="draggable" ref={ele} style={{}} onMouseDown={handleMouseDown}></div>
      </div>
    );
  }

export {Seek}