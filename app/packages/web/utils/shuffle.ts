export default function shuffle(items: string[]): string[] {
  items = [...items];
  for (let i in items) {
    const j = Math.floor(Math.random() * parseInt(i, 10));
    const temp = items[i];
    items[i] = items[j];
    items[j] = temp;
  }
  return items;
}
