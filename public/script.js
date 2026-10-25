const BOUQ=["images/bouquet-1.webp", "images/bouquet-2.webp", "images/bouquet-3.webp", "images/bouquet-4.webp", "images/bouquet-5.webp"];const PET={"pink": ["images/petals/pink-1.webp", "images/petals/pink-2.webp", "images/petals/pink-3.webp", "images/petals/pink-4.webp", "images/petals/pink-5.webp", "images/petals/pink-6.webp", "images/petals/pink-7.webp", "images/petals/pink-8.webp", "images/petals/pink-9.webp", "images/petals/pink-10.webp", "images/petals/pink-11.webp", "images/petals/pink-12.webp", "images/petals/pink-13.webp", "images/petals/pink-14.webp"], "red": ["images/petals/red-1.webp", "images/petals/red-2.webp", "images/petals/red-3.webp", "images/petals/red-4.webp", "images/petals/red-5.webp", "images/petals/red-6.webp", "images/petals/red-7.webp", "images/petals/red-8.webp", "images/petals/red-9.webp", "images/petals/red-10.webp", "images/petals/red-11.webp", "images/petals/red-12.webp", "images/petals/red-13.webp", "images/petals/red-14.webp"], "white": ["images/petals/white-1.webp", "images/petals/white-2.webp", "images/petals/white-3.webp", "images/petals/white-4.webp"]};const EARTH="images/earth-1.webp";
const CFG={name:'родная',postcard:'images/postcard.webp',me:'images/me.webp',
mem:[{s:'images/memories/summer.webp',c:'Наше лето'},{s:'images/memories/day.webp',c:'Тот самый день'},{s:'images/memories/laugh.webp',c:'Смеялись до слёз'},{s:'images/memories/beauty.webp',o:'50% 22%',c:'Красивая именинница'},{s:'images/memories/duo.webp',c:'Мы вдвоём'},{s:'images/memories/best.webp',o:'50% 55%',c:'Ты лучшая'}],
fr:[{n:'Оля',t:'Ты — самая яркая звезда нашей компании. Сияй дальше!'}]};
const $=s=>document.querySelector(s),to=id=>document.getElementById(id).scrollIntoView({behavior:'smooth'});
$('#nm').textContent=CFG.name;
const ph=(s,e,t)=>s?`<img src="${s}" alt="">`:`<div class="ph"><em>${e}</em>${t||''}</div>`;
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');if(e.target.id=='s6'&&e.isIntersecting&&!window.fl){fl=1;fly()}}),{threshold:.25});
const watch=()=>document.querySelectorAll('.rv,#s6').forEach(e=>io.observe(e));
// 1 bouquets
const CP=['Ты — самое яркое солнышко в нашей жизни ☀️','С тобой любой день превращается в праздник','Твоя улыбка лечит лучше любых лекарств','Ты самая добрая, надёжная и настоящая подруга','Пусть все мечты летят к тебе, как эти цветы 💙'];
const TINT=[['pink',''],['white',''],['red','hue-rotate(12deg) saturate(.85) brightness(1.15)'],['pink','hue-rotate(-125deg) saturate(1.4)'],['pink','saturate(.45) brightness(1.15)']];
let cur=0,tm;const n=BOUQ.length;
BOUQ.forEach((s,i)=>{const d=document.createElement('div');d.className='b';d.innerHTML=`<img src="${s}" alt="Букет ${i+1}">`;$('#st').appendChild(d);$('#dots').innerHTML+='<b></b>'});
function petals(k){const old=$('#pl .L');if(old){old.style.opacity=0;setTimeout(()=>old.remove(),1300)}
const L=document.createElement('div');L.className='L';L.style.cssText='position:absolute;inset:0;transition:opacity 1.2s;opacity:0';
const [set,f]=TINT[k],A=PET[set];for(let i=0;i<20;i++){const im=new Image();im.src=A[i%A.length];const w=26+Math.random()*34;im.style.cssText=`left:${Math.random()*100}%;width:${w}px;filter:${f} drop-shadow(0 4px 4px #0a2a8a55);animation-duration:${8+Math.random()*9}s;animation-delay:-${Math.random()*14}s;--dx:${(Math.random()-.5)*220}px;--r:${(Math.random()>.5?1:-1)*(240+Math.random()*400)}deg`;L.appendChild(im)}
$('#pl').appendChild(L);requestAnimationFrame(()=>L.style.opacity=1)}
function render(){document.querySelectorAll('.b').forEach((b,i)=>{const d=(i-cur+n)%n;b.className='b'+(d==0?' on':d==n-1?' off':'')});document.querySelectorAll('#dots b').forEach((b,i)=>b.className=i==cur?'on':'');
const c=$('#comp');c.style.opacity=0;setTimeout(()=>{c.textContent=CP[cur%CP.length];c.style.opacity=1},350);petals(cur)}
function go(d){cur=(cur+d+n)%n;render();clearInterval(tm);tm=setInterval(()=>go(1),5500)}
let sx=null;$('#st').addEventListener('pointerdown',e=>sx=e.clientX);addEventListener('pointerup',e=>{if(sx!=null&&Math.abs(e.clientX-sx)>40&&e.target.closest('#st'))go(e.clientX<sx?1:-1);sx=null});
render();tm=setInterval(()=>go(1),5500);
// 2 postcard + streamers
$('#pc').innerHTML=ph(CFG.postcard,'💌','Здесь появится твоя открытка');if(CFG.postcard)$('#pc').classList.add('pc');
const cv=()=>{const c=document.createElement('canvas');c.width=innerWidth;c.height=innerHeight;c.style.cssText='position:fixed;inset:0;z-index:100;pointer-events:none';document.body.appendChild(c);return c};
$('#rd').onclick=function(){this.disabled=true;this.textContent='✓ Прочитано';this.classList.remove('pulse');
document.querySelectorAll('.lk').forEach(e=>e.classList.remove('lk'));watch();
const c=cv(),x=c.getContext('2d'),W=c.width,H=c.height,cols=['#ff9ed8','#ffe27a','#7fe3ff','#fff','#b9a8ff','#6dffb0'];
const S=[...Array(80)].map(()=>({x:Math.random()*W,y:-Math.random()*H*.9-50,v:4+Math.random()*5,A:12+Math.random()*24,f:.02+Math.random()*.03,p:Math.random()*6,L:180+Math.random()*240,w:5+Math.random()*6,c:cols[Math.random()*6|0]}));
const t0=performance.now();(function f(t){x.clearRect(0,0,W,H);S.forEach(s=>{s.y+=s.v;for(let j=0;j<s.L;j+=5){const y=s.y-j;if(y<-10||y>H+10)continue;x.strokeStyle=s.c;x.globalAlpha=1-j/s.L*.6;x.lineWidth=s.w*(.25+.75*Math.abs(Math.cos(y*s.f*1.3+s.p)));x.beginPath();x.moveTo(s.x+s.A*Math.sin(y*s.f+s.p),y);x.lineTo(s.x+s.A*Math.sin((y-5)*s.f+s.p),y-5);x.stroke()}});
if(t-t0<6500)requestAnimationFrame(f);else c.remove()})(t0);
setTimeout(()=>{const m=document.createElement('div');m.id='nx';m.innerHTML='Листай дальше ✨<small>↓</small>';document.body.appendChild(m);const k=()=>{m.style.transition='opacity .8s';m.style.opacity=0;setTimeout(()=>m.remove(),800)};m.onclick=k;setTimeout(k,3800)},1800)};
// 4 friends
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let WL=[],API=0;
const card=(f,i)=>`<div class="fc g rv" style="transition-delay:${i*.12}s"><p>«${esc(f.t)}»</p><b><span class="av">${f.p?`<img src="${esc(f.p)}" alt="">`:esc((f.n||'💙').trim()[0]||'💙')}</span>${esc(f.n||'Аноним')}</b></div>`;
function drawFr(){const all=[...CFG.fr,...WL];$('#fr').innerHTML=all.length?all.map(card).join(''):'<p class="em">Пока пусто — будь первым! 💙</p>';watch()}
async function loadWL(){try{const r=await fetch('api/wishes');if(!r.ok)throw 0;WL=await r.json();API=1}catch(e){API=0;try{WL=JSON.parse(localStorage.getItem('wl')||'[]')}catch(_){WL=[]}}drawFr()}
async function sendWL(t,n){if(API){const r=await fetch('api/wishes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({t,n})}),j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||'Не получилось отправить, попробуй ещё раз');WL.push(j)}else{WL.push({t,n});try{localStorage.setItem('wl',JSON.stringify(WL))}catch(_){}}}
const md=$('#md'),wt=$('#wt'),wn=$('#wn'),we=$('#we'),toast=m=>{const t=$('#ts');t.textContent=m;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),3400)};
$('#aw').onclick=()=>{md.hidden=false;we.textContent='';setTimeout(()=>wt.focus(),60)};
$('#wc').onclick=()=>md.hidden=true;
md.onclick=e=>{if(e.target===md)md.hidden=true};
addEventListener('keydown',e=>{if(e.key==='Escape')md.hidden=true});
$('#wf').onsubmit=async e=>{e.preventDefault();if($('#hp').value)return;const t=wt.value.trim(),n=wn.value.trim();if(t.length<2){we.textContent='Напиши хотя бы пару слов 💙';return}
const b=e.submitter;b.disabled=true;we.textContent='Отправляю…';
try{await sendWL(t,n);wt.value='';wn.value='';md.hidden=true;drawFr();const c=[...document.querySelectorAll('.fc')].pop();c.classList.add('in');c.scrollIntoView({behavior:'smooth',block:'center'});toast('Спасибо! Твоё пожелание добавлено 💙')}
catch(x){we.textContent=x instanceof TypeError?'Нет связи, попробуй ещё раз':x.message}
b.disabled=false};
// 5 memories
$('#pw').innerHTML=CFG.mem.map((m,i)=>`<div class="pol rv" style="--r:${(i%2?1:-1)*(2+i%3*2)}deg;--d:${i*.6}s" onclick="this.classList.toggle('big')"><div class="im" style="--o:${m.o||'center'}">${ph(m.s,['🌴','🌺','⭐','🐚','💙','🌊'][i],'Твоё фото')}</div><span>${m.c}</span></div>`).join('');
// 6 wishes
$('#me').innerHTML=ph(CFG.me,'👑','');
const W=['Посетить все города и страны, в которых ты мечтаешь побывать ✈️','Пусть билеты в любую точку мира будут всегда под рукой 🌍','Находить счастье в каждом новом месте 🌅','И всегда возвращаться туда, где тебя любят 💙'];let wi=0;
function show(i){$('#wish').innerHTML='<div class="wt">'+W[i].split(' ').map((w,k)=>`<span style="animation-delay:${k*.14}s">${w}</span>`).join('')+'</div>'}
let run=0;const C=[['Рим',23.5,21.4,'l'],['Стамбул',37.3,17.1,'r'],['Каир',36.3,32.4,'l'],['Дубай',66.7,46.9,'r'],['Найроби',46.1,76.9,'r']];
$('#gi').src=EARTH;
function rep(){fly()}
function fly(){const id=++run,g=$('#gl'),pl=$('#pn');wi=0;
$('#ct').innerHTML=C.map(c=>`<div class="ct" style="left:${c[1]}%;top:${c[2]}%"><i></i><span class="${c[3]}">${c[0]}</span></div>`).join('');
const pins=document.querySelectorAll('.ct'),act=i=>pins.forEach((e,j)=>e.classList.toggle('on',j==i)),P=i=>[C[i][1]*g.clientWidth/100,C[i][2]*g.clientHeight/100],set=(x,y,r,s)=>pl.style.transform=`translate(${x}px,${y}px) translate(-50%,-50%) rotate(${r}deg) scale(${s})`;
let a=0,b=1,st=performance.now(),mv=0,ang=0;show(0);act(0);
(function f(now){if(id!=run)return;const e=now-st;
if(!mv){set(...P(a),ang,1);if(e>2400){mv=1;st=now;wi=(wi+1)%W.length;show(wi);act(-1)}}
else{const t=Math.min(e/3800,1),s=t*t*(3-2*t),[x0,y0]=P(a),[x1,y1]=P(b),dx=x1-x0,dy=y1-y0;let nx=dy*.3,ny=-dx*.3;if(ny>0){nx=-nx;ny=-ny}
const cx=(x0+x1)/2+nx,cy=(y0+y1)/2+ny,u=1-s,x=u*u*x0+2*u*s*cx+s*s*x1,y=u*u*y0+2*u*s*cy+s*s*y1,tx=2*u*(cx-x0)+2*s*(x1-cx),ty=2*u*(cy-y0)+2*s*(y1-cy);
ang=Math.atan2(ty,tx)*180/Math.PI+90;set(x,y,ang,1+.4*Math.sin(Math.PI*t));
if(t>=1){mv=0;st=now;a=b;b=(b+1)%C.length;act(a)}}
requestAnimationFrame(f)})(performance.now())}
// 7 salute
function burst(){const c=cv(),x=c.getContext('2d'),W=c.width,H=c.height,P=[],R=[],K=[[255,110,190],[255,226,110],[110,225,255],[255,255,255],[185,160,255],[100,255,170],[255,150,70]];
const boom=(cx,cy)=>{const k1=K[Math.random()*7|0],k2=K[Math.random()*7|0],n=170+Math.random()*90|0,sp=4+Math.random()*(W<600?3:5),ring=Math.random()<.4;
for(let i=0;i<n;i++){const a=i/n*6.283,v=ring?sp:sp*(.3+Math.random()*.7);P.push({x:cx,y:cy,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:1,d:.005+Math.random()*.007,k:i%3?k1:k2,s:1.6+Math.random()*2.2})}
for(let i=0;i<25;i++)P.push({x:cx,y:cy,vx:(Math.random()-.5)*2,vy:(Math.random()-.5)*2,l:1.4,d:.012,k:[255,255,255],s:2.5,tw:1})};
for(let b=0;b<22;b++)setTimeout(()=>R.push({x:W*(.08+Math.random()*.84),y:H,ty:H*(.1+Math.random()*.42),vy:-(11+Math.random()*4)}),b*380+(b>10?200:0));
const t0=performance.now();(function f(t){x.globalCompositeOperation='destination-out';x.fillStyle='rgba(0,0,0,.2)';x.fillRect(0,0,W,H);x.globalCompositeOperation='lighter';
R.forEach((r,i)=>{r.y+=r.vy;x.fillStyle='#ffe9a8';x.beginPath();x.arc(r.x,r.y,2.5,0,6.28);x.fill();if(r.y<=r.ty){boom(r.x,r.y);R.splice(i,1)}});
P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.045;p.vx*=.985;p.vy*=.985;p.l-=p.d;const al=Math.max(p.l,0)*(p.tw?(Math.random()+.3):1);x.fillStyle=`rgba(${p.k},${Math.min(al,1)})`;x.beginPath();x.arc(p.x,p.y,p.s,0,6.28);x.fill();x.fillStyle=`rgba(${p.k},${Math.min(al,1)*.25})`;x.beginPath();x.arc(p.x,p.y,p.s*3,0,6.28);x.fill()});
for(let i=P.length-1;i>=0;i--)if(P[i].l<=0)P.splice(i,1);
if(t-t0<11000)requestAnimationFrame(f);else c.remove()})(t0)}
watch();
loadWL();
