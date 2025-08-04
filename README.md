# NAK Admin Panel

A React-based admin panel for managing products and their attributes.

## Features

- User authentication (sign in/sign up)
- Product management (CRUD operations)
- Attribute management (CRUD operations)
- Responsive design
- Internationalization (English and Persian)
- Modern UI with Material-UI and Emotion
- Form validation with React Hook Form
- Type safety with TypeScript

## Tech Stack

- React 18
- TypeScript
- Vite
- Material-UI
- Emotion (CSS-in-JS)
- React Router
- React Hook Form
- i18next
- Zustand (State Management)
- Axios

## Getting Started

### Prerequisites

- Node.js 16+
- Yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/nak-admin.git
   cd nak-admin
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```env
   VITE_API_BASE_URL=http://your-api-url.com/api/v1
   ```

4. Start the development server:
   ```bash
   yarn dev
   ```

The application will be available at `http://localhost:3000`.

### Building for Production

To create a production build:

```bash
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── api/              # API configuration and interceptors
├── components/       # Reusable components
│   ├── common/      # Common UI components
│   └── layout/      # Layout components
├── logic/           # Business logic and state management
│   ├── auth/        # Authentication logic
│   ├── product/     # Product management logic
│   └── attribute/   # Attribute management logic
├── pages/           # Page components
├── router/          # Route configuration
├── setup/           # App setup (i18n, theme)
└── locales/         # Translation files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
