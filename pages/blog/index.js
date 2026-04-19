import { useState } from 'react';

const SAMPLE_POSTS = [
  {
    id: 1, tag: 'PCOS',
    title: 'PCOS and Insulin: How Blood Sugar Management Affects Fertility',
    excerpt: 'Up to 70% of women with PCOS have insulin resistance. Understanding this connection can change your treatment approach.',
    date: 'April 8, 2026', readTime: '5 min read',
    content: `## What is PCOS and Insulin Resistance?

Polycystic Ovary Syndrome (PCOS) affects about 10% of women of reproductive age and is the most common endocrine disorder. Many people think of PCOS simply as "irregular periods" or an "ovarian problem," but at its core is often insulin resistance.

Insulin resistance means cells don't respond properly to insulin signals. The body then produces more insulin, and elevated insulin levels stimulate the ovaries to produce more androgens (male hormones). This is the chain reaction that leads to irregular ovulation, acne, excess hair growth, and difficulty conceiving.

## Why Does Blood Sugar Management Matter for Pregnancy?

Research shows insulin resistance appears in about 70% of women with PCOS. Stabilizing blood sugar lowers insulin levels, which can restore regular ovulation cycles, reduce androgen levels to ease symptoms, and improve pregnancy success rates.

## What You Can Do Through Lifestyle

Reducing refined carbohydrates (white rice, white bread, sugar) and increasing protein and fiber improves insulin sensitivity. There is strong evidence that aerobic exercise 3-4 times per week for 30+ minutes helps improve insulin resistance. Metformin is a medication that directly improves insulin resistance and is widely used in PCOS treatment — ask your specialist.

## Questions to Ask Your Doctor

Ask about getting fasting glucose, insulin, and HOMA-IR tests. Find out how much diet changes or exercise might help your specific PCOS symptoms, and whether Metformin is appropriate for you.

---
*This article is for educational purposes and does not replace personal medical advice. For accurate diagnosis and treatment, consult an OB/GYN specialist.*`
  },
  {
    id: 6, tag: 'AI & Medicine',
    title: 'Starting with Claude, Expanding with Gemma 4 — The Agaya Story',
    excerpt: 'What a Korean OB/GYN learned building an AI app. And why we chose Gemma 4 for women in Africa.',
    date: 'April 19, 2026', readTime: '6 min read',
    content: `## Why Did a Doctor Learn to Code?

In the clinic, I hear the same questions dozens of times a day. "When is my ovulation day?" "If my AMH is low, can I still get pregnant?" "Do I really need IVF?" Consultation time is short, patients' anxiety follows them home — and at 11pm, there's nowhere to ask.

So I decided to build it myself. Learning to code from scratch, having conversations with Claude AI, seeing errors in Kaggle notebooks. I'm not embarrassed. Building while learning felt right.

## Why We Started with Claude

Agaya's first version was built on Anthropic's Claude API. Claude understands medical context well, delivers excellent multilingual responses, and most importantly, gives consistently safe and warm answers. The chat, symptom analysis, image descriptions, and AI blog writing on agaya.net — all Claude-based.

## Why We're Expanding with Gemma 4

While building Agaya, one thing kept weighing on me: is this app actually reaching the people who need it most — women in East Africa, West Africa, medically underserved regions?

That's why I joined Google's Gemma 4 Hackathon. Gemma 4 is an open model. It can work in areas with unstable internet or where cost is a barrier. I tested Swahili responses and the quality was more than sufficient.

If Claude is Agaya's present, Gemma 4 is the experiment toward the future Agaya needs to reach.

## What's Next

Agaya currently supports Korean, English, and Swahili. The goal is to build a Gemma 4-based, offline-friendly version so that people in areas with unstable internet can still access basic fertility and reproductive health information.

Knowing is the first step to healing. That information shouldn't only belong to people in Changwon.

---
*This article is the development story written directly by Agaya's creator (OB/GYN & Fertility Specialist).*`
  },
  {
    id: 2, tag: 'Agaya Stories',
    title: '"I Found Out I Had Endometriosis at 34" — Amara\'s Story from Lagos',
    excerpt: 'A late diagnosis, the emotional weight it carried, and how information changed everything.',
    date: 'April 5, 2026', readTime: '7 min read',
    content: `## For 10 Years, She Was Told "It's Just Period Pain"

Amara (not her real name) is a 34-year-old woman living in Lagos, Nigeria. She'd had severe pain with every period since high school, but was always told "all women go through this." When she still hadn't conceived two years after getting married, she saw a fertility specialist for the first time. Laparoscopy result: Stage 3 endometriosis.

## Why Is Endometriosis Diagnosed So Late?

Endometriosis takes an average of 7-10 years to diagnose. Symptoms like painful periods, pelvic pain, and pain during intercourse are often dismissed as "normal period symptoms." The fact that a laparoscopy is needed for a definitive diagnosis also creates a barrier.

## How Information Changed Everything

After her diagnosis, Amara learned more about endometriosis through Agaya. That her symptoms weren't abnormal. That there were treatment options. That pregnancy was still possible. "If I had known this 10 years ago" — those words stayed with me. That's why Agaya exists.

## What You Should Know About Endometriosis

It affects about 10% of women of reproductive age. If period pain is interfering with daily life, you need a specialist consultation. Early diagnosis and treatment are important for preventing infertility. Options include hormonal therapy, surgery, and fertility treatments.

---
*This article is a reconstructed story based on real experiences. Names and some details have been changed to protect privacy.*`
  },
  {
    id: 3, tag: 'Pregnancy',
    title: 'Morning Sickness: Evidence-Based Relief Beyond Ginger Tea',
    excerpt: 'What randomized controlled trials actually say about managing hyperemesis — and when to go to the hospital.',
    date: 'April 2, 2026', readTime: '4 min read',
    content: `## Why Does Morning Sickness Happen?

About 70-80% of pregnant women experience nausea and vomiting in early pregnancy. It typically starts at 6-8 weeks and eases around 12-14 weeks for most. Rising hCG hormones, increased estrogen, and heightened smell sensitivity are all thought to play a role.

## Methods With Evidence Behind Them

There is real research showing ginger helps with nausea relief. Both ginger tea and ginger capsules (250mg, 4 times daily) have shown effectiveness. Vitamin B6 (pyridoxine) has demonstrated nausea relief in multiple randomized controlled trials (10-25mg per day). Avoiding an empty stomach, eating small amounts frequently, and avoiding greasy foods and strong smells also help.

## When Should You Go to the Hospital?

If you're vomiting more than 3-4 times a day, can't eat or drink anything for 24 hours, or notice your urine is very dark or reduced in volume — visit the hospital immediately. These can be signs of **Hyperemesis Gravidarum**.

---
*This article is for educational purposes and does not replace personal medical advice. If symptoms are severe, consult an OB/GYN specialist.*`
  },
  {
    id: 4, tag: 'IVF & ART',
    title: 'IVF in Sub-Saharan Africa: Access, Cost, and Change',
    excerpt: 'Assisted reproductive technologies are spreading across the continent. Who is being reached, and who is still left out.',
    date: 'March 29, 2026', readTime: '9 min read',
    content: `## Infertility in Africa: An Underestimated Crisis

In sub-Saharan Africa, infertility goes beyond a personal issue — it carries social stigma. In many cultures, women who cannot have children risk divorce, domestic violence, and social exclusion. Yet access to IVF and other assisted reproductive technologies in this region remains extremely difficult.

## The Current Situation

IVF clinics are emerging in Nigeria, Kenya, South Africa, Ghana, and elsewhere. But the cost of one cycle — around $2,000-5,000 — is dozens of times the average monthly wage, and health insurance coverage is almost nonexistent.

## Why Agaya Cares About This

Agaya supports Swahili. This isn't a simple language addition. It's about making reproductive health information accessible in a language spoken by over 100 million people in East Africa. Helping people get basic information and know the right questions to ask before visiting a specialist — that's the starting point.

---
*This article is for educational purposes and does not replace personal medical advice.*`
  },
  {
    id: 5, tag: 'Hormonal Health',
    title: 'Thyroid and Pregnancy: The Often-Missed Link in Recurrent Miscarriage',
    excerpt: 'Subclinical hypothyroidism is treatable but often goes undetected. What you should ask your doctor.',
    date: 'March 25, 2026', readTime: '5 min read',
    content: `## The Link Between Recurrent Miscarriage and the Thyroid

If you have experienced two or more miscarriages, thyroid function must be checked in your workup. **Subclinical Hypothyroidism** has no or minimal symptoms, making it easy to miss — but it can be a cause of recurrent miscarriage and infertility.

## What Is Subclinical Hypothyroidism?

It's a condition where thyroid hormones (T4) are normal but TSH is mildly elevated. It often passes as "normal" in routine checkups, but the standards are different for those trying to conceive or who are pregnant. For women preparing for pregnancy, a TSH below 2.5 mIU/L is generally recommended.

## Treatment and Specialist Consultation

Treatment with Levothyroxine is safe and effective. Ask your doctor for TSH, Free T4, and thyroid antibody (TPOAb) tests. Ongoing monitoring is important as dosage adjustments may be needed even after a successful pregnancy.

---
*This article is for educational purposes and does not replace personal medical advice. If you have experienced recurrent miscarriage, please consult a specialist.*`
  },
];

const TAG_COLORS = {
  'PCOS': '#C4704A',
  'Agaya Stories': '#7B5EA7',
  'Pregnancy': '#4A6741',
  'IVF & ART': '#2A1F14',
  'Hormonal Health': '#D4963A',
  'AI & Medicine': '#1D9E75',
};

export default function Blog() {
  const [topic, setTopic] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState(null);
  const [langHint, setLangHint] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [openPostId, setOpenPostId] = useState(null);

  const allTags = ['All', 'PCOS', 'Pregnancy', 'IVF & ART', 'Hormonal Health', 'Agaya Stories', 'AI & Medicine'];

  const filteredPosts = activeTag === 'All'
    ? SAMPLE_POSTS
    : SAMPLE_POSTS.filter(p => p.tag === activeTag);

  function detectLang(text) {
    if (/[\uAC00-\uD7AF]/.test(text)) return '한국어로 생성됩니다';
    if (/[\u0E00-\u0E7F]/.test(text)) return 'จะสร้างเป็นภาษาไทย';
    if (/[\u0080-\u024F]/.test(text) && /[àâéèêëîïôùûüç]/i.test(text)) return 'Será generado en español / français';
    return 'Will be generated in the detected language';
  }

  async function generateArticle() {
    if (!topic.trim()) return;
    setGenerating(true);
    setGeneratedPost(null);
    const system = `You are Agaya's medical blog writer — an OB/GYN and fertility specialist writing together with AI.
Write authoritative, warm blog articles about women's health and fertility.
Important rules:
- Detect the user's input language and write the entire article in that language
- Structure: ## for section headings, 3-4 sections
- Style: warm but evidence-based, 500-700 words
- Include educational disclaimer at the end
- Output JSON only: {"title":"...","category":"...","readTime":"X min read","content":"..."}`;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system, messages: [{ role: 'user', content: `Please write a blog article on this topic: ${topic}` }] })
      });
      const data = await res.json();
      const raw = (data.content || '').replace(/```json|```/g, '').trim();
      let parsed;
      try { parsed = JSON.parse(raw); }
      catch { parsed = { title: topic, category: 'Fertility', readTime: '5 min read', content: data.content }; }
      setGeneratedPost(parsed);
    } catch {
      setGeneratedPost({ title: topic, category: 'Error', readTime: '', content: 'An error occurred. Please try again.' });
    }
    setGenerating(false);
    setTopic('');
  }

  function renderContent(text) {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 400, color: '#2A1F14', margin: '24px 0 10px' }}>{line.slice(3)}</h2>;
      if (line.startsWith('**') && line.endsWith('**')) return <p key={i} style={{ fontWeight: 600, marginBottom: 8 }}>{line.slice(2, -2)}</p>;
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} style={{ marginBottom: 10 }} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />;
    });
  }

  const S = {
    page: { maxWidth: 860, margin: '0 auto', padding: '0 20px 60px', fontFamily: 'Georgia, serif', background: '#FAF6F0', minHeight: '100vh' },
    nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 0', borderBottom: '1px solid #E8D9C0', marginBottom: 40 },
    navLogo: { fontSize: 22, fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2A1F14', textDecoration: 'none', fontFamily: 'Georgia, serif' },
    navBack: { fontSize: 12, color: '#C4704A', textDecoration: 'none', fontFamily: 'system-ui, sans-serif', letterSpacing: '0.08em' },
    eyebrow: { fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#D4963A', marginBottom: 12 },
    heroTitle: { fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 400, color: '#2A1F14', lineHeight: 1.1, marginBottom: 14 },
    heroTitleEm: { fontStyle: 'italic', color: '#C4704A' },
    heroSub: { fontSize: 15, color: '#6B5B4E', lineHeight: 1.7, fontFamily: 'system-ui, sans-serif', fontWeight: 300, maxWidth: 520, marginBottom: 40 },
    collab: { background: '#E1F5EE', borderRadius: 6, border: '1px solid #5DCAA5', padding: '12px 18px', marginBottom: 48, display: 'flex', alignItems: 'center', gap: 12 },
    collabDot: { width: 8, height: 8, borderRadius: '50%', background: '#1D9E75', flexShrink: 0 },
    collabText: { fontSize: 13, color: '#085041', fontFamily: 'system-ui, sans-serif', lineHeight: 1.5 },
    aiBox: { background: '#2A1F14', borderRadius: 6, padding: '24px 28px', marginBottom: 48 },
    aiLabel: { fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#D4963A', marginBottom: 8 },
    aiTitle: { fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 400, color: '#F5EFE4', marginBottom: 6 },
    aiSub: { fontSize: 13, color: 'rgba(245,239,228,0.5)', lineHeight: 1.6, fontFamily: 'system-ui, sans-serif', marginBottom: 16 },
    aiInput: { width: '100%', background: 'rgba(245,239,228,0.07)', border: '1px solid rgba(245,239,228,0.15)', borderRadius: 4, padding: '10px 14px', color: '#F5EFE4', fontFamily: 'system-ui, sans-serif', fontSize: 14, outline: 'none', marginBottom: 6, boxSizing: 'border-box' },
    aiHint: { fontFamily: 'monospace', fontSize: 11, color: 'rgba(245,239,228,0.3)', marginBottom: 14 },
    aiBtn: { width: '100%', background: '#C4704A', border: 'none', color: '#F5EFE4', padding: '11px', borderRadius: 4, fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' },
    genBox: { background: '#fff', borderRadius: 6, border: '1px solid #E8D9C0', marginBottom: 48, overflow: 'hidden' },
    genHeader: { background: '#2A1F14', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    genLabel: { fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4963A' },
    genClose: { background: 'none', border: '1px solid rgba(245,239,228,0.2)', color: 'rgba(245,239,228,0.5)', padding: '3px 10px', borderRadius: 3, fontFamily: 'monospace', fontSize: 10, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em' },
    genBody: { padding: '28px 32px' },
    genTitle: { fontFamily: 'Georgia, serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, color: '#2A1F14', lineHeight: 1.2, marginBottom: 10 },
    genMeta: { fontFamily: 'monospace', fontSize: 11, color: '#9E8E82', marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #E8D9C0' },
    genContent: { fontSize: 15, lineHeight: 1.85, color: '#3A2E26', fontFamily: 'Georgia, serif' },
    sectionHead: { display: 'flex', alignItems: 'baseline', borderBottom: '1px solid #E8D9C0', paddingBottom: 10, marginBottom: 24 },
    sectionLabel: { fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 400, color: '#2A1F14' },
    tagStrip: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 },
    tag: (a) => ({ fontSize: 12, padding: '5px 14px', borderRadius: 3, background: a ? '#C4704A' : '#E8D9C0', color: a ? '#FAF6F0' : '#2A1F14', cursor: 'pointer', border: 'none', fontFamily: 'system-ui, sans-serif', fontWeight: 300 }),
    cardWrap: { borderBottom: '1px solid #E8D9C0', marginBottom: 24, paddingBottom: 24 },
    card: { display: 'grid', gridTemplateColumns: '100px 1fr', gap: 18, cursor: 'pointer' },
    thumb: (tag) => ({ borderRadius: 3, background: `linear-gradient(135deg, ${TAG_COLORS[tag] || '#C4704A'} 0%, #D4963A 100%)`, aspectRatio: '1' }),
    tagLabel: (tag) => ({ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: TAG_COLORS[tag] || '#C4704A', marginBottom: 5 }),
    cardTitle: { fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: 400, lineHeight: 1.3, color: '#2A1F14', marginBottom: 6 },
    excerpt: { fontSize: 13, color: '#6B5B4E', lineHeight: 1.6, fontFamily: 'system-ui, sans-serif', fontWeight: 300, marginBottom: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' },
    meta: { fontFamily: 'monospace', fontSize: 10, color: '#9E8E82', display: 'flex', gap: 12 },
    articleBody: { padding: '20px 0 4px' },
    articleContent: { fontSize: 15, lineHeight: 1.9, color: '#3A2E26', fontFamily: 'Georgia, serif' },
    closeBtn: { marginTop: 16, background: 'none', border: '1px solid #E8D9C0', borderRadius: 3, padding: '4px 14px', fontFamily: 'monospace', fontSize: 10, color: '#9E8E82', cursor: 'pointer', letterSpacing: '0.08em' },
    footer: { textAlign: 'center', paddingTop: 40, borderTop: '1px solid #E8D9C0', marginTop: 20 },
    footerLogo: { fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 400, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2A1F14', marginBottom: 6 },
    footerSub: { fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9E8E82' },
  };

  return (
    <div style={S.page}>
      <nav style={S.nav}>
        <a href="/" style={S.navLogo}>Agaya</a>
        <a href="/" style={S.navBack}>← Back to Assistant</a>
      </nav>

      <div style={{ marginBottom: 48 }}>
        <p style={S.eyebrow}>// Agaya Journal</p>
        <h1 style={S.heroTitle}>Knowing is<br /><em style={S.heroTitleEm}>the first step to healing.</em></h1>
        <p style={S.heroSub}>Evidence-based articles on fertility, reproductive health, and AI in medicine — for every woman, everywhere.</p>
      </div>

      <div style={S.collab}>
        <div style={S.collabDot} />
        <p style={S.collabText}>
          <strong>Written by a Fertility Specialist + AI.</strong> Every article on this blog is a collaboration between the medical perspective of an OB/GYN & fertility specialist and AI writing. For educational purposes only — does not replace personal medical advice.
        </p>
      </div>

      <div style={S.aiBox}>
        <p style={S.aiLabel}>✦ Agaya AI Writing</p>
        <h2 style={S.aiTitle}>Generate a New Article</h2>
        <p style={S.aiSub}>Enter a topic in any language — English, 한국어, Swahili, Tiếng Việt, ภาษาไทย… Agaya will write the full article.</p>
        <input style={S.aiInput} value={topic}
          onChange={e => { setTopic(e.target.value); setLangHint(detectLang(e.target.value)); }}
          onKeyDown={e => e.key === 'Enter' && generateArticle()}
          placeholder="e.g. How stress affects egg quality / PCOS and diet / 배란과 스트레스…" />
        <p style={S.aiHint}>{langHint || '✦ Language is automatically detected from your input'}</p>
        <button style={S.aiBtn} onClick={generateArticle} disabled={generating}>
          {generating ? '⏳  Generating…' : '✦  Generate Article'}
        </button>
      </div>

      {generatedPost && (
        <div style={S.genBox}>
          <div style={S.genHeader}>
            <span style={S.genLabel}>✦ AI Generated · Reviewed by Fertility Specialist</span>
            <button style={S.genClose} onClick={() => setGeneratedPost(null)}>✕ Close</button>
          </div>
          <div style={S.genBody}>
            <h2 style={S.genTitle}>{generatedPost.title}</h2>
            <p style={S.genMeta}>
              {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              {generatedPost.readTime ? ` · ${generatedPost.readTime}` : ''}
              {generatedPost.category ? ` · ${generatedPost.category}` : ''}
            </p>
            <div style={S.genContent}>{renderContent(generatedPost.content)}</div>
          </div>
        </div>
      )}

      <div style={S.sectionHead}>
        <h2 style={S.sectionLabel}>Latest Articles</h2>
      </div>

      <div style={S.tagStrip}>
        {allTags.map(t => (
          <button key={t} style={S.tag(activeTag === t)} onClick={() => setActiveTag(t)}>{t}</button>
        ))}
      </div>

      {filteredPosts.map(post => {
        const isOpen = openPostId === post.id;
        return (
          <div key={post.id} style={S.cardWrap}>
            <div style={S.card} onClick={() => setOpenPostId(isOpen ? null : post.id)}>
              <div style={S.thumb(post.tag)} />
              <div>
                <p style={S.tagLabel(post.tag)}>{post.tag}</p>
                <h3 style={S.cardTitle}>{post.title}</h3>
                {!isOpen && <p style={S.excerpt}>{post.excerpt}</p>}
                <div style={S.meta}>
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                  <span style={{ color: '#C4704A' }}>{isOpen ? '▲ Collapse' : 'Read →'}</span>
                </div>
              </div>
            </div>
            {isOpen && (
              <div style={S.articleBody}>
                <div style={S.articleContent}>{renderContent(post.content)}</div>
                <button style={S.closeBtn} onClick={() => setOpenPostId(null)}>✕ Collapse</button>
              </div>
            )}
          </div>
        );
      })}

      <div style={S.footer}>
        <p style={S.footerLogo}>Agaya</p>
        <p style={S.footerSub}>// Fertility information for every woman</p>
        <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: 11, color: '#9E8E82', marginTop: 10 }}>
          © 2026 Agaya · Does not replace medical advice · <a href="https://agaya.net" style={{ color: '#1D9E75', textDecoration: 'none' }}>agaya.net</a>
        </p>
      </div>
    </div>
  );
}
