export default async function handler(req, res) {
  const { region } = req.query;
  if (!region) return res.status(400).json({ error: 'region required' });
  try {
    const keyword = `${region} 난임병원`;
    const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(keyword)}&size=15`;
    const response = await fetch(url, {
      headers: { Authorization: `KakaoAK 0a0ff8c07c0722a923ae4de88ef11c9b` }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: 'failed' });
  }
}
