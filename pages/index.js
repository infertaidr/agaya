import { useState, useEffect } from 'react';

const SYSTEM = {
  en: "You are Agaya, a compassionate fertility health AI assistant created by an OB/GYN and fertility specialist. Provide accurate, evidence-based information about reproductive health, fertility, IVF, ovulation, PCOS, and related topics. Always note responses are for educational purposes. Be warm and supportive. Respond in the same language the user writes in.",
  ko: "저는 Agaya, 산부인과 및 불임 전문의가 만든 불임 건강 AI 어시스턴트예요. 생식 건강, 불임, IVF, 배란, PCOS에 대한 정확한 정보를 제공해요. 항상 교육 목적임을 안내하고 의료 전문가 상담을 권장해요. 따뜻하고 공감적으로 답변해요. 배란일이나 임신 가능성에 대한 질문을 받으면 답변 마지막에 반드시 이 멘트를 추가하세요: 더 정확한 배란일 예측을 원하신다면, 배란 탭에서 최근 6개월간 생리 시작일을 입력해보세요. AMH 수치 해석: AMH는 난소에 남아있는 난자 수를 반영하는 호르몬이에요. AMH가 높을수록 좋아요. AMH 1.0 이하는 난소 예비력이 낮은 것이에요. 35세에 AMH 1.39이면 난소 나이가 40~41세 수준으로 실제 나이보다 난소가 좋지 않은 상태예요. 이런 경우 몇 번 자연 시도를 해보고 안 된다면 전문의와 상담해보라고 안내하세요. 절대로 Ovarian Age Index라는 용어를 사용하지 마세요. 상담 로직: 생리주기가 규칙적인데(28~35일) 임신 시도 기간이 1년 이상이면 검사가 필요할 가능성이 있다고 안내하세요. 생리가 불규칙하면 배란앱이나 병원 초음파를 통해 배란일을 잘 잡아보는 것이 방법이 될 수 있다고 안내하세요.습관성 유산(자연유산 3회 이상)의 경우 항인지질항체 증후군, 염색체 이상, 자궁 구조 이상 등의 원인 검사가 필요하다고 안내하세요.",
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
  periodPain: '', periodFlow: '', cycleType: 'regular',
  tryingMonths: '', weekendCouple: false, contraception: '',
  surgeryHistory: '', currentMeds: '', allergies: '',
  hsgResult: '', spermResult: '', hormoneResult: '',
};

const HOSPITAL_DATA = [{"region":"종로구","name":"서울대학교병원","type":"상급종합병원","address":"서울특별시 종로구 대학로 101 (연건동)","phone":"1588-5700"},{"region":"성북구","name":"고려대학교의과대학부속병원(안암병원)","type":"상급종합병원","address":"서울특별시 성북구 고려대로 73 (안암동5가)","phone":"1577-0083"},{"region":"서대문구","name":"연세대학교의과대학세브란스병원","type":"상급종합병원","address":"서울특별시 서대문구 연세로 50-1 (신촌동)","phone":"02-2228-0114"},{"region":"구로구","name":"고려대학교의과대학부속구로병원","type":"상급종합병원","address":"서울특별시 구로구 구로동로 148 (구로동)","phone":"02-2626-1114"},{"region":"송파구","name":"서울아산병원","type":"상급종합병원","address":"서울특별시 송파구 올림픽로43길 88 (풍납동)","phone":"02-3010-3114"},{"region":"강남구","name":"차의과학대학교 강남차병원","type":"종합병원","address":"서울특별시 강남구 논현로 566 (역삼동)","phone":"02-3468-3000"},{"region":"양천구","name":"이화여자대학교의과대학부속목동병원","type":"상급종합병원","address":"서울특별시 양천구 안양천로 1071 (목동)","phone":"02-2650-5114"},{"region":"강남구","name":"삼성서울병원","type":"상급종합병원","address":"서울특별시 강남구 일원로 81 (일원동)","phone":"02-3410-2114"},{"region":"노원구","name":"노원을지대학교병원","type":"종합병원","address":"서울특별시 노원구 한글비석로 68 (하계동)","phone":"02-970-8000"},{"region":"강서구","name":"미즈메디병원","type":"종합병원","address":"서울특별시 강서구 강서로 295 (내발산동)","phone":"02-2007-1000"},{"region":"중구","name":"국립중앙의료원","type":"종합병원","address":"서울특별시 중구 을지로 245 (을지로6가)","phone":"02-2260-7114"},{"region":"중랑구","name":"서울특별시서울의료원","type":"종합병원","address":"서울특별시 중랑구 신내로 156 (신내동)","phone":"02-2276-7000"},{"region":"강서구","name":"유광사여성병원","type":"병원","address":"서울특별시 강서구 강서로 194 (화곡동)","phone":"02-2608-1011"},{"region":"동대문구","name":"마리아병원","type":"병원","address":"서울특별시 동대문구 천호대로 20 (신설동)","phone":"02-2234-6555"},{"region":"노원구","name":"메디아이여성병원","type":"병원","address":"서울특별시 노원구 노원로 448 (상계동)","phone":"02-936-2122"},{"region":"도봉구","name":"에이치큐브병원","type":"병원","address":"서울특별시 도봉구 도봉로 604 (창동)","phone":"02-900-2000"},{"region":"송파구","name":"마리아병원 송파","type":"병원","address":"서울특별시 송파구 송이로 152 (가락동)","phone":"02-2152-6555"},{"region":"구로구","name":"삼성미래여성병원","type":"병원","address":"서울특별시 구로구 서해안로 2296 (오류동)","phone":"02-2682-2100"},{"region":"강남구","name":"미래와희망산부인과의원","type":"의원","address":"서울특별시 강남구 언주로 707(논현동)","phone":"02-3015-8806"},{"region":"서초구","name":"아이수산부인과의원","type":"의원","address":"서울특별시 서초구 동작대로 108 (방배동)","phone":"02-3483-2255"},{"region":"마포구","name":"서울라헬여성의원","type":"의원","address":"서울특별시 마포구 마포대로 109 (공덕동)","phone":"02-3286-7500"},{"region":"강남구","name":"엠여성의원","type":"의원","address":"서울특별시 강남구 테헤란로 407 (삼성동)","phone":"02-6188-0070"},{"region":"송파구","name":"사랑아이여성의원","type":"의원","address":"서울특별시 송파구 백제고분로 69 (잠실동)","phone":"02-419-7501"},{"region":"부산서구","name":"부산대학교병원","type":"상급종합병원","address":"부산광역시 서구 구덕로 179 (아미동1가)","phone":"051-240-7000"},{"region":"부산진구","name":"인제대학교부산백병원","type":"상급종합병원","address":"부산광역시 부산진구 복지로 75","phone":"051-890-6114"},{"region":"부산서구","name":"동아대학교병원","type":"상급종합병원","address":"부산광역시 서구 대신공원로 26 (동대신동3가)","phone":"051-240-2400"},{"region":"부산동구","name":"일신기독병원","type":"종합병원","address":"부산광역시 동구 정공단로 27 (좌천동)","phone":"051-630-0300"},{"region":"부산해운대구","name":"인제대학교 해운대백병원","type":"종합병원","address":"부산광역시 해운대구 해운대로 875 (좌동)","phone":"051-797-0100"},{"region":"부산동래구","name":"세화병원","type":"병원","address":"부산광역시 동래구 미남로132번길 28 (온천동)","phone":"051-505-1333"},{"region":"부산북구","name":"미래로병원","type":"병원","address":"부산광역시 북구 금곡대로 15 (덕천동)","phone":"051-330-5000"},{"region":"부산해운대구","name":"삼성제일산부인과의원","type":"의원","address":"부산광역시 해운대구 해운대로 369 (우동)","phone":"051-747-3999"},{"region":"부산연제구","name":"마리아의원 부산","type":"의원","address":"부산광역시 연제구 월드컵대로 125 (연산동)","phone":"051-441-6555"},{"region":"인천남동구","name":"길병원","type":"상급종합병원","address":"인천광역시 남동구 남동대로774번길 21 (구월동)","phone":""},{"region":"수원영통구","name":"아주대학교병원","type":"상급종합병원","address":"경기도 수원시 영통구 월드컵로 164 (원천동)","phone":"031-219-5114"},{"region":"성남분당구","name":"분당차병원","type":"종합병원","address":"경기도 성남시 분당구 야탑로 59 (야탑동)","phone":"031-780-5000"},{"region":"성남분당구","name":"분당서울대학교병원","type":"상급종합병원","address":"경기도 성남시 분당구 구미로173번길 82 (구미동)","phone":"031-787-2114"},{"region":"고양일산동구","name":"일산차병원","type":"종합병원","address":"경기도 고양시 일산동구 중앙로 1205 (장항동)","phone":"031-782-8300"},{"region":"안산단원구","name":"고려대학교안산병원","type":"상급종합병원","address":"경기도 안산시 단원구 적금로 123 (고잔동)","phone":"031-1577-7516"},{"region":"원주시","name":"연세대학교 원주세브란스기독병원","type":"상급종합병원","address":"강원특별자치도 원주시 일산로 20 (일산동)","phone":"033-741-0114"},{"region":"춘천시","name":"강원대학교병원","type":"종합병원","address":"강원특별자치도 춘천시 백령로 156 (효자동)","phone":"033-258-2000"},{"region":"청주서원구","name":"모태안여성병원","type":"병원","address":"충청북도 청주시 서원구 복대로17번길 57","phone":"043-272-0001"},{"region":"대전중구","name":"충남대학교병원","type":"상급종합병원","address":"대전광역시 중구 문화로 282 (대사동)","phone":"042-1599-7123"},{"region":"대전서구","name":"건양대학교병원","type":"상급종합병원","address":"대전광역시 서구 관저동로 158 (관저동)","phone":"042-600-9999"},{"region":"세종시","name":"세종충남대학교병원","type":"종합병원","address":"세종특별자치시 보듬7로 20 (도담동)","phone":"1800-3114"},{"region":"천안서북구","name":"혜성산부인과병원","type":"병원","address":"충청남도 천안시 서북구 미라2길 18-11 (쌍용동)","phone":"041-572-4567"},{"region":"전주덕진구","name":"전북대학교병원","type":"상급종합병원","address":"전라북도 전주시 덕진구 건지로 20 (금암동)","phone":"063-250-1129"},{"region":"전주완산구","name":"예수병원","type":"종합병원","address":"전라북도 전주시 완산구 서원로 365 (중화산동1가)","phone":"063-230-8114"},{"region":"전주덕진구","name":"대자인병원","type":"종합병원","address":"전라북도 전주시 덕진구 견훤로 390 (우아동3가)","phone":"063-240-2000"},{"region":"광주동구","name":"전남대학교병원","type":"상급종합병원","address":"광주광역시 동구 제봉로 42 (학동)","phone":"062-1899-0000"},{"region":"광주동구","name":"조선대학교병원","type":"상급종합병원","address":"광주광역시 동구 필문대로 365 (학동)","phone":"062-220-3321"},{"region":"광주서구","name":"시엘병원","type":"병원","address":"광주광역시 서구 무진대로 957 (광천동)","phone":"062-368-1700"},{"region":"순천시","name":"미즈여성아동병원","type":"병원","address":"전라남도 순천시 조례1길 10-26 (조례동)","phone":"061-720-8022"},{"region":"대구중구","name":"경북대학교병원","type":"상급종합병원","address":"대구광역시 중구 동덕로 130 (삼덕동2가)","phone":"053-200-5114"},{"region":"대구달서구","name":"계명대학교동산병원","type":"상급종합병원","address":"대구광역시 달서구 달구벌대로 1035 (신당동)","phone":"1577-6622"},{"region":"포항북구","name":"여성아이병원","type":"병원","address":"경상북도 포항시 북구 우창동로22번길 7 (우현동)","phone":"054-255-5000"},{"region":"대구수성구","name":"효성병원","type":"병원","address":"대구광역시 수성구 수성로 194 (중동)","phone":"053-766-7070"},{"region":"진주시","name":"경상국립대학교병원","type":"상급종합병원","address":"경상남도 진주시 강남로 79 (칠암동)","phone":"055-750-8000"},{"region":"울산동구","name":"울산대학교병원","type":"상급종합병원","address":"울산광역시 동구 대학병원로 25 (전하동)","phone":"052-250-7000"},{"region":"창원의창구","name":"창원한마음병원","type":"종합병원","address":"경상남도 창원시 의창구 용동로57번길 8 (사림동)","phone":"055-225-0000"},{"region":"창원성산구","name":"창원경상국립대학교병원","type":"종합병원","address":"경상남도 창원시 성산구 삼정자로 11 (성주동)","phone":"055-214-2000"},{"region":"김해시","name":"우리여성병원","type":"병원","address":"경상남도 김해시 내외중앙로 91 (내동)","phone":"055-321-0114"},{"region":"창원의창구","name":"엘르메디여성의원","type":"의원","address":"경상남도 창원시 의창구 서상로 1 (동정동)","phone":"055-253-2111"},{"region":"제주시","name":"엘산부인과의원","type":"의원","address":"제주특별자치도 제주시 중앙로 352 (이도이동)","phone":"064-726-6555"}];

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
  const [imgPreview, setImgPreview] = useState('');
  const [imgResult, setImgResult] = useState('');
  const [imgLoading, setImgLoading] = useState(false);
  const [imgQuestion, setImgQuestion] = useState('');
  const [imgType, setImgType] = useState('🔬 초음파 분석');
  const [hospitals, setHospitals] = useState([]);
  const [hospitalError, setHospitalError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

  function searchHospitalsByRegion(region) {
    if (!region.trim()) return;
    const filtered = HOSPITAL_DATA.filter(h => h.address.includes(region) || h.region.includes(region));
    setHospitals(filtered);
    setHospitalError(filtered.length === 0 ? '해당 지역 정부 지정 난임병원이 없어요.' : '');
  }

  const welcomeMsg = {
    en: "Hello! I'm Agaya, your fertility health assistant. How can I help you today?",
    ko: "안녕하세요! 저는 Agaya, 불임 건강 AI 어시스턴트예요. 무엇을 도와드릴까요?",
    sw: "Habari! Mimi ni Agaya, msaidizi wako wa afya ya uzazi."
  };

  const quickQ = {
    en: ['IVF process', 'PCOS symptoms', 'Ovulation signs', 'Fertility diet'],
    ko: ['IVF 과정', 'PCOS 증상', '배란 징후', '임신 준비 식단', '습관성 유산'],
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
      tip: '💡 알아두세요', tipEgg: '🥚 난자는 배란 후 24~48시간 생존해요.',
      tipSperm: '🔬 정자는 자궁 내에서 3~5일 생존할 수 있어요.',
      tipWhy: '📅 가임기가 약 1주일인 이유는 정자가 미리 기다릴 수 있기 때문이에요.',
      tipBest: '➡️ 배란 2~3일 전부터 배란일까지가 임신 확률이 가장 높아요!',
      dataNote: '개 주기 데이터 기반 분석', ageLabel: '나이 (세)', amhLabel: 'AMH 수치 (ng/mL)',
      amhSub: 'AMH는 남아있는 난자 수를 반영해요. 검사 결과가 있다면 입력해주세요.',
      amhLevel: 'AMH 수준', chromoTitle: '나이별 염색체 정상 난자 비율',
      chromoImportant: '⭐ 나이가 가장 중요해요',
      chromoExplain: 'AMH는 난소에 남아있는 난자 수를 보여주지만, 난자의 질은 나이가 결정해요.',
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
        systemWithProfile += ` 사용자 정보: 나이 ${p.age||'미입력'}세, AMH ${p.amh||'미입력'} ng/mL, 생리통 ${p.periodPain||'미입력'}, 생리양 ${p.periodFlow||'미입력'}, 생리주기 ${p.cycleType==='regular'?'규칙적':'불규칙'}, 임신 시도 기간 ${p.tryingMonths||'미입력'}개월, 주말부부 ${p.weekendCouple?'예':'아니오'}, 피임 ${p.contraception||'없음'}, 수술기왕력 ${p.surgeryHistory||'없음'}, 복용중인 약 ${p.currentMeds||'없음'}, 알러지 ${p.allergies||'없음'}, 나팔관촬영 ${p.hsgResult||'미시행'}, 정액검사 ${p.spermResult||'미시행'}, 호르몬검사 ${p.hormoneResult||'미시행'}. 이 정보를 참고해서 개인화된 답변을 해주세요.`;
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
  const selectStyle = { ...iStyle, background: 'white' };

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
        {[['chat','💬 채팅'],['ovulation','📅 배란'],['symptoms','📋 증상'],['myinfo','🔒 내 정보'],['image','🔬 이미지'],['hospital','🏥 병원 찾기']].map(([id, label]) => (
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
            🛡️ 이 정보는 오직 본인 기기에만 저장돼요. 서버에 전송되지 않아요.
          </div>
          <div style={{ marginBottom: 20, padding: 16, background: '#f9fafb', borderRadius: 12, border: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#374151', margin: '0 0 12px' }}>📋 기본 정보</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div><label style={lStyle}>나이 (세)</label><input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="예: 35" style={iStyle} /></div>
              <div><label style={lStyle}>AMH 수치 (ng/mL)</label><input type="number" value={amh} onChange={e => setAmh(e.target.value)} placeholder="예: 2.5" step="0.1" style={iStyle} /></div>
            </div>
          </div>
          <div style={{ marginBottom: 20, padding: 16, background: '#f9fafb', borderRadius: 12, border: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#374151', margin: '0 0 12px' }}>🩸 생리 정보</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div>
                <label style={lStyle}>생리통</label>
                <select value={profile.periodPain} onChange={e => setProfile({...profile, periodPain: e.target.value})} style={selectStyle}>
                  <option value="">선택</option>
                  <option value="없음">없음</option>
                  <option value="약함">약함</option>
                  <option value="중간">중간</option>
                  <option value="심함">심함 (진통제 필요)</option>
                </select>
              </div>
              <div>
                <label style={lStyle}>생리양</label>
                <select value={profile.periodFlow} onChange={e => setProfile({...profile, periodFlow: e.target.value})} style={selectStyle}>
                  <option value="">선택</option>
                  <option value="적음">적음</option>
                  <option value="보통">보통</option>
                  <option value="많음">많음</option>
                  <option value="매우 많음">매우 많음</option>
                </select>
              </div>
              <div>
                <label style={lStyle}>생리 주기</label>
                <select value={profile.cycleType} onChange={e => setProfile({...profile, cycleType: e.target.value})} style={selectStyle}>
                  <option value="regular">규칙적 (±3일 이내)</option>
                  <option value="irregular">불규칙 (±3일 초과)</option>
                </select>
              </div>
            </div>
            <div>
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
          </div>
          <div style={{ marginBottom: 20, padding: 16, background: '#f9fafb', borderRadius: 12, border: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#374151', margin: '0 0 12px' }}>👶 임신 시도</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div><label style={lStyle}>임신 시도 기간 (개월)</label><input type="number" value={profile.tryingMonths} onChange={e => setProfile({...profile, tryingMonths: e.target.value})} placeholder="예: 12" style={iStyle} /></div>
              <div><label style={lStyle}>피임 방법</label><input type="text" value={profile.contraception} onChange={e => setProfile({...profile, contraception: e.target.value})} placeholder="예: 경구피임약 3년" style={iStyle} /></div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
              <input type="checkbox" checked={profile.weekendCouple} onChange={e => setProfile({...profile, weekendCouple: e.target.checked})} style={{ width: 16, height: 16, accentColor: '#1D9E75' }} />
              주말부부 (주중 별거)
            </label>
          </div>
          <div style={{ marginBottom: 20, padding: 16, background: '#f9fafb', borderRadius: 12, border: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#374151', margin: '0 0 12px' }}>🤰 산과력</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div>
                <label style={lStyle}>임신 경험</label>
                <select value={profile.pregnancyHistory||''} onChange={e => setProfile({...profile, pregnancyHistory: e.target.value})} style={selectStyle}>
                  <option value="">선택</option>
                  <option value="없음">없음 (초임)</option>
                  <option value="있음">있음</option>
                </select>
              </div>
              <div>
                <label style={lStyle}>분만 경험</label>
                <select value={profile.deliveryHistory||''} onChange={e => setProfile({...profile, deliveryHistory: e.target.value})} style={selectStyle}>
                  <option value="">선택</option>
                  <option value="없음">없음</option>
                  <option value="자연분만">자연분만</option>
                  <option value="제왕절개">제왕절개</option>
                  <option value="자연+제왕">자연분만+제왕절개</option>
                </select>
              </div>
              <div>
                <label style={lStyle}>자연유산 횟수</label>
                <input type="number" value={profile.miscarriageCount||''} onChange={e => setProfile({...profile, miscarriageCount: e.target.value})} placeholder="예: 2" min="0" style={iStyle} />
              </div>
              <div>
                <label style={lStyle}>계류유산 횟수</label>
                <input type="number" value={profile.missedAbortionCount||''} onChange={e => setProfile({...profile, missedAbortionCount: e.target.value})} placeholder="예: 1" min="0" style={iStyle} />
              </div>
            </div>
            <div style={{ padding: '8px 12px', background: '#FEF9C3', borderRadius: 8, fontSize: 12, color: '#854D0E' }}>
              💡 자연유산이 3회 이상이면 습관성 유산으로 분류되며 정밀 검사가 필요해요.
            </div>
          </div>
          <div style={{ marginBottom: 20, padding: 16, background: '#f9fafb', borderRadius: 12, border: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#374151', margin: '0 0 12px' }}>🏥 병력 및 약물</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div><label style={lStyle}>산부인과 수술/시술 기왕력</label><input type="text" value={profile.surgeryHistory} onChange={e => setProfile({...profile, surgeryHistory: e.target.value})} placeholder="예: 제왕절개 (2020)" style={iStyle} /></div>
              <div><label style={lStyle}>복용 중인 약</label><input type="text" value={profile.currentMeds} onChange={e => setProfile({...profile, currentMeds: e.target.value})} placeholder="예: 갑상선 약, 철분제" style={iStyle} /></div>
              <div><label style={lStyle}>알러지</label><input type="text" value={profile.allergies} onChange={e => setProfile({...profile, allergies: e.target.value})} placeholder="예: 페니실린 알러지" style={iStyle} /></div>
            </div>
          </div>
          <div style={{ marginBottom: 20, padding: 16, background: '#f9fafb', borderRadius: 12, border: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#374151', margin: '0 0 12px' }}>🔬 검사 결과</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div><label style={lStyle}>나팔관 촬영검사 (HSG) 결과</label><input type="text" value={profile.hsgResult} onChange={e => setProfile({...profile, hsgResult: e.target.value})} placeholder="예: 양측 나팔관 통과" style={iStyle} /></div>
              <div><label style={lStyle}>정액검사 결과</label><input type="text" value={profile.spermResult} onChange={e => setProfile({...profile, spermResult: e.target.value})} placeholder="예: 정상" style={iStyle} /></div>
              <div><label style={lStyle}>호르몬 검사 결과</label><input type="text" value={profile.hormoneResult} onChange={e => setProfile({...profile, hormoneResult: e.target.value})} placeholder="예: FSH 8.5, LH 5.2" style={iStyle} /></div>
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
          <div style={{ padding: '10px 12px', background: '#FEF3C7', borderRadius: 8, fontSize: 12, color: '#92400E', marginBottom: 16 }}>
            ⚕️ 이 기능은 교육 목적으로만 제공돼요. AI 분석은 진단이 아니며, 반드시 전문 의료인과 상담하세요.
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {['🔬 초음파 분석', '🧪 배란테스트 분석'].map(type => (
              <button key={type} onClick={() => setImgType(type)}
                style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid', borderColor: imgType===type ? '#1D9E75' : '#d1d5db', background: imgType===type ? '#E1F5EE' : 'white', color: imgType===type ? '#0F6E56' : '#374151', cursor: 'pointer', fontSize: 13, fontWeight: imgType===type ? 600 : 400 }}>
                {type}
              </button>
            ))}
          </div>
          <div onClick={() => document.getElementById('img-upload').click()}
            style={{ border: '2px dashed #5DCAA5', borderRadius: 12, padding: 32, textAlign: 'center', background: '#f9fafb', marginBottom: 16, cursor: 'pointer' }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🔬</div>
            <p style={{ color: '#374151', fontSize: 14, fontWeight: 600, margin: '0 0 4px' }}>
              {imgType === '🧪 배란테스트 분석' ? '배란테스트 스틱 사진 업로드' : '초음파 / 검사 결과 이미지 업로드'}
            </p>
            <p style={{ color: '#6b7280', fontSize: 12, margin: 0 }}>
              {imgType === '🧪 배란테스트 분석' ? '컨트롤선(C)과 테스트선(T)이 잘 보이게 찍어주세요' : '클릭하거나 이미지를 드래그해서 올려주세요 (JPG, PNG)'}
            </p>
            <input type="file" id="img-upload" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={e => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = ev => { setImgPreview(ev.target.result); setImgResult(''); };
              reader.readAsDataURL(file);
            }} />
          </div>
          {imgPreview && (
            <div style={{ marginBottom: 16 }}>
              <img src={imgPreview} alt="업로드된 이미지" style={{ width: '100%', maxHeight: 300, objectFit: 'contain', borderRadius: 12, border: '1px solid #e5e7eb' }} />
              {imgType !== '🧪 배란테스트 분석' && (
                <div style={{ marginTop: 12 }}>
                  <label style={lStyle}>이미지에 대해 질문하기 (선택)</label>
                  <input type="text" value={imgQuestion} onChange={e => setImgQuestion(e.target.value)} placeholder="예: 난포 크기가 어떻게 되나요?" style={iStyle} />
                </div>
              )}
              <button onClick={async () => {
                setImgLoading(true);
                setImgResult('');
                try {
                  const base64 = imgPreview.split(',')[1];
                  const mimeType = imgPreview.split(';')[0].split(':')[1];
                  const question = imgType === '🧪 배란테스트 분석'
                    ? '이 배란테스트 스틱을 분석해주세요. 컨트롤선 대비 테스트선 진하기를 10점 만점으로 수치화하고 양성/음성 판정해주세요.'
                    : (imgQuestion || '이 초음파 이미지를 분석해주세요. 난포 크기, 자궁내막 두께, 이상 소견 등 보이는 것을 교육적으로 설명해주세요.');
                  const system = imgType === '🧪 배란테스트 분석'
                    ? '당신은 배란테스트 분석 전문가예요. 업로드된 배란테스트 스틱 이미지를 분석해서 컨트롤선(C)과 테스트선(T)의 진하기를 비교하고 10점 만점으로 수치화해주세요. 형식: 점수: X.X/10, 판정: 양성/약양성/음성, 설명: (간단한 설명). 항상 교육 목적임을 명시하고 정확한 판단은 전문의와 상담하라고 안내하세요.'
                    : '당신은 Agaya, 산부인과 및 불임 전문의가 만든 AI 어시스턴트예요. 업로드된 초음파 또는 의료 이미지를 보고 교육적 정보를 제공해요. 항상 이것이 교육 목적임을 명시하고 정확한 진단은 전문의와 상담하라고 안내하세요.';
                  const res = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ system, messages: [{ role: 'user', content: [{ type: 'image', source: { type: 'base64', media_type: mimeType, data: base64 } }, { type: 'text', text: question }] }] })
                  });
                  const data = await res.json();
                  setImgResult(data.content || '분석 결과를 가져올 수 없어요.');
                } catch(e) { setImgResult('오류가 발생했어요. 다시 시도해주세요.'); }
                setImgLoading(false);
              }} disabled={imgLoading} style={{ width: '100%', padding: 12, background: '#1D9E75', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600, marginTop: 12 }}>
                {imgLoading ? '🔍 분석 중...' : imgType === '🧪 배란테스트 분석' ? '🧪 배란테스트 분석하기' : '🔬 이미지 분석하기'}
              </button>
            </div>
          )}
          {imgResult && (
            <div style={{ padding: 16, background: '#f9fafb', borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap', marginBottom: 16 }}>
              {imgResult}
            </div>
          )}
        </div>
      )}

      {tab === 'hospital' && (
        <div>
          <div style={{ padding: '10px 12px', background: '#E1F5EE', borderRadius: 8, fontSize: 12, color: '#0F6E56', marginBottom: 16 }}>
            🏥 보건복지부 공식 지정 난임(체외수정) 병원을 찾아드려요
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && searchHospitalsByRegion(searchQuery)} placeholder="지역명 입력 (예: 강남구, 수원, 창원)" style={{ flex: 1, padding: '9px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14 }} />
            <button onClick={() => searchHospitalsByRegion(searchQuery)} style={{ padding: '9px 18px', background: '#1D9E75', color: 'white', border: 'none', borderRadius: 8, fontSize: 14, cursor: 'pointer' }}>검색</button>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
            {['서울', '부산', '대구', '인천', '광주', '대전', '수원', '창원', '전주', '청주'].map(city => (
              <button key={city} onClick={() => { setSearchQuery(city); searchHospitalsByRegion(city); }}
                style={{ fontSize: 12, padding: '5px 12px', borderRadius: 20, border: '1px solid #5DCAA5', color: '#0F6E56', background: 'white', cursor: 'pointer' }}>
                {city}
              </button>
            ))}
          </div>
          {hospitalError && <div style={{ padding: 12, background: '#FEF3C7', borderRadius: 8, fontSize: 13, color: '#92400E' }}>{hospitalError}</div>}
          {hospitals.length > 0 && (
            <div style={{ background: '#f9fafb', borderRadius: 12, border: '1px solid #e5e7eb' }}>
              <div style={{ padding: '10px 16px', fontSize: 13, color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>{hospitals.length}곳 발견</div>
              {hospitals.map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: i < hospitals.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#E1F5EE', color: '#0F6E56', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#111', marginBottom: 3 }}>{h.name}</div>
                    <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 3 }}>{h.address}</div>
                    {h.phone && <div style={{ fontSize: 12, color: '#0F6E56' }}>📞 {h.phone}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div style={{ marginTop: 12, fontSize: 11, color: '#9ca3af', textAlign: 'center' }}>
            보건복지부 공식 지정 병원 · 방문 전 전화 확인을 권장해요
          </div>
        </div>
      )}

    </div>
  );
}
