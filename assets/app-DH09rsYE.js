async function y(n){const e=`https://openlibrary.org/search.json?q=${encodeURIComponent(n)}`;try{const t=await fetch(e);if(!t.ok)throw new Error(`HTTP Error: ${t.status}`);return(await t.json()).docs.slice(0,20)}catch(t){throw console.error("Error fetching Open Library data:",t),t}}async function w(n,e){const s=`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(`${n} ${e}`)}`;try{const o=await fetch(s);if(!o.ok)throw new Error(`HTTP Error: ${o.status}`);const u=await o.json();if(!u.items||!u.items.length)return null;const c=u.items[0].volumeInfo;return{title:c.title,author:c.authors?.join(", "),description:c.description,image:c.imageLinks?.thumbnail||"/public/placeholder.png",publishedDate:c.publishedDate}}catch(o){return console.error("Error fetching Google Books data:",o),null}}class k{constructor(){this.modal=null}async open(e,t,s){this.close(),this.modal=document.createElement("div"),this.modal.classList.add("modal"),this.modal.innerHTML=`
      <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="book-title">
        <button class="close-btn" aria-label="Close details">&times;</button>
        <img src="" alt="Book cover" class="detail-cover" id="detail-cover" />
        <div class="book-info">
          <h2 id="book-title">${t}</h2>
          <p class="meta"><strong>Author:</strong> ${s}</p>
          <p class="meta" id="isbn"></p>
          <p class="meta" id="published"></p>
          <p class="desc" id="description">Loading details...</p>
        </div>
      </div>
    `,document.body.appendChild(this.modal);const o=this.modal.querySelector(".close-btn"),u=this.modal.querySelector("#description"),c=this.modal.querySelector("#published"),r=this.modal.querySelector("#detail-cover"),p=this.modal.querySelector("#isbn");o.addEventListener("click",()=>this.close()),this.modal.addEventListener("click",a=>{a.target===this.modal&&this.close()}),document.addEventListener("keydown",a=>{a.key==="Escape"&&this.close()});let l=null;try{l=await w(t,s)}catch(a){console.warn("Google Books API failed:",a)}let m="Not available";try{const a=await fetch(`https://openlibrary.org${e}/editions.json`);if(a.ok){const i=(await a.json()).entries?.find(d=>d.isbn_10||d.isbn_13);i&&(m=i.isbn_13?.[0]||i.isbn_10?.[0]||"Not available")}}catch(a){console.warn("Error fetching ISBN:",a)}r.src=l?.image||"/public/placeholder.png",r.alt=`${t} cover`,u.textContent=l?.description||"No description available.",c.textContent=l?.publishedDate?`Published: ${l.publishedDate}`:"",p.textContent=`ISBN: ${m}`}close(){this.modal&&(this.modal.remove(),this.modal=null)}}const E=new k;function $(n){const e=document.getElementById("results");if(e.innerHTML="",!n.length){e.innerHTML="<p>No results found. Try a different title or author.</p>";return}const t=document.createElement("div");t.classList.add("results-grid");const s=JSON.parse(localStorage.getItem("favorites"))||[];n.forEach((o,u)=>{const c=o.cover_i?`https://covers.openlibrary.org/b/id/${o.cover_i}-M.jpg`:"/public/placeholder.png",r=o.title||"Untitled",p=o.author_name?o.author_name.join(", "):"Unknown Author",l=document.createElement("div");l.classList.add("book-card"),l.innerHTML=`
  <div class="flip-card-inner">
    <div class="flip-card-front">
      <img src="${c}" alt="${r}" class="book-cover" />
      <h3>${r}</h3>
      <p>${p}</p>
      </div>
    <div class="flip-card-back">
      <h3>${r}</h3>
      <p><strong>Author:</strong> ${p}</p>
      
      <p class="small-muted">Click “View Details” for more info</p>
      
      <div class="card-actions">
        <button class="details-btn" data-key="${o.key}">View Details</button>
        <button class="fav-btn">★ Favorite</button>
      </div>
      
    </div>
  </div>
`,l.querySelector(".details-btn").addEventListener("click",()=>{E.open(o.key,r,p)}),l.querySelector(".fav-btn").addEventListener("click",async()=>{if(s.some(i=>i.title===r)){alert(`"${r}" is already in your favorites.`);return}let m="Unavailable";try{const i=await fetch(`https://openlibrary.org${o.key}.json`),d=i.ok?await i.json():null;if(d&&(d.isbn_13||d.isbn_10))m=d.isbn_13?.[0]||d.isbn_10?.[0];else if(d){const f=await fetch(`https://openlibrary.org${o.key}/editions.json`);if(f.ok){const h=(await f.json()).entries?.find(g=>g.isbn_10||g.isbn_13);h&&(m=h.isbn_13?.[0]||h.isbn_10?.[0]||"Unavailable")}}}catch(i){console.error("Error fetching ISBN for favorite:",i)}const a={title:r,author:p,isbn:m};s.push(a),localStorage.setItem("favorites",JSON.stringify(s));const b=s.map(i=>`${i.title} — ${i.author} (ISBN: ${i.isbn})`).join(`
`);await navigator.clipboard.writeText(b),alert(`"${r}" added to favorites!
Full list copied to clipboard.`)}),t.appendChild(l)}),e.appendChild(t)}const L=document.getElementById("search-form"),S=document.getElementById("search-input");L.addEventListener("submit",async n=>{n.preventDefault();const e=S.value.trim(),t=document.getElementById("results");if(!e){t.innerHTML="<p>Please enter a title or author.</p>";return}t.innerHTML='<p class="loading">Searching <span class="spinner"></span></p>';try{const s=await y(e);await new Promise(o=>setTimeout(o,400)),$(s)}catch(s){console.error(s),t.innerHTML='<p class="error">Failed to load results. Please try again.</p>'}});const B=document.getElementById("menu-toggle"),v=document.getElementById("nav-menu");B.addEventListener("click",()=>{v.classList.toggle("open")});v.querySelectorAll("a").forEach(n=>{n.addEventListener("click",()=>v.classList.remove("open"))});document.addEventListener("click",n=>{const e=document.querySelector(".modal");e&&n.target===e&&e.remove()});document.addEventListener("keydown",n=>{if(n.key==="Escape"){const e=document.querySelector(".modal");e&&e.remove()}});
