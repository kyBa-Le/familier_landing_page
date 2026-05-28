---
name: github-deployment
description: Interact with GitHub repositories, configure Git credentials, commit, and deploy Next.js App Router applications to GitHub Pages. Includes precise configurations for Next.js static exports, image optimization overrides, path mapping, and GitHub Actions pipelines.
---

This skill equips agents with the exact steps, Git workflows, Next.js configurations, and GitHub Actions scripts to manage repositories and deploy static Next.js App Router applications to GitHub Pages.

---

## 💻 1. Git Repository Interactivity

To prepare a local repository for GitHub syncing, use these robust Git sequences:

### A. Initializing and Committing Locally
```bash
git init
git checkout -b main
git add .
git commit -m "feat: initialize Next.js landing page with premium aesthetics"
```

### B. Linking a GitHub Remote
```bash
# Add a remote named 'origin' pointing to the target GitHub repository
git remote add origin https://github.com/<username>/<repository-name>.git

# Verify the remote links are configured correctly
git remote -v
```

### C. Pushing Local Commits to GitHub
```bash
# Push the local 'main' branch to the remote origin, setting it as default upstream
git push -u origin main
```

---

## 🌐 2. Configuring Next.js for GitHub Pages Static Exports

GitHub Pages hosts static websites. Since Next.js is server-rendered by default, it must be compiled into a static export.

### Modifying `next.config.ts` (Next.js 15+)
When exporting statically, Next.js generates an `out/` folder. We must disable the server-dependent Image Optimization API and, optionally, set the subpath `basePath` if deploying to a standard GitHub Pages subdirectory (`https://<username>.github.io/<repository-name>`).

Update `next.config.ts` as follows:

```typescript
import type { NextConfig } from "next";

// Define the repository name if deploying to a subpath (e.g., '/my-repo-name').
// Leave as empty string "" if deploying to a custom domain (e.g., 'yourdomain.com')
// or if deploying to a user site (e.g., '<username>.github.io').
const repoName = "/<repository-name>"; 

const nextConfig: NextConfig = {
  output: "export", // Enforces static HTML/CSS/JS export into the 'out/' directory
  images: {
    unoptimized: true, // Disables server-side image optimization (unsupported by Pages)
  },
  // Ensure paths and assets align with the GitHub Pages repository subpath
  basePath: process.env.NODE_ENV === "production" ? repoName : "",
  assetPrefix: process.env.NODE_ENV === "production" ? repoName : "",
};

export default nextConfig;
```

> [!IMPORTANT]
> If a `basePath` is set, all manual asset paths in the codebase (e.g., `<Image src="/familier_dashboard.png" ... />`) must be updated to include the prefix, or loaded using relative paths, or Next.js absolute path utilities, to prevent broken images on the live site.

---

## ⚡ 3. Automating Deployments with GitHub Actions

Creating a CI/CD pipeline using GitHub Actions is the most efficient, bug-free way to deploy a Next.js site to GitHub Pages. It automates testing, compiling, and pushing the `out/` folder to the hosted branch.

### Create the Workflow Configuration
Write this file to `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main # Triggers compilation on pushing to the main branch
  workflow_dispatch: # Allows manual pipeline triggering from the GitHub Actions tab

# Set permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs in progress for efficiency
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Detect Package Manager
        id: detect-package-manager
        run: |
          if [ -f "${{ github.workspace }}/package-lock.json" ]; then
            echo "manager=npm" >> $GITHUB_OUTPUT
            echo "command=ci" >> $GITHUB_OUTPUT
            echo "runner=npx" >> $GITHUB_OUTPUT
            exit 0
          else
            echo "Unable to determine package manager" >&2
            exit 1
          fi

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: ${{ steps.detect-package-manager.outputs.manager }}

      - name: Setup Pages
        uses: actions/configure-pages@v4
        with:
          # Automatically injects basePath into next.config.ts if detected
          static_site_generator: next

      - name: Install Dependencies
        run: ${{ steps.detect-package-manager.outputs.manager }} ${{ steps.detect-package-manager.outputs.command }}

      - name: Compile and Static Export
        run: ${{ steps.detect-package-manager.outputs.runner }} next build

      - name: Upload Exported Static Artifacts
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out # Uploads the generated out/ folder containing HTML/CSS/JS

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 🔍 4. Local Deployment Verification

Before pushing the changes to the remote branch, verify the static export compiled correctly on your local machine:

1. **Verify Static Compiling**:
   ```bash
   npm run build
   ```
   *Make sure a directory named `out/` is successfully created at the project root.*

2. **Run Local Server on Static Assets**:
   Install a lightweight static HTTP server and run it on the `out/` folder to check for broken assets, missing routes, or broken image paths:
   ```bash
   npx serve@latest out
   ```
   *Navigate through the site local host address and check the dev console for any red errors.*

---

## ⚙️ 5. GitHub Repository Settings Configuration

Once you push the code to GitHub, configure these settings in the GitHub repository UI:
1. Navigate to **Settings** > **Pages**.
2. Under **Build and deployment**, look for **Source**.
3. Set the **Source** to **GitHub Actions** (instead of *Deploy from a branch*). This instructs GitHub to run our `.github/workflows/deploy.yml` pipeline automatically on every push!
