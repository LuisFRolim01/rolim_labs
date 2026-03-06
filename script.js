var obs=new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(entry.isIntersecting){entry.target.classList.add('visible');}
  });
},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(function(el){obs.observe(el);});
var contactForm=document.getElementById('contactForm');
var formStatus=document.getElementById('form-status');
var submitBtn=document.getElementById('submitBtn');
if(contactForm){
  contactForm.addEventListener('submit',async function(e){
    e.preventDefault();
    submitBtn.textContent='Enviando...';
    submitBtn.disabled=true;
    submitBtn.style.opacity='0.6';
    var data=new FormData(contactForm);
    try{
      var res=await fetch('https://formspree.io/f/mdawnzbl',{method:'POST',body:data,headers:{Accept:'application/json'}});
      if(res.ok){
        formStatus.style.display='block';
        formStatus.style.background='rgba(249,115,22,0.1)';
        formStatus.style.border='1px solid rgba(249,115,22,0.3)';
        formStatus.style.color='#F97316';
        formStatus.textContent='Mensagem enviada com sucesso! Responderei em ate 24h.';
        contactForm.reset();
        submitBtn.textContent='Mensagem enviada!';
        setTimeout(function(){formStatus.style.display='none';submitBtn.textContent='Enviar Mensagem';submitBtn.disabled=false;submitBtn.style.opacity='1';},5000);
      } else {
        formStatus.style.display='block';
        formStatus.style.background='rgba(239,68,68,0.1)';
        formStatus.style.border='1px solid rgba(239,68,68,0.3)';
        formStatus.style.color='#f87171';
        formStatus.textContent='Erro ao enviar. Tente novamente ou entre em contato pelo email diretamente.';
        submitBtn.textContent='Enviar Mensagem';
        submitBtn.disabled=false;
        submitBtn.style.opacity='1';
      }
    } catch(err){
      formStatus.style.display='block';
      formStatus.style.background='rgba(239,68,68,0.1)';
      formStatus.style.border='1px solid rgba(239,68,68,0.3)';
      formStatus.style.color='#f87171';
      formStatus.textContent='Erro de conexao. Verifique sua internet e tente novamente.';
      submitBtn.textContent='Enviar Mensagem';
      submitBtn.disabled=false;
      submitBtn.style.opacity='1';
    }
  });
}
var navLinks=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',function(){
  var current='';
  document.querySelectorAll('section[id]').forEach(function(s){if(window.scrollY>=s.offsetTop-220)current=s.id;});
  navLinks.forEach(function(a){a.style.color=a.getAttribute('href')==='#'+current?'#F97316':'';});
});