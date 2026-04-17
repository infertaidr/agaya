export default async function handler(req, res) {
  const { region } = req.query;
  if (!region) return res.status(400).json({ error: 'region required' });
  try {
    const query = encodeURIComponent(`${region} 난임클리닉 불임`);
    const url = `https://openapi.naver.com/v1/search/local.json?query=${query}&display=15&sort=comment`;
    const response = await fetch(url, {
      headers: {
        'X-Naver-Client-Id': 'iy4eabkulQRvt4wVtac2',
        'X-Naver-Client-Secret': '9mUcOyBCBF'
      }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: 'failed' });
  }
}
