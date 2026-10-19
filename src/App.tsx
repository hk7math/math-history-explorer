import { useEffect, useRef, useState } from 'react'
import { LogList } from './components/LogList.tsx'
import { DetailBody, HelpBody, SearchBody, Sheet } from './components/Sheets.tsx'
import { useStage } from './hooks/useStage.ts'
import {
  BRANCH_COLOR,
  branchOf,
  eraForYear,
  ERAS,
  firstCommitAtOrAfter,
  formatYear,
  world,
} from './model/history.ts'
import type { Selection } from './model/types.ts'

const SPEEDS = [1, 2, 4, 8] as const
type Panel = 'detail' | 'log' | 'search' | 'help' | null

function contributorsThrough(index: number): number {
  let count = 0
  for (const list of world.authorCommits.values()) {
    const first = list[0]
    if (first !== undefined && first <= index) count += 1
  }
  return count
}

function filesThrough(index: number): number {
  let count = 0
  for (const born of world.fileBorn.values()) {
    if (born <= index) count += 1
  }
  return count
}

export default function App() {
  const topRef = useRef<HTMLElement>(null)
  const bottomRef = useRef<HTMLElement>(null)
  const { canvasRef, snap, toggle, seek, step, setSpeed, setMode, select, clearSelection, setBlocked } =
    useStage(topRef, bottomRef)
  const commit = world.commits[snap.index]
  const [overlay, setOverlay] = useState<Exclude<Panel, 'detail'>>(null)
  const panel: Panel = overlay ?? (snap.selection ? 'detail' : null)
  const [query, setQuery] = useState('')
  const [coach, setCoach] = useState(() => sessionStorage.getItem('math-repo-coach') !== '1')
  const ignoreClose = useRef(false)
  const era = commit ? eraForYear(commit.year) : null
  useEffect(() => {
    setBlocked(panel !== null)
  }, [panel, setBlocked])

  useEffect(() => {
    if (!era) return
    const button = document.getElementById(`era-${era.id}`)
    const row = button?.parentElement
    if (!button || !row) return
    const rowRect = row.getBoundingClientRect()
    const buttonRect = button.getBoundingClientRect()
    const delta = buttonRect.left - rowRect.left - (rowRect.width - buttonRect.width) / 2
    row.scrollTo({ left: Math.max(0, row.scrollLeft + delta), behavior: 'smooth' })
  }, [era])

  if (!commit || !era) return null

  const yearLabel = formatYear(commit.year, commit.approx)
  const branch = branchOf(commit.files[0]?.path ?? '')
  const names = commit.authors.map((id) => world.authorById.get(id)?.name ?? id).join(', ')
  const progress = (snap.index / Math.max(1, world.commits.length - 1)) * 100
  const atEnd = snap.ended || (snap.index === world.commits.length - 1 && !snap.playing && snap.cameraMode !== 'track')

  const dismissCoach = () => {
    sessionStorage.setItem('math-repo-coach', '1')
    setCoach(false)
  }

  const play = () => {
    dismissCoach()
    toggle()
  }

  const closePanel = () => {
    if (ignoreClose.current) {
      ignoreClose.current = false
      return
    }
    if (panel === 'detail') clearSelection()
    setOverlay(null)
  }

  const openDetail = (selection: Selection, index?: number) => {
    ignoreClose.current = true
    setOverlay(null)
    select(selection, index)
  }

  return (
    <div className="app">
      <canvas ref={canvasRef} className="stage" aria-label="Animated tree of the mathematics repository" />
      <div className="vignette" />

      <header
        ref={topRef}
        className="hud-top absolute inset-x-0 top-0 z-10 px-4 pt-[max(12px,env(safe-area-inset-top))]"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="pointer-events-auto min-w-0">
            <p className="font-serif text-[22px] leading-none font-medium tracking-tight">mathematics</p>
            <p className="mt-1 text-[11px] text-mute">
              <span className="lg:hidden">
                {snap.index + 1} / {world.commits.length}
              </span>
              <span className="hidden lg:inline">
                main · {snap.index + 1}/{world.commits.length} · {contributorsThrough(snap.index)} contributors ·{' '}
                {filesThrough(snap.index)} files
              </span>
            </p>
          </div>
          <div className="pointer-events-auto flex shrink-0 gap-2">
            <button
              type="button"
              className="rounded-full border border-line px-3 py-1 text-[12px]"
              onClick={() => {
                setQuery('')
                setOverlay('search')
              }}
            >
              Search
            </button>
            <button
              type="button"
              className="rounded-full border border-line px-3 py-1 text-[12px]"
              onClick={() => setOverlay('help')}
            >
              About
            </button>
          </div>
        </div>
        <div className="date-lock lg:pl-[340px]">
          <p>
            {commit.approx && <span className="date-circa">c.</span>}
            <span className="date-num">{Math.abs(commit.year).toLocaleString('en-US')}</span>
            {commit.year < 0 && <span className="date-era">BCE</span>}
            {commit.year > 0 && commit.year < 1000 && <span className="date-era">CE</span>}
            {snap.ended && <span className="head-pill">HEAD</span>}
          </p>
        </div>
      </header>

      <aside className="log-dock pointer-events-auto absolute top-28 bottom-36 left-3 z-10 hidden w-[312px] flex-col overflow-hidden rounded-2xl border border-line bg-ink/75 backdrop-blur-md lg:flex">
        <div className="border-b border-line px-3 py-2 text-[11px] tracking-[0.14em] text-mute uppercase">
          git log
        </div>
        <LogList index={snap.index} playing={snap.playing} onPick={seek} />
      </aside>

      <footer
        ref={bottomRef}
        className="hud-bottom absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-ink via-ink/90 to-transparent px-3 pt-6 pb-[max(10px,env(safe-area-inset-bottom))] lg:pl-[340px]"
      >
        {coach && (
          <div className="coach pointer-events-auto mx-auto mb-3 max-w-xl rounded-2xl border border-line bg-ink/80 px-4 py-3 backdrop-blur-md">
            <p className="text-[13px] leading-relaxed text-cream/90">
              Mathematics as a repository. People fly to the files they change. Drag to look around, pinch to zoom, or
              press play and watch five thousand years of commits.
            </p>
            <div className="mt-3 flex gap-2">
              <button type="button" className="rounded-full bg-cream px-4 py-2 text-[13px] text-ink" onClick={play}>
                Play
              </button>
              <button type="button" className="rounded-full px-3 py-2 text-[13px] text-mute" onClick={dismissCoach}>
                Look around first
              </button>
            </div>
          </div>
        )}

        <div className="era-row pointer-events-auto flex gap-2 overflow-x-auto px-[calc(50%-2.6rem)] pb-2">
          {ERAS.map((item) => {
            const active = item.id === era.id
            return (
              <button
                key={item.id}
                id={`era-${item.id}`}
                type="button"
                onClick={() => seek(firstCommitAtOrAfter(world.commits, item.year))}
                className={`shrink-0 rounded-full border px-3 py-1 text-[12px] ${active ? 'border-cream text-cream' : 'border-line text-mute'}`}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        <div className="pointer-events-none px-1 pb-1">
          <p className="truncate text-[12px]" style={{ color: BRANCH_COLOR[branch] ?? '#f4efe6' }}>
            {names}
          </p>
          <p className="truncate text-[14px] text-cream">{commit.message}</p>
        </div>

        <label className="pointer-events-auto block px-1">
          <span className="sr-only">Seek to a commit. Now {yearLabel}.</span>
          <input
            className="timeline"
            type="range"
            id="history"
            name="history"
            min={0}
            max={world.commits.length - 1}
            step={1}
            value={snap.index}
            aria-valuetext={`${yearLabel}. ${commit.message}`}
            style={{ ['--p' as string]: `${progress}%` }}
            onChange={(event) => seek(Number(event.target.value))}
          />
        </label>

        <div className="pointer-events-auto flex items-center gap-2 px-1 pt-1">
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-[16px]"
            onClick={() => step(-1)}
            aria-label="Previous commit"
          >
            ‹
          </button>
          <button
            type="button"
            className="grid h-12 w-12 place-items-center rounded-full bg-cream text-ink"
            onClick={play}
            aria-label={snap.playing ? 'Pause' : atEnd ? 'Replay from the first commit' : 'Play'}
          >
            {snap.playing ? (
              <span className="flex gap-1" aria-hidden>
                <span className="block h-3.5 w-1 bg-ink" />
                <span className="block h-3.5 w-1 bg-ink" />
              </span>
            ) : (
              <span aria-hidden className="ml-0.5 text-[18px] leading-none">
                ▶
              </span>
            )}
          </button>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-[16px]"
            onClick={() => step(1)}
            aria-label="Next commit"
          >
            ›
          </button>
          <button
            type="button"
            className="h-11 rounded-full border border-line px-3 text-[13px]"
            onClick={() => setSpeed(SPEEDS[(SPEEDS.indexOf(snap.speed as (typeof SPEEDS)[number]) + 1) % SPEEDS.length] ?? 1)}
            aria-label={`Playback speed ${snap.speed}×`}
          >
            {snap.speed}×
          </button>
          <button
            type="button"
            className="h-11 rounded-full border border-line px-3 text-[13px]"
            onClick={() => setMode(snap.cameraMode === 'track' ? 'overview' : 'track')}
          >
            {snap.cameraMode === 'track' ? 'Map' : 'Follow'}
          </button>
          <button
            type="button"
            className="h-11 rounded-full border border-line px-3 text-[13px] lg:hidden"
            onClick={() => setOverlay('log')}
          >
            Log
          </button>
        </div>
      </footer>

      <p className="sr-only" aria-live="polite">
        {yearLabel}. {names}. {commit.message}
      </p>

      <Sheet open={panel === 'detail' && snap.selection !== null} title={detailTitle(snap.selection)} onClose={closePanel} label="detail">
        {snap.selection && (
          <DetailBody
            selection={snap.selection}
            onPickCommit={(index) => {
              clearSelection()
              seek(index)
              setOverlay(null)
            }}
            onSelect={openDetail}
          />
        )}
      </Sheet>
      <Sheet open={panel === 'log'} title="git log" onClose={closePanel} label="log">
        <div className="h-[60dvh]">
          <LogList
            index={snap.index}
            playing={snap.playing}
            onPick={(index) => {
              clearSelection()
              seek(index)
              setOverlay(null)
            }}
          />
        </div>
      </Sheet>
      <Sheet open={panel === 'search'} title="Search" onClose={closePanel} label="search">
        <SearchBody
          query={query}
          onQuery={setQuery}
          onChoose={(index, selection) => {
            openDetail(selection, index)
          }}
        />
      </Sheet>
      <Sheet open={panel === 'help'} title="About this repository" onClose={closePanel} label="help">
        <HelpBody />
      </Sheet>
    </div>
  )
}

function detailTitle(selection: Selection | null): string {
  if (!selection) return 'Commit'
  if (selection.kind === 'author') return world.authorById.get(selection.id)?.name ?? 'Contributor'
  if (selection.kind === 'dir') return selection.path === '' ? 'mathematics' : selection.path
  return 'File'
}
