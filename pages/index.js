import { useState, useEffect } from 'react';

const SYSTEM = {
  en: "You are Agaya, a compassionate fertility health AI assistant created by an OB/GYN and fertility specialist. Provide accurate, evidence-based information about reproductive health, fertility, IVF, ovulation, PCOS, and related topics. Always note responses are for educational purposes. Be warm and supportive. Respond in the same language the user writes in.",
  ko: "저는 Agaya, 산부인과 및 불임 전문의가 만든 불임 건강 AI 어시스턴트예요. 생식 건강, 불임, IVF, 배란, PCOS에 대한 정확한 정보를 제공해요. 항상 교육 목적임을 안내하고 의료 전문가 상담을 권장해요. 따뜻하고 공감적으로 답변해요. 배란일이나 임신 가능성에 대한 질문을 받으면 답변 마지막에 반드시 이 멘트를 추가하세요: 더 정확한 배란일 예측을 원하신다면, 배란 탭에서 최근 6개월간 생리 시작일을 입력해보세요. AMH 수치 해석: AMH는 난소에 남아있는 난자 수를 반영하는 호르몬이에요. AMH가 높을수록 좋아요. AMH 1.0 이하는 난소 예비력이 낮은 것이에요. 35세에 AMH 1.39이면 난소 나이가 40~41세 수준으로 실제 나이보다 난소가 좋지 않은 상태예요. 이런 경우 몇 번 자연 시도를 해보고 안 된다면 전문의와 상담해보라고 안내하세요. 절대로 Ovarian Age Index라는 용어를 사용하지 마세요.",
  sw: "Wewe ni Agaya, msaidizi wa AI wa afya ya uzazi aliyeundwa na daktari wa uzazi. Toa taarifa sahihi kuhusu afya ya uzazi. Jibu kwa Kiswahili."
};

function getAMHInterpretation(amh, age) {
  let amhLevel = '', amhMsg = '', ovarianAge = '';
  if (amh >= 4.0) { amhLevel = '높음'; amhMsg = '난소 예비력이 매우 좋아요.'; ovarianAge = '실제 나이보다 난소가 젊은 편이에요.'; }
  else if (amh >= 2.5) { amhLevel = '정상'; amhMsg = '난소 예비력이 정상 범위예요.'; ovarianAge = '나이에 맞는 정상적인 난소 기능이에요.'; }
  else if (amh >= 1.5) { amhLevel = '정상 하한'; amhMsg = '난소 예비력이 정상이지만 낮은 편이에요.'; ovarianAge = `실제 나이(${age}세)보다 난소 나이가 약간 높을 수 있어요. 자연 시도 후 안 된다면 전문의 상담을 권장해요.`; }
  else if (amh >= 0.7) { amhLevel = '낮음'; amhMsg = '난소 예비력이 낮아요.'; ovarianAge = `실제 나이(${age}세)보다 난소 나이가 상당히 높아요. 몇 번 자연 시도 후 빠른 전문의 상담이 필요해요.`; }
  else { amhLevel = '매우 낮음'; amhMsg = '난소 예비력이 많이 감소했어요.'; ovarianAge = '난소 나이가 많이 진행된 상태예요. 빠른 전문의 상담이 꼭 필요해요.'; }
  let chromo = '', chromoMsg = '';
  if (age < 30) { chromo = '약 70~85%'; chromoMsg = '염색체 정상 난자 비율이 높아요.'; }
  else if (age < 35) { chromo = '약 60~70%'; chromoMsg = '염색체 정상 난자 비율이 양호해요.'; }
  else if (age < 38) { chromo = '약 45~60%'; chromoMsg = '나이에 따라 염색체 이상 비율이 증가하고 있어요.'; }
  else if (age < 40) { chromo = '약 35~45%'; chromoMsg = '염색체 정상 난자 비율이 감소하고 있어요. 적극적인 치료를 권장해요.'; }
  else if (age < 43) { chromo = '약 20~35%'; chromoMsg = '염색체 이상 비율이 높아요. 전문의와 적극적으로 상담하세요.'; }
  else { chromo = '약 10~20%'; chromoMsg = '염색체 정상 난자 비율이 많이 감소했어요. 전문의 상담이 꼭 필요해요.'; }
  return { amhLevel, amhMsg, ovarianAge, chromo, chromoMsg };
}

const EMPTY_PROFILE = {
  age: '', amh: '', periods: ['','','','','',''],
  surgeryHistory: '', fibroids: false, endometriosis: false,
  otherConditions: '', tryingMonths: ''
};

export default function Home() {
  const [lang, setLang] = useState('ko');
  const [tab, setTab] = useState('chat');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [periods, setPeriods] = useState(['','','','','','']);
  const [age, setAge] = useState('');
  const [amh, setAmh] = useState('');
  const [ovulResult, setOvulResult] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [symptomResult, setSymptomResult] = useState('');
  const [symptomLoading, setSymptomLoading] = useState(false);
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [profileSaved, setProfileSaved] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('agaya_profile');
      if (saved) {
        const p = JSON.parse(saved);
        setProfile(p);
        if (p.age) setAge(p.age);
        if (p.amh) setAmh(p.amh);
        if (p.periods && p.periods.length === 6) setPeriods(p.periods);
      }
    } catch(e) {}
  }, []);

  function saveProfile() {
    try {
      const toSave = { ...profile, age, amh, periods };
      localStorage.setItem('agaya_profile', JSON.stringify(toSave));
      setProfile(toSave);
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 3000);
    } catch(e) {}
  }

  function clearProfile() {
    localStorage.removeItem('agaya_profile');
    setProfile(EMPTY_PROFILE);
    setAge(''); setAmh(''); setPeriods(['','','','','','']);
    setOvulResult(null);
  }

  const welcomeMsg = {
    en: "Hello! I'm Agaya, your fertility health assistant. How can I help you today?",
    ko: "안녕하세요! 저는 Agaya, 불임 건강 AI 어시스턴트예요. 무엇을 도와드릴까요?",
    sw: "Habari! Mimi ni Agaya, msaidizi wako wa afya ya uzazi."
  };

  const quickQ = {
    en: ['IVF process', 'PCOS symptoms', 'Ovulation signs', 'Fertility diet'],
    ko: ['IVF 과정', 'PCOS 증상', '배란 징후', '임신 준비 식단'],
    sw: ['Mchakato wa IVF', 'Dalili za PCOS', 'Ishara za ovulesheni', 'Lishe ya uzazi']
  };

  const symptomList = {
    en: ['Irregular periods','Pelvic pain','Heavy bleeding','Spotting','Acne/hair loss','Weight changes','Mood changes','Hot flashes'],
    ko: ['불규칙한 생리','골반 통증','과다 출혈','부정 출혈','여드름/탈모','체중 변화','기분 변화','안면 홍조'],
    sw: ['Hedhi isiyo ya kawaida','Maumivu ya nyonga','Damu nyingi','Matone ya damu','Chunusi/nywele','Uzito','Hisia','Moto']
  };

  const L = {
    ko: {
      periodTitle: '6개월 생리 시작일 입력', periodSub: '최근 6개월간 생리 시작일을 입력하면 배란 패턴을 분석해드려요',
      month: '개월 전', thisMonth: '이번 달', analyze: '배란 패턴 분석하기',
      avgCycle: '평균 주기', nextOvul: '다음 배란 예측일', fertile: '가임 기간', nextPeriod: '다음 생리 예정일',
      irregular: '⚠️ 주기 불규칙', regular: '✅ 주기 규칙적', days: '일', inputMore: '최소 2개월 이상 입력해주세요',
      tip: '💡 알아두세요', tipEgg: '🥚 난자는 배란 후 24~48시간 생존해요. 배란일은 보통 하루예요.',
      tipSperm: '🔬 정자는 자궁 내에서 3~5일 생존할 수 있어요.',
      tipWhy: '📅 가임기가 약 1주일인 이유는 정자가 미리 기다릴 수 있기 때문이에요.',
      tipBest: '➡️ 배란 2~3일 전부터 배란일까지가 임신 확률이 가장 높아요!',
      dataNote: '개 주기 데이터 기반 분석', ageLabel: '나이 (세)', amhLabel: 'AMH 수치 (ng/mL)',
      amhSub: 'AMH는 남아있는 난자 수를 반영해요. 검사 결과가 있다면 입력해주세요.',
      amhLevel: 'AMH 수준', chromoTitle: '나이별 염색체 정상 난자 비율',
      chromoImportant: '⭐ 나이가 가장 중요해요',
      chromoExplain: 'AMH는 난소에 남아있는 난자 수를 보여주지만, 난자의 질(염색체 정상 여부)은 나이가 결정해요.',
    },
    en: {
      periodTitle: '6-Month Period Tracker', periodSub: 'Enter your last 6 period start dates to analyze your ovulation pattern',
      month: ' months ago', thisMonth: 'This month', analyze: 'Analyze Ovulation Pattern',
      avgCycle: 'Average cycle', nextOvul: 'Predicted ovulation', fertile: 'Fertile window', nextPeriod: 'Next period',
      irregular: '⚠️ Irregular cycle', regular: '✅ Regular cycle', days: ' days', inputMore: 'Please enter at least 2 months of data',
      tip: '💡 Good to know', tipEgg: '🥚 An egg survives 24-48 hours after ovulation.',
      tipSperm: '🔬 Sperm can survive in the uterus for 3-5 days.',
      tipWhy: '📅 The fertile window is about 1 week because sperm can wait for the egg.',
      tipBest: '➡️ The highest chance of pregnancy is 2-3 days before ovulation!',
      dataNote: ' cycles analyzed', ageLabel: 'Age (years)', amhLabel: 'AMH Level (ng/mL)',
      amhSub: 'AMH reflects your remaining egg count.',
      amhLevel: 'AMH Level', chromoTitle: 'Normal Chromosome Rate by Age',
      chromoImportant: '⭐ Age is the most important factor',
      chromoExplain: 'AMH shows how many eggs remain, but egg quality is determined by age.',
    },
    sw: {
      periodTitle: 'Rekodi ya Hedhi ya Miezi 6', periodSub: 'Ingiza tarehe za mwanzo wa hedhi kwa miezi 6 iliyopita',
      month: ' miezi iliyopita', thisMonth: 'Mwezi huu', analyze: 'Changanua Mfumo wa Ovulesheni',
      avgCycle: 'Wastani wa mzunguko', nextOvul: 'Ovulesheni inayotarajiwa', fertile: 'Kipindi cha uzazi', nextPeriod: 'Hedhi inayokuja',
      irregular: '⚠️ Mzunguko usio wa kawaida', regular: '✅ Mzunguko wa kawaida', days: ' siku', inputMore: 'Tafadhali ingiza data ya miezi 2 au zaidi',
      tip: '💡 Kumbuka', tipEgg: '🥚 Yai huishi masaa 24-48 baada ya ovulesheni.',
      tipSperm: '🔬 Manii yanaweza kuishi siku 3-5 kwenye uterasi.',
      tipWhy: '📅 Kipindi cha uzazi ni wiki moja kwa sababu manii yanaweza kusubiri yai.',
      tipBest: '➡️ Uwezekano mkubwa wa ujauzito ni siku 2-3 kabla ya ovulesheni!',
      dataNote: ' mizunguko iliyochambuliwa', ageLabel: 'Umri (miaka)', amhLabel: 'Kiwango cha AMH (ng/mL)',
      amhSub: 'AMH inaonyesha idadi ya mayai yaliyobaki.',
      amhLevel: 'Kiwango cha AMH', chromoTitle: 'Uwiano wa Kawaida wa Kromosomu kwa Umri',
      chromoImportant: '⭐ Umri ndio muhimu zaidi',
      chromoExplain: 'AMH inaonyesha idadi ya mayai, lakini ubora wa yai unaamuliwa na umri.',
    }
  }[lang];

  async function sendMessage(text) {
    if (!text.trim() || loading) return;
    let systemWithProfile = SYSTEM[lang];
    try {
      const saved = localStorage.getItem('agaya_profile');
      if (saved) {
        const p = JSON.parse(saved);
        systemWithProfile += ` 사용자 정보: 나이 ${p.age||'미입력'}세, AMH ${p.amh||'미입력'} ng/mL, 수술경력: ${p.surgeryHistory||'없음'}, 자궁근종: ${p.fibroids?'있음':'없음'}, 자궁내막증: ${p.endometriosis?'있음':'없음'}, 기타: ${p.otherConditions||'없음'}, 임신 시도 기간: ${p.tryingMonths||'미입력'}개월. 이 정보를 참고해서 개인화된 답변을 해주세요.`;
      }
    } catch(e) {}
    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: newMessages, system: systemWithProfile }) });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.content }]);
    } catch (e) {
      setMessages([...newMessages, { role: 'assistant', content: '오류가 발생했어요. 다시 시도해주세요.' }]);
    }
    setLoading(false);
  }

  function analyzeOvulation() {
    const validDates = periods.filter(p => p !== '').map(p => new Date(p)).sort((a,b) => a-b);
    if (validDates.length < 2) { setOvulResult({ error: L.inputMore }); return; }
    const cycles = [];
    for (let i = 1; i < validDates.length; i++) {
      const diff = Math.round((validDates[i] - validDates[i-1]) / (1000*60*60*24));
      if (diff > 15 && diff < 60) cycles.push(diff);
    }
    if (cycles.length === 0) { setOvulResult({ error: L.inputMore }); return; }
    const avg = Math.round(cycles.reduce((a,b) => a+b, 0) / cycles.length);
    const min = Math.min(...cycles); const max = Math.max(...cycles); const variation = max - min;
    const lastPeriod = validDates[validDates.length - 1];
    const nextPeriod = new Date(lastPeriod); nextPeriod.setDate(lastPeriod.getDate() + avg);
    const ovulDay = new Date(lastPeriod); ovulDay.setDate(lastPeriod.getDate() + avg - 14);
    const fertileStart = new Date(ovulDay); fertileStart.setDate(ovulDay.getDate() - 5);
    const fertileEnd = new Date(ovulDay); fertileEnd.setDate(ovulDay.getDate() + 1);
    const earlyOvul = new Date(lastPeriod); earlyOvul.setDate(lastPeriod.getDate() + min - 14);
    const lateOvul = new Date(lastPeriod); lateOvul.setDate(lastPeriod.getDate() + max - 14);
    const fmt = d => d.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
    const amhData = (age && amh) ? getAMHInterpretation(parseFloat(amh), parseInt(age)) : null;
    setOvulResult({ avg, min, max, variation, nextPeriod: fmt(nextPeriod), ovulDay: fmt(ovulDay), ovulRange: `${fmt(earlyOvul)} ~ ${fmt(lateOvul)}`, fertile: `${fmt(fertileStart)} ~ ${fmt(fertileEnd)}`, isIrregular: variation > 7, cycleCount: cycles.length, amhData, age: age ? parseInt(age) : null, amh: amh ? parseFloat(amh) : null });
  }

  function toggleSymptom(s) { setSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]); }

  async function analyzeSymptoms() {
    if (!symptoms.length) return;
    setSymptomLoading(true);
    const q = lang === 'ko' ? `다음 증상이 있어요: ${symptoms.join(', ')}. 어떤 생식 건강 문제일 수 있는지 교육적 정보를 알려주세요.` : `I have these symptoms: ${symptoms.join(', ')}. What conditions might these suggest?`;
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'user', content: q }], system: SYSTEM[lang] }) });
      const data = await res.json();
      setSymptomResult(data.content);
    } catch (e) { setSymptomResult('오류가 발생했어요.'); }
    setSymptomLoading(false);
  }

  const iStyle = { width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' };
  const lStyle = { display: 'block', fontSize: 12, color: '#6b7280', marginBottom: 4 };
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#1D9E75', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 20 }}>🌿</div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Agaya</h1>
          <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>Fertility AI Assistant</p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {['en','ko','sw'].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid', borderColor: lang===l ? '#1D9E75' : '#d1d5db', background: lang===l ? '#E1F5EE' : 'white', color: lang===l ? '#0F6E56' : '#6b7280', cursor: 'pointer', fontSize: 12 }}>
              {l === 'en' ? 'EN' : l === 'ko' ? '한국어' : 'SW'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: 24, overflowX: 'auto' }}>
        {[['chat','💬 채팅'],['ovulation','📅 배란'],['symptoms','📋 증상'],['myinfo','🔒 내 정보'],['image','🔬 이미지']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ padding: '10px 14px', fontSize: 13, cursor: 'pointer', color: tab===id ? '#1D9E75' : '#6b7280', background: 'transparent', border: 'none', borderBottom: tab===id ? '2px solid #1D9E75' : '2px solid transparent', fontWeight: tab===id ? 600 : 400, whiteSpace: 'nowrap' }}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'chat' && (
        <div>
          <div style={{ minHeight: 280, maxHeight: 320, overflowY: 'auto', background: '#f9fafb', borderRadius: 12, padding: 16, marginBottom: 12, border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#E1F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#0F6E56', flexShrink: 0 }}>A</div>
              <div style={{ background: 'white', padding: '8px 12px', borderRadius: 12, fontSize: 14, border: '1px solid #e5e7eb', maxWidth: '75%' }}>{welcomeMsg[lang]}</div>
            </div>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 12, flexDirection: m.role==='user' ? 'row-reverse' : 'row' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: m.role==='user' ? '#5DCAA5' : '#E1F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: m.role==='user' ? 'white' : '#0F6E56', flexShrink: 0 }}>{m.role==='user'?'U':'A'}</div>
                <div style={{ background: m.role==='user' ? '#1D9E75' : 'white', color: m.role==='user' ? 'white' : '#111', padding: '8px 12px', borderRadius: 12, fontSize: 14, border: m.role==='user' ? 'none' : '1px solid #e5e7eb', maxWidth: '75%', whiteSpace: 'pre-wrap' }}>{m.content}</div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#E1F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#0F6E56' }}>A</div>
                <div style={{ background: 'white', padding: '8px 12px', borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 14 }}>⏳</div>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
            {quickQ[lang].map(q => (
              <button key={q} onClick={() => sendMessage(q)} style={{ fontSize: 12, padding: '5px 10px', borderRadius: 20, border: '1px solid #5DCAA5', color: '#0F6E56', background: '#E1F5EE', cursor: 'pointer' }}>{q}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter' && sendMessage(input)} placeholder={lang==='ko' ? '질문을 입력하세요...' : 'Ask a question...'} style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14 }} />
            <button onClick={() => sendMessage(input)} disabled={loading} style={{ padding: '8px 16px', background: '#1D9E75', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>{lang==='ko' ? '보내기' : 'Send'}</button>
          </div>
        </div>
      )}

      {tab === 'ovulation' && (
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{L.periodTitle}</h2>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>{L.periodSub}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16, padding: 16, background: '#f9fafb', borderRadius: 12, border: '1px solid #e5e7eb' }}>
            <div><label style={lStyle}>{L.ageLabel}</label><input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="예: 35" style={iStyle} /></div>
            <div><label style={lStyle}>{L.amhLabel}</label><input type="number" value={amh} onChange={e => setAmh(e.target.value)} placeholder="예: 2.5" step="0.1" style={iStyle} /></div>
            <div style={{ gridColumn: '1/-1' }}><p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>{L.amhSub}</p></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            {periods.map((p, i) => (
              <div key={i}>
                <label style={lStyle}>{i === 5 ? L.thisMonth : `${5-i}${L.month}`}</label>
                <input type="date" value={p} onChange={e => { const n = [...periods]; n[i] = e.target.value; setPeriods(n); }} style={iStyle} />
              </div>
            ))}
          </div>
          <button onClick={analyzeOvulation} style={{ width: '100%', padding: 12, background: '#1D9E75', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 15, fontWeight: 600, marginBottom: 16 }}>{L.analyze}</button>
          {ovulResult && ovulResult.error && <div style={{ padding: 12, background: '#FEF3C7', borderRadius: 8, fontSize: 14, color: '#92400E' }}>{ovulResult.error}</div>}
          {ovulResult && !ovulResult.error && (
            <div>
              <div style={{ background: '#E1F5EE', borderRadius: 12, padding: '1.25rem', border: '1px solid #5DCAA5', marginBottom: 16 }}>
                <div style={{ marginBottom: 12, padding: '8px 12px', borderRadius: 8, background: ovulResult.isIrregular ? '#FEF3C7' : '#D1FAE5', fontSize: 14, fontWeight: 600, color: ovulResult.isIrregular ? '#92400E' : '#065F46' }}>
                  {ovulResult.isIrregular ? L.irregular : L.regular}
                  {ovulResult.isIrregular && <span style={{ fontWeight: 400, fontSize: 12, display: 'block', marginTop: 4 }}>주기 변동이 {ovulResult.variation}일이에요. 전문의 상담을 권장해요.</span>}
                </div>
                {[[L.avgCycle,`${ovulResult.avg}${L.days} (${ovulResult.min}~${ovulResult.max}일)`],[L.nextOvul,ovulResult.ovulDay],['배란 가능 범위',ovulResult.ovulRange],[L.fertile,ovulResult.fertile],[L.nextPeriod,ovulResult.nextPeriod]].map(([label,value]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #9FE1CB' }}>
                    <span style={{ fontSize: 13, color: '#0F6E56' }}>{label}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#085041' }}>{value}</span>
                  </div>
                ))}
                <p style={{ fontSize: 12, color: '#6b7280', marginTop: 12 }}>* {ovulResult.cycleCount}{L.dataNote}</p>
                <div style={{ marginTop: 12, padding: '12px 14px', background: 'white', borderRadius: 8, border: '1px solid #9FE1CB', fontSize: 13, lineHeight: 1.9 }}>
                  <strong style={{ color: '#0F6E56', display: 'block', marginBottom: 6 }}>{L.tip}</strong>
                  <p style={{ margin: '4px 0' }}>{L.tipEgg}</p>
                  <p style={{ margin: '4px 0' }}>{L.tipSperm}</p>
                  <p style={{ margin: '4px 0' }}>{L.tipWhy}</p>
                  <p style={{ margin: '6px 0 0', color: '#0F6E56', fontWeight: 600 }}>{L.tipBest}</p>
                </div>
              </div>
              {ovulResult.amhData && ovulResult.age && (
                <div style={{ background: '#EFF6FF', borderRadius: 12, padding: '1.25rem', border: '1px solid #BFDBFE' }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1E40AF', marginBottom: 12 }}>{L.chromoTitle}</h3>
                  <div style={{ padding: '10px 12px', background: '#DBEAFE', borderRadius: 8, marginBottom: 12 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#1E40AF', margin: '0 0 4px' }}>{L.chromoImportant}</p>
                    <p style={{ fontSize: 12, color: '#1E3A8A', margin: 0 }}>{L.chromoExplain}</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                    <div style={{ padding: '10px 12px', background: 'white', borderRadius: 8, border: '1px solid #BFDBFE' }}>
                      <p style={{ fontSize: 11, color: '#6b7280', margin: '0 0 4px' }}>나이</p>
                      <p style={{ fontSize: 20, fontWeight: 700, color: '#1E40AF', margin: 0 }}>{ovulResult.age}세</p>
                    </div>
                    <div style={{ padding: '10px 12px', background: 'white', borderRadius: 8, border: '1px solid #BFDBFE' }}>
                      <p style={{ fontSize: 11, color: '#6b7280', margin: '0 0 4px' }}>염색체 정상 난자 비율</p>
                      <p style={{ fontSize: 20, fontWeight: 700, color: '#1E40AF', margin: 0 }}>{ovulResult.amhData.chromo}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: '#1E3A8A', margin: '0 0 6px', lineHeight: 1.7 }}>{ovulResult.amhData.chromoMsg}</p>
                  <p style={{ fontSize: 13, color: '#1E3A8A', margin: '0 0 12px', lineHeight: 1.7 }}>{ovulResult.amhData.ovarianAge}</p>
                  {ovulResult.amh && (
                    <div style={{ padding: '10px 12px', background: 'white', borderRadius: 8, border: '1px solid #BFDBFE', marginBottom: 8 }}>
                      <p style={{ fontSize: 11, color: '#6b7280', margin: '0 0 2px' }}>{L.amhLevel}: <strong>{ovulResult.amhData.amhLevel}</strong> (AMH {ovulResult.amh} ng/mL)</p>
                      <p style={{ fontSize: 12, color: '#374151', margin: 0 }}>{ovulResult.amhData.amhMsg}</p>
                    </div>
                  )}
                  <div style={{ padding: '8px 12px', background: '#FEF3C7', borderRadius: 8, fontSize: 12, color: '#92400E' }}>⚕️ 교육 목적이에요. 정확한 진단은 불임 전문의와 상담하세요.</div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {tab === 'symptoms' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
            {symptomList[lang].map(s => (
              <label key={s} onClick={() => toggleSymptom(s)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, border: '1px solid', borderColor: symptoms.includes(s) ? '#5DCAA5' : '#e5e7eb', background: symptoms.includes(s) ? '#E1F5EE' : 'white', cursor: 'pointer', fontSize: 13, color: symptoms.includes(s) ? '#0F6E56' : '#374151' }}>
                <span>{symptoms.includes(s) ? '✓' : '○'}</span> {s}
              </label>
            ))}
          </div>
          <button onClick={analyzeSymptoms} disabled={symptomLoading} style={{ width: '100%', padding: 10, background: '#1D9E75', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>
            {symptomLoading ? '분석 중...' : '증상 분석하기 ↗'}
          </button>
          {symptomResult && <div style={{ marginTop: 16, padding: 16, background: '#f9fafb', borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{symptomResult}</div>}
        </div>
      )}

      {tab === 'myinfo' && (
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 8px' }}>🔒 내 건강 정보</h2>
          <div style={{ padding: '10px 12px', background: '#FEF3C7', borderRadius: 8, fontSize: 12, color: '#92400E', marginBottom: 20 }}>
            🛡️ 이 정보는 오직 본인 기기에만 저장돼요. 서버에 전송되지 않아요. 저장하면 채팅 상담 시 Agaya가 참고해서 더 정확한 답변을 드려요.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div><label style={lStyle}>나이 (세)</label><input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="예: 35" style={iStyle} /></div>
            <div><label style={lStyle}>AMH 수치 (ng/mL)</label><input type="number" value={amh} onChange={e => setAmh(e.target.value)} placeholder="예: 2.5" step="0.1" style={iStyle} /></div>
            <div><label style={lStyle}>임신 시도 기간 (개월)</label><input type="number" value={profile.tryingMonths} onChange={e => setProfile({...profile, tryingMonths: e.target.value})} placeholder="예: 12" style={iStyle} /></div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={lStyle}>수술 경력</label>
            <input type="text" value={profile.surgeryHistory} onChange={e => setProfile({...profile, surgeryHistory: e.target.value})} placeholder="예: 난소낭종 제거술 (2022년)" style={iStyle} />
          </div>
          <div style={{ marginBottom: 16, padding: 16, background: '#f9fafb', borderRadius: 12, border: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>자궁/난소 이상 유무</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
                <input type="checkbox" checked={profile.fibroids} onChange={e => setProfile({...profile, fibroids: e.target.checked})} style={{ width: 16, height: 16, accentColor: '#1D9E75' }} />
                자궁근종 있음
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
                <input type="checkbox" checked={profile.endometriosis} onChange={e => setProfile({...profile, endometriosis: e.target.checked})} style={{ width: 16, height: 16, accentColor: '#1D9E75' }} />
                자궁내막증 있음
              </label>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={lStyle}>기타 질환 / 메모</label>
            <textarea value={profile.otherConditions} onChange={e => setProfile({...profile, otherConditions: e.target.value})} placeholder="예: 갑상선 기능 저하증, PCOS, 남편 정자 운동성 저하 등" rows={3} style={{ ...iStyle, resize: 'vertical', lineHeight: 1.6 }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={lStyle}>최근 6개월 생리 시작일</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {periods.map((p, i) => (
                <div key={i}>
                  <label style={{ ...lStyle, fontSize: 11 }}>{i === 5 ? '이번 달' : `${5-i}개월 전`}</label>
                  <input type="date" value={p} onChange={e => { const n = [...periods]; n[i] = e.target.value; setPeriods(n); }} style={iStyle} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={saveProfile} style={{ flex: 1, padding: 12, background: '#1D9E75', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 15, fontWeight: 600 }}>
              {profileSaved ? '✅ 저장됐어요!' : '💾 저장하기'}
            </button>
            <button onClick={clearProfile} style={{ padding: '12px 20px', background: 'white', color: '#ef4444', border: '1px solid #ef4444', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>삭제</button>
          </div>
        </div>
      )}

      {tab === 'image' && (
        <div>
          <div style={{ border: '2px dashed #5DCAA5', borderRadius: 12, padding: 40, textAlign: 'center', background: '#f9fafb', marginBottom: 16 }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🔬</div>
            <p style={{ color: '#6b7280', fontSize: 14 }}>초음파 / 검사 결과 이미지 업로드</p>
            <p style={{ color: '#9ca3af', fontSize: 12 }}>Coming soon</p>
          </div>
          <div style={{ padding: 12, background: '#E1F5EE', borderRadius: 8, fontSize: 12, color: '#0F6E56' }}>
            ⚕️ 교육 목적으로만 제공됩니다. 진단 및 치료는 반드시 전문 의료인과 상담하세요.
          </div>
        </div>
      )}
    </div>
  );
}
