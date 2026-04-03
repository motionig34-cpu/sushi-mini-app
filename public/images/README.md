# Sushi Photos

Drop your `.jpg` or `.png` photos here, then reference them in `src/data/menu.ts`.

## How to add a photo for a menu item

1. Copy your photo into this folder, e.g. `alaska-roll.jpg`
2. Open `src/data/menu.ts`
3. Add `image: 'alaska-roll.jpg'` to the matching menu item:

```ts
{ id: 8, category: 'Classic', name: 'Ролл Аляска', ..., image: 'alaska-roll.jpg' },
```

That's it — the card and detail sheet will show the photo automatically.
If no `image` is set, the category color gradient + emoji is shown as a fallback.
