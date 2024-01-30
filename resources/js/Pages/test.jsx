import React, { useState, useRef } from "react";
 

const Box = () => { const [isFire, setIsFire] = useState(false); const boxRef = useRef(null);

const handleMouseDown = (event) => { const shiftX = event.clientX - boxRef.current.getBoundingClientRect().left; const shiftY = event.clientY - boxRef.current.getBoundingClientRect().top;

boxRef.current.style.position = "absolute"; boxRef.current.style.zIndex = 1000; document.body.append(boxRef.current);

moveAt(event.pageX, event.pageY);

function moveAt(pageX, pageY) { boxRef.current.style.left = pageX - shiftX + "px"; boxRef.current.style.top = pageY - shiftY + "px"; }

function onMouseMove(event) { moveAt(event.pageX, event.pageY); }

document.addEventListener("mousemove", onMouseMove);

boxRef.current.onmouseup = function() { document.removeEventListener("mousemove", onMouseMove); boxRef.current.onmouseup = null; };

boxRef.current.ondragstart = function() { return false; };

boxRef.current.onclick = function() { setIsFire(true); }; };

return (

  <div ref={boxRef} onMouseDown={handleMouseDown} style={{ position: "absolute", backgroundColor: isFire ? "red" : "lightblue", width: "100px", height: "100px", cursor: "pointer", transition: "transform 0.3s", }} > <div style={{ position: "absolute", top: "0", right: "0", backgroundColor: "red", width: "20px", height: "20px", borderRadius: "50%" }}> {isFire && <div>!</div>} </div> </div> ); };
  export default Box;
