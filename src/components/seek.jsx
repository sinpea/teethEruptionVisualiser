import { useState,useRef,useEffect } from "react";
import "./seek.css";
function Seek({setFrameFromSeek,seekPosition,isReset,setReset}){
    const [offset, setOffSet] = useState({ dx: 0, dy: 0 });
    const [position, setPosition] = useState(0);
    const width = 300;
    const ele = useRef(null);
    useEffect(() => {
      //console.log(seekPosition);
      if(ele.current != null){ele.current.style.transform = `translate(${seekPosition}px,0px)`}
});
    const handleMouseDown = (e) => {
      const startPosition = {
        x: e.clientX - offset.dx,
        y: e.clientY - offset.dy,
      };
  
      const handleMouseMove = (event) => {
        //do only if value is not more than 100%
        if (!ele.current) {
          return;
        }
  
        const dx1 = event.clientX - startPosition.x;
        const dy1 = event.clientY - startPosition.y;
        if(dx1/width >= 1){
          //console.log("quid")
          setFrameFromSeek(1);
        }
        else if(dx1/width <= 0){
          setFrameFromSeek(0);
        }
        else{
          setFrameFromSeek(dx1/width);
          //console.log(dx1/width);
        }
        //console.log(dx1);
        if(!(dx1/width > 1 || dx1/width < 0)){
          //ele.current.style.transform = `translate(${dx1}px,0px)`;
        }
        setOffSet((prevState) => {
          return { dx: dx1, dy: dy1 };
        });

        
        
      };
      const handleMouseUp = (event) => {
        //console.log(offset.dx);
        //startPosition.x = event.clientX - offset.dx;
        if(isReset){
          setOffSet((prevState) => {
            return { dx: 0, dy: 0 };
          });
          setReset();
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
        ele.current.style={transform:`translate(${seekPosition * 300}px,0px)`};
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