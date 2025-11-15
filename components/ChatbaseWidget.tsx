"use client";
import { useEffect } from "react";

export default function ChatbaseWidget() {
  useEffect(() => {
    // Previene que se cargue más de una vez
    if (document.getElementById("chatbase-init")) return;

    const script = document.createElement("script");
    script.id = "chatbase-init";
    script.innerHTML = `
      (function(){
        if(!window.chatbase || window.chatbase("getState")!=="initialized"){
          window.chatbase=(...arguments)=>{
            if(!window.chatbase.q){window.chatbase.q=[]}
            window.chatbase.q.push(arguments)
          };
          window.chatbase=new Proxy(window.chatbase,{
            get(target,prop){
              if(prop==="q"){return target.q}
              return(...args)=>target(prop,...args)
            }
          })
        }
        const onLoad=function(){
          const script=document.createElement("script");
          script.src="https://www.chatbase.co/embed.min.js";
          script.id="-yGmqJy62lJqYYLsNGGbs";
          script.domain="www.chatbase.co";
          document.body.appendChild(script)
        };
        if(document.readyState==="complete"){onLoad()}
        else{window.addEventListener("load",onLoad)}
      })();
    `;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };

  }, []);

  return null;
}
