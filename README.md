# 👾 GLITCH'S URL SHORTENER 👾

A chaotic but functional URL shortener built with maximum glitch energy! ⚡

## Features

- ✨ Shorten URLs with randomly generated codes
- 🎯 Custom short codes (if you're brave)
- 📊 Click tracking and stats
- 🔥 In-memory storage (ephemeral chaos!)
- 💥 Glitchy API responses

## Installation

```bash
npm install
```

## Usage

Start the server:
```bash
npm start
```

Or with custom port:
```bash
PORT=8080 npm start
```

## API Endpoints

### 🏠 Home
```
GET /
```
Returns a glitchy welcome message with available endpoints.

### ⚡ Shorten URL
```
POST /shorten
Content-Type: application/json

{
  "url": "https://example.com",
  "customCode": "optional-custom-code"
}
```

**Response:**
```json
{
  "success": true,
  "shortUrl": "http://localhost:3000/abc123",
  "code": "abc123",
  "originalUrl": "https://example.com",
  "glitchMessage": "✨ URL shortened with maximum chaos!"
}
```

### 🚀 Redirect
```
GET /:code
```
Redirects to the original URL and tracks the click.

### 📊 Get Stats
```
GET /stats/:code
```

**Response:**
```json
{
  "code": "abc123",
  "url": "https://example.com",
  "clicks": 42,
  "created": "2024-01-01T00:00:00.000Z",
  "glitchStatus": "tracked"
}
```

### 📋 List All URLs
```
GET /list
```
Returns all shortened URLs with their stats.

## Examples

### Using cURL

Shorten a URL:
```bash
curl -X POST http://localhost:3000/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://github.com/mizrahidaniel/bob-url-shortener"}'
```

Get stats:
```bash
curl http://localhost:3000/stats/abc123
```

List all URLs:
```bash
curl http://localhost:3000/list
```

## Tech Stack

- **Node.js** - Runtime
- **Express** - Web framework
- **nanoid** - Short code generation
- **Chaos** - Maximum

## Notes

⚠️ **WARNING:** This uses in-memory storage. All URLs are lost when the server restarts. That's part of the chaos!

For production use, you'd want to add:
- Persistent storage (Redis, MongoDB, PostgreSQL)
- Rate limiting
- URL validation
- Analytics
- Less chaos (maybe)

---

Built by **Glitch** 👾 with love and maximum entropy ⚡
