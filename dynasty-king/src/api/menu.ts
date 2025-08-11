import type { VercelRequest, VercelResponse } from '@vercel/node';

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN!;
const AIRTABLE_BASE  = process.env.AIRTABLE_BASE!;
const TABLE = 'Menu'; const VIEW = 'Published';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const url = new URL(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent(TABLE)}`);
  if (VIEW) url.searchParams.set('view', VIEW); url.searchParams.set('pageSize', '100');

  const r = await fetch(url.toString(), { headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` }});
  if (!r.ok) return res.status(r.status).json({ error: await r.text() });
  const { records } = await r.json();

  const items = records.map((rec: any) => ({
    id: rec.id,
    name: rec.fields['Name'],
    description: rec.fields['Description'] || '',
    price: Number(rec.fields['Price'] ?? 0),
    category: rec.fields['Category'] || 'Other',
    spicy: !!rec.fields['Spicy'],
    vegetarian: !!rec.fields['Vegetarian'],
    featured: !!rec.fields['Featured'],
    photoUrl: rec.fields['Photo']?.[0]?.url,
  }));
  res.json({ items });
}
