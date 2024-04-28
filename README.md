# Liit: Microblogging CRUD App & Next.js Boilerplate

Liit is a powerful microblogging CRUD (Create, Read, Update, Delete) application built with Next.js and powered by Convex, Clerk, and Shadcn. It provides developers with a robust boilerplate for creating dynamic and engaging microblogging platforms with real-time functionality.

## Features

- Unlimited Likes: Users can like posts multiple times, without limitations.
- Real-Time Updates: Leveraging Convex's real-time database, users experience seamless interactions with instant updates.
- Authentication: Integrated with Clerk for secure authentication and user management.
- Custom Styling: Styled with Shadcn to provide a visually appealing and customizable user interface.
- CRUD Operations: Easily perform Create, Read, Update, and Delete operations on posts and user profiles.

## Quick Start

1. Clone the Repository:
```bash
git clone https://github.com/sov3333/get-liit.git
```

2. Install Dependencies:
```bash
cd get-liit
npm install
```

3. Run Convex development server, and select create new project.
```bash
npx convex dev
``` 

This will auto-populate `.env.local` file with the following:
```plaintext
CONVEX_DEPLOYMENT=dev:something-random-123
NEXT_PUBLIC_CONVEX_URL=your_public_convex_url
```

4. Setup a Clerk project, then add the following environment variables:
```plaintext
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

5. Replace Clerk issuerUrl in `@/convex/auth.config.ts` in providers domain.

6. Run the Development Server:
```bash
npm run dev
```

7. Open Your Browser: Open http://localhost:3000 to view the app.

## Contributing

Contributions are welcome! Whether you want to report a bug, request a feature, or submit a pull request, please follow our contribution guidelines.

## License

This project is licensed under the MIT License.

## Acknowledgements

- Next.js: The React framework for building server-side rendered and statically generated web applications.
- Convex: Real-time database for seamless interactions.
- Clerk: Authentication and user management made easy.
- Shadcn: Styling library for customizable UI components.
