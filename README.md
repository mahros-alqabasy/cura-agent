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

### Appointments
- Schedule new appointments.
- View and edit existing appointments.
- Filter appointments by date, patient, or status.

### Prescriptions
- Create and manage prescriptions.
- View detailed prescription information.
- Search and filter prescriptions.

### Patient Records
- Maintain comprehensive patient profiles.
- Add, edit, and delete patient information.

### Keyboard Shortcuts
- Quickly navigate and perform actions using shortcuts.
- Fully customizable via the `ShortcutManager` component.

---

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

## Theming and Styling

### Tailwind CSS
- Tailwind CSS is used for styling.
- Custom themes are defined in `tailwind.config.ts`.

### Custom Components
- Reusable components are located in `src/components/ui/`.
- Follow the existing structure for consistency.

---

## Keyboard Shortcuts

| Shortcut | Action                  |
|----------|-------------------------|
| Ctrl + B | Toggle Sidebar          |
| Ctrl + N | Create New Appointment  |
| Ctrl + P | Open Prescriptions Page |

---

## API Documentation

### Endpoints
- **GET /appointments**: Fetch all appointments.
- **POST /appointments**: Create a new appointment.
- **GET /prescriptions**: Fetch all prescriptions.
- **POST /prescriptions**: Create a new prescription.

### Example Request
```bash
curl -X POST http://localhost:3000/api/appointments \
  -H 'Content-Type: application/json' \
  -d '{ "patientName": "John Doe", "date": "2025-05-10" }'
```

---

## Troubleshooting

### Common Issues
- **App not starting**: Ensure all dependencies are installed and the correct Node.js version is used.
- **Styling issues**: Check the Tailwind CSS configuration.

---

## Contributing

### Guidelines
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Authors

- **Mahros AL-Qabasy** - *Project Lead & Developer*

## Acknowledgments

- Design inspiration from modern healthcare applications
- ShadCN UI for the component library
- TanStack Query for efficient API data management
