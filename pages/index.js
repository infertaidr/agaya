import { useState } from 'react';

const SYSTEM = {
  en: "You are Agaya, a compassionate fertility health AI assistant created by an OB/GYN and fertility specialist. Provide accurate, evidence-based information about reproductive health, fertility, IVF, ovulation, PCOS, and related topics. Always note responses are for educational purposes. Be warm and supportive. Respond in the same language the user writes in.",
  ko: "당신은 Agaya, 산부인과 및 불임 전문의가 만든 불임 건강 AI 어시스턴트입니다. 생식 건강, 불임, IVF, 배란, PCOS에 대한 정확한 정보를 제공하세요. 항상 교육 목적임을 안내하고 의료 전문가 상담을 권장하세요. 따뜻하고 공감적으로 답변하세요.",
  sw: "Wewe ni Agaya, msaidizi wa AI wa afya ya uzazi aliyeundwa na daktari wa uzazi. Toa taarifa sahihi kuhusu afya ya uzazi. Jibu kwa Kiswahili."
};

export default function Home() {
  const [lang, setLang] = useState('ko');
  const [tab, setTab] = useState('chat');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [periods, setPeriods] = useState(['','','','','','']);
  const [ovulResult, setOvulResult] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [symptomResult, setSymptomResult] = useState('');
  const [symptomLoading, setSymptomLoading] = useState(false);

  const welcomeMsg = {
    en: "Hello! I'm Agaya, your fertility health assistant. How can I help you today?",
    ko: ko: "저는 Agaya, 산부인과 및 불임 전문의가 만든 불임 건강 AI 어시스턴트예요. 생식 건강, 불임, IVF, 배란, PCOS에 대한 정확한 정보를 제공해요. 항상 교육 목적임을 안내하고 의료 전문가 상담을 권장해요. 따뜻하고 공감적으로 답변해요. 배란일이나 임신 가능성에 대한 질문을 받으면 답변 마지막에 반드시 이 멘트를 추가하세요: '💡 더 정확한 배란일 예측을 원하신다면, 위의 [📅 배란] 탭에서 최근 6개월간 생리 시작일을 입력해보세요. 주기 패턴을 분석해서 더 정확한 배란 예측일을 알려드려요!'",
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

  const labels = {
    ko: {
      periodTitle: '6개월 생리 시작일 입력',
      periodSub: '최근 6개월간 생리 시작일을 입력하면 배란 패턴을 분석해드려요',
      month: '개월 전',
      thisMonth: '이번 달',
      analyze: '배란 패턴 분석하기',
      avgCycle: '평균 주기',
      variation: '주기 변동',
      nextOvul: '다음 배란 예측일',
      fertile: '가임 기간',
      nextPeriod: '다음 생리 예정일',
      irregular: '⚠️ 주기 불규칙',
      regular: '✅ 주기 규칙적',
      days: '일',
      inputMore: '최소 2개월 이상 입력해주세요',
      tip: '💡 알아두세요',
      tipEgg: '🥚 난자는 배란 후 24~48시간 생존해요. 배란일은 보통 하루예요.',
      tipSperm: '🔬 정자는 자궁 내에서 3~5일 생존할 수 있어요.',
      tipWhy: '📅 가임기가 약 1주일인 이유는 정자가 미리 기다릴 수 있기 때문이에요.',
      tipBest: '➡️ 배란 2~3일 전부터 배란일까지가 임신 확률이 가장 높아요!',
      dataNote: '개 주기 데이터 기반 분석',
    },
    en: {
      periodTitle: '6-Month Period Tracker',
      periodSub: 'Enter your last 6 period start dates to analyze your ovulation pattern',
      month: ' months ago',
      thisMonth: 'This month',
      analyze: 'Analyze Ovulation Pattern',
      avgCycle: 'Average cycle',
      variation: 'Cycle variation',
      nextOvul: 'Predicted ovulation',
      fertile: 'Fertile window',
      nextPeriod: 'Next period',
      irregular: '⚠️ Irregular cycle',
      regular: '✅ Regular cycle',
      days: ' days',
      inputMore: 'Please enter at least 2 months of data',
      tip: '💡 Good to know',
      tipEgg: '🥚 An egg survives 24-48 hours after ovulation. Ovulation day is typically just one day.',
      tipSperm: '🔬 Sperm can survive in the uterus for 3-5 days.',
      tipWhy: '📅 The fertile window is about 1 week because sperm can wait for the egg.',
      tipBest: '➡️ The highest chance of pregnancy is 2-3 days before ovulation through ovulation day!',
      dataNote: ' cycles analyzed',
    },
    sw: {
      periodTitle: 'Rekodi ya Hedhi ya Miezi 6',
      periodSub: 'Ingiza tarehe za mwanzo wa hedhi kwa miezi 6 iliyopita',
      month: ' miezi iliyopita',
      thisMonth: 'Mwezi huu',
      analyze: 'Changanua Mfumo wa Ovulesheni',
      avgCycle: 'Wastani wa mzunguko',
      variation: 'Tofauti ya mzunguko',
      nextOvul: 'Ovulesheni inayotarajiwa',
      fertile: 'Kipindi cha uzazi',
      nextPeriod: 'Hedhi inayokuja',
      irregular: '⚠️ Mzunguko usio wa kawaida',
      regular: '✅ Mzunguko wa kawaida',
      days: ' siku',
      inputMore: 'Tafadhali ingiza data ya miezi 2 au zaidi',
      tip: '💡 Kumbuka',
      tipEgg: '🥚 Yai huishi masaa 24-48 baada ya ovulesheni.',
      tipSperm: '🔬 Manii yanaweza kuishi siku 3-5 kwenye uterasi.',
      tipWhy: '📅 Kipindi cha uzazi ni wiki moja kwa sababu manii yanaweza kusubiri yai.',
      tipBest: '➡️ Uwezekano mkubwa wa ujauzito ni siku 2-3 kabla ya ovulesheni!',
      dataNote: ' mizunguko iliyochambuliwa',
    }
  };

  async function sendMessage(text) {
    if (!text.trim() || loading) return;
    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, system: SYSTEM[lang] })
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.content }]);
    } catch (e) {
      setMessages([...newMessages, { role: 'assistant', content: '오류가 발생했어요. 다시 시도해주세요.' }]);
    }
    setLoading(false);
  }

  function analyzeOvulation() {
    const validDates = periods.filter(p => p !== '').map(p => new Date(p)).sort((a,b) => a-b);
    if (validDates.length < 2) {
      setOvulResult({ error: labels[lang].inputMore });
      return;
    }
    const cycles = [];
    for (let i = 1; i < validDates.length; i++) {
      const diff = Math.round((validDates[i] - validDates[i-1]) / (1000*60*60*24));
      if (diff > 15 && diff < 60) cycles.push(diff);
    }
    if (cycles.length === 0) {
      setOvulResult({ error: labels[lang].inputMore });
      return;
    }
    const avg = Math.round(cycles.reduce((a,b) => a+b, 0) / cycles.length);
    const min = Math.min(...cycles);
    const max = Math.max(...cycles);
    const variation = max - min;
    const lastPeriod = validDates[validDates.length - 1];
    const nextPeriod = new Date(lastPeriod); nextPeriod.setDate(lastPeriod.getDate() + avg);
    const ovulDay = new Date(lastPeriod); ovulDay.setDate(lastPeriod.getDate() + avg - 14);
    const fertileStart = new Date(ovulDay); fertileStart.setDate(ovulDay.getDate() - 5);
    const fertileEnd = new Date(ovulDay); fertileEnd.setDate(ovulDay.getDate() + 1);
    const earlyOvul = new Date(lastPeriod); earlyOvul.setDate(lastPeriod.getDate() + min - 14);
    const lateOvul = new Date(lastPeriod); lateOvul.setDate(lastPeriod.getDate() + max - 14);
    const fmt = d => d.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
    setOvulResult({
      avg, min, max, variation,
      nextPeriod: fmt(nextPeriod),
      ovulDay: fmt(ovulDay),
      ovulRange: `${fmt(earlyOvul)} ~ ${fmt(lateOvul)}`,
      fertile: `${fmt(fertileStart)} ~ ${fmt(fertileEnd)}`,
      isIrregular: variation > 7,
      cycleCount: cycles.length
    });
  }

  function toggleSymptom(s) {
    setSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  async function analyzeSymptoms() {
    if (!symptoms.length) return;
    setSymptomLoading(true);
    const q = lang === 'ko'
      ? `다음 증상이 있어요: ${symptoms.join(', ')}. 어떤 생식 건강 문제일 수 있는지 교육적 정보를 알려주세요.`
      : `I have these symptoms: ${symptoms.join(', ')}. What conditions might these suggest?`;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: q }], system: SYSTEM[lang] })
      });
      const data = await res.json();
      setSymptomResult(data.content);
    } catch (e) {
      setSymptomResult('오류가 발생했어요.');
    }
    setSymptomLoading(false);
  }

  const L = labels[lang];

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

      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #e5e7eb', marginBottom: 24, overflowX: 'auto' }}>
        {[['chat','💬 채팅'],['ovulation','📅 배란'],['symptoms','📋 증상'],['image','🔬 이미지']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ padding: '10px 16px', fontSize: 14, cursor: 'pointer', color: tab===id ? '#1D9E75' : '#6b7280', background: 'transparent', border: 'none', borderBottom: tab===id ? '2px solid #1D9E75' : '2px solid transparent', fontWeight: tab===id ? 600 : 400, whiteSpace: 'nowrap' }}>
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
            <button onClick={() => sendMessage(input)} disabled={loading} style={{ padding: '8px 16px', background: '#1D9E75', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>
              {lang==='ko' ? '보내기' : 'Send'}
            </button>
          </div>
        </div>
      )}

      {tab === 'ovulation' && (
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6, color: '#111' }}>{L.periodTitle}</h2>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>{L.periodSub}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            {periods.map((p, i) => (
              <div key={i}>
                <label style={{ display: 'block', fontSize: 12, color: '#6b7280', marginBottom: 4 }}>
                  {i === 5 ? L.thisMonth : `${5-i}${L.month}`}
                </label>
                <input type="date" value={p} onChange={e => { const newP = [...periods]; newP[i] = e.target.value; setPeriods(newP); }} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14 }} />
              </div>
            ))}
          </div>
          <button onClick={analyzeOvulation} style={{ width: '100%', padding: 12, background: '#1D9E75', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 15, fontWeight: 600, marginBottom: 16 }}>
            {L.analyze}
          </button>

          {ovulResult && ovulResult.error && (
            <div style={{ padding: 12, background: '#FEF3C7', borderRadius: 8, fontSize: 14, color: '#92400E' }}>{ovulResult.error}</div>
          )}

          {ovulResult && !ovulResult.error && (
            <div style={{ background: '#E1F5EE', borderRadius: 12, padding: '1.25rem', border: '1px solid #5DCAA5' }}>
              <div style={{ marginBottom: 12, padding: '8px 12px', borderRadius: 8, background: ovulResult.isIrregular ? '#FEF3C7' : '#D1FAE5', fontSize: 14, fontWeight: 600, color: ovulResult.isIrregular ? '#92400E' : '#065F46' }}>
                {ovulResult.isIrregular ? L.irregular : L.regular}
                {ovulResult.isIrregular && <span style={{ fontWeight: 400, fontSize: 12, display: 'block', marginTop: 4 }}>주기 변동이 {ovulResult.variation}일로 불규칙해요. 전문의 상담을 권장합니다.</span>}
              </div>
              {[
                [L.avgCycle, `${ovulResult.avg}${L.days} (${ovulResult.min}~${ovulResult.max}일)`],
                [L.nextOvul, ovulResult.ovulDay],
                ['배란 가능 범위', ovulResult.ovulRange],
                [L.fertile, ovulResult.fertile],
                [L.nextPeriod, ovulResult.nextPeriod],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #9FE1CB' }}>
                  <span style={{ fontSize: 13, color: '#0F6E56' }}>{label}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#085041' }}>{value}</span>
                </div>
              ))}
              <p style={{ fontSize: 12, color: '#6b7280', marginTop: 12 }}>* {ovulResult.cycleCount}{L.dataNote}</p>
              <div style={{ marginTop: 12, padding: '12px 14px', background: 'white', borderRadius: 8, border: '1px solid #9FE1CB', fontSize: 13, lineHeight: 1.9, color: '#374151' }}>
                <strong style={{ color: '#0F6E56', display: 'block', marginBottom: 6 }}>{L.tip}</strong>
                <p style={{ margin: '4px 0' }}>{L.tipEgg}</p>
                <p style={{ margin: '4px 0' }}>{L.tipSperm}</p>
                <p style={{ margin: '4px 0' }}>{L.tipWhy}</p>
                <p style={{ margin: '6px 0 0', color: '#0F6E56', fontWeight: 600 }}>{L.tipBest}</p>
              </div>
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
          {symptomResult && (
            <div style={{ marginTop: 16, padding: 16, background: '#f9fafb', borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{symptomResult}</div>
          )}
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
