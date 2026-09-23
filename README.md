# RPH Ventures website

A static multi-page corporate website for RPH Ventures. It uses no database, paid service, or production secrets. The contact page provides direct email, telephone, and WhatsApp links.

## Local preview

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. Run `python3 build.py` after changing page copy in `build.py`. The generated HTML is committed so Cloudflare Pages can publish directly from the repository.

## Cloudflare Pages configuration

Connect this GitHub repository in Cloudflare Pages. Set production branch to the branch merged into `main`. No build command is required; output directory is the repository root (`.`). The site is static. Preview the `pages.dev` deployment before assigning `rphv.in`.

For an apex domain, Cloudflare Pages requires the domain to be added as a Cloudflare zone and its nameservers set at GoDaddy. Copy all existing DNS records, especially MX, TXT, and email records, into Cloudflare before changing nameservers. Add `rphv.in` and `www.rphv.in` in Pages > Custom domains, configure the preferred redirect, and verify HTTPS and email delivery before cancelling Gamma.

Contact details and publicly stated credentials were drawn from the existing RPHV website and the business brief. Confirm them before domain migration. No client-specific metrics or names are published.
