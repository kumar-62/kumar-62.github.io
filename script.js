function toggleMenu(){
  const nav = document.querySelector('.nav');
  nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
}

function submitForm(e){
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('input[placeholder="Your name"]').value.trim();
  const contact = form.querySelector('input[placeholder="Phone or email"]').value.trim();
  const message = form.querySelector('textarea').value.trim();

  if(!name || !contact || !message){
    document.getElementById('status').textContent = 'Please fill all fields.';
    return false;
  }

  const waNumber = '918885091293'; // change if needed
  const text = encodeURIComponent(`Inquiry from ${name} (${contact}):%0A%0A${message}`);
  window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
  document.getElementById('status').textContent = 'Opening WhatsApp...';
  form.reset();
  return false;
}

document.getElementById('year').textContent = new Date().getFullYear();
