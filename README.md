# Bolt Boilerplate ⚡

**Bolt Boilerplate** is a [Next.js](https://nextjs.org/) framework integrated with [Convex](https://docs.convex.dev/quickstart/nextjs) real-time database for seamless interactions, [Clerk](https://clerk.com/docs/quickstarts/nextjs) for authentication, and [Shadcn/ui](https://ui.shadcn.com/docs/installation/next) for stunning and customizable UI. 

Designed to streamline your web development process, Bolt eliminates the hassle of setup by providing full CRUD functionality, seamless database integration, and user authentication right from the start. 

Say goodbye to the complexities of React state management as Bolt integrates Convex, simplifying your development workflow. Whether you're a seasoned developer or just starting out, Bolt empowers you to build stunning and dynamic web applications effortlessly, allowing you to focus on bringing your ideas to life.

## Features

- ✅ **Setup full-stack CRUD in 3 minutes!**
- ✅ Best practices for Next.js App router v14
- ✅ Clean code structure and organization
- ✅ Lightweight and easily customizable
- ✅ Metadata, opengraph, SEO friendly

![Bolt Boilerplate Landing page wireframe](https://github.com/bitcraft3r/bolt-boilerplate-nextjs/assets/8282076/ee300905-0577-4d4b-a1d3-c248a31f90d0)

## Quick Start

**1. Clone the Repository:**

```bash
git clone https://github.com/bitcraft3r/bolt-boilerplate-nextjs.git
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
In your Clerk project, create a JWT Template, select Convex, then make sure to click Save changes. Copy the Issuer URL in the JWT Template to replace in `@/convex/auth.config.ts` in the providers domain.

If required, setup [middleware as per Clerk documentation](https://clerk.com/docs/references/nextjs/auth-middleware#auth-middleware).

**5. Add environment variable for app URL:** 

Add the following environment variable to the .env.local file:
```plaintext
NEXT_PUBLIC_URL=http://localhost:3000/
```

**6. Run the Development Server:**

```bash
npm run dev
```

**7. Open Your Browser:**

Open http://localhost:3000 to view the app.

## Contributing

Contributions are welcome! Whether you want to report a bug, request a feature, or submit a pull request, please follow our contribution guidelines.

## License

This project is licensed under the MIT License.

## Resources

- [Convex Template with Next.js 13 App Router](https://www.convex.dev/templates/nextjs-app-router)
- [Fullstack Notion Clone: Next.js 13, React, Convex, Tailwind | Full Course 2023](https://youtu.be/0OaDyjB9Ib8)
- [A quick start guide for using Convex with Next.js](https://youtu.be/vaQZYRSiimI)
- [How To Setup: NextJS + Convex + ShadCN + Stripe + Tailwind CSS + Typescript + React | Explained](https://youtu.be/bTY0fa8p8D0)
- [Building a Subscription Based SaaS with my Favorite Tech Stack (Next.js, Stripe, Convex, Clerk)](https://youtu.be/Vjtn9pWAZDI)
