import { useState } from 'react';

const SAMPLE_POSTS = [
  { id: 1, tag: 'PCOS', title: 'The Insulin Connection: Why Blood Sugar Management Matters for PCOS Fertility', excerpt: 'Insulin resistance affects up to 70% of women with PCOS. Understanding this link can change your approach to treatment.', date: 'Apr 8, 2026', readTime: '5 min read' },
  { id: 2, tag: 'Agaya Stories', title: '"I Found Out I Had Endometriosis at 34" — Amara\'s Story from Lagos', excerpt: 'A personal account of delayed diagnosis, the emotional toll, and how information changed everything.', date: 'Apr 5, 2026', readTime: '7 min read' },
  { id: 3, tag: 'Pregnancy', title: 'First Trimester Nausea: Evidence-Based Relief Beyond Ginger Tea', excerpt: 'What randomized trials actually say about managing hyperemesis gravidarum — and when to seek medical care.', date: 'Apr 2, 2026', readTime: '4 min read' },
  { id: 4, tag: 'IVF & ART', title: 'IVF in Sub-Saharan Africa: Access, Cost, and What\'s Changing', excerpt: 'Assisted reproduction is expanding across the continent. A look at who it\'s reaching — and who it\'s still missing.', date: 'Mar 29, 2026', readTime: '9 min read' },
  { id: 5, tag: 'Hormonal Health', title: 'Thyroid and Fertility: The Often-Missed Connection in Recurrent Miscarriage', excerpt: 'Subclinical hypothyroidism is treatable and underdiagnosed. Here\'s what to ask your doctor.', date: 'Mar 25, 2026', readTime: '5 min read' },
];

const TAG_COLORS = {
  'PCOS': '#C4704A',
  'Agaya Stories': '#7B5EA7',
  'Pregnancy': '#4A6741',
  'IVF & ART': '#2A1F14',
  'Hormonal Health': '#D4963A',
  'AI & Medicine': '#1D9E75',
  'Fertility Science': '#C4704A',
};

export default function Blog() {
  const [topic, setTopic] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState(null);
  const [langHint, setLangHint] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const allTags = ['All', 'PCOS', 'Pregnancy', 'IVF & ART', 'Hormonal Health', 'Agaya Stories', 'AI & Medicine'];

  const filteredPosts = activeTag === 'All'
    ? SAMPLE_POSTS
    : SAMPLE_POSTS.filter(p => p.tag === activeTag);

  function detectLang(text) {
    if (/[\uAC00-\uD7AF]/.test(text)) return '한국어로 생성됩니다';
    if (/[éèêëàâùûîïôœç]/i.test(text)) return 'Sera généré en français';
    if (/[\u0600-\u06FF]/.test(text)) return 'سيتم الإنشاء بالعربية';
    return '';
  }

  async function generateArticle() {
    if (!topic.trim()) return;
    setGenerating(true);
    setGeneratedPost(null);

    const system = `You are Agaya's medical blog writer — a specialist in obstetrics, gynecology, and fertility medicine.
Write authoritative yet accessible blog articles about women's health and fertility.

CRITICAL RULES:
- Detect the language of the user's topic and write the ENTIRE article in that SAME language
- Structure: use ## for section headings, write 3-4 sections
- Style: warm but evidence-based
- Length: ~500-700 words
- End with a brief disclaimer that this is educational content, not personal medical advice
- Output ONLY valid JSON, no markdown fences, no preamble:
{"title":"...","category":"...","readTime":"X min read","content":"full article text with ## headings"}`;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system,
          messages: [{ role: 'user', content: `Write a blog article about: ${topic}` }]
        })
      });
      const data = await res.json();
      const raw = (data.content || '').replace(/```json|```/g, '').trim();
      let parsed;
      try { parsed = JSON.parse(raw); }
      catch { parsed = { title: topic, category: 'Fertility', readTime: '5 min read', content: data.content }; }
      setGeneratedPost(parsed);
    } catch {
      setGeneratedPost({ title: topic, category: 'Error', readTime: '', content: '오류가 발생했어요. 다시 시도해주세요.' });
    }
    setGenerating(false);
    setTopic('');
  }

  const s = {
    page: { maxWidth: 860, margin: '0 auto', padding: '0 20px 60px', fontFamily: 'Georgia, serif', background: '#FAF6F0', minHeight: '100vh' },
    nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 0', borderBottom: '1px solid #E8D9C0', marginBottom: 40 },
    navLogo: { fontSize: 22, fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2A1F14', textDecoration: 'none', fontFamily: 'Georgia, serif' },
    navBack: { fontSize: 12, color: '#C4704A', textDecoration: 'none', fontFamily: 'system-ui, sans-serif', letterSpacing: '0.08em' },
    eyebrow: { fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#D4963A', marginBottom: 12 },
    heroTitle: { fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 400, color: '#2A1F14', lineHeight: 1.1, marginBottom: 14 },
    heroTitleEm: { fontStyle: 'italic', color: '#C4704A' },
    heroSub: { fontSize: 15, color: '#6B5B4E', lineHeight: 1.7, fontFamily: 'system-ui, sans-serif', fontWeight: 300, maxWidth: 520, marginBottom: 40 },

    aiBox: { background: '#2A1F14', borderRadius: 6, padding: '24px 28px', marginBottom: 48 },
    aiLabel: { fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#D4963A', marginBottom: 8 },
    aiTitle: { fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 400, color: '#F5EFE4', marginBottom: 6 },
    aiSub: { fontSize: 13, color: 'rgba(245,239,228,0.5)', lineHeight: 1.6, fontFamily: 'system-ui, sans-serif', marginBottom: 16 },
    aiInput: { width: '100%', background: 'rgba(245,239,228,0.07)', border: '1px solid rgba(245,239,228,0.15)', borderRadius: 4, padding: '10px 14px', color: '#F5EFE4', fontFamily: 'system-ui, sans-serif', fontSize: 14, outline: 'none', marginBottom: 6, boxSizing: 'border-box' },
    aiHint: { fontFamily: 'monospace', fontSize: 11, color: 'rgba(245,239,228,0.3)', marginBottom: 14 },
    aiBtn: { width: '100%', background: '#C4704A', border: 'none', color: '#F5EFE4', padding: '11px', borderRadius: 4, fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' },

    generatedBox: { background: '#fff', borderRadius: 6, border: '1px solid #E8D9C0', marginBottom: 48, overflow: 'hidden' },
    generatedHeader: { background: '#2A1F14', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    generatedHeaderLabel: { fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4963A' },
    generatedClose: { background: 'none', border: '1px solid rgba(245,239,228,0.2)', color: 'rgba(245,239,228,0.5)', padding: '3px 10px', borderRadius: 3, fontFamily: 'monospace', fontSize: 10, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em' },
    generatedBody: { padding: '28px 32px' },
    generatedTitle: { fontFamily: 'Georgia, serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, color: '#2A1F14', lineHeight: 1.2, marginBottom: 10 },
    generatedMeta: { fontFamily: 'monospace', fontSize: 11, color: '#9E8E82', marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #E8D9C0' },
    generatedContent: { fontSize: 15, lineHeight: 1.85, color: '#3A2E26', fontFamily: 'Georgia, serif' },

    sectionHead: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: '1px solid #E8D9C0', paddingBottom: 10, marginBottom: 24 },
    sectionLabel: { fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 400, color: '#2A1F14' },

    tagStrip: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 },
    tag: (active) => ({ fontSize: 12, padding: '5px 14px', borderRadius: 3, background: active ? '#C4704A' : '#E8D9C0', color: active ? '#FAF6F0' : '#2A1F14', cursor: 'pointer', border: 'none', fontFamily: 'system-ui, sans-serif', fontWeight: 300 }),

    card: { display: 'grid', gridTemplateColumns: '100px 1fr', gap: 18, paddingBottom: 24, borderBottom: '1px solid #E8D9C0', marginBottom: 24, cursor: 'pointer', textDecoration: 'none', color: 'inherit' },
    cardThumb: (tag) => ({ borderRadius: 3, background: `linear-gradient(135deg, ${TAG_COLORS[tag] || '#C4704A'} 0%, #D4963A 100%)`, aspectRatio: '1' }),
    cardTagLabel: (tag) => ({ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: TAG_COLORS[tag] || '#C4704A', marginBottom: 5 }),
    cardTitle: { fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: 400, lineHeight: 1.3, color: '#2A1F14', marginBottom: 6 },
    cardExcerpt: { fontSize: 13, color: '#6B5B4E', lineHeight: 1.6, fontFamily: 'system-ui, sans-serif', fontWeight: 300, marginBottom: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' },
    cardMeta: { fontFamily: 'monospace', fontSize: 10, color: '#9E8E82', display: 'flex', gap: 12 },

    footer: { textAlign: 'center', paddingTop: 40, borderTop: '1px solid #E8D9C0', marginTop: 20 },
    footerLogo: { fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 400, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2A1F14', marginBottom: 6 },
    footerSub: { fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9E8E82' },
  };

  // render markdown-ish content
  function renderContent(text) {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 400, color: '#2A1F14', margin: '24px 0 10px' }}>{line.slice(3)}</h2>;
      if (line.startsWith('**') && line.endsWith('**')) return <p key={i} style={{ fontWeight: 600, marginBottom: 8 }}>{line.slice(2, -2)}</p>;
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} style={{ marginBottom: 10 }} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />;
    });
  }

  return (
    <div style={s.page}>
      {/* NAV */}
      <nav style={s.nav}>
        <a href="/" style={s.navLogo}>Agaya</a>
        <a href="/" style={s.navBack}>← Back to Assistant</a>
      </nav>

      {/* HERO */}
      <div style={{ marginBottom: 48 }}>
        <p style={s.eyebrow}>// Agaya Journal</p>
        <h1 style={s.heroTitle}>Knowledge is<br /><em style={s.heroTitleEm}>the first care.</em></h1>
        <p style={s.heroSub}>Evidence-based articles on fertility, reproductive health, and AI in medicine — for every woman, everywhere.</p>
      </div>

      {/* AI WRITER */}
      <div style={s.aiBox}>
        <p style={s.aiLabel}>✦ Agaya AI Writer</p>
        <h2 style={s.aiTitle}>Generate a new article</h2>
        <p style={s.aiSub}>Enter a topic in any language — English, 한국어, Swahili… Agaya will write a full article.</p>
        <input
          style={s.aiInput}
          value={topic}
          onChange={e => { setTopic(e.target.value); setLangHint(detectLang(e.target.value)); }}
          onKeyDown={e => e.key === 'Enter' && generateArticle()}
          placeholder="e.g. How stress affects egg quality… / 스트레스가 난소에 미치는 영향…"
        />
        <p style={s.aiHint}>{langHint || '✦ language auto-detected from your input'}</p>
        <button style={s.aiBtn} onClick={generateArticle} disabled={generating}>
          {generating ? '⏳  Generating…' : '✦  Generate Article'}
        </button>
      </div>

      {/* GENERATED ARTICLE */}
      {generatedPost && (
        <div style={s.generatedBox}>
          <div style={s.generatedHeader}>
            <span style={s.generatedHeaderLabel}>✦ AI Generated · Agaya</span>
            <button style={s.generatedClose} onClick={() => setGeneratedPost(null)}>✕ Close</button>
          </div>
          <div style={s.generatedBody}>
            <h2 style={s.generatedTitle}>{generatedPost.title}</h2>
            <p style={s.generatedMeta}>
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              {generatedPost.readTime ? ` · ${generatedPost.readTime}` : ''}
              {generatedPost.category ? ` · ${generatedPost.category}` : ''}
            </p>
            <div style={s.generatedContent}>{renderContent(generatedPost.content)}</div>
          </div>
        </div>
      )}

      {/* ARTICLE LIST */}
      <div style={s.sectionHead}>
        <h2 style={s.sectionLabel}>Latest Articles</h2>
      </div>

      {/* TAG FILTER */}
      <div style={s.tagStrip}>
        {allTags.map(t => (
          <button key={t} style={s.tag(activeTag === t)} onClick={() => setActiveTag(t)}>{t}</button>
        ))}
      </div>

      {/* CARDS */}
      {filteredPosts.map(post => (
        <a key={post.id} href="#" style={s.card}>
          <div style={s.cardThumb(post.tag)} />
          <div>
            <p style={s.cardTagLabel(post.tag)}>{post.tag}</p>
            <h3 style={s.cardTitle}>{post.title}</h3>
            <p style={s.cardExcerpt}>{post.excerpt}</p>
            <div style={s.cardMeta}>
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </a>
      ))}

      {/* FOOTER */}
      <div style={s.footer}>
        <p style={s.footerLogo}>Agaya</p>
        <p style={s.footerSub}>// Fertility Intelligence for Every Woman</p>
        <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: 11, color: '#9E8E82', marginTop: 10 }}>
          © 2026 Agaya · Not a substitute for medical advice
        </p>
      </div>
    </div>
  );
}
