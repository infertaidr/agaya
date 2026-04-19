import { useState } from 'react';

const SAMPLE_POSTS = [
  {
    id: 1, tag: 'PCOS',
    title: 'PCOS와 인슐린: 혈당 관리가 임신에 미치는 영향',
    excerpt: 'PCOS 여성의 최대 70%에서 인슐린 저항성이 나타나요. 이 연결고리를 이해하면 치료 접근법이 달라질 수 있어요.',
    date: '2026년 4월 8일', readTime: '5분 읽기',
    content: `## PCOS와 인슐린 저항성이란?

다낭성 난소 증후군(PCOS)은 가임기 여성의 약 10%에게 영향을 미치는 가장 흔한 내분비 질환이에요. 많은 분들이 PCOS가 단순히 "생리 불순"이나 "난소 문제"라고만 알고 계시지만, 사실 그 핵심에는 **인슐린 저항성**이 자리 잡고 있는 경우가 많아요.

인슐린 저항성이란 세포가 인슐린 신호에 제대로 반응하지 못하는 상태예요. 이때 몸은 더 많은 인슐린을 분비하게 되고, 높아진 인슐린 수치는 난소를 자극해 남성 호르몬(안드로겐) 생산을 늘려요. 바로 이것이 불규칙한 배란, 여드름, 다모증, 그리고 임신 어려움으로 이어지는 연결고리예요.

## 혈당 관리가 왜 임신에 중요할까요?

연구에 따르면 PCOS 여성의 약 70%에서 인슐린 저항성이 나타나요. 혈당을 안정적으로 관리하면 인슐린 수치가 낮아지고, 배란 주기가 규칙적으로 돌아올 수 있어요. 남성 호르몬 수치가 낮아져 증상이 완화되고, 임신 성공률도 높아질 수 있어요.

## 생활 습관으로 할 수 있는 것들

정제 탄수화물(흰쌀, 흰빵, 설탕)을 줄이고 단백질과 식이섬유를 늘리는 식단이 인슐린 감수성을 높이는 데 효과적이에요. 주 3-4회 30분 이상의 유산소 운동도 인슐린 저항성 개선에 도움이 된다는 근거가 충분해요. 메포르민(Metformin)은 인슐린 저항성을 직접 개선하는 약물로 PCOS 치료에 널리 사용돼요. 담당 전문의와 상담해보세요.

## 전문의와 상담할 때 물어볼 것들

공복 혈당, 인슐린, HOMA-IR 검사를 받아볼 수 있는지 물어보세요. 식단 변화나 운동이 내 PCOS 증상에 어느 정도 효과가 있을지, 메포르민이 나에게 적합한지도 확인해보세요.

---
*이 글은 교육 목적이며 개인 의료 조언을 대체하지 않습니다. 정확한 진단과 치료는 산부인과 전문의와 상담하세요.*`
  },
  {
    id: 6, tag: 'AI & Medicine',
    title: 'Claude로 시작해서 Gemma 4로 확장 중 — Agaya 개발 이야기',
    excerpt: '산부인과 의사가 AI 앱을 만들면서 배운 것들. 그리고 아프리카 여성을 위해 Gemma 4를 선택한 이유.',
    date: '2026년 4월 19일', readTime: '6분 읽기',
    content: `## 왜 의사가 직접 코딩을 배웠나요?

진료실에서 하루에도 수십 번 같은 질문을 들어요. "배란일이 언제예요?", "AMH가 낮으면 임신이 안 되나요?", "IVF를 꼭 해야 할까요?" 진료 시간은 짧고, 환자분들의 불안은 집까지 따라가는데 밤 11시에 물어볼 곳이 없었어요.

그래서 직접 만들기로 했어요. 코딩을 처음 배우면서, Claude AI와 대화하면서, Kaggle 노트북에서 에러를 보면서요. 부끄럽지 않아요. 배우면서 만드는 게 맞는 것 같았거든요.

## Claude로 시작한 이유

Agaya의 첫 버전은 Anthropic의 Claude API 기반으로 만들었어요. Claude는 의료 맥락을 잘 이해하고, 한국어 응답 품질이 뛰어나고, 무엇보다 안전하고 따뜻한 답변을 일관되게 줬어요. 지금 agaya.net의 채팅, 증상 분석, 이미지 설명, AI 블로그 글쓰기 — 모두 Claude 기반이에요.

## Gemma 4로 확장하는 이유

Agaya를 만들면서 계속 마음에 걸렸던 것이 있어요. 이 앱이 실제로 가장 필요한 사람들 — 동아프리카, 서아프리카, 의료 소외 지역의 여성들 — 에게 닿고 있는가?

그래서 Google의 **Gemma 4 Hackathon**에 참가하게 됐어요. Gemma 4는 오픈 모델이에요. 인터넷이 불안정하거나 비용이 문제가 되는 지역에서도 동작할 수 있어요. 스와힐리어 응답도 테스트했는데 품질이 충분히 좋았어요.

Claude가 Agaya의 현재라면, Gemma 4는 Agaya가 닿아야 할 미래를 위한 실험이에요.

## 앞으로의 계획

지금 Agaya는 한국어·영어·스와힐리어를 지원해요. 앞으로 Gemma 4 기반의 오프라인 친화적 버전을 만들어, 인터넷 연결이 불안정한 지역에서도 기본적인 난임·생식 건강 정보에 접근할 수 있게 하는 것이 목표예요.

아는 것이 첫 번째 치료예요. 그 정보가 창원에 사는 분들만의 것이어서는 안 된다고 생각해요.

---
*이 글은 Agaya 개발자(산부인과·난임 전문의)가 직접 쓴 개발 스토리예요.*`
  },
  {
    id: 2, tag: 'Agaya 스토리',
    title: '"34살에 자궁내막증을 알게 됐어요" — 라고스에서 온 아마라의 이야기',
    excerpt: '늦은 진단, 그 감정적 무게, 그리고 정보가 어떻게 모든 것을 바꿨는지에 대한 개인적인 이야기.',
    date: '2026년 4월 5일', readTime: '7분 읽기',
    content: `## 10년 동안 "그냥 생리통"이라고 들었어요

아마라(가명)는 나이지리아 라고스에 사는 34세 여성이에요. 고등학교 때부터 생리 때마다 극심한 통증이 있었지만, 주변에서는 늘 "여자라면 다 그런 거야"라고 했어요. 결혼 후 2년이 지나도 임신이 되지 않자 처음으로 난임 전문의를 찾았어요. 복강경 검사 결과: 3기 자궁내막증이었어요.

## 자궁내막증이 왜 이렇게 늦게 발견되나요?

자궁내막증은 평균 진단까지 7-10년이 걸려요. 증상(생리통, 골반통, 성교통)이 "정상적인 생리 증상"으로 여겨지는 경우가 많고, 확진을 위해서는 복강경 수술이 필요하다는 것도 장벽이 돼요.

## 정보가 어떻게 모든 것을 바꿨나요?

아마라는 진단 후 Agaya를 통해 자궁내막증에 대해 더 많이 알게 됐어요. 자신의 증상이 비정상이 아니었다는 것, 치료 옵션이 있다는 것, 임신도 가능하다는 것을요. "이걸 10년 전에 알았더라면"이라는 말이 마음에 남았어요. 그게 Agaya가 존재하는 이유예요.

## 자궁내막증, 이것만 알아두세요

가임기 여성의 약 10%에서 발생해요. 생리통이 일상생활을 방해할 정도라면 전문의 상담이 필요해요. 조기 진단과 치료가 난임 예방에 중요하고, 호르몬 치료, 수술, 난임 치료 등 다양한 옵션이 있어요.

---
*이 글은 실제 경험을 바탕으로 재구성한 이야기예요. 개인정보 보호를 위해 이름과 일부 세부사항을 변경했어요.*`
  },
  {
    id: 3, tag: '임신',
    title: '임신 초기 입덧: 생강차 너머의 근거 기반 완화법',
    excerpt: '임신오조증 관리에 대해 무작위 대조 시험이 실제로 말하는 것 — 그리고 언제 병원에 가야 하는지.',
    date: '2026년 4월 2일', readTime: '4분 읽기',
    content: `## 입덧은 왜 생기나요?

임신 초기 입덧(오심·구토)은 임산부의 약 70-80%가 경험해요. 임신 6-8주에 시작해서 대부분 12-14주쯤 완화돼요. hCG 호르몬 급증, 에스트로겐 증가, 후각 민감도 변화 등이 관여하는 것으로 알려져 있어요.

## 근거가 있는 방법들

생강이 입덧 완화에 도움이 된다는 연구가 실제로 있어요. 생강차, 생강 캡슐(250mg, 하루 4회) 모두 효과가 확인됐어요. 비타민 B6(피리독신)는 여러 무작위 대조 시험에서 오심 완화 효과가 입증됐어요(하루 10-25mg). 빈속을 피하고 소량씩 자주 먹는 것, 기름진 음식과 강한 냄새 음식을 피하는 것도 도움이 돼요.

## 언제 병원에 가야 하나요?

하루 3-4회 이상 구토가 지속되거나, 24시간 동안 아무것도 먹거나 마실 수 없거나, 소변이 매우 진하거나 양이 줄었다면 즉시 병원을 방문하세요. 이는 **임신오조증(Hyperemesis Gravidarum)**의 신호일 수 있어요.

---
*이 글은 교육 목적이며 개인 의료 조언을 대체하지 않습니다. 증상이 심하면 반드시 산부인과 전문의와 상담하세요.*`
  },
  {
    id: 4, tag: 'IVF & ART',
    title: '사하라 이남 아프리카의 IVF: 접근성, 비용, 그리고 변화',
    excerpt: '보조 생식 기술이 아프리카 대륙 전역으로 확산되고 있어요. 누구에게 닿고 있고, 누가 아직 소외되어 있는지.',
    date: '2026년 3월 29일', readTime: '9분 읽기',
    content: `## 아프리카의 난임, 과소평가된 위기

사하라 이남 아프리카에서 난임은 개인의 문제를 넘어 사회적 낙인이에요. 많은 문화에서 아이를 갖지 못하는 여성은 이혼, 가정 폭력, 사회적 배제의 위험에 놓이기도 해요. 그런데 이 지역에서 IVF 등 보조 생식 기술에 접근하는 것은 여전히 매우 어려워요.

## 현재 상황

나이지리아, 케냐, 남아프리카공화국, 가나 등에 IVF 클리닉이 생겨나고 있어요. 그러나 한 주기 비용이 2,000-5,000달러 수준으로 현지 평균 월급의 수십 배에 달하고, 건강보험 적용은 거의 없어요.

## Agaya가 이 문제에 관심을 갖는 이유

Agaya는 스와힐리어를 지원해요. 단순한 언어 추가가 아니에요. 동아프리카 1억 명 이상이 쓰는 언어로 생식 건강 정보에 접근할 수 있게 하는 것이에요. 전문 클리닉에 가기 전, 기본적인 정보를 얻고 올바른 질문을 할 수 있도록 돕는 것 — 그게 시작이에요.

---
*이 글은 교육 목적이며 개인 의료 조언을 대체하지 않습니다.*`
  },
  {
    id: 5, tag: '호르몬 건강',
    title: '갑상선과 임신: 반복 유산에서 자주 놓치는 연결고리',
    excerpt: '불현성 갑상선기능저하증은 치료 가능하지만 잘 발견되지 않아요. 의사에게 물어봐야 할 것들.',
    date: '2026년 3월 25일', readTime: '5분 읽기',
    content: `## 반복 유산과 갑상선의 연결고리

자연유산을 두 번 이상 경험하셨다면, 원인 검사에서 갑상선 기능을 반드시 확인해야 해요. **불현성 갑상선기능저하증(Subclinical Hypothyroidism)**은 증상이 없거나 미미해서 지나치기 쉽지만, 반복 유산과 난임의 원인이 될 수 있어요.

## 불현성 갑상선기능저하증이란?

갑상선 호르몬(T4)은 정상이지만 TSH가 경미하게 높은 상태예요. 일반 건강검진에서 "정상"으로 통과되는 경우가 많지만, 임신을 준비하거나 임신 중인 경우에는 기준이 달라져요. 임신 준비 중이라면 TSH 2.5 mIU/L 이하를 목표로 하는 것이 일반적으로 권장돼요.

## 치료와 전문의 상담

치료는 레보티록신(Levothyroxine) 복용으로, 안전하고 효과적이에요. 전문의에게 TSH, Free T4, 갑상선 항체(TPOAb) 검사를 요청해보세요. 임신 성공 후에도 용량 조절이 필요하므로 지속적인 모니터링이 중요해요.

---
*이 글은 교육 목적이며 개인 의료 조언을 대체하지 않습니다. 반복 유산 경험이 있다면 반드시 전문의와 상담하세요.*`
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
  const [openPostId, setOpenPostId] = useState(null);

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
- 스타일: 따뜻하지만 근거 기반, 길이 500-700단어
- 마지막에 교육 목적 면책 문구 포함
- JSON만 출력: {"title":"...","category":"...","readTime":"X분 읽기","content":"..."}`;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system, messages: [{ role: 'user', content: `다음 주제로 블로그 아티클을 작성해주세요: ${topic}` }] })
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
        <a href="/" style={S.navBack}>← 어시스턴트로 돌아가기</a>
      </nav>

      <div style={{ marginBottom: 48 }}>
        <p style={S.eyebrow}>// Agaya 저널</p>
        <h1 style={S.heroTitle}>아는 것이<br /><em style={S.heroTitleEm}>첫 번째 치료예요.</em></h1>
        <p style={S.heroSub}>난임, 생식 건강, 그리고 의학 속 AI에 대한 근거 기반 아티클 — 모든 여성을 위해, 어디서든.</p>
      </div>

      <div style={S.collab}>
        <div style={S.collabDot} />
        <p style={S.collabText}>
          <strong>난임 전문의 + AI가 함께 씁니다.</strong> 이 블로그의 모든 글은 산부인과·난임 전문의의 의학적 관점과 AI의 글쓰기가 협업한 결과예요. 교육 목적이며 개인 의료 조언을 대체하지 않아요.
        </p>
      </div>

      <div style={S.aiBox}>
        <p style={S.aiLabel}>✦ Agaya AI 글쓰기</p>
        <h2 style={S.aiTitle}>새 아티클 생성하기</h2>
        <p style={S.aiSub}>어떤 언어로든 주제를 입력하세요 — 한국어, English, Swahili… Agaya가 전체 아티클을 작성해드려요.</p>
        <input style={S.aiInput} value={topic}
          onChange={e => { setTopic(e.target.value); setLangHint(detectLang(e.target.value)); }}
          onKeyDown={e => e.key === 'Enter' && generateArticle()}
          placeholder="예: 스트레스가 난소에 미치는 영향 / How stress affects egg quality…" />
        <p style={S.aiHint}>{langHint || '✦ 입력 언어를 자동으로 감지해요'}</p>
        <button style={S.aiBtn} onClick={generateArticle} disabled={generating}>
          {generating ? '⏳  생성 중…' : '✦  아티클 생성하기'}
        </button>
      </div>

      {generatedPost && (
        <div style={S.genBox}>
          <div style={S.genHeader}>
            <span style={S.genLabel}>✦ AI 생성 · 난임 전문의 감수</span>
            <button style={S.genClose} onClick={() => setGeneratedPost(null)}>✕ 닫기</button>
          </div>
          <div style={S.genBody}>
            <h2 style={S.genTitle}>{generatedPost.title}</h2>
            <p style={S.genMeta}>
              {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
              {generatedPost.readTime ? ` · ${generatedPost.readTime}` : ''}
              {generatedPost.category ? ` · ${generatedPost.category}` : ''}
            </p>
            <div style={S.genContent}>{renderContent(generatedPost.content)}</div>
          </div>
        </div>
      )}

      <div style={S.sectionHead}>
        <h2 style={S.sectionLabel}>최신 아티클</h2>
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
                  <span style={{ color: '#C4704A' }}>{isOpen ? '▲ 접기' : '읽기 →'}</span>
                </div>
              </div>
            </div>
            {isOpen && (
              <div style={S.articleBody}>
                <div style={S.articleContent}>{renderContent(post.content)}</div>
                <button style={S.closeBtn} onClick={() => setOpenPostId(null)}>✕ 접기</button>
              </div>
            )}
          </div>
        );
      })}

      <div style={S.footer}>
        <p style={S.footerLogo}>Agaya</p>
        <p style={S.footerSub}>// 모든 여성을 위한 난임 정보</p>
        <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: 11, color: '#9E8E82', marginTop: 10 }}>
          © 2026 Agaya · 의료 조언을 대체하지 않습니다
        </p>
      </div>
    </div>
  );
}
