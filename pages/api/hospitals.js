export default async function handler(req, res) {
  const { region } = req.query;
  if (!region) return res.status(400).json({ error: 'region required' });
  try {
    const keywords = ['시험관시술', '난임병원', '불임클리닉'];
    const results = await Promise.all(keywords.map(async (kw) => {
      const query = encodeURIComponent(`${region} ${kw}`);
      const url = `https://openapi.naver.com/v1/search/local.json?query=${query}&display=5&sort=comment`;
      const response = await fetch(url, {
        headers: {
          'X-Naver-Client-Id': 'iy4eabkulQRvt4wVtac2',
          'X-Naver-Client-Secret': '9mUcOyBCBF'
        }
      });
      const data = await response.json();
      return data.items || [];
    }));
    const merged = results.flat();
    const unique = merged.filter((item, idx, self) =>
      idx === self.findIndex(t => t.title === item.title)
    );
    res.status(200).json({ items: unique });
  } catch (e) {
    res.status(500).json({ error: 'failed' });
  }
}
