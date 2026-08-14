// =====================================================
// ZEB'S ELECTRONICS REPAIR
// Easy business settings
// =====================================================
// Add Zeb's real email before publishing the contact form.
// The website remains fully static and does not store form data.
const SITE_CONFIG = {
  contactEmail: "",
  businessName: "Zeb's Electronics Repair",
  serviceArea: "Salem, Oregon area"
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

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealElements.forEach(el => observer.observe(el));
} else {
  revealElements.forEach(el => el.classList.add('visible'));
}

document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

const form = document.getElementById('inquiry-form');
const inquiryType = document.getElementById('inquiry-type');
const serviceSelect = document.getElementById('service-select');
const donationOptions = document.getElementById('donation-options');
const resultBox = document.getElementById('form-result');
const resultMessage = document.getElementById('result-message');
const copyButton = document.getElementById('copy-message');
const resetButton = document.getElementById('reset-form');
const formNote = document.getElementById('form-note');
let messageToCopy = '';

function isDonationIntent() {
  if (!inquiryType) return false;
  return inquiryType.value === 'Electronics donation' || inquiryType.value === 'Practice project offer';
}

function updateDonationFields() {
  if (!donationOptions) return;
  const show = isDonationIntent();
  donationOptions.hidden = !show;
  const ownership = donationOptions.querySelector('input[name="ownership"]');
  const data = donationOptions.querySelector('input[name="data"]');
  if (ownership) ownership.required = show;
  if (data) data.required = show;
  if (!show) {
    donationOptions.querySelectorAll('input').forEach(input => {
      input.required = false;
      input.checked = false;
    });
  }
}

if (inquiryType) {
  inquiryType.addEventListener('change', updateDonationFields);
  updateDonationFields();
}

function setIntent(type, service) {
  if (inquiryType && type) inquiryType.value = type;
  if (serviceSelect && service) serviceSelect.value = service;
  updateDonationFields();
}

document.querySelectorAll('[data-intent="donation"]').forEach(link => {
  link.addEventListener('click', () => {
    setIntent('Electronics donation', 'Donation intake');
  });
});

document.querySelectorAll('[data-intent="repair"]').forEach(link => {
  link.addEventListener('click', () => {
    setIntent('Paid repair request', 'Not sure yet');
  });
});

document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    setIntent('Paid repair request', link.dataset.service);
  });
});

if (formNote && SITE_CONFIG.contactEmail) {
  formNote.textContent = `Submitting opens your email app addressed to ${SITE_CONFIG.contactEmail}. No form data is stored by this website.`;
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = data.get('name');
    const contact = data.get('contact');
    const type = data.get('type');
    const service = data.get('service') || 'Not sure yet';
    const device = data.get('device');
    const model = data.get('model') || 'Not provided';
    const condition = data.get('condition') || 'Not provided';
    const timing = data.get('timing') || 'No rush';
    const message = data.get('message');
    const ownership = data.get('ownership') ? 'Yes' : 'Not selected';
    const resale = data.get('resale') ? 'Yes' : 'No preference / not selected';
    const dataReady = data.get('data') ? 'Yes' : 'Not selected';

    const subject = `${type}: ${device}${model !== 'Not provided' ? ` | ${model}` : ''}`;
    const lines = [
      `Hi Zeb,`,
      ``,
      `I would like to submit a new request to ${SITE_CONFIG.businessName}.`,
      ``,
      `NAME: ${name}`,
      `CONTACT: ${contact}`,
      `REQUEST TYPE: ${type}`,
      `SERVICE: ${service}`,
      `DEVICE: ${device}`,
      `BRAND / MODEL: ${model}`,
      `CONDITION: ${condition}`,
      `TIMING: ${timing}`,
      ``,
      `PROBLEM / DETAILS:`,
      `${message}`,
      ``
    ];

    if (type === 'Electronics donation' || type === 'Practice project offer') {
      lines.push(
        `DONATION ACKNOWLEDGEMENTS:`,
        `Ownership transfer understood: ${ownership}`,
        `Refurbishment and resale allowed: ${resale}`,
        `Data backup / erasure risk understood: ${dataReady}`,
        ``
      );
    }

    lines.push(
      `I understand Zeb is currently completing electronics training, the project must be accepted before drop off, and any repair cost beyond the agreed diagnostic scope requires approval before additional paid work begins.`,
      ``,
      `Thank you!`
    );

    messageToCopy = lines.join('\n');

    if (resultBox) resultBox.hidden = false;

    if (SITE_CONFIG.contactEmail) {
      const mailto = `mailto:${encodeURIComponent(SITE_CONFIG.contactEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(messageToCopy)}`;
      if (resultMessage) resultMessage.textContent = 'Your request is ready. Your email app should open now. If it does not, use the copy button below.';
      window.location.href = mailto;
    } else {
      if (resultMessage) resultMessage.textContent = 'Your request is ready. Add Zeb’s public business email in script.js before launch. For now, use the copy button to copy the complete request.';
    }

    if (resultBox) resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

if (copyButton) {
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(messageToCopy);
      copyButton.textContent = 'Copied!';
      setTimeout(() => { copyButton.textContent = 'Copy request'; }, 1800);
    } catch {
      copyButton.textContent = 'Copy failed. Select the request manually.';
    }
  });
}

if (resetButton && form) {
  resetButton.addEventListener('click', () => {
    form.reset();
    setIntent('Paid repair request', 'Not sure yet');
    if (resultBox) resultBox.hidden = true;
    messageToCopy = '';
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
