# Emoji2Pic

**Website:** [emoji2pic.pawix.dev](https://emoji2pic.pawix.dev/)  
**API:** [emoji2pic.api.pawix.dev](https://emoji2pic.api.pawix.dev/)

## Overview

Emoji2Pic transforms emojis into stunning images using AI-powered technology. Enter emojis on the website, and instantly generate and download custom images.

## Features

- **User-Friendly Web Interface:** Easily input emojis and create images.
- **Predefined Emoji Sets:** Quick-access buttons for popular combinations.
- **API Integration:** POST emojis to the API for programmatic image generation.
- **History Tracking:** View and manage previously generated images.

## API Usage

**Endpoint:** `POST https://emoji2pic.api.pawix.dev/`  
**Request Body:**

```json
{
  "emojis": "🐈"
}
```

**Response:**  
- **200:** PNG image binary  
- **400:** "No emoji provided"  
- **500:** Error during image generation  

Example:

```javascript
fetch('https://emoji2pic.api.pawix.dev/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ emojis: '🐈' })
})
  .then(response => response.blob())
  .then(blob => {
    const url = URL.createObjectURL(blob);
    console.log('Image URL:', url);
  })
  .catch(console.error);
```

## Technologies

- **Frontend:** HTML, Tailwind CSS, Vanilla JS  
- **Backend:** Cloudflare Workers, Stability AI  

Visit [Emoji2Pic](https://emoji2pic.pawix.dev/) to try it out!
