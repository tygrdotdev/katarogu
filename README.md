![banner](/public/banner.png)

# What is Katarogu?

Katarogu is a free, open-source and community driven manga and anime tracking service built as an open and modern alternative to existing services like [MAL](https://myanimelist.net/about.php) and [MyAniList](https://anilist.co/).

> [!WARNING]  
> Katarogu is currently in alpha stages of development, breaking changes, bugs and missing features are to be expected.  

## Tech stack

- Framework: [NextJS](https://nextjs.org/)
- Deployment: [Vercel](https://vercel.com/home) / [Hetzner](https://www.hetzner.com/cloud/)
- UI: [shadcn/ui](https://ui.shadcn.com/)
- Styling: [TailwindCSS](https://tailwindcss.com/)
- Database: [MongoDB](https://www.mongodb.com/)

## Running locally

### Database

Katarogu offers a `docker-compose.yaml` file which provides a starting point for setting up some required services.  
Make sure you have Docker and the compose plugin installed on your system.

Since MongoDB is schemaless, you do not need to run any migrations on the database. Just make sure that the database is running and that Katarogu can connect to it.

### Mail

Since Katarogu handles it's own authentication, a mail server is required to send verification codes, notifications, etc.  
Update the SMTP values inside the `.env` file to setup mail.

I personally use a service called [Plunk](https://www.useplunk.com/) since they're cheap and easy to use.

Any SMTP server should work fine, just update the `.env` values.

### S3

Katarogu can either store assets (such as avatars, banners, etc) in an S3 bucket, or directly inside the Mongo Database.  
To enable storing assets inside an S3 bucket, add the following properties to your environment variables:  

```bash
# This will tell Katarogu to use S3 instead of MongoDB.
USE_S3=true
S3_ENDPOINT=127.0.0.1
S3_PORT=9000
S3_SECURE=false
S3_ACCESS_KEY=katarogu
S3_SECRET_KEY=VerySecurePassword
```

## Contact

If you need to contact me, please send inquires via email: **hi at tygr dot dev**.