# RPH Ventures website

A static multi-page corporate website for RPH Ventures. It uses no database, paid service, or production secrets. The contact page provides direct email, telephone, and WhatsApp links.

## Local preview

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. Run `python3 build.py` after changing page copy in `build.py`. The generated HTML is committed so Cloudflare Pages can publish directly from the repository.

## Free hosting: Netlify

Netlify Free permits commercial sites and can deploy directly from the GitHub repository. Import this repository in Netlify, select `main` as the production branch after the PR is merged, leave the build command empty, and set the publish directory to `.`. A deploy preview should be reviewed before `rphv.in` is assigned. Its free plan has a monthly credit allowance; projects pause when it is exhausted.

The domain remains registered at GoDaddy. Netlify can use external DNS, so preserve existing email and verification records when editing the web records. Verify the Netlify preview, HTTPS, the apex and `www` hostnames, and business email before cancelling Gamma.

Cloudflare Pages remains a viable free alternative if dashboard access becomes available. For Cloudflare's apex domain setup, migrate the full DNS zone, including MX/TXT records, before changing GoDaddy nameservers.

Contact details and publicly stated credentials were drawn from the existing RPHV website and the business brief. Confirm them before domain migration. No client-specific metrics or names are published.
