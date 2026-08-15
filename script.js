// ===============================
// EASY SITE SETTINGS
// ===============================
// Add Zeb's real contact details here when you are ready.
// If contactEmail is blank, the form will simply build and copy a message.
const SITE_CONFIG = {
  contactEmail: "",
  businessName: "Zeb's Electronics Repair"
};

const menuButton = document.querySelector('.menu-button');
const siteNav = document.querySelector('.site-nav');

if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

const inquiryType = document.getElementById('inquiry-type');
document.querySelectorAll('[data-intent="donation"]').forEach(link => {
  link.addEventListener('click', () => {
    setTimeout(() => {
      inquiryType.value = 'Electronics donation';
    }, 250);
  });
});

const form = document.getElementById('inquiry-form');
const resultBox = document.getElementById('form-result');
const resultMessage = document.getElementById('result-message');
const copyButton = document.getElementById('copy-message');
const formNote = document.getElementById('form-note');
let messageToCopy = '';

if (SITE_CONFIG.contactEmail) {
  formNote.textContent = `Submitting will open your email app addressed to ${SITE_CONFIG.contactEmail}. No form data is stored by this website.`;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = data.get('name');
  const contact = data.get('contact');
  const type = data.get('type');
  const device = data.get('device');
  const model = data.get('model') || 'Not provided';
  const message = data.get('message');

  const subject = `${type}: ${device}`;
  messageToCopy = [
    `Hi Zeb,`,
    ``,
    `My name is ${name}. I am contacting you about: ${type}.`,
    ``,
    `Device: ${device}`,
    `Brand / model: ${model}`,
    `Best way to reach me: ${contact}`,
    ``,
    `Details:`,
    `${message}`,
    ``,
    `I understand you are currently completing electronics repair training and that the project must be accepted before work begins.`,
    ``,
    `Thank you!`
  ].join('\n');

  resultBox.hidden = false;

  if (SITE_CONFIG.contactEmail) {
    const mailto = `mailto:${encodeURIComponent(SITE_CONFIG.contactEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(messageToCopy)}`;
    resultMessage.textContent = 'Your message is ready. Your email app should open in a moment. If it does not, use the copy button below.';
    window.location.href = mailto;
  } else {
    resultMessage.textContent = 'Your message is ready. The site owner still needs to add Zeb’s contact email in script.js. For now, copy this message and send it through your preferred contact method.';
  }

  resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(messageToCopy);
    copyButton.textContent = 'Copied!';
    setTimeout(() => copyButton.textContent = 'Copy message', 1800);
  } catch {
    copyButton.textContent = 'Copy failed. Select the message manually.';
  }
});
