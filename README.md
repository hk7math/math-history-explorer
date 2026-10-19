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

## Controls

- Play, or drag the timeline. Era names jump through the history.
- EN / 繁 switches the interface and the history between English and Traditional Chinese. The choice is remembered in the browser.
- Drag to pan. Pinch, or scroll, to zoom.
- Tap a person or a file to read the commit.
- **Follow** stays with the latest contributors. **Map** fits the whole tree.
- With a keyboard: Space plays, arrows step, Home and End jump, F fits the map, T follows.

This project is not affiliated with Gource.
