# mathematics.git

An interactive playback of mathematics, drawn as a repository.

The picture borrows the visual language of [Gource](https://github.com/acaudwell/Gource), Andrew Caudwell’s tool for watching a codebase grow. Here the repository is the subject itself. The root sits in the center. Directories are branches of mathematics. Files are theorems, definitions, algorithms, axioms, notation, and open conjectures. People fly to the files they change, from the scribes of Uruk to the geometric Langlands proof of 2024.

It is a curated mainline, not a complete history. Dates marked “c.” are conventional or uncertain. Where a tradition left no single name, the commit is credited to the school. Independent discoveries are separate commits. Ancient results are filed on the modern shelves where those ideas live now.

## Run it

```bash
npm install
npm run dev
```

The dev server listens on port **8741**. `npm test` checks that the log is chronological and that the tree can be laid out. `npm run build` typechecks and builds a static site.

### Push to GitHub

This project is hosted on [Origin](https://cursor.com/docs/origin) at `shepherd-ng/math-history-explorer`. To copy it to GitHub, install the [GitHub CLI](https://cli.github.com/), run `gh auth login`, then from the repo root:

```bash
chmod +x scripts/push-to-github.sh
./scripts/push-to-github.sh
```

That creates a private repo `hk7math/math-history-explorer` if it does not exist yet, adds a `github` remote, and pushes `main`. Pass another name if you want a different GitHub path: `./scripts/push-to-github.sh hk7math/another-name`.

After the first push, you can mirror the GitHub repo back into Origin from [cursor.com/codebase](https://cursor.com/codebase) with **Sync from GitHub** so future `git push origin` updates both forges. See [Mirror a GitHub repository](https://cursor.com/docs/origin/mirror-github).

## Controls

- Play, or drag the timeline. Era names jump through the history. Contributors take turns, and each one adds their files one at a time.
- EN / 繁 switches the interface and the history between English and Traditional Chinese. The choice is remembered in the browser.
- Drag to pan. Pinch, or scroll, to zoom.
- Tap a person or a file to read the commit.
- **Follow** stays with the latest contributors. **Map** fits the whole tree.
- With a keyboard: Space plays, arrows step, Home and End jump, F fits the map, T follows.

This project is not affiliated with Gource.
