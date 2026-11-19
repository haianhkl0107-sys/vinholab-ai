const $=s=>document.querySelector(s);
const F=M.feats,x=F.map(f=>f.med);
const walk=(t,v)=>{let i=0;while(t.f[i]>=0)i=v[t.f[i]]<=t.t[i]?i+1:t.r[i];return t.t[i]};
const mean=a=>a.reduce((s,v)=>s+v,0)/a.length;
function predict(){
  const pw=mean(M.clf.map(t=>walk(t,x)));
  const type=pw>=.5?1:0,v=[...x,type];
  const qs=M.reg.map(t=>walk(t,v)),q=mean(qs);
  return{pw,type,q,sd:Math.sqrt(mean(qs.map(s=>(s-q)**2)))};
}
const grade=q=>q<5?'Kém':q<5.5?'Trung bình':q<6.5?'Khá':q<7.5?'Tốt':'Xuất sắc';
function render(){
  const{pw,type,q,sd}=predict();
  $('#tname').textContent=type?'Vang trắng':'Vang đỏ';
  $('#tp').textContent='Độ tin cậy '+Math.round((type?pw:1-pw)*100)+'%';
  $('#split i').style.width=(1-pw)*100+'%';
  $('#lr').textContent='Đỏ '+Math.round((1-pw)*100)+'%';
  $('#lw').textContent='Trắng '+Math.round(pw*100)+'%';
  $('#liq').style.fill='color-mix(in srgb,var(--straw) '+pw*100+'%,var(--ruby))';
  const f=.1+.78*Math.min(1,Math.max(0,(q-3)/6));
  $('#liqg').style.transform='translateY('+(156-130*f)+'px)';
  $('#qn').innerHTML=q.toFixed(1)+'<small> / 10</small>';
  $('#ql').textContent=grade(q);
  $('#qs').textContent='Dao động ±'+sd.toFixed(2)+' giữa '+M.reg.length+' cây quyết định';
}
const box=$('#inputs');
F.forEach((f,i)=>{
  const d=document.createElement('div');d.className='row';
  d.innerHTML=`<label for="r${i}">${f.vn} <small>${f.unit}</small></label><input id="r${i}" type="range" min="${f.lo}" max="${f.hi}" step="${f.step}"><input class="num" id="n${i}" type="number" step="${f.step}" inputmode="decimal" aria-label="${f.vn}">`;
  box.append(d);
});
function setAll(v){v.forEach((val,i)=>{x[i]=val;$('#r'+i).value=val;$('#n'+i).value=val.toFixed(F[i].dp)});render()}
box.addEventListener('input',e=>{
  const i=+e.target.id.slice(1),v=parseFloat(e.target.value);
  if(isNaN(v))return;
  x[i]=v;
  if(e.target.id[0]==='r')$('#n'+i).value=v.toFixed(F[i].dp);else $('#r'+i).value=v;
  $('#note').textContent='';render();
});
function pick(t){
  const s=M.samples.filter(s=>s.t===t),p=s[Math.floor(Math.random()*s.length)];
  setAll(p.x);
  $('#note').textContent='Mẫu thật trong dữ liệu kiểm tra: '+(t?'vang trắng':'vang đỏ')+', chuyên gia chấm '+p.q+'/10.';
}
$('#bRed').onclick=()=>pick(0);
$('#bWhite').onclick=()=>pick(1);
$('#bReset').onclick=()=>{setAll(F.map(f=>f.med));$('#note').textContent=''};
$('#imp').innerHTML=M.imp.map(o=>`<div class="ir"><span>${o.vn}</span><b><i style="width:${o.v/M.imp[0].v*100}%"></i></b><em>${Math.round(o.v*100)}%</em></div>`).join('');
$('#meta').textContent=`Huấn luyện trên ${M.n.toLocaleString('vi-VN')} mẫu. Kiểm tra trên 20% dữ liệu giữ lại: phân biệt đỏ/trắng đúng ${M.acc}%, điểm chất lượng lệch trung bình ${M.mae} điểm, ${M.w1}% dự đoán nằm trong khoảng ±1 điểm.`;
pick(0);
