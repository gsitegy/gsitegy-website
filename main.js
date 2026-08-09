// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Nav scroll shadow
window.addEventListener('scroll', () => {
  document.querySelector('.nav').style.boxShadow = window.scrollY > 20 ? '0 4px 24px rgba(15,23,42,0.08)' : 'none';
});

// Contact form with EmailJS integration
// To set up EmailJS:
// 1. Sign up at https://www.emailjs.com/
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template with variables: {{from_name}}, {{from_email}}, {{company}}, {{service}}, {{message}}
// 4. Replace the placeholders below with your actual IDs

(function() {
  // Initialize EmailJS with your public key
  emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  const templateParams = {
    from_name: this.name.value,
    from_email: this.email.value,
    company: this.company.value || 'Not specified',
    service: this.service.value || 'Not specified',
    message: this.message.value || 'No message provided'
  };

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams) // Replace with your service and template IDs
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      document.getElementById('contactForm').innerHTML = `
        <div class="form-success">
          <div class="success-icon">✓</div>
          <h3>Message Sent!</h3>
          <p>Thanks for reaching out. We'll be in touch within 1 business day.</p>
        </div>`;
    }, function(error) {
      console.log('FAILED...', error);
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      alert('Sorry, there was an error sending your message. Please try again or contact us directly at contact@gsitegy.com');
    });
});

// Intersection observer for fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .process-step, .why-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
