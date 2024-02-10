![banner](/public/banner.png)

# What is Katarogu?
Katarogu is a free, open-source and community driven manga and anime tracking service built as an open and modern alternative to existing services like [MAL](https://myanimelist.net/about.php) and [MyAniList](https://anilist.co/).  

> [!WARNING]  
> Katarogu is currently in alpha stages of development, breaking changes, bugs and missing features are to be expected.  
> You can keep track of the progress over at our [Trello board](https://trello.com/b/lV6bhodT/katarogu).

# Tech stack
- Framework: [NextJS](https://nextjs.org/)
- Deployment: [Vercel](https://vercel.com/home) / [Hetzner](https://www.hetzner.com/cloud/)
- UI: [shadcn/ui](https://ui.shadcn.com/)
- Styling: [TailwindCSS](https://tailwindcss.com/)
- Database: [PocketBase](https://pocketbase.io/)

# Running locally 

### Database Setup
1. To get started, download the latest version of [PocketBase](https://pocketbase.io/docs/) for your system.
2. You will also need to download the [schema](https://raw.githubusercontent.com/tygerxqt/katarogu/canary/public/schema.json).
3. Extract the `.zip` file and run `./pocketbase serve` to start the database.
4. Open your prefered web browser and navigate to `localhost:8090/_`.
5. Once you've created your admin account and have logged in, head to `Settings > Import collections`.
6. From here, you can either copy and paste the schema into to the text input or upload the .json file.
7. Confirm the changes.

### App Setup
Run the following commands to clone the repository, download the app's packages, and start the server.
```bash
git clone https://github.com/tygerxqt/katarogu -b canary
cd katarogu
pnpm install # you can also use yarn install or npm install

# Start a development server
pnpm dev

# Build and start the app.
pnpm build ; pnpm start
```

# Contact
If you need to contact me, please send inquires via email: [hi@tygr.dev](mailto:hi@tygr.dev).
