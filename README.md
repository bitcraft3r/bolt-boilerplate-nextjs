# Bolt Boilerplate

**Bolt Boilerplate** is a [Next.js](https://nextjs.org/) framework integrated with Convex for seamless interactions, Clerk for authentication, and Shadcn for stunning UI. It's designed to supercharge your web development projects, allowing you to build dynamic web applications at lightning speed and with ease.

## Features

- **Seamless Interactions**: Integrated with [Convex](https://www.convex.dev/) for real-time updates and interactions.
- **Secure Authentication**: Utilizes [Clerk](https://clerk.com/) for authentication and user management, ensuring a secure login experience.
- **Stunning UI**: Styled with [Shadcn](https://ui.shadcn.com/) to provide visually appealing and customizable UI components.
- **Easy Setup**: Get started in minutes with Bolt Boilerplate's straightforward setup process.

## Quick Start

**1. Clone the Repository:**
```bash
git clone https://github.com/sov3333/bolt-boilerplate-nextjs.git
```

**2. Install Dependencies:**
```bash
cd bolt-boilerplate-nextjs
npm install
```

**3. Setup Convex Development Server:**
Run the Convex development server and create a new project:
```bash
npx convex dev
``` 
This will auto-populate `.env.local` file with the following:
```plaintext
CONVEX_DEPLOYMENT=dev:something-random-123
NEXT_PUBLIC_CONVEX_URL=your_public_convex_url
```

**4. Setup Clerk Authentication:**
Setup a Clerk project and add the following environment variables to the .env.local file:
```plaintext
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```
Replace Clerk issuerUrl in `@/convex/auth.config.ts` in the providers domain.

**5. Run the Development Server:**
```bash
npm run dev
```

**6. Open Your Browser:**
Open http://localhost:3000 to view the app.

## Contributing

Contributions are welcome! Whether you want to report a bug, request a feature, or submit a pull request, please follow our contribution guidelines.

## License

This project is licensed under the MIT License.

## Acknowledgements

- Next.js: The React framework for building server-side rendered and statically generated web applications.
- Convex: Real-time database for seamless interactions.
- Clerk: Authentication and user management made easy.
- Shadcn: Styling library for customizable UI components.
