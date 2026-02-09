# User CRUD Application

A extensible React-based CRUD application for user management with schema-driven forms.

## Features
- ✅ Full CRUD operations
- ✅ Form validation for all fields
- ✅ Schema-driven extensibility
- ✅ Responsive Bootstrap UI
- ✅ Error handling & loading states
- ✅ Mock API with JSON Server

## Tech Stack
- React 18 (JavaScript)
- Bootstrap 5
- Axios for API calls
- JSON Server (mock API)

## Quick Start

1. Clone repository
2. Install dependencies: `npm install`
3. Start API: `npm run server`
4. Start app: `npm start`
5. Open: http://localhost:3000

## Adding New Fields (Extensibility)

1. Edit `src/config/fields.js`
2. Add new field config:

```javascript
{
  key: 'address',
  label: 'Address',
  type: 'text',
  required: false,
  placeholder: 'Enter address'
}
