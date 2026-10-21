<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- All works live in src/data/works.ts and render through the /works/$slug template; add works there, never as new route files. Why: one place to update content.
- Non-factual content must be flagged (placeholder flag / placeholder tag), never presented as fact. Why: artist requires content integrity.
- Images live as CDN pointers: src/assets/**/*.asset.json, created with the lovable-assets CLI, never commit raw binaries; works.ts resolves them via the u() glob helper keyed on the file basename. Why: keeps the repo light while serving images from the CDN.
