const scenes=[...document.querySelectorAll(".scene")];
const progress=document.querySelector(".progress i");
let current=0;

function go(n){
  current=Math.max(0,Math.min(n,scenes.length-1));
  scenes.forEach((s,i)=>s.classList.toggle("active",i===current));
  progress.style.width=((current+1)/scenes.length*100)+"%";
  window.scrollTo(0,0);
}
function type(el,text,speed,done){
  el.textContent="";
  let i=0;
  const timer=setInterval(()=>{
    el.textContent+=text[i++];
    if(i>=text.length){clearInterval(timer); if(done)done();}
  },speed);
}

document.getElementById("rakhi1").onclick=()=>go(1);
document.getElementById("rakhi2").onclick=()=>{
  go(2);
  setTimeout(()=>{
    type(document.getElementById("typeTitle"),"HAPPY RAKSHA BANDHAN",52,()=>{
      setTimeout(()=>type(document.getElementById("typeSub"),"A bond that grows stronger with every thread.",34,()=>{
        document.getElementById("next3").classList.add("show");
      }),180);
    });
  },550);
};

document.getElementById("next3").onclick=()=>go(3);
document.getElementById("envelope").onclick=()=>{
  go(4);
  setTimeout(()=>{
    type(document.getElementById("letterTitle"),"Happy Raksha Bandhan",48,()=>{
      setTimeout(()=>type(document.getElementById("letterSub"),"Just for My Sister",38,()=>{
        setTimeout(()=>type(document.getElementById("letterText"),
`All those childhood fights, stealing each other’s things,
complaining about each other, and then laughing
together a few minutes later — that’s what makes the
bond between a brother and sister so special. 😊

You may annoy me, I may annoy you, and we may never
miss a chance to tease each other, but life wouldn’t feel
the same without you.

This Raksha Bandhan, here’s to all the crazy memories,
endless teasing, little fights, and the love that always stays.
🎀 ❤️ ✨`,24),180);
      }),180);
    });
  },250);
};

document.getElementById("close").onclick=()=>{ /* final screen stays final */ };

history.pushState(null,"",location.href);
addEventListener("popstate",()=>history.pushState(null,"",location.href));
go(0);

// Memories: five replaceable photos, swipe/arrow navigation.
const toMemories=document.getElementById("toMemories");
if(toMemories) toMemories.onclick=()=>go(5);

const cards=[...document.querySelectorAll(".memory-card")];
const dots=[...document.querySelectorAll(".dot")];
let memoryIndex=0;
function showMemory(i){
  memoryIndex=(i+cards.length)%cards.length;
  cards.forEach((card,n)=>card.classList.toggle("active",n===memoryIndex));
  dots.forEach((dot,n)=>dot.classList.toggle("active",n===memoryIndex));
}
document.getElementById("memPrev").onclick=()=>showMemory(memoryIndex-1);
document.getElementById("memNext").onclick=()=>showMemory(memoryIndex+1);
dots.forEach((d,i)=>d.onclick=()=>showMemory(i));

let sx=0;
const slider=document.getElementById("memorySlider");
slider.addEventListener("touchstart",e=>sx=e.changedTouches[0].screenX,{passive:true});
slider.addEventListener("touchend",e=>{
  const dx=e.changedTouches[0].screenX-sx;
  if(Math.abs(dx)>45) showMemory(memoryIndex+(dx<0?1:-1));
},{passive:true});
