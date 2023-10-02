// eslint-disable-next-line no-unused-vars
import React from "react";

import { useState, useCallback, useEffect ,useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef=useRef(null);
  const passwardGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (characterAllowed) str += "!@#$%^&*()_+:[]{}]|<>";
    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random()* str.length + 1);
      pass+= str.charAt(index);
      setPassword(pass);
    }
  }, [length, numberAllowed, characterAllowed, setPassword]);
  const copyPasswordToClipBord=useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  },[password])
  useEffect(()=>{passwardGenerator()},[length,numberAllowed,characterAllowed])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-10 py-3 my-8 text text-orange-500 bg-gray-800">
        <h1 className="text-white text-center">Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button 
          onClick={copyPasswordToClipBord}
          className="outline-none bg-blue-700 text-white px-3 py-o.5shrink-0">
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex text-sm gap-x-1">
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
              className="cursor-pointer"
            />
            <label>length:{length}</label>
          </div>
          <div className="flex text-sm gap-x-1">
            <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={()=>setNumberAllowed((prev)=>!prev)}
            />
            <label>Numbers</label>
          </div>
          <div className="flex text-sm gap-x-1">
            <input
            type="checkbox"
            defaultChecked={characterAllowed}
            id="characterrInput"
            onChange={()=>setCharacterAllowed((prev)=>!prev)}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
