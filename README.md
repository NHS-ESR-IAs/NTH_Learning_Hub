# North Tees and Hartlepool NHS Foundation Trust.
## Clinical & Digital Systems Learning Hub & ESR Portlet Replacement

This repository provides a modern replacement for the legacy ESR (Electronic Staff Record) training links portlet.

---

### Background & Problem
The legacy ESR portlet contained Bootstrap HTML/JavaScript accordion code. Following recent national and local ESR portal security updates, **JavaScript execution (`<script>` tags, event handlers) is strictly stripped/disabled inside web portlets**. As a result, the portlet's buttons and accordion navigation ceased functioning.

---

### Solution Overview

1. **Standalone Clinical & Digital Systems Learning Hub (Web App)**:
   - A modern, interactive, fully responsive website built with vanilla HTML5, CSS3, and JavaScript.
   - Comprehensive directory covering **22 Job Roles & Programmes** and **420+ Training Modules** with direct ESR enrollment links.
   - **TrakCare+ Circulation Programme (v0.1)**: Dedicated featured directory of newly circulated TrakCare+ clinical systems training for EAU, Emergency Department, Inpatients, Theatres, Outpatients, ICE, and SystmOne.
   - **Real-time instant search** across roles, courses, codes (e.g. `345`), and systems (*TrakCare+, SystmOne, PACS, EDM2, ICE*).
   - **Department filtering pills** (*Emergency & Acute, Doctors & Students, Wards, Theatres, Specialist Clinical, TrakCare+ & Digital Systems*).
   - **Integrated ESR & Training Support Directory**: Escalation routes for supervisor access, attendance registers, e-learning competencies, payroll, and compliance reporting across North Tees and South Tees.
   - **Access Request Workflow Panel** highlighting mandatory ServiceNow procedures and 1-click links for:
     - **TrakCare Access Requests**
     - **ICE / PACS / MediViewer Access Requests**
   - **Direct Role Sharing & Deep Linking**: Staff and managers can copy and share direct links to any specific role or department.
   - **Official NHS Design System styling**: Accessible, high contrast, branded NHS Blue (`#005EB8`) and Dark Blue (`#003087`).

2. **New Signposting Portlet for ESR (`esr-portlet.html`)**:
   - **100% Pure HTML and Inline CSS** (Zero JavaScript, 0 `<script>` tags, 0 `onclick` handlers).
   - Completely safe and compatible with ESR's sanitized web portlets.
   - Prominently directs staff to the new website.
   - Provides direct 1-click ServiceNow access request buttons directly inside ESR.
   - Includes pure HTML `<details><summary>` dropdowns for quick department navigation and ESR/Training Support contacts without JavaScript.

---

### File Structure

| File | Description |
|---|---|
| [`index.html`](file:///Volumes/Crucial%20X9%20Pro%20For%20Mac/GitHub/NTH_Learning_Hub/index.html) | Main web application homepage with TrakCare+ catalogue and Support Directory |
| [`styles.css`](file:///Volumes/Crucial%20X9%20Pro%20For%20Mac/GitHub/NTH_Learning_Hub/styles.css) | NHS design system, responsive styles, print stylesheet, support directory styling |
| [`app.js`](file:///Volumes/Crucial%20X9%20Pro%20For%20Mac/GitHub/NTH_Learning_Hub/app.js) | Interactive search, filtering, accordions, and deep-linking |
| [`courses-data.js`](file:///Volumes/Crucial%20X9%20Pro%20For%20Mac/GitHub/NTH_Learning_Hub/courses-data.js) | Structured JSON dataset with all 22 categories, 420+ modules, URLs, and Support Directory |
| [`esr-portlet.html`](file:///Volumes/Crucial%20X9%20Pro%20For%20Mac/GitHub/NTH_Learning_Hub/esr-portlet.html) | Pure HTML/CSS signposting portlet with quick role links and helpdesk contacts |
| [`Inputs/Links to Clinical Systems Training - For Circulation v0.1.docx`](file:///Volumes/Crucial%20X9%20Pro%20For%20Mac/GitHub/NTH_Learning_Hub/Inputs/Links%20to%20Clinical%20Systems%20Training%20-%20For%20Circulation%20v0.1.docx) | Extracted circulation document from Gina Marley |
| [`Inputs/Hyperlinks to training programmes.eml`](file:///Volumes/Crucial%20X9%20Pro%20For%20Mac/GitHub/NTH_Learning_Hub/Inputs/Hyperlinks%20to%20training%20programmes.eml) | Source email containing circulation attachment and escalation contacts |
| [`Portal Info.docx`](file:///Volumes/Crucial%20X9%20Pro%20For%20Mac/GitHub/NTH_Learning_Hub/Portal%20Info.docx) | Original legacy portlet export document |

---

### How to Deploy the Website

Because the site is built on pure static web technologies with zero server-side dependencies, it can be hosted in minutes on any of the following platforms:

#### Option A: GitHub Pages (Recommended for quick testing & hosting)
1. Push this repository to GitHub.
2. In the repository settings, go to **Settings > Pages**.
3. Under **Build and deployment**, select **Source: Deploy from a branch** and choose `main` (or `master`) `/ (root)`.
4. Click **Save**. Your site will be published at `https://<org>.github.io/<repo-name>/`.

#### Option B: Trust Intranet / IIS / Internal Web Server
1. Copy the files (`index.html`, `styles.css`, `app.js`, `courses-data.js`) to your web root folder (e.g. `C:\inetpub\wwwroot\learning-hub` or Apache/Nginx web folder).
2. The application runs immediately without any build steps or database configuration.

---

### How to Install the Signposting Portlet in ESR

1. Log into **Oracle ESR** with an administrator profile with portal configuration rights.
2. Navigate to **Portal Administration** &rarr; **Manage Portlets** (or configure the dashboard where the portlet should appear, such as *Employee Self Service* or *Clinical Dashboard*).
3. Create or edit a **User Defined Portlet** (Type: *HTML / Text*).
4. Open [`esr-portlet.html`](file:///Volumes/Crucial%20X9%20Pro%20For%20Mac/GitHub/NTH_Learning_Hub/esr-portlet.html) (the links are pre-configured for `https://nhs-esr-ias.github.io/NTH_Learning_Hub/`).
5. Copy the HTML content and paste it into the ESR portlet source editor.
6. Click **Save** and **Publish**.
