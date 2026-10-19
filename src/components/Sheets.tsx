import { useEffect, useId, useRef, type ReactNode } from 'react'
import { useLocale } from '../i18n/locale.tsx'
import { noteOf, personOf, searchView, ui, yearText } from '../i18n/text.ts'
import {
  BRANCH_COLOR,
  authorColor,
  baseName,
  branchOf,
  extensionOf,
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
  const { locale } = useLocale()
  const t = ui(locale)
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
          {t.close}
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
  const { locale } = useLocale()
  const t = ui(locale)
  if (selection.kind === 'author') {
    const stored = world.authorById.get(selection.id)
    const author = stored ? personOf(stored, locale) : undefined
    if (!author || !stored) return <p>{t.missingAuthor}</p>
    const color = authorColor(world.authorIndex.get(author.id) ?? 0)
    const commits = world.authorCommits.get(author.id) ?? []
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span
            className="grid h-12 w-12 place-items-center rounded-full font-serif text-[16px] font-semibold"
            style={{ background: color, color: inkFor(color) }}
          >
            {initials(stored.name).slice(0, 2)}
          </span>
          <div>
            <p className="text-[13px] text-mute">
              {author.tradition} · {author.years}
            </p>
            <p className="text-[12px] text-mute">
              {commits.length} {t.commits}
            </p>
          </div>
        </div>
        <p className="text-[15px] leading-relaxed text-cream/90">{author.blurb}</p>
        <ul className="flex flex-col gap-2">
          {commits.map((index) => {
            const commit = world.commits[index]
            if (!commit) return null
            const shown = noteOf(commit, locale)
            return (
              <li key={commit.id}>
                <button
                  type="button"
                  className="w-full rounded-lg border border-line px-3 py-2 text-left hover:bg-white/5"
                  onClick={() => onPickCommit(index)}
                >
                  <span className="block text-[11px] text-mute">{yearText(commit.year, commit.approx, locale)}</span>
                  <span className="block text-[14px]">{shown.message}</span>
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
        <p className="text-[15px] leading-relaxed text-cream/90">{path === '' ? t.rootBlurb : t.dirBlurb}</p>
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
        {t.branches[branch as keyof typeof t.branches] ?? branch} · {t.extensions[ext as keyof typeof t.extensions] ?? ext}
      </p>
      {commit && (
        <>
          <p className="text-[13px] text-mute">
            {yearText(commit.year, commit.approx, locale)} · {shortHash(commit.id)} ·{' '}
            {commit.authors
              .map((id) => {
                const author = world.authorById.get(id)
                return author ? personOf(author, locale).name : id
              })
              .join(locale === 'zh-TW' ? '、' : ', ')}
          </p>
          <h3 className="font-serif text-[26px] font-medium leading-tight tracking-tight">{noteOf(commit, locale).message}</h3>
          <p className="text-[15px] leading-relaxed text-cream/90">{noteOf(commit, locale).body}</p>
          <div className="flex flex-wrap gap-2">
            {commit.authors.map((id) => (
              <button
                key={id}
                type="button"
                className="rounded-full border border-line px-3 py-1 text-[12px]"
                onClick={() => onSelect({ kind: 'author', id })}
              >
                {(() => {
                  const author = world.authorById.get(id)
                  return author ? personOf(author, locale).name : id
                })()}
              </button>
            ))}
          </div>
        </>
      )}
      {touches.length > 1 && (
        <div>
          <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-mute">{t.alsoTouched}</p>
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
                    <span className="block text-[11px] text-mute">{yearText(later.year, later.approx, locale)}</span>
                    <span className="block text-[14px]">{noteOf(later, locale).message}</span>
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
        {t.open} {parentPath(path) || 'mathematics'}/
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
  const { locale } = useLocale()
  const t = ui(locale)
  const hits = searchHistory(query, world, searchView(locale))
  return (
    <div className="flex flex-col gap-3">
      <input
        data-autofocus
        value={query}
        onChange={(event) => onQuery(event.target.value)}
        placeholder={t.searchPlaceholder}
        aria-label={t.searchLabel}
        className="w-full rounded-lg border border-line bg-transparent px-3 py-3 text-[16px] outline-none placeholder:text-mute/70 focus:border-cream"
      />
      {query.trim().length >= 2 && hits.length === 0 && (
        <p className="text-[14px] text-mute">
          {t.noHits} “{query.trim()}”.
        </p>
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
  const { locale } = useLocale()
  const t = ui(locale)
  return (
    <div className="flex flex-col gap-4 text-[14px] leading-relaxed text-cream/90">
      <p>{t.help1}</p>
      <p>
        {locale === 'zh-TW' ? (
          t.help2
        ) : (
          <>
            The directories are the modern library, so an ancient result is filed where the idea lives now. A Babylonian
            triple sits in <span className="font-mono text-[12px]">geometry/plane</span> because that is the shelf, not
            because the scribe called it geometry.
          </>
        )}
      </p>
      <p>{t.help3}</p>
      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-mute">{t.phone}</p>
        <ul className="list-disc space-y-1 pl-4">
          <li>{t.phone1}</li>
          <li>{t.phone2}</li>
          <li>{t.phone3}</li>
          <li>{t.phone4}</li>
        </ul>
      </div>
      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-mute">{t.keys}</p>
        <p>{t.keysBody}</p>
      </div>
      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-mute">{t.fileKey}</p>
        <p>{t.filesBody}</p>
      </div>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-[12px]">
        {world.branchOrder.map((branch) => (
          <li key={branch} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-sm" style={{ background: BRANCH_COLOR[branch] }} />
            {t.branches[branch as keyof typeof t.branches] ?? branch}
          </li>
        ))}
      </ul>
      <p className="text-[12px] text-mute">
        {locale === 'zh-TW' ? '畫面的語言借自' : 'The visual language is borrowed from'}{' '}
        <a className="underline decoration-white/30 underline-offset-4" href="https://github.com/acaudwell/Gource">
          Gource
        </a>
        {locale === 'zh-TW'
          ? '，Andrew Caudwell 用來播放儲存庫的工具。這個網站不屬於那個計畫。'
          : ', Andrew Caudwell’s repository animator. This site is not part of that project.'}
      </p>
    </div>
  )
}
