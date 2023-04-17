# Texas A&M VERO Shop

This E-Commerce app was built using Svelte and SvelteKit for the Texas A&M VERO Program to sell class merchandise for fundraising.

It serves both a User and an Admin persona:

### User Persona

As a User, you can:

- Create a free shopping account that tracks your orders for you
- Browse and shop for products with ease
- Add and remove items from your cart
- Check out with optional donation and shipping

### Admin Persona

As an Admin, you can:

- Add and manage products, including details about price, color, and size
- Add product images by providing the image IDs from Cloudflare Images
- See order details and statuses, and mark orders as fulfilled
- See a dashboard summary of orders, fulfillments, products, and sales

### Technologies Used

- Svelte
- SvelteKit
- Railway
- Postgres
- Prisma ORM
- Cloudflare Images

## Deployment

This section is a **step-by-step guide** for getting the app up and running.

We'll be using [GitHub](https://github.com), [Railway](https://railway.app), and [Cloudflare Images](https://www.cloudflare.com/lp/pg-images). You'll need:

- ✅ Your email address
- ✅ Someone's credit card
- ❌ Prior experince deploying apps

1. **Create a GitHub account.** If you don't have an account yet, [you can sign up for free](https://github.com/signup). You'll need it to _create a repository_, or repo, which is a place to store code online, like how I've stored this app's source code here. You'll need your own repo of this code, though, so that you can sustain and manage it yourself moving forward.

2. **Fork this repo on GitHub.** Once you have your GitHub account, you'll need your own repo for the source code, like I mentioned above. The fastest way to do this is to _fork my repo_ by clicking the "Fork" button on the top-right of the [app's repo page](https://github.com/cmdecker95/veroshop).

3. **Create a Railway account.** [Choose a Railway plan](https://railway.app/pricing) and create an account. Sign up using your GitHub instead of just your email, since you'll need to connect Railway to GitHub later, anyway, to deploy the app's code from within your repo.

   _I highly recommend choosing the Developer plan_, which has a usage-based subscription model. This means you only pay for what you use, and Railway covers the first $5 you incur each month. For perspective, it didn't cost a cent to deploy this app (<100 users), even with hosting both the app and the database.

   If you do choose the free Starter plan now and the app ends up needing more resources (CPU/RAM) later, [you can upgrade at any time](https://railway.app/account/upgrade). They won't ask for your credit card until you actually upgrade.

4. **Deploy the app on Railway.** Once you have a Railway account and a GitHub repo with the app's source code, click the button below to create a new Railway project, where you'll deploy the app.

   [![Deploy to Railway](https://railway.app/button.svg)](https://railway.app/new)

   Click "Deploy from GitHub repo", select the repo that has your copy of the source code, and click "Deploy Now" when prompted. You'll be taken to the page for your newly created **Project**.

   On the grid, you'll see a single box with a GitHub logo and the name of your repo. This is called a **Service**, and this particular Service serves the production code for your app _straight from your GitHub repo_.

   Click the app Service, which should open a large menu on the right. Click the "Settings" tab, and fill out a few things:

   - Under "Automatic Deployments", set the dropdown to `main`.
   - Click "Generate Domain" to serve the app on a public URL. This is also where you can set a _custom domain_.
   - Set the "Build Command" to `npm run build`.
   - Set the "Start Command" to `npx prisma db push && node build/index.js`. This command will fail until we hook up a database to the app later.

5. **Deploy a Postgres database on Railway.** Add another Service to this Project by clicking the top-right "New" button. You may need to exit the app Service's menu to see it. Click "Database" then click "Add PostgreSQL", or search for Postgres at the top.

   After a couple minutes, the Postgres database will be up and running. This is where the VERO Shop app will keep all its data about users, products, and orders.

6. **Create a Cloudflare Images account.** Go to [Cloudflare Images](https://dash.cloudflare.com/sign-up/images) and create a new account. We will use this site to host our product images. It's a $5 monthly subscription, so you'll need to provide your credit card when signing up.

   Once it's created, go to the [Cloudflare Images dashboard](https://dash.cloudflare.com/?to=/:account/images). You should see options to upload images, after which you'll be able to get their **Image IDs** (for adding images to products in the app). For now, find your **account hash** on the right-hand side and copy it.

7. **Set up the app's environment variables on Railway.** Almost done. This step connects the app to both the database and the product images. Back on Railway, click the app Service again to open its menu, then go to the "Variables" tab to set up the **environment variables**. Click "New Variable" to add each item below:

   - Next to `VARIABLE_NAME`, click "Add Reference" and select `DATABASE_URL`.

     Click "Add" to _connect your app to your database_.

   - Enter `JWT_ACCESS_SECRET` as the `VARIABLE_NAME` and choose any long, random string of characters for the `VALUE or ${{REF}}`.

     Click "Add" to _set the variable for hashing your JSON web tokens_ (used for secure user authorization).

   - Enter `PUBLIC_ACCOUNT_HASH` as the `VARIABLE_NAME` and paste your Cloudflare Images account hash for the `VALUE or ${{REF}}`.

     Click "Add" to _connect your app to your product images_.

8. **Final touches!** The app should be up and running now, but there are just a couple more details that are important to make everything work as expected:

   - All users created through the VERO Shop app are given the `USER` role in the database. If you want to make someone an admin:

     - Have them create a user account
     - Go to the Postgres Service on Railway
     - Open the Users table
     - Find the row for their created User
     - Update their `Role` from `USER` to `ADMIN` (all caps)

   - With a new database comes new users and new products, meaning you'll need to add each new product manually, and each user will have to create accounts again. Moving forward, though, as long as you don't delete/reset the Postgres database, that data will persist.

**Done! 🎉** Your instance of the VERO Shop app should now be up and running!

### Additional Notes

**Pausing service:** If you ever need to pause the app to save costs, you can suspend the Services on Railway without actually deleting anything. That way, you can resume the Services at any time without affecting the app's setup.

**Need help?** I am willing and able to assist with any issues as they come up. Just reach out!
