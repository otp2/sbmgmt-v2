# SB Management Website

A Next.js website for SB Management Group.

## Deployment Instructions

### GitHub Setup

1. Create a new GitHub repository
2. Initialize your local git repository if not already done:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Link your local repository to GitHub:
   ```bash
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

### Netlify Setup

1. Log in to Netlify and create a new site from Git
2. Connect to your GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Advanced build settings:
   - Add environment variable: `NEXT_PUBLIC_SITE_URL` with your Netlify site URL

### Form Handling Configuration

The site uses Netlify Forms for form handling. Forms are properly configured in:
- `app/contact/page.tsx`
- `app/interest/page.tsx`
- `public/__forms.html` (Netlify form detection)

Key implementation details:
1. Each form has a hidden input with `name="form-name"` and proper value
2. Each form has the `data-netlify="true"` attribute
3. Form submissions are sent to the current page URL
4. Form definitions in `__forms.html` match the actual form fields

### Testing Forms

After deployment:
1. Navigate to your site's Forms section in Netlify dashboard
2. Verify all three forms are detected: `contact`, `interest-over-21`, and `interest-under-21`
3. Submit test data through each form to ensure they're working properly

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. 