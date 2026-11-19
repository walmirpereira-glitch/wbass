# Project architecture

- Use React Router links with the existing Portuguese page paths; navigation must update the URL and reset scroll instantly.
- Contact and proposal forms share `submitFormspree` for JSON AJAX submission without redirects; clear fields only after confirmed success.
- Products and proposal selection use the same catalog from `src/data/products.ts` to prevent price inconsistencies.