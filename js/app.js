(()=>{
const $=(s,e=document)=>e.querySelector(s),$$=(s,e=document)=>[...e.querySelectorAll(s)];
const img=n=>`assets/img/${n}`;
const cat=id=>CATEGORIAS.find(c=>c.id===id);
const art=id=>ARTIGOS.find(a=>a.id===id);
const mins=a=>Math.max(1,Math.round(a.texto.split(/\s+/).length/200));
const reduz=matchMedia('(prefers-reduced-motion:reduce)').matches;
const guarda={
  ler(){try{return JSON.parse(localStorage.getItem('clio:lista'))||[]}catch{return[]}},
  gravar(v){try{localStorage.setItem('clio:lista',JSON.stringify(v))}catch{}}
};
let lista=guarda.ler(),filtro={cat:null,q:''},atual=0,timer;
const salvo=id=>lista.includes(id);
const rotulo=id=>salvo(id)?'✓ Na minha lista':'+ Minha lista';
const btnSalvar=id=>`<button class="btn vidro" data-salvar="${id}" aria-pressed="${salvo(id)}">${rotulo(id)}</button>`;

/* Cards e trilhos */
const card=a=>{const c=cat(a.cat),capa=a.hero||c.capa;return `<a class="card" href="#/artigo/${a.id}" style="--tom:${c.tom}">${capa?`<img src="${img(capa)}-640.webp" width="640" height="360" alt="" loading="lazy">`:''}<p class="cat">${c.nome}</p><h3>${a.titulo}</h3><p class="meta">${mins(a)} min de leitura</p></a>`};
const trilho=(titulo,arts,id)=>`<section class="prateleira" aria-labelledby="t-${id}"><div class="cab"><h2 id="t-${id}">${titulo}</h2><div class="setas"><button data-seta="-1" aria-label="Anterior: ${titulo}">‹</button><button data-seta="1" aria-label="Próximo: ${titulo}">›</button></div></div><div class="trilho" tabindex="0" role="region" aria-label="${titulo}">${arts.map(card).join('')}</div></section>`;

function render(){
  const q=filtro.q.trim().toLowerCase();let h='';
  if(filtro.cat||q){
    const r=ARTIGOS.filter(a=>(!filtro.cat||a.cat===filtro.cat)&&(!q||(a.titulo+a.resumo+a.texto+cat(a.cat).nome).toLowerCase().includes(q)));
    const msg=q?'Nenhum resultado para a busca. Tente outra palavra.':'Ainda não há artigos neste assunto. Volte em breve.';
    h=`<section class="resultados"><div class="cab"><h2>${filtro.cat?cat(filtro.cat).nome:'Resultados'}</h2><button class="btn vidro peq" data-limpar>Limpar filtro</button></div>${r.length?`<div class="grade">${r.map(card).join('')}</div>`:`<p class="vazio">${msg}</p>`}</section>`;
  }else{
    const sv=ARTIGOS.filter(a=>salvo(a.id));
    if(sv.length)h+=trilho('Minha lista',sv,'lista');
    CATEGORIAS.forEach(c=>{const r=ARTIGOS.filter(a=>a.cat===c.id);if(r.length)h+=trilho(c.nome,r,c.id)});
  }
  $('#trilhos').innerHTML=h;
}
function aplicar(rolar){
  document.body.classList.toggle('filtrando',!!(filtro.cat||filtro.q.trim()));
  $$('.tile').forEach(t=>t.setAttribute('aria-pressed',t.dataset.cat===filtro.cat));
  render();
  if(rolar)$('#assuntos').scrollIntoView({block:'start'});
}

/* Destaques (hero) */
const dest=ARTIGOS.filter(a=>a.hero);
$('#slides').innerHTML=dest.map((a,k)=>{const c=cat(a.cat);return `<article class="slide${k?'':' on'}" aria-roledescription="slide" aria-label="${k+1} de ${dest.length}"><img src="${img(a.hero)}-1600.webp" width="1600" height="900" alt="" ${k?'loading="lazy"':'fetchpriority="high"'}><div class="tx"><p class="cat">${c.nome}</p><h2>${a.titulo}</h2><p class="resumo">${a.resumo}</p><div class="acoes"><a class="btn cheio" href="#/artigo/${a.id}">Ler artigo</a>${btnSalvar(a.id)}</div></div></article>`}).join('');
$('#pontos').innerHTML=dest.map((_,k)=>`<button aria-label="Destaque ${k+1}" aria-current="${k===0}"></button>`).join('');
const slides=$$('.slide'),pts=$$('#pontos button'),hero=$('.hero'),faixaSlides=$('#slides');
const modoMobile=matchMedia('(max-width:700px)');
function ir(n,mover=true){
  atual=(n+slides.length)%slides.length;
  slides.forEach((s,k)=>{s.classList.toggle('on',k===atual);s.inert=k!==atual});
  pts.forEach((p,k)=>p.setAttribute('aria-current',k===atual));
  if(modoMobile.matches&&mover)faixaSlides.scrollTo({left:atual*faixaSlides.clientWidth,behavior:reduz?'auto':'smooth'});
}
const pausa=()=>clearInterval(timer);
const auto=()=>{pausa();if(!reduz&&slides.length>1)timer=setInterval(()=>ir(atual+1),8000)};
pts.forEach((p,k)=>p.addEventListener('click',()=>{ir(k);auto()}));
['mouseenter','focusin'].forEach(e=>hero.addEventListener(e,pausa));
['mouseleave','focusout'].forEach(e=>hero.addEventListener(e,auto));

let fimScroll;
faixaSlides.addEventListener('scroll',()=>{
  if(!modoMobile.matches)return;
  pausa();
  clearTimeout(fimScroll);
  fimScroll=setTimeout(()=>{
    const largura=Math.max(1,faixaSlides.clientWidth);
    const n=Math.round(faixaSlides.scrollLeft/largura);
    if(n!==atual)ir(n,false);
    auto();
  },100);
},{passive:true});
faixaSlides.addEventListener('pointerdown',()=>{if(modoMobile.matches)pausa()},{passive:true});

let inicioX=0,arrastando=false;
faixaSlides.addEventListener('pointerdown',e=>{
  if(modoMobile.matches||e.button!==0||e.target.closest('a,button,input'))return;
  inicioX=e.clientX;
  arrastando=true;
  pausa();
  faixaSlides.classList.add('arrastando');
  faixaSlides.setPointerCapture?.(e.pointerId);
});
faixaSlides.addEventListener('pointerup',e=>{
  if(!arrastando||modoMobile.matches)return;
  const dx=e.clientX-inicioX;
  arrastando=false;
  faixaSlides.classList.remove('arrastando');
  faixaSlides.releasePointerCapture?.(e.pointerId);
  if(Math.abs(dx)>=60)ir(atual+(dx<0?1:-1));
  auto();
});
faixaSlides.addEventListener('pointercancel',()=>{
  if(!arrastando)return;
  arrastando=false;
  faixaSlides.classList.remove('arrastando');
  auto();
});
modoMobile.addEventListener?.('change',()=>ir(atual));
if(slides.length){ir(0);auto()}

/* Assuntos */
$('#tiles').innerHTML=CATEGORIAS.map(c=>`<button class="tile" data-cat="${c.id}" aria-pressed="false" style="--tom:${c.tom}">${c.capa?`<img src="${img(c.capa)}-640.webp" width="640" height="360" alt="" loading="lazy">`:''}<span>${c.nome}</span></button>`).join('');

/* Minha lista */
function alternar(id){
  lista=salvo(id)?lista.filter(x=>x!==id):[...lista,id];
  guarda.gravar(lista);
  $$(`[data-salvar="${id}"]`).forEach(b=>{b.setAttribute('aria-pressed',salvo(id));b.textContent=rotulo(id)});
  if(!filtro.cat&&!filtro.q.trim())render();
}

/* Leitor */
const L=$('#leitor'),TIT=document.title;
function abrir(id){
  const a=art(id);if(!a)return;
  const c=cat(a.cat),arte=a.hero||c.capa;
  L.innerHTML=`<div class="arte" style="--tom:${c.tom}">${arte?`<img src="${img(arte)}-1600.webp" width="1600" height="900" alt="">`:''}<button class="fechar" data-fechar aria-label="Fechar artigo">×</button></div><article class="corpo"><p class="cat">${c.nome}</p><h2 id="l-titulo">${a.titulo}</h2><p class="meta">${mins(a)} min de leitura</p><p class="resumo">${a.resumo}</p><div class="acoes">${btnSalvar(a.id)}</div><div class="texto">${a.texto.split('\n').map(p=>`<p>${p}</p>`).join('')}</div></article>`;
  if(!L.open){L.showModal();document.body.classList.add('travado')}
  L.scrollTop=0;document.title=`${a.titulo} · Clio+`;
}
function rota(){
  const m=location.hash.match(/^#\/artigo\/([\w-]+)/);
  if(m&&art(m[1]))abrir(m[1]);else if(L.open)L.close();
}
L.addEventListener('close',()=>{
  document.body.classList.remove('travado');document.title=TIT;
  if(location.hash.startsWith('#/artigo'))history.replaceState(null,'',location.pathname+location.search);
});
L.addEventListener('click',e=>{if(e.target===L)L.close()});
addEventListener('hashchange',rota);

/* Eventos */
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-cat],[data-salvar],[data-seta],[data-limpar],[data-fechar]');if(!t)return;
  if(t.dataset.cat){filtro.cat=filtro.cat===t.dataset.cat?null:t.dataset.cat;filtro.q='';$('#q').value='';aplicar(true)}
  else if(t.dataset.salvar)alternar(t.dataset.salvar);
  else if(t.dataset.seta){const r=t.closest('.prateleira').querySelector('.trilho');r.scrollBy({left:r.clientWidth*.8*t.dataset.seta,behavior:reduz?'auto':'smooth'})}
  else if(t.dataset.limpar!==undefined){filtro={cat:null,q:''};$('#q').value='';aplicar()}
  else if(t.dataset.fechar!==undefined)L.close();
});
$('#q').addEventListener('input',e=>{filtro.q=e.target.value;if(filtro.q.trim())filtro.cat=null;aplicar()});
$('.busca').addEventListener('submit',e=>e.preventDefault());
addEventListener('scroll',()=>$('#topo').classList.toggle('solido',scrollY>30),{passive:true});

render();rota();
})();
