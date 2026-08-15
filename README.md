# Zeb's Electronics Repair

A complete GitHub Pages website designed to function as a real small electronics repair business site while Zeb completes his Penn Foster electronics training.

The site intentionally separates four business activities:

1. Paid diagnostics and repair labor
2. Cleaning, maintenance, upgrades, and selected bench work
3. Electronics donations for training, parts, refurbishment, and reuse
4. Future refurbished device resale after appropriate donation ownership transfer

## Website files

- `index.html` is the complete business landing page.
- `policies.html` contains repair, data, warranty, donation, and safety policies.
- `styles.css` contains the full responsive design.
- `script.js` contains mobile navigation, animations, service selection, donation intake behavior, and the contact request builder.
- `assets/favicon.svg` is the custom browser icon.

## Important setup before publishing

Open `script.js` and edit this block:

```js
const SITE_CONFIG = {
  contactEmail: "zeb@example.com",
  businessName: "Zeb's Electronics Repair",
  serviceArea: "Salem, Oregon area"
};
```

Until an email is added, the form still builds a complete request and lets the visitor copy it, but it cannot open a message addressed to Zeb.

## Introductory pricing currently shown

The website currently displays these launch prices:

- Diagnostic assessment: $25
- Cleaning and maintenance: from $35
- Computer upgrade labor: from $45
- Controller service: from $35
- Console service: from $55
- Selected soldering and connector work: from $65

The diagnostic fee is described as a credit toward repair labor when the recommended paid repair is approved.

These numbers are intentionally easy to edit in `index.html`. Review them before publishing and change anything Zeb does not want to promise publicly.

## Business model built into the site

### 1. Diagnostics

A diagnostic fee creates paid value even when a customer decides not to continue with a repair. It also filters out low commitment requests.

### 2. Repair labor

The website sells labor first. Parts are kept separate so the business does not accidentally absorb the cost of customer hardware.

### 3. Cleaning and maintenance

Cleaning and preventative service can be a simpler early revenue stream while more advanced repair skills continue to grow.

### 4. Computer upgrades

RAM, storage, fans, and other selected upgrades can create predictable jobs with clear labor pricing.

### 5. Controllers and selected game hardware

These can become repeatable repair categories and are also excellent donation and practice targets.

### 6. Donation inventory

Accepted donated devices can be used for troubleshooting, soldering practice, disassembly, parts recovery, and repair learning without experimenting on a paying customer's device.

### 7. Refurbishment and future resale

The donation language makes it clear that accepted donations may become workshop property and may later be refurbished and sold when the donor agrees to the donation terms. This gives the business a future inventory path without pretending it exists before Zeb has successfully completed real refurbishments.

## Why the website is careful about training

The site clearly states that Zeb is currently completing electronics focused training through Penn Foster. It does not call him certified yet. It also says work is accepted project by project based on current scope, tools, safety, and experience.

That protects credibility. Once his program is officially completed, update the training language and add the credential exactly as awarded.

## What to add as the business grows

### First real projects

Replace the project placeholders with actual before and after photos. For each project, include:

- Device and model
- Customer reported symptom
- What was diagnosed
- What was repaired
- Parts used
- Final test performed
- A short customer approved review if available

Never invent project counts, testimonials, success rates, or customer names.

### Payment options

The current website does not process payments. When Zeb is ready, add a payment provider only after the business account, pricing, receipts, refund process, and payment policies are decided.

### Business operations

Before taking paid jobs, verify the business setup that applies to Zeb's situation, including registrations, taxes, insurance, customer receipts, local operating rules, payment processing, and any required disclosures. The website is a strong operational starting point, but it is not legal or tax advice.

### Repair records

For every paid job, keep a simple service record containing:

- Intake date
- Customer name and contact
- Device and serial number when appropriate
- Reported fault
- Physical condition at intake
- Diagnostic findings
- Quote and approval
- Parts ordered
- Work performed
- Final test result
- Amount paid
- Any written warranty offered

### Donation records

For accepted donations, record:

- Donor name or anonymous donation if appropriate
- Device description
- Serial number when appropriate
- Date transferred
- Data status
- Ownership transfer acknowledgement
- Whether refurbishment and resale are allowed
- Final disposition such as practice, parts, resale, giveaway, or recycling

## GitHub Pages publishing

1. Create a public GitHub repository such as `zeb-electronics-repair`.
2. Upload all files and the `assets` folder to the repository root.
3. Commit the files.
4. Open repository **Settings**.
5. Open **Pages**.
6. Choose **Deploy from a branch**.
7. Select the `main` branch and `/ (root)` folder.
8. Save.
9. GitHub Pages will provide the live URL.

## Recommended launch order

1. Create a dedicated business email.
2. Add that email to `script.js`.
3. Confirm the public business name.
4. Review every displayed price.
5. Confirm the service area wording.
6. Read and adjust `policies.html`.
7. Verify business, tax, insurance, and local requirements before accepting paid work.
8. Publish to GitHub Pages.
9. Start collecting real project photos and service records.
10. Add real reviews only after customers voluntarily provide them.

## Design philosophy

The website is deliberately written to feel like a serious repair shop while remaining truthful about Zeb's current training status. The strongest impression comes from transparency, organized process, real pricing, clear policies, and eventually real repair evidence rather than inflated claims.
