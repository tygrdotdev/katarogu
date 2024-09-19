![banner](/public/banner.png)

# What is Katarogu?

Katarogu is a free, open-source and community driven manga and anime tracking service built as an open and modern alternative to existing services like [MAL](https://myanimelist.net/about.php) and [MyAniList](https://anilist.co/).

> [!WARNING]  
> Katarogu is currently in alpha stages of development, breaking changes, bugs and missing features are to be expected.  

> [!NOTE]
> This is a complete rewrite from the original version of Katarogu which depended on PocketBase. You can find the original's source under the [old](https://github.com/tygrdotdev/katarogu/tree/old) branch. Once Katarogu reaches beta stages, this branch will be deleted.

# Tech stack

- Framework: [NextJS](https://nextjs.org/)
- Deployment: [Vercel](https://vercel.com/home) / [Hetzner](https://www.hetzner.com/cloud/)
- UI: [shadcn/ui](https://ui.shadcn.com/)
- Styling: [TailwindCSS](https://tailwindcss.com/)
- Database: [MongoDB](https://www.mongodb.com/)
- Authentication: [Lucia](https://lucia-auth.com/)

# Running locally

### Database

Katarogu offers a `docker-compose.yaml` file which provides a starting point for setting up some required services.  
Make sure you have Docker and the compose plugin installed on your system.

Since MongoDB is schemaless, you do not need to run any migrations on the database. Just make sure that the database is running and that Katarogu can connect to it.

### Mail

Since Katarogu handles authentication using [Lucia](https://lucia-auth.com/), a mail server is required to send verification codes, notifications, etc.  
Update the SMTP values inside the `.env` file to setup mail.

During development, I tend to use a service called Resend and it's the service I'll most likely use in production.  
Keep in mind that it is a paid service, but should get you up and running in no time.

TLDR; any SMTP server should work fine, just update the `.env` values.

# Contact

If you need to contact me, please send inquires via email: **hi at tygr dot dev**.
