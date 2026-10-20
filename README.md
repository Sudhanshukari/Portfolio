# S1N — Portfolio

A one-page portfolio for a graphic designer. Built with Next.js 16, Tailwind CSS 4, Motion and Lenis.
The work and text come from S1N's two Behance galleries. The email, Instagram and YouTube links are
still **placeholders** (marked `PLACEHOLDER` in `src/content/site.ts`).

## 1. Add your work and text

1. Put your images in `public/work/` (jpg, png or webp). Delete the images you no longer want to show.
2. Open **`src/content/site.ts`**. Everything on the site is in this one file: name, role, bio, stats,
   email, social links, skills and the list of projects.
   For each project, set:
   - `image`: the file path, e.g. `"/work/my-poster.jpg"`
   - `width` and `height`: the image size in pixels (only the ratio matters)
   - `category`: one of the categories listed at the top of the file

   You don't need to change anything else. The favicon and the link preview image (Discord, X,
   WhatsApp...) are generated from your name automatically.

To preview on your computer (optional, needs [Node.js](https://nodejs.org) 20 or newer):

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## 2. Push to GitHub

Create an empty repository on [github.com/new](https://github.com/new), then in this folder:

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## 3. Deploy on Vercel (free)

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub (the free **Hobby** plan is enough).
2. Click **Add New → Project**, pick your repository, and click **Deploy**. No settings to change.
3. Your site is live at **`https://<project-name>.vercel.app`**.

Every time you push a change to GitHub, Vercel updates the site on its own.

## 4. Custom domain (optional)

In Vercel open your project → **Settings → Domains**, add your domain and follow the DNS steps shown.
Then put the address in `url` in `src/content/site.ts` (e.g. `"https://s1n.design"`) and push.

---

Colours live at the top of `src/app/globals.css`; fonts are set in `src/app/layout.tsx`.
