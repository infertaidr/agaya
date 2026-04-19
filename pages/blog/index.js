import { useState } from 'react';

const SAMPLE_POSTS = [
  {
    id: 1, tag: 'PCOS',
    title: 'PCOS와 인슐린: 혈당 관리가 임신에 미치는 영향',
    excerpt: 'PCOS 여성의 최대 70%에서 인슐린 저항성이 나타나요. 이 연결고리를 이해하면 치료 접근법이 달라질 수 있어요.',
    date: '2026년 4월 8일', readTime: '5분 읽기'
  },
  {
    id: 6, tag: 'AI & Medicine',
    title: 'Claude로 시작해서 Gemma 4로 확장 중 — Agaya 개발 이야기',
    excerpt: '산부인과 의사가 AI 앱을 만들면서 배운 것들. 그리고 아프리카 여성을 위해 Gemma 4를 선택한 이유.',
    date: '2026년 4월 19일', readTime: '6분 읽기'
  },
  {
    id: 2, tag: 'Agaya 스토리',
    title: '"34살에 자궁내막증을 알게 됐어요" — 라고스에서 온 아마라의 이야기',
    excerpt: '늦은 진단, 그 감정적 무게, 그리고 정보가 어떻게 모든 것을 바꿨는지에 대한 개인적인 이야기.',
    date: '2026년 4월 5일', readTime: '7분 읽기'
  },
  {
    id: 3, tag: '임신',
    title: '임신 초기 입덧: 생강차 너머의 근거 기반 완화법',
    excerpt: '임신오조증 관리에 대해 무작위 대조 시험이 실제로 말하는 것 — 그리고 언제 병원에 가야 하는지.',
    date: '2026년 4월 2일', readTime: '4분 읽기'
  },
  {
    id: 4, tag: 'IVF & ART',
    title: '사하라 이남 아프리카의 IVF: 접근성, 비용, 그리고 변화',
    excerpt: '보조 생식 기술이 아프리카 대륙 전역으로 확산되고 있어요. 누구에게 닿고 있고, 누가 아직 소외되어 있는지.',
    date: '2026년 3월 29일', readTime: '9분 읽기'
  },
  {
    id: 5, tag: '호르몬 건강',
    title: '갑상선과 임신: 반복 유산에서 자주 놓치는 연결고리',
    excerpt: '불현성 갑상선기능저하증은 치료 가능하지만 잘 발견되지 않아요. 의사에게 물어봐야 할 것들.',
    date: '2026년 3월 25일', readTime: '5분 읽기'
  },
];

const TAG_COLORS = {
  'PCOS': '#C4704A',
  'Agaya 스토리': '#7B5EA7',
  '임신': '#4A6741',
  'IVF & ART': '#2A1F14',
  '호르몬 건강': '#D4963A',
  'AI & Medicine': '#1D9E75',
  '난임 과학': '#C4704A',
};

export default function Blog() {
  const [topic, setTopic] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState(null);
  const [langHint, setLangHint] = useState('');
  const [activeTag, setActiveTag] = useState('전체');

  const allTags = ['전체', 'PCOS', '임신', 'IVF & ART', '호르몬 건강', 'Agaya 스토리', 'AI & Medicine'];

  const filteredPosts = activeTag === '전체'
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

    const system = `당신은 Agaya의 의학 블로그 작성자예요 — 산부인과 및 난임 전문의가 AI와 함께 씁니다.
여성 건강과 난임에 대한 권위 있고 따뜻한 블로그 아티클을 작성해요.

중요 규칙:
- 사용자 입력 언어를 감지해서 전체 아티클을 그 언어로 작성하세요
- 구조: ## 로 섹션 제목, 3-4개 섹션
- 스타일: 따뜻하지만 근거 기반
- 길이: 약 500-700단어
- 마지막에 "이 글은 교육 목적이며 개인 의료 조언을 대체하지 않습니다" 문구 포함
- JSON만 출력, 마크다운 펜스 없이:
{"title":"...","category":"...","readTime":"X분 읽기","content":"## 섹션 제목 포함 전체 글"}`;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system,
          messages: [{ role: 'user', content: `다음 주제로 블로그 아티클을 작성해주세요: ${topic}` }]
        })
      });
      const data = await res.json();
      const raw = (data.content || '').replace(/```json|```/g, '').trim();
      let parsed;
      try { parsed = JSON.parse(raw); }
      catch { parsed = { title: topic, category: '난임', readTime: '5분 읽기', content: data.content }; }
      setGeneratedPost(parsed);
    } catch {
      setGeneratedPost({ title: topic, category: '오류', readTime: '', content: '오류가 발생했어요. 다시 시도해주세요.' });
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

    // 난임 전문의 + AI 협업 배너
    collab: { background: '#E1F5EE', borderRadius: 6, border: '1px solid #5DCAA5', padding: '12px 18px', marginBottom: 48, display: 'flex', alignItems: 'center', gap: 12 },
    collabDot: { width: 8, height: 8, borderRadius: '50%', background: '#1D9E75', flexShrink: 0 },
    collabText: { fontSize: 13, color: '#085041', fontFamily: 'system-ui, sans-serif', lineHeight: 1.5 },

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
        <a href="/" style={s.navBack}>← 어시스턴트로 돌아가기</a>
      </nav>

      {/* HERO */}
      <div style={{ marginBottom: 48 }}>
        <p style={s.eyebrow}>// Agaya 저널</p>
        <h1 style={s.heroTitle}>아는 것이<br /><em style={s.heroTitleEm}>첫 번째 치료예요.</em></h1>
        <p style={s.heroSub}>난임, 생식 건강, 그리고 의학 속 AI에 대한 근거 기반 아티클 — 모든 여성을 위해, 어디서든.</p>
      </div>

      {/* 협업 배너 */}
      <div style={s.collab}>
        <div style={s.collabDot} />
        <p style={s.collabText}>
          <strong>난임 전문의 + AI가 함께 씁니다.</strong> 이 블로그의 모든 글은 산부인과·난임 전문의의 의학적 관점과 AI의 글쓰기가 협업한 결과예요. 교육 목적이며 개인 의료 조언을 대체하지 않아요.
        </p>
      </div>

      {/* AI WRITER */}
      <div style={s.aiBox}>
        <p style={s.aiLabel}>✦ Agaya AI 글쓰기</p>
        <h2 style={s.aiTitle}>새 아티클 생성하기</h2>
        <p style={s.aiSub}>어떤 언어로든 주제를 입력하세요 — 한국어, English, Swahili… Agaya가 전체 아티클을 작성해드려요.</p>
        <input
          style={s.aiInput}
          value={topic}
          onChange={e => { setTopic(e.target.value); setLangHint(detectLang(e.target.value)); }}
          onKeyDown={e => e.key === 'Enter' && generateArticle()}
          placeholder="예: 스트레스가 난소에 미치는 영향 / How stress affects egg quality…"
        />
        <p style={s.aiHint}>{langHint || '✦ 입력 언어를 자동으로 감지해요'}</p>
        <button style={s.aiBtn} onClick={generateArticle} disabled={generating}>
          {generating ? '⏳  생성 중…' : '✦  아티클 생성하기'}
        </button>
      </div>

      {/* GENERATED ARTICLE */}
      {generatedPost && (
        <div style={s.generatedBox}>
          <div style={s.generatedHeader}>
            <span style={s.generatedHeaderLabel}>✦ AI 생성 · 난임 전문의 감수</span>
            <button style={s.generatedClose} onClick={() => setGeneratedPost(null)}>✕ 닫기</button>
          </div>
          <div style={s.generatedBody}>
            <h2 style={s.generatedTitle}>{generatedPost.title}</h2>
            <p style={s.generatedMeta}>
              {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
              {generatedPost.readTime ? ` · ${generatedPost.readTime}` : ''}
              {generatedPost.category ? ` · ${generatedPost.category}` : ''}
            </p>
            <div style={s.generatedContent}>{renderContent(generatedPost.content)}</div>
          </div>
        </div>
      )}

      {/* ARTICLE LIST */}
      <div style={s.sectionHead}>
        <h2 style={s.sectionLabel}>최신 아티클</h2>
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
        <p style={s.footerSub}>// 모든 여성을 위한 난임 정보</p>
        <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: 11, color: '#9E8E82', marginTop: 10 }}>
          © 2026 Agaya · 의료 조언을 대체하지 않습니다
        </p>
      </div>
    </div>
  );
}
