
// App JS — shared across pages
const PRODUCTS = [
  {id:1,slug:'police-system',title:'نظام شرطة متكامل',price:12,category:'شرطة',img:'assets/police.png',desc:'نظام إدارة شرطة كامل مع لوحة تحكم'},
  {id:2,slug:'weed-system',title:'نظام الحشيش',price:25,category:'مهمات',img:'assets/weed.png',desc:'نظام زراعة وبيع الماريجوانا الكامل مع ميزات متقدمة وطريقة لعب واقعية'},
  {id:3,slug:'gang-system',title:'نظام العصابات',price:30,category:'مهمات',img:'assets/gang.png',desc:'نظام متقدم لإدارة العصابات مع ميزات الأراضي والحروب وتجارة المخدرات'}
];

// Simple helpers
function q(sel, root=document){return root.querySelector(sel)}
function qAll(sel, root=document){return Array.from(root.querySelectorAll(sel))}

// Cart (localStorage)
const CART_KEY = 'dream_cart_v1';
function loadCart(){ try { return JSON.parse(localStorage.getItem(CART_KEY)) || [] } catch(e){return []} }
function saveCart(items){ localStorage.setItem(CART_KEY, JSON.stringify(items)); updateCartIcon(); }
function addToCart(productId){
  const p = PRODUCTS.find(x=>x.id===productId); if(!p) return;
  const items = loadCart(); items.push(p); saveCart(items);
  showToast('أضيف إلى السلة');
}
function removeFromCart(index){
  const items = loadCart(); items.splice(index,1); saveCart(items);
}
function cartTotal(){ return loadCart().reduce((s,i)=>s+i.price,0); }
function updateCartIcon(){
  const count = loadCart().length;
  qAll('#cart-count').forEach(el => el.textContent = count);
  qAll('#cart-total').forEach(el => el.textContent = cartTotal() + ' $');
  renderCartList();
}

function renderCartList(){
  const list = q('#cart-list');
  if(!list) return;
  const items = loadCart();
  if(items.length===0){ list.innerHTML = '<div class="muted">السلة فارغة</div>'; return; }
  list.innerHTML = items.map((it,idx)=>`<div style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.03)"><div><strong>${it.title}</strong></div><div class="muted">${it.price} $</div><div style="margin-top:6px"><button class="btn" onclick="removeFromCart(${idx});updateCartIcon()">إزالة</button></div></div>`).join('');
}

// Render products
function renderGrid(containerId, items){
  const container = q('#'+containerId); if(!container) return;
  container.innerHTML = items.map(p=>`
    <article class="card">
      <div class="thumb"><img src="${p.img}" alt="${p.title}" style="max-width:100%;max-height:100%"/></div>
      <div style="margin-top:8px">
        <div class="title">${p.title}</div>
        <div class="muted">${p.desc}</div>
        <div class="price">${p.price} $</div>
        <div style="margin-top:8px;display:flex;gap:8px">
          <a class="btn" href="product.html?id=${p.id}">تفاصيل</a>
          <button class="btn ghost" onclick="addToCart(${p.id})">أضف للسلة</button>
        </div>
      </div>
    </article>
  `).join('');
}

// Product detail page
function renderProductDetail(){
  const el = q('#product-detail'); if(!el) return;
  const params = new URLSearchParams(location.search);
  const id = Number(params.get('id'));
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p){ el.innerHTML = '<div>المنتج غير موجود</div>'; return; }
  el.innerHTML = `<div class="left"><div class="card"><img src="${p.img}" style="width:100%;border-radius:8px"/></div></div>
  <div class="right">
    <h2>${p.title}</h2>
    <div class="muted">${p.category}</div>
    <div class="price">${p.price} $</div>
    <p style="margin-top:12px">${p.desc}</p>
    <div style="margin-top:12px">
      <button class="btn" onclick="addToCart(${p.id})">أضف للسلة</button>
      <a href="support.html" class="btn ghost" style="margin-inline-start:8px">اطلب دعم / استفسار</a>
    </div>
  </div>`;
}

// Simple toast (popup)
function showToast(text,timeout=2000){
  let el = document.getElementById('toast');
  if(!el){ el = document.createElement('div'); el.id='toast'; el.style= 'position:fixed;bottom:14px;left:14px;background:#22c55e;color:#fff;padding:10px 14px;border-radius:8px;box-shadow:0 6px 18px rgba(0,0,0,0.25)'; document.body.appendChild(el); }
  el.textContent = text; el.style.display='block';
  setTimeout(()=>el.style.display='none', timeout);
}

// Drawer toggle
function toggleCart(open){
  const d = document.getElementById('cart-drawer');
  if(!d) return;
  d.setAttribute('aria-hidden', open? 'false':'true');
}

// Language toggle (RTL/LTR)
function setupLangToggle(){
  qAll('#lang-toggle').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const body = document.body;
      if(body.classList.contains('page-rtl')){
        body.classList.remove('page-rtl'); body.classList.add('lang-ltr'); btn.textContent='AR';
      } else {
        body.classList.remove('lang-ltr'); body.classList.add('page-rtl'); btn.textContent='EN';
      }
    });
  });
}

// Support form + webhook
const WEBHOOK_PLACEHOLDER = 'PUT_YOUR_WEBHOOK_HERE_BASE64'; // put base64 encoded webhook URL here
function decodeWebhook(b64){ try{ return atob(b64); }catch(e){return null} }

async function sendDiscordTicket(discordName, email, message){
  const webhook = decodeWebhook(WEBHOOK_PLACEHOLDER);
  if(!webhook){ console.log('Webhook not configured'); return false; }
  const ticketId = 'TCK-' + Math.random().toString(36).substring(2,8).toUpperCase();
  let ip = 'Unknown';
  try{ ip = await fetch('https://api.ipify.org?format=json').then(r=>r.json()).then(d=>d.ip).catch(()=>ip); }catch(e){}
  const device = navigator.userAgent;
  const payload = {
    username: 'DreamStore Tickets',
    embeds:[{
      title:`🎫 تذكرة جديدة (${ticketId})`,
      color: 5814783,
      fields:[
        {name:'Discord', value: discordName||'غير محدد', inline:true},
        {name:'Email', value: email||'غير محدد', inline:true},
        {name:'Ticket ID', value: ticketId, inline:true},
        {name:'Message', value: message},
        {name:'IP', value: ip, inline:true},
        {name:'Device', value: device}
      ],
      timestamp: new Date().toISOString()
    }]
  };
  try{
    await fetch(webhook, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)});
    return {ok:true, id:ticketId};
  }catch(e){
    console.error('Webhook error', e);
    return {ok:false};
  }
}

// Init runs on every page
document.addEventListener('DOMContentLoaded', ()=>{

  // initial renders
  renderGrid('featured-grid', PRODUCTS.slice(0,3));
  renderGrid('products-grid', PRODUCTS);
  renderProductDetail();
  updateCartIcon();

  // cart handlers
  qAll('#cart-btn').forEach(b=>b.addEventListener('click', ()=> toggleCart(true)));
  qAll('#checkout-btn').forEach(b=>b.addEventListener('click', ()=> {
    const items = loadCart();
    if(items.length===0){ showToast('السلة فارغة'); return; }
    // For static site - go to support page to finalize order
    location.href='support.html';
  }));
  qAll('.drawer-inner').forEach(el=>el.addEventListener('click', e=>e.stopPropagation()));
  qAll('#cart-drawer').forEach(d=>d.addEventListener('click', ()=>toggleCart(false)));

  // language/button setup
  setupLangToggle();

  // Support form submission (on support.html)
  const supportForm = q('#supportForm');
  if(supportForm){
    supportForm.addEventListener('submit', async (ev)=>{
      ev.preventDefault();
      const dn = q('#discordName').value.trim();
      const em = q('#email').value.trim();
      const msg = q('#message').value.trim();
      if(!msg){ showToast('اكتب رسالة التذكرة'); return; }
      const res = await sendDiscordTicket(dn, em, msg);
      if(res && res.ok){
        q('#support-res').textContent = 'تم إرسال التذكرة بنجاح — معرّف: ' + res.id;
        saveCart([]); // clear cart optionally or keep
      } else {
        q('#support-res').textContent = 'فشل إرسال التذكرة، حاول لاحقًا';
      }
    });
    q('#clear-support')?.addEventListener('click', ()=>{ q('#discordName').value=''; q('#email').value=''; q('#message').value=''; q('#support-res').textContent=''; });
  }

});
