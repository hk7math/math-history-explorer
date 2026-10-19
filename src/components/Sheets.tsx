import { useEffect, useId, useRef, type ReactNode } from 'react'
import {
  BRANCH_COLOR,
  BRANCH_NAME,
  EXTENSIONS,
  authorColor,
  baseName,
  branchOf,
  extensionOf,
  formatYear,
  initials,
  inkFor,
  parentPath,
  searchHistory,
  shortHash,
  world,
} from '../model/history.ts'
import type { Selection } from '../model/types.ts'

type SheetProps = {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
  label: string
}

export function Sheet({ open, title, onClose, children, label }: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      queueMicrotask(() => {
        dialog.querySelector<HTMLElement>('[data-autofocus]')?.focus()
      })
    }
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-labelledby={titleId}
      onClose={onClose}
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
        <h2 id={titleId} className="font-serif text-[22px] font-medium tracking-tight text-cream">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-line px-3 py-1 text-[12px] text-mute hover:text-cream"
          data-autofocus={label === 'detail' ? true : undefined}
        >
          Close
        </button>
      </div>
      <div className="max-h-[calc(78dvh-58px)] overflow-y-auto overscroll-contain px-4 py-4">{children}</div>
    </dialog>
  )
}

export function DetailBody({
  selection,
  onPickCommit,
  onSelect,
}: {
  selection: Selection
  onPickCommit: (index: number) => void
  onSelect: (selection: Selection, index?: number) => void
}) {
  if (selection.kind === 'author') {
    const author = world.authorById.get(selection.id)
    if (!author) return <p>This contributor is not in the log.</p>
    const color = authorColor(world.authorIndex.get(author.id) ?? 0)
    const commits = world.authorCommits.get(author.id) ?? []
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span
            className="grid h-12 w-12 place-items-center rounded-full font-serif text-[16px] font-semibold"
            style={{ background: color, color: inkFor(color) }}
          >
            {initials(author.name).slice(0, 2)}
          </span>
          <div>
            <p className="text-[13px] text-mute">
              {author.tradition} · {author.years}
            </p>
            <p className="text-[12px] text-mute">{commits.length} commits</p>
          </div>
        </div>
        <p className="text-[15px] leading-relaxed text-cream/90">{author.blurb}</p>
        <ul className="flex flex-col gap-2">
          {commits.map((index) => {
            const commit = world.commits[index]
            if (!commit) return null
            return (
              <li key={commit.id}>
                <button
                  type="button"
                  className="w-full rounded-lg border border-line px-3 py-2 text-left hover:bg-white/5"
                  onClick={() => onPickCommit(index)}
                >
                  <span className="block text-[11px] text-mute">{formatYear(commit.year, commit.approx)}</span>
                  <span className="block text-[14px]">{commit.message}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  if (selection.kind === 'dir') {
    const path = selection.path
    const title = path === '' ? 'mathematics/' : `${path}/`
    const kids = world.layout.children.get(path) ?? []
    return (
      <div className="flex flex-col gap-3">
        <p className="font-mono text-[13px] text-mute">{title}</p>
        <p className="text-[15px] leading-relaxed text-cream/90">
          {path === ''
            ? 'The root of the repository. Every directory below it is a living branch of the subject, and every file is a result that stayed.'
            : 'A directory appears the first time someone commits a file inside it. What follows is what this log has filed here.'}
        </p>
        <ul className="flex flex-col gap-2">
          {kids.map((child) => {
            const node = world.layout.nodes.get(child)
            const born = node?.kind === 'file' ? world.fileBorn.get(child) : undefined
            return (
              <li key={child}>
                <button
                  type="button"
                  className="w-full rounded-lg border border-line px-3 py-2 text-left font-mono text-[12px] hover:bg-white/5"
                  onClick={() =>
                    node?.kind === 'file'
                      ? onSelect({ kind: 'file', path: child }, born)
                      : onSelect({ kind: 'dir', path: child })
                  }
                >
                  {node?.kind === 'dir' ? `${child.split('/').pop()}/` : child}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const path = selection.path
  const born = world.fileBorn.get(path)
  const commit = born === undefined ? undefined : world.commits[born]
  const touches = world.fileTouches.get(path) ?? []
  const branch = branchOf(path)
  const ext = extensionOf(path)
  return (
    <div className="flex flex-col gap-4">
      <p className="break-all font-mono text-[12px] leading-relaxed text-cream">{path}</p>
      <p className="text-[12px] uppercase tracking-[0.14em]" style={{ color: BRANCH_COLOR[branch] }}>
        {BRANCH_NAME[branch] ?? branch} · {EXTENSIONS[ext] ?? ext}
      </p>
      {commit && (
        <>
          <p className="text-[13px] text-mute">
            {formatYear(commit.year, commit.approx)} · {shortHash(commit.id)} ·{' '}
            {commit.authors
              .map((id) => world.authorById.get(id)?.name ?? id)
              .join(', ')}
          </p>
          <h3 className="font-serif text-[26px] font-medium leading-tight tracking-tight">{commit.message}</h3>
          <p className="text-[15px] leading-relaxed text-cream/90">{commit.body}</p>
          <div className="flex flex-wrap gap-2">
            {commit.authors.map((id) => (
              <button
                key={id}
                type="button"
                className="rounded-full border border-line px-3 py-1 text-[12px]"
                onClick={() => onSelect({ kind: 'author', id })}
              >
                {world.authorById.get(id)?.name ?? id}
              </button>
            ))}
          </div>
        </>
      )}
      {touches.length > 1 && (
        <div>
          <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-mute">Also touched</p>
          <ul className="flex flex-col gap-2">
            {touches.slice(1).map((index) => {
              const later = world.commits[index]
              if (!later) return null
              return (
                <li key={later.id}>
                  <button
                    type="button"
                    className="w-full rounded-lg border border-line px-3 py-2 text-left hover:bg-white/5"
                    onClick={() => onPickCommit(index)}
                  >
                    <span className="block text-[11px] text-mute">{formatYear(later.year, later.approx)}</span>
                    <span className="block text-[14px]">{later.message}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
      <button
        type="button"
        className="self-start text-[12px] text-mute underline decoration-white/20 underline-offset-4"
        onClick={() => onSelect({ kind: 'dir', path: parentPath(path) })}
      >
        Open {parentPath(path) || 'mathematics'}/
      </button>
      <p className="text-[12px] text-mute">{baseName(path)}</p>
    </div>
  )
}

export function SearchBody({
  query,
  onQuery,
  onChoose,
}: {
  query: string
  onQuery: (value: string) => void
  onChoose: (index: number, selection: Selection) => void
}) {
  const hits = searchHistory(query)
  return (
    <div className="flex flex-col gap-3">
      <input
        data-autofocus
        value={query}
        onChange={(event) => onQuery(event.target.value)}
        placeholder="zero, Euler, primes, Kerala…"
        aria-label="Search the repository"
        className="w-full rounded-lg border border-line bg-transparent px-3 py-3 text-[16px] outline-none placeholder:text-mute/70 focus:border-cream"
      />
      {query.trim().length >= 2 && hits.length === 0 && (
        <p className="text-[14px] text-mute">Nothing in the log matches “{query.trim()}”.</p>
      )}
      <ul className="flex flex-col gap-2">
        {hits.map((hit) => (
          <li key={hit.key}>
            <button
              type="button"
              className="w-full rounded-lg border border-line px-3 py-2 text-left hover:bg-white/5"
              onClick={() => onChoose(hit.index, hit.selection)}
            >
              <span className="block text-[14px]">{hit.title}</span>
              <span className="block text-[11px] text-mute">{hit.subtitle}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function HelpBody() {
  return (
    <div className="flex flex-col gap-4 text-[14px] leading-relaxed text-cream/90">
      <p>
        Mathematics, played as a repository. The root sits in the middle. Directories are branches of the subject.
        Files are the things that stayed: theorems, definitions, algorithms, axioms, notation, and conjectures that are
        still open. People fly to the files they change.
      </p>
      <p>
        The directories are the modern library, so an ancient result is filed where the idea lives now. A Babylonian
        triple sits in <span className="font-mono text-[12px]">geometry/plane</span> because that is the shelf, not
        because the scribe called it geometry.
      </p>
      <p>
        This is a curated mainline, not the complete history. Dates marked “c.” are conventional or uncertain.
        Collective names stand in where no single author signed the work. Independent discoveries are separate commits.
      </p>
      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-mute">On a phone</p>
        <ul className="list-disc space-y-1 pl-4">
          <li>Drag to look around. Pinch to zoom.</li>
          <li>Play, or drag the timeline. The era names jump.</li>
          <li>Tap a person or a file to read the commit.</li>
          <li>Follow stays with whoever is committing. Map fits the whole tree.</li>
        </ul>
      </div>
      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-mute">Keys</p>
        <p>Space plays. Arrows step. Home and End jump. F fits the map. T follows.</p>
      </div>
      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-mute">Files</p>
        <p>Filled marks are theorems and algorithms. Circles are definitions. Diamonds are axioms. Open squares are conjectures still waiting.</p>
      </div>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-[12px]">
        {world.branchOrder.map((branch) => (
          <li key={branch} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-sm" style={{ background: BRANCH_COLOR[branch] }} />
            {BRANCH_NAME[branch] ?? branch}
          </li>
        ))}
      </ul>
      <p className="text-[12px] text-mute">
        The visual language is borrowed from{' '}
        <a className="underline decoration-white/30 underline-offset-4" href="https://github.com/acaudwell/Gource">
          Gource
        </a>
        , Andrew Caudwell’s repository animator. This site is not part of that project.
      </p>
    </div>
  )
}
