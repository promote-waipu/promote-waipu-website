# Promote Waipu Website

Welcome to the Promote Waipu website project! This file contains everything you need to know about editing and managing the website.

---

## How to Edit the Website

You do not need any coding skills to edit this website. Everything is done through **CloudCannon** — a simple online editor that works like a word processor.

### Logging In

1. Go to [app.cloudcannon.com](https://app.cloudcannon.com/)
2. Log in with the Promote Waipu account details
3. Click on **promote-waipu-website**
4. You are now in the editor — any changes you save will appear on the live website within about 60 seconds

---

## What You Can Edit

### Adding or Editing an Event

1. In the left menu click **Events**
2. To edit an existing event — click on it
3. To add a new event — click **Add Event** (top right)
4. Fill in the fields:
   * **Title** — name of the event
   * **Date** — when it is on
   * **Description** — one or two sentences shown on the events listing page
   * **Image** — upload a photo
   * **Body** — the full details of the event (use the toolbar to format text)
   * **Published** — tick this to make it visible on the website, untick to hide it
5. Click **Save** when done

> **Tip:** When an event is finished, untick **Published** rather than deleting it — that way you have a record of past events.

---

### Adding or Editing a Business Listing

1. In the left menu click **Business Directory**
2. To edit an existing listing — click on it
3. To add a new listing — click **Add Listing** (top right)
4. Fill in the fields:
   * **Name** — business or organisation name
   * **Category** — select from the dropdown (e.g. Accommodation, Restaurants)
   * **Phone, Email, Address** — contact details
   * **Website, Facebook** — links (include the full address e.g. https://www.example.com)
   * **Description** — a short paragraph about the business
   * **Logo** — upload the business logo (member listings only)
   * **Published** — tick to make visible on the website
5. Click **Save** when done

---

### Editing Page Content (About Us, Home, Stay etc.)

1. In the left menu click **Pages**
2. Click the page you want to edit
3. Edit the text directly — it works like a word processor
4. Click **Save** when done

---

### Updating the Navigation Menu

If you need to add or reorder menu items contact your website administrator — this is a slightly technical change.

---

## Frequently Asked Questions

**How long does it take for changes to appear on the website?** Usually less than 60 seconds after you click Save.

**I made a mistake — can I undo it?** Yes — CloudCannon keeps a full history of every change. Click **Activity** in the dashboard to see previous versions and restore if needed.

**Can I break the website by accident?** It is very difficult to break anything permanently. If something looks wrong, contact your website administrator who can restore a previous version instantly.

**How do I add a photo?** When editing any page or listing, click the image field and either upload a photo from your computer or choose one already uploaded. Best results with photos that are landscape orientation and at least 1200 pixels wide.

**Who do I contact for help?** Contact your website administrator: **\[ADMINISTRATOR NAME\]** at **\[ADMINISTRATOR EMAIL\]**

---

## Important Contacts

<table><thead><tr><th><p>Role</p></th><th><p>Contact</p></th></tr></thead><tbody><tr><td><p>Website Administrator</p></td><td><p>[YOUR NAME] — [YOUR EMAIL]</p></td></tr><tr><td><p>Promote Waipu General</p></td><td><p>hello@promotewaipu.co.nz</p></td></tr><tr><td><p>Secretary</p></td><td><p>secretary@promotewaipu.co.nz</p></td></tr></tbody></table>

---

## For the Website Administrator

The site is built with [Astro](https://astro.build/) and managed via [CloudCannon](https://cloudcannon.com/). The repository lives at [github.com/promote-waipu/promote-waipu-website](https://github.com/promote-waipu/promote-waipu-website).

To run locally:

```bash
npm install
npm run dev
```

To deploy: simply push to the `main` branch — CloudCannon picks up the change and rebuilds automatically.

Forms are handled by [Formspree](https://formspree.io/) — log in at formspree.io to see form submissions if email notifications are not set up.