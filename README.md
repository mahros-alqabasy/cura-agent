
# Cura Agent - Medical Dashboard

## Project Overview

Cura Agent is a modern medical dashboard application designed for healthcare professionals. Built with React and Tailwind CSS, it provides a comprehensive interface for doctors to manage their professional responsibilities.

**Live Demo**: [https://mahros-alqabasy.github.io/cura-agent/](https://mahros-alqabasy.github.io/cura-agent/)

## Features

- **Authentication System**: Secure login and registration with JWT token management
- **Doctor Dashboard**: Overview of appointments, patient activity, and tasks
- **AI Assistant**: Text-based interaction with an intelligent medical assistant
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Protected Routes**: Secure access to authorized areas only
- **Professional UI**: Clean, modern interface designed specifically for healthcare contexts

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Routing**: React Router v6
- **State Management**: React Context API
- **API Communication**: Axios
- **Data Management**: TanStack Query (React Query)

## Getting Started

### Prerequisites

- Node.js (v16+)
- NPM or Yarn package manager

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/mahros-alqabasy/cura-agent.git
   cd cura-agent
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

## Project Structure

```
cura-agent/
├── public/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── layouts/       # Layout components
│   │   └── ui/            # Basic UI elements from ShadCN
│   ├── contexts/          # React contexts for state management
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions and constants
│   ├── pages/             # Page components
│   ├── services/          # API service layer
│   ├── App.tsx            # Main application component with routing
│   └── main.tsx           # Application entry point
├── tailwind.config.ts     # Tailwind CSS configuration
└── README.md
```

## Backend Integration

The application connects to a Django REST API backend hosted at `https://gu-his.up.railway.app/`. The API provides endpoints for:

- Authentication (login, registration, token refresh)
- Chat interactions with the AI assistant
- (Additional endpoints for future features)

## Deployment

This project is configured for deployment to GitHub Pages. The router uses a basename of `/cura-agent/` to ensure correct path resolution.

```
npm run build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Authors

- **Mahros AL-Qabasy** - *Project Lead & Developer*

## Acknowledgments

- Design inspiration from modern healthcare applications
- ShadCN UI for the component library
- TanStack Query for efficient API data management
