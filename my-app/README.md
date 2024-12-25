# Next-Board

Next-Board is a collaborative drawing board application designed for companies
to brainstorm and collaborate on ideas in real-time. Built with cutting-edge web
technologies, Next-Board provides a seamless and interactive experience for
users to create, edit, and share their work.

## App Showcase
https://github.com/user-attachments/assets/b2aa1e91-9959-4433-9258-69b1394e81cc

## Features

- **Real-Time Collaboration**: Multiple users can draw and edit simultaneously
  on the same board.
- **Live Broadcasting and Updates**: Real-time broadcasting and updates of user
  actions, such as cursor movements and drawings, to other participants.
- **User Authentication**: Secure user login and registration.
- **Organization Management**: Create and manage multiple organizations with
  distinct boards and members.
- **User Roles**: Assign different roles such as admin and member within an
  organization to manage permissions.
- **Interactive Drawing Tools**: Utilize various tools for drawing, annotating,
  and creating shapes on the board.
- **Layer Management**: Create, update, and manage different layers on the
  canvas.
- **Layer Manipulation**: Select, move, and resize layers interactively.
- **Undo/Redo Functionality**: Keeps track of actions for easy undo and redo.
- **Notifications**: Real-time notifications using Sonner.
- **State management**: Efficient state management using Zustand.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

### Front-End

- **Next.js**: Server-side rendering and static site generation.
- **TypeScript**: Type-safe JavaScript for robust and maintainable code.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Clerk**: Authentication and user management.
- **Zustand**: State management.
- **usehooks**: React hooks library.
- **perfect-freehand**: Tool for generating SVG paths from strokes.
- **Sonner**: For notifications.

### Back-End

- **Convex**: For back-end logic and database operations.
- **Convex with Clerk**: Integration for handling authentication in Convex.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Convex account
- Clerk account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/adg1126/next-board.git
```

2. Install dependencies:

```bash
cd next-board
npm install
# or
yarn install
```

3. Set up environment variables:

Create a `.env.local` file and add your Convex and Clerk keys:

```plaintext
NEXT_PUBLIC_CONVEX_URL=<your-convex-url>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

### Usage

1. **Sign Up**: Register a new user account.
2. **Create an Organization**: Create a new organization for your team.
3. **Invite Members**: Invite team members and admins to your organization.
4. **Create Boards**: Start creating and collaborating on boards.

## License

This project is licensed under the MIT License.

---

This `README.md` file provides an overview of your project, the technologies
used, features, installation instructions, and usage guidelines. You can adjust
the content as needed to better fit your specific requirements.
