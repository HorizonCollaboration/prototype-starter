# Horizon's kit

Every screen is built from these components, so every prototype looks properly designed and works well on a phone. Import them from the kit, never from anywhere else: `import { AppShell, Button, List, Row } from './kit/index.js'` in `src/App.jsx`, `'../kit/index.js'` in `src/components/`. Icons come from Lucide: `import { Store } from 'lucide-react'`.

Don't style colours, borders or shadows yourself: the kit does that. Use Tailwind only for layout and spacing (`flex`, `grid`, `gap-4`, `md:grid-cols-3`) and plain text sizes.

## The app

```jsx
<AppShell
  name="Food bank needs" icon={Apple} tone="orange"
  current={tab} onChange={setTab}
  tabs={[
    { id: 'needs', label: "What's needed", icon: ListChecks, count: 9, countTone: 'urgent' },
    { id: 'banks', label: 'Food banks', icon: Store },
    { id: 'list', label: 'My list', icon: ShoppingBasket, count: 1 },
  ]}
>
  {tab === 'needs' && <NeedsScreen />}
  <Notice message={message} onClose={() => setMessage('')} />
</AppShell>
```

A sidebar on a computer, a tab bar at the bottom on a phone. Keep the current tab with `useStoredState`. An app that only does one job can leave out `tabs`.

## A screen

```jsx
<ScreenHeader icon={Store} title="Food banks" description="Follow the food banks you give to." action={<Button variant="primary">Add a food bank</Button>} />
<ScreenHeader back={{ label: 'All food banks', onClick: close }} icon={Store} title={bank.name} description="Riverside · updated today" />
```

`Section title="Already given"` heads a later part of a screen. Screens are a column with space between parts already; put a `<Segmented>` or `<Select>` toolbar under the header when people need to filter.

## Lists are rows

```jsx
<List>
  {items.map((item) => (
    <Row
      key={item.id}
      media={<Tile icon={Milk} tone="sky" />}
      title={item.name}
      description="Riverside · updated today"
      onClick={() => open(item.id)}
      actions={<Button size="sm">Follow</Button>}
    >
      <Tag tone="urgent" dot>2 urgent</Tag>
    </Row>
  ))}
</List>
```

Use `<List framed={false}>` inside a `Card`, and `compact` rows there. Use cards for a few related things side by side, never for long lists.

## Pieces

- `Button`: `variant` primary (one per screen, the main action), secondary, outline (default), ghost, danger, link; `size` md, sm, icon, icon-sm (icon buttons need `aria-label`). Put a Lucide icon before the words when it helps.
- `Tile icon={…} tone="…"`: a picture for a thing. `tone`: primary, orange, amber, green, teal, sky, indigo, violet, pink, red, neutral. `size`: sm, md, lg. Give each kind of thing its own icon and tone, the same everywhere.
- `Tag tone="…"`: a state. `tone`: neutral, primary, urgent, warning, good, info; `dot` adds a small dot, `icon` a Lucide icon.
- `Card title description action footer`: a box for a few related things.
- `Stat label value icon tone hint`: a big number for a summary.
- `Field label hint error value onChange type placeholder`: a labelled text box; `onChange` hands back the text. `TextArea` likewise.
- `Select label|ariaLabel value onChange options={[{ value, label }]}`: choose one.
- `Segmented ariaLabel value onChange options={[{ value, label }]}`: a few choices side by side.
- Option values for `Select` and `Segmented` are never empty: use `'all'`, not `''`, for "everything".
- `EmptyState icon title description action`: when there's nothing yet. Always say what to do next.
- `Notice message onClose tone`: "Added milk to your list." after an action (`tone` good or problem).
