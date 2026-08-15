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
  siteNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const inquiryType = document.getElementById('inquiry-type');
const serviceSelect = document.getElementById('service-select');
const donationOptions = document.getElementById('donation-options');

function syncDonationOptions() {
  if (!inquiryType || !donationOptions) return;
  const isDonation = inquiryType.value === 'Electronics donation' || inquiryType.value === 'Practice project offer';
  donationOptions.hidden = !isDonation;
}
if (inquiryType) {
  inquiryType.addEventListener('change', syncDonationOptions);
  syncDonationOptions();
}

document.querySelectorAll('[data-intent="donation"]').forEach(link => {
  link.addEventListener('click', () => {
    if (inquiryType) inquiryType.value = 'Electronics donation';
    if (serviceSelect) serviceSelect.value = 'Donation intake';
    syncDonationOptions();
  });
});

document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    const service = link.dataset.service;
    if (serviceSelect && [...serviceSelect.options].some(o => o.value === service)) serviceSelect.value = service;
    if (inquiryType && inquiryType.value === 'Electronics donation') inquiryType.value = 'Paid repair request';
    syncDonationOptions();
  });
});

const form = document.getElementById('inquiry-form');
const resultBox = document.getElementById('form-result');
const resultMessage = document.getElementById('result-message');
const copyButton = document.getElementById('copy-message');
const resetButton = document.getElementById('reset-form');
const formNote = document.getElementById('form-note');
let messageToCopy = '';

if (form && resultBox && resultMessage) {
  if (SITE_CONFIG.contactEmail && formNote) {
    formNote.textContent = `Submitting will open your email app addressed to ${SITE_CONFIG.contactEmail}. No form data is stored by this website.`;
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const type = data.get('type') || 'Website inquiry';
    const device = data.get('device') || 'Device not specified';
    const subject = `${type}: ${device}`;

    messageToCopy = [
      'Hi Zeb,', '',
      `My name is ${data.get('name') || ''}. I am contacting you about: ${type}.`, '',
      `Service category: ${data.get('service') || 'Not sure yet'}`,
      `Device: ${device}`,
      `Brand / model: ${data.get('model') || 'Not provided'}`,
      `Condition: ${data.get('condition') || 'Not provided'}`,
      `Preferred timing: ${data.get('timing') || 'Not provided'}`,
      `Best way to reach me: ${data.get('contact') || ''}`, '',
      'Details:', `${data.get('message') || ''}`, '',
      'I understand Zeb is currently completing electronics repair training and that the project must be accepted before work begins.', '',
      'Thank you!'
    ].join('\n');

    resultBox.hidden = false;
    if (SITE_CONFIG.contactEmail) {
      resultMessage.textContent = 'Your message is ready. Your email app should open in a moment. If it does not, use the copy button below.';
      window.location.href = `mailto:${encodeURIComponent(SITE_CONFIG.contactEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(messageToCopy)}`;
    } else {
      resultMessage.textContent = 'Your request is ready. Add Zeb’s business email in script.js when you have it, or copy the prepared message below for now.';
    }
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

if (copyButton) {
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(messageToCopy);
      copyButton.textContent = 'Copied!';
      setTimeout(() => copyButton.textContent = 'Copy request', 1800);
    } catch {
      copyButton.textContent = 'Copy failed — select the message manually.';
    }
  });
}

if (resetButton && form) {
  resetButton.addEventListener('click', () => {
    form.reset();
    if (resultBox) resultBox.hidden = true;
    if (serviceSelect) serviceSelect.value = 'Not sure yet';
    syncDonationOptions();
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
