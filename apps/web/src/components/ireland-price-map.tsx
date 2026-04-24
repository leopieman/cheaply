import { useEffect, useMemo, useState } from 'react'
import { IRELAND_COUNTY_PATHS } from './ireland-map-paths'

const shops = [
  'Dunnes Stores',
  'Tesco Ireland',
  'SuperValu',
  'Lidl Ireland',
  'Aldi Ireland',
  'Centra',
  'Spar',
  'Londis',
  'M&S Foodhall',
  'Iceland Ireland',
]

const deals = [
  ['Kerrygold Butter 500g', '€2.49', '€3.20'],
  ["Barry's Tea 80 bags", '€2.99', '€4.10'],
  ["Flahavan's Porridge 1kg", '€1.89', '€2.65'],
  ["Brennan's Bread 800g", '€1.29', '€1.99'],
  ['Tayto Crisps 6-pack', '€2.20', '€3.05'],
  ['Denny Rashers 400g', '€3.49', '€4.79'],
  ['Galtee Sausages 454g', '€2.79', '€3.99'],
  ['Club Orange 2L', '€1.59', '€2.29'],
  ['Ballygowan Still 6-pack', '€2.99', '€4.25'],
  ['Cathedral City Cheddar 400g', '€3.20', '€4.60'],
  ['Lyons Gold Blend 80 bags', '€2.89', '€3.99'],
  ['Avonmore Whole Milk 2L', '€1.99', '€2.75'],
  ['Batchelors Beans 4-pack', '€2.40', '€3.49'],
  ["Jacob's Cream Crackers 200g", '€1.29', '€1.85'],
  ['Odlums Self-Raising Flour 2kg', '€1.79', '€2.50'],
  ["Keogh's Sea Salt Crisps", '€1.49', '€2.10'],
  ['Superquinn Sausages 400g', '€3.29', '€4.49'],
  ['Chicken Fillets 500g', '€3.99', '€5.49'],
  ['Lyons Pyramid Tea 80 bags', '€3.49', '€4.99'],
] as const

function randomIndex(length: number) {
  return Math.floor(Math.random() * length)
}

function saving(price: string, was: string) {
  const discount = parseFloat(was.slice(1)) - parseFloat(price.slice(1))
  return `€${discount.toFixed(2)} off`
}

function makeAlert(countyIndex: number) {
  const [item, price, was] = deals[randomIndex(deals.length)]

  return {
    county: IRELAND_COUNTY_PATHS[countyIndex].name,
    item,
    price,
    saving: saving(price, was),
    shop: shops[randomIndex(shops.length)],
    was,
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function pathCenter(path: string) {
  const points = [...path.matchAll(/[-+]?\d*\.?\d+/g)]
    .map((match) => Number(match[0]))
    .reduce<[number, number][]>((pairs, value, index, values) => {
      if (index % 2 === 0) pairs.push([value, values[index + 1]])
      return pairs
    }, [])

  const xs = points.map(([x]) => x)
  const ys = points.map(([, y]) => y)

  return {
    x: (Math.min(...xs) + Math.max(...xs)) / 2,
    y: (Math.min(...ys) + Math.max(...ys)) / 2,
  }
}

export function IrelandPriceMap() {
  const firstCountyIndex = useMemo(() => randomIndex(IRELAND_COUNTY_PATHS.length), [])
  const [activeCountyIndex, setActiveCountyIndex] = useState(firstCountyIndex)
  const [alert, setAlert] = useState(() => makeAlert(firstCountyIndex))
  const activeCounty = IRELAND_COUNTY_PATHS[activeCountyIndex]
  const toastPosition = useMemo(() => {
    const { x, y } = pathCenter(activeCounty.path)
    const xPercent = (x / 560) * 100
    const yPercent = (y / 680) * 100
    const horizontalOffset = xPercent > 52 ? -28 : 5
    const verticalOffset = yPercent > 58 ? -8 : 5

    return {
      left: `${clamp(xPercent + horizontalOffset, 4, 52)}%`,
      top: `${clamp(yPercent + verticalOffset, 13, 72)}%`,
    }
  }, [activeCounty.path])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const nextCountyIndex = randomIndex(IRELAND_COUNTY_PATHS.length)
      setActiveCountyIndex(nextCountyIndex)
      setAlert(makeAlert(nextCountyIndex))
    }, 2800)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div className="relative h-[335px] overflow-visible sm:h-[480px]">
        <svg
          aria-hidden="true"
          className="h-full w-full overflow-visible"
          viewBox="0 0 560 680"
          preserveAspectRatio="xMidYMid meet"
        >
          {IRELAND_COUNTY_PATHS.map((county, index) => {
            const active = index === activeCountyIndex
            return (
              <path
                key={county.name}
                d={county.path}
                className={`stroke-background/80 stroke-[1.2] transition-colors duration-500 ${
                  active ? 'fill-primary' : 'fill-muted-foreground/30'
                }`}
              />
            )
          })}
        </svg>
      </div>

      <div
        className="absolute z-10 w-[168px] rounded bg-background/88 p-1.5 text-left shadow-lg ring-1 ring-border/70 backdrop-blur-md transition-all duration-500 sm:w-[188px]"
        style={toastPosition}
      >
        <div className="mb-0.5 flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-primary animate-pulse" />
          <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Price Alert
          </span>
        </div>
        <div className="mb-0.5 truncate text-[9px] font-bold uppercase tracking-[0.08em] text-primary">
          {alert.county}
        </div>
        <div className="truncate text-[11px] font-semibold leading-snug text-foreground">
          {alert.shop} has a new low price
        </div>
        <div className="mt-0.5 truncate text-[10px] leading-snug text-muted-foreground">{alert.item}</div>
        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="text-sm font-bold leading-none text-foreground">{alert.price}</span>
          <span className="text-[10px] text-muted-foreground/60 line-through">{alert.was}</span>
          <span className="ml-auto rounded-sm bg-primary/10 px-1.5 py-0.5 text-[9px] font-medium text-primary">
            {alert.saving}
          </span>
        </div>
      </div>
    </div>
  )
}
