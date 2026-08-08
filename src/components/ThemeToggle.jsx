import {useEffect,useState} from "react";


function ThemeToggle(){


const [dark,setDark]=useState(

localStorage.getItem("theme")==="dark"

);



useEffect(()=>{


if(dark){

document.documentElement
.setAttribute(
"data-theme",
"dark"
);

}

else{

document.documentElement
.removeAttribute(
"data-theme"
);

}



localStorage.setItem(

"theme",

dark ? "dark":"light"

);



},[dark]);




return(

<button

className="theme-button"

onClick={()=>setDark(!dark)}

>

{dark ? "☀️":"🌙"}

</button>

)


}


export default ThemeToggle;