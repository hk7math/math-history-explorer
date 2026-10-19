import { useEffect, useRef } from 'react'
import { useLocale } from '../i18n/locale.tsx'
import { noteOf, personOf, yearText } from '../i18n/text.ts'
import {
  authorColor,
  branchOf,
  shortHash,
  world,
  BRANCH_COLOR,
} from '../model/history.ts'

type LogListProps = {
  index: number
  playing: boolean
  onPick: (index: number) => void
}

export function LogList({ index, playing, onPick }: LogListProps) {
  const { locale } = useLocale()
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!playing) return
    scroller.current?.scrollTo({ top: 0 })
  }, [index, playing])

  const rows = world.commits.slice(0, index + 1).map((commit, commitIndex) => ({ commit, commitIndex })).reverse()

  return (
    <div ref={scroller} className="h-full overflow-y-auto overscroll-contain">
      <ol className="flex flex-col">
        {rows.map(({ commit, commitIndex }) => {
          const branch = branchOf(commit.files[0]?.path ?? '')
          const color = BRANCH_COLOR[branch] ?? '#f4efe6'
          const active = commitIndex === index
          const added = commit.files.filter((file) => file.action === 'A').length
          const modified = commit.files.length - added
          return (
            <li key={commit.id}>
              <button
                type="button"
                onClick={() => onPick(commitIndex)}
                aria-current={active ? 'true' : undefined}
                className={`grid w-full grid-cols-[4px_1fr] gap-3 border-b border-line px-3 py-3 text-left hover:bg-white/5 ${active ? 'bg-white/[0.06]' : ''}`}
              >
                <span className="rounded-full" style={{ background: color }} />
                <span>
                  <span className="flex items-baseline justify-between gap-3 text-[11px] text-mute">
                    <span>{yearText(commit.year, commit.approx, locale)}</span>
                    <span className="font-mono">{shortHash(commit.id)}</span>
                  </span>
                  <span className="mt-1 flex flex-wrap gap-x-2 text-[12px] text-cream">
                    {commit.authors.map((id) => {
                      const author = world.authorById.get(id)
                      const authorIndex = world.authorIndex.get(id) ?? 0
                      return (
                        <span key={id} style={{ color: authorColor(authorIndex) }}>
                          {author ? personOf(author, locale).name : id}
                        </span>
                      )
                    })}
                  </span>
                  <span className="mt-1 block text-[13px] leading-snug text-cream/90">{noteOf(commit, locale).message}</span>
                  <span className="mt-1 block text-[11px] text-mute">
                    {added > 0 ? `+${added}` : ''}
                    {added > 0 && modified > 0 ? ' ' : ''}
                    {modified > 0 ? `~${modified}` : ''} {branch}/
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
