import { useState, useEffect } from 'react';

// ── SYSTEM PROMPTS ──────────────────────────────────────────
const SYSTEM = {
  en: "You are Agaya, a compassionate fertility health information assistant created by an OB/GYN. Provide general educational information about reproductive health topics. Keep answers to 3 sentences or less. Never use markdown symbols like ##, **, or -. IMPORTANT: Never say a user 'has' or 'likely has' any condition. Instead, say things like 'These symptoms are sometimes associated with X — this would be worth discussing with your specialist.' Always emphasize that your responses are general educational information only, not medical advice, diagnosis, or treatment. Be warm and supportive.",
  ko: "답변은 반드시 3문장 이내로 짧게 해주세요. ## ** - 같은 마크다운 기호는 절대 사용하지 마세요. 저는 Agaya, 산부인과 전문의가 만든 생식 건강 정보 어시스턴트예요. 일반적인 교육 정보를 제공해요. 중요: 절대로 사용자가 특정 질환을 '가지고 있다' 또는 '가능성이 높다'고 단정하지 마세요. 대신 '이런 증상들은 X와 관련이 있을 수 있어요. 전문의 상담 시 이 부분을 꼭 말씀해보세요'와 같이 상담 가이드 역할에 충실하세요. 모든 답변은 교육 목적의 일반 정보이며 의료행위가 아님을 항상 명시하세요. 배란일이나 임신 가능성에 대한 질문을 받으면 답변 마지막에 반드시 이 멘트를 추가하세요: 더 정확한 배란일 예측을 원하신다면, 배란 탭에서 최근 6개월간 생리 시작일을 입력해보세요. 생리주기가 규칙적인데(28~35일) 임신 시도 기간이 1년 이상이면 검사가 필요할 가능성이 있다고 안내하세요. 생리가 불규칙하면 병원 초음파를 통해 배란일을 잡아보는 것이 도움이 된다고 안내하세요. 습관성 유산(자연유산 3회 이상)의 경우 항인지질항체 증후군, 염색체 이상, 자궁 구조 이상 등의 원인 검사가 필요하다고 안내하세요.",
  sw: "Wewe ni Agaya, msaidizi wa taarifa za afya ya uzazi. Toa taarifa za jumla za elimu tu. Jibu kwa sentensi 3 au chini. Usitumie alama za markdown. Kamwe usiseme mtumiaji 'ana' ugonjwa wowote — sema 'dalili hizi zinaweza kuhusiana na X, jadili na daktari wako.' Jibu kwa Kiswahili.",
  vi: "Bạn là Agaya, trợ lý thông tin sức khỏe sinh sản do bác sĩ phụ sản tạo ra. Trả lời bằng tiếng Việt, tối đa 3 câu, không dùng ký hiệu markdown như ##, **, -. Không bao giờ khẳng định người dùng 'mắc' bệnh nào đó. Thay vào đó hãy nói 'Các triệu chứng này đôi khi liên quan đến X — bạn nên thảo luận với bác sĩ chuyên khoa.' Luôn nhấn mạnh đây là thông tin giáo dục chung, không phải tư vấn y tế. Hãy ấm áp và hỗ trợ.",
  th: "คุณคือ Agaya ผู้ช่วยข้อมูลสุขภาพการเจริญพันธุ์ที่สร้างโดยสูตินรีแพทย์ ตอบเป็นภาษาไทย ไม่เกิน 3 ประโยค ห้ามใช้สัญลักษณ์ markdown เช่น ##, **, - อย่าบอกว่าผู้ใช้ 'เป็น' โรคใดโรคหนึ่ง แต่ให้บอกว่า 'อาการเหล่านี้บางครั้งเกี่ยวข้องกับ X ควรปรึกษาแพทย์ผู้เชี่ยวชาญ' เน้นเสมอว่าเป็นข้อมูลทั่วไปเพื่อการศึกษาเท่านั้น ไม่ใช่คำแนะนำทางการแพทย์",
  tl: "Ikaw si Agaya, isang mapagmahal na katulong ng impormasyon sa kalusugang pangreproduksyon na nilikha ng isang OB/GYN. Sumagot sa Filipino/Tagalog, maximum 3 pangungusap, huwag gumamit ng markdown symbols tulad ng ##, **, -. Huwag sabihin na ang gumagamit ay 'may' kondisyon. Sa halip sabihin 'Ang mga sintomang ito ay minsan nauugnay sa X — ito ay sulit na talakayin sa iyong espesyalista.' Laging bigyang-diin na pangkalahatang impormasyon lamang ito para sa edukasyon, hindi medikal na payo."
};

// ── AMH INFO ──────────────────────────────────────────────
const AMH_INFO = {
  ko: [
    { q: "AMH란 무엇인가요?", a: "AMH(항뮬러관 호르몬)는 난소에 남아있는 난포 수를 간접적으로 반영하는 호르몬이에요. 혈액 검사로 측정하며, 가임력 평가 시 참고 지표 중 하나로 사용돼요." },
    { q: "AMH 검사는 왜 하나요?", a: "난소 예비력(남아있는 난자 수의 지표)을 파악하기 위해 해요. 특히 난임 치료 시 과배란 반응 예측이나 치료 계획 수립에 활용돼요." },
    { q: "AMH 수치가 낮으면 임신이 안 되나요?", a: "수치가 낮다고 임신이 불가능한 것은 아니에요. AMH는 난자의 수를 간접 반영하지만, 난자의 질과는 다른 개념이에요. 정확한 해석과 치료 방향은 반드시 불임 전문의와 상담하세요." },
    { q: "AMH는 언제 검사하는 게 좋나요?", a: "월경 주기에 크게 영향을 받지 않아 언제든 검사 가능해요. 임신 준비 중이라면 산부인과에서 기초 검사 패키지의 일부로 받을 수 있어요." },
  ],
  en: [
    { q: "What is AMH?", a: "AMH (Anti-Müllerian Hormone) is a hormone that indirectly reflects the number of remaining follicles in the ovaries. It's measured via blood test and used as one of several indicators in fertility evaluation." },
    { q: "Why is AMH tested?", a: "To assess ovarian reserve — an indicator of remaining egg count. It's particularly useful in fertility treatments to predict ovarian response and guide treatment planning." },
    { q: "Does low AMH mean I can't get pregnant?", a: "Low AMH does not mean pregnancy is impossible. AMH reflects egg quantity, not egg quality. For accurate interpretation and treatment guidance, please consult a fertility specialist." },
    { q: "When should I get tested?", a: "AMH is not significantly affected by the menstrual cycle, so it can be tested at any time. If you're planning a pregnancy, it's available as part of a basic fertility check at your OB/GYN." },
  ],
  sw: [
    { q: "AMH ni nini?", a: "AMH ni homoni inayoonyesha idadi ya follicles zilizobaki kwenye ovari. Inapimwa kwa damu na ni moja ya viashiria vya tathmini ya uzazi." },
    { q: "Kwa nini AMH hupimwa?", a: "Kupima akiba ya ovari — kiashiria cha idadi ya mayai yaliyobaki. Husaidia katika mipango ya matibabu ya uzazi." },
    { q: "AMH ndogo inamaanisha siwezi kupata mimba?", a: "AMH ndogo haimaanishi huwezi kupata mimba. AMH inaonyesha idadi, si ubora wa mayai. Wasiliana na daktari wa uzazi kwa maelezo sahihi." },
    { q: "Wakati gani nipime AMH?", a: "AMH haitegemei sana mzunguko wa hedhi, kwa hivyo inaweza kupimwa wakati wowote. Wasiliana na daktari wako wa uzazi." },
  ],
  vi: [
    { q: "AMH là gì?", a: "AMH (Hormone Anti-Müllerian) là hormone phản ánh gián tiếp số lượng nang trứng còn lại trong buồng trứng. Được đo qua xét nghiệm máu và là một trong các chỉ số đánh giá khả năng sinh sản." },
    { q: "Tại sao cần xét nghiệm AMH?", a: "Để đánh giá dự trữ buồng trứng — chỉ số về số lượng trứng còn lại. Đặc biệt hữu ích trong điều trị vô sinh để dự đoán đáp ứng kích thích buồng trứng." },
    { q: "AMH thấp có nghĩa là không thể có thai không?", a: "AMH thấp không có nghĩa là không thể có thai. AMH phản ánh số lượng trứng, không phải chất lượng trứng. Hãy tham khảo bác sĩ chuyên khoa vô sinh để được tư vấn chính xác." },
    { q: "Khi nào nên xét nghiệm AMH?", a: "AMH không bị ảnh hưởng nhiều bởi chu kỳ kinh nguyệt nên có thể xét nghiệm bất cứ lúc nào. Nếu đang chuẩn bị mang thai, hãy hỏi bác sĩ sản phụ khoa." },
  ],
  th: [
    { q: "AMH คืออะไร?", a: "AMH (Anti-Müllerian Hormone) คือฮอร์โมนที่สะท้อนจำนวนฟอลลิเคิลที่เหลืออยู่ในรังไข่โดยอ้อม วัดผ่านการตรวจเลือดและใช้เป็นหนึ่งในตัวบ่งชี้การประเมินภาวะเจริญพันธุ์" },
    { q: "ทำไมต้องตรวจ AMH?", a: "เพื่อประเมินสำรองรังไข่ — ตัวบ่งชี้จำนวนไข่ที่เหลืออยู่ มีประโยชน์อย่างยิ่งในการรักษาภาวะมีบุตรยากเพื่อทำนายการตอบสนองของรังไข่" },
    { q: "AMH ต่ำหมายความว่าตั้งครรภ์ไม่ได้หรือ?", a: "AMH ต่ำไม่ได้หมายความว่าตั้งครรภ์ไม่ได้ AMH สะท้อนปริมาณไข่ ไม่ใช่คุณภาพของไข่ กรุณาปรึกษาผู้เชี่ยวชาญด้านภาวะมีบุตรยากเพื่อคำแนะนำที่ถูกต้อง" },
    { q: "ควรตรวจ AMH เมื่อไหร่?", a: "AMH ไม่ได้รับผลกระทบมากจากรอบประจำเดือน จึงสามารถตรวจได้ตลอดเวลา หากกำลังวางแผนตั้งครรภ์ สามารถตรวจได้เป็นส่วนหนึ่งของการตรวจสุขภาพก่อนตั้งครรภ์" },
  ],
  tl: [
    { q: "Ano ang AMH?", a: "Ang AMH (Anti-Müllerian Hormone) ay isang hormone na nagpapakita ng bilang ng mga natitira pang follicle sa mga ovary. Sinusukat sa pamamagitan ng blood test at ginagamit bilang isa sa mga indicator sa pagsusuri ng fertility." },
    { q: "Bakit kailangang suriin ang AMH?", a: "Para masuri ang ovarian reserve — indicator ng natitira pang bilang ng itlog. Partikular na kapaki-pakinabang sa mga fertility treatment para mahulaan ang tugon ng ovary." },
    { q: "Ang mababang AMH ba ay nangangahulugang hindi ako mabubuntis?", a: "Ang mababang AMH ay hindi nangangahulugang imposible ang pagbubuntis. Ang AMH ay sumasalamin sa dami ng itlog, hindi sa kalidad. Kumonsulta sa fertility specialist para sa tamang gabay." },
    { q: "Kailan dapat suriin ang AMH?", a: "Ang AMH ay hindi masyadong naaapektuhan ng menstrual cycle kaya maaaring suriin anumang oras. Kung nagpaplano ng pagbubuntis, maaaring isama sa basic fertility check sa inyong OB/GYN." },
  ],
};

const HOSPITAL_DATA = [{"region":"종로구","name":"서울대학교병원","type":"상급종합병원","address":"서울특별시 종로구 대학로 101 (연건동)","phone":"1588-5700"},{"region":"성북구","name":"고려대학교의과대학부속병원(안암병원)","type":"상급종합병원","address":"서울특별시 성북구 고려대로 73 (안암동5가)","phone":"1577-0083"},{"region":"서대문구","name":"연세대학교의과대학세브란스병원","type":"상급종합병원","address":"서울특별시 서대문구 연세로 50-1 (신촌동)","phone":"02-2228-0114"},{"region":"구로구","name":"고려대학교의과대학부속구로병원","type":"상급종합병원","address":"서울특별시 구로구 구로동로 148 (구로동)","phone":"02-2626-1114"},{"region":"송파구","name":"서울아산병원","type":"상급종합병원","address":"서울특별시 송파구 올림픽로43길 88 (풍납동)","phone":"02-3010-3114"},{"region":"강남구","name":"차의과학대학교 강남차병원","type":"종합병원","address":"서울특별시 강남구 논현로 566 (역삼동)","phone":"02-3468-3000"},{"region":"양천구","name":"이화여자대학교의과대학부속목동병원","type":"상급종합병원","address":"서울특별시 양천구 안양천로 1071 (목동)","phone":"02-2650-5114"},{"region":"강남구","name":"삼성서울병원","type":"상급종합병원","address":"서울특별시 강남구 일원로 81 (일원동)","phone":"02-3410-2114"},{"region":"노원구","name":"노원을지대학교병원","type":"종합병원","address":"서울특별시 노원구 한글비석로 68 (하계동)","phone":"02-970-8000"},{"region":"강서구","name":"미즈메디병원","type":"종합병원","address":"서울특별시 강서구 강서로 295 (내발산동)","phone":"02-2007-1000"},{"region":"중구","name":"국립중앙의료원","type":"종합병원","address":"서울특별시 중구 을지로 245 (을지로6가)","phone":"02-2260-7114"},{"region":"중랑구","name":"서울특별시서울의료원","type":"종합병원","address":"서울특별시 중랑구 신내로 156 (신내동)","phone":"02-2276-7000"},{"region":"강서구","name":"유광사여성병원","type":"병원","address":"서울특별시 강서구 강서로 194 (화곡동)","phone":"02-2608-1011"},{"region":"동대문구","name":"마리아병원","type":"병원","address":"서울특별시 동대문구 천호대로 20 (신설동)","phone":"02-2234-6555"},{"region":"노원구","name":"메디아이여성병원","type":"병원","address":"서울특별시 노원구 노원로 448 (상계동)","phone":"02-936-2122"},{"region":"도봉구","name":"에이치큐브병원","type":"병원","address":"서울특별시 도봉구 도봉로 604 (창동)","phone":"02-900-2000"},{"region":"송파구","name":"마리아병원 송파","type":"병원","address":"서울특별시 송파구 송이로 152 (가락동)","phone":"02-2152-6555"},{"region":"구로구","name":"삼성미래여성병원","type":"병원","address":"서울특별시 구로구 서해안로 2296 (오류동)","phone":"02-2682-2100"},{"region":"강남구","name":"미래와희망산부인과의원","type":"의원","address":"서울특별시 강남구 언주로 707(논현동)","phone":"02-3015-8806"},{"region":"서초구","name":"아이수산부인과의원","type":"의원","address":"서울특별시 서초구 동작대로 108 (방배동)","phone":"02-3483-2255"},{"region":"마포구","name":"서울라헬여성의원","type":"의원","address":"서울특별시 마포구 마포대로 109 (공덕동)","phone":"02-3286-7500"},{"region":"강남구","name":"엠여성의원","type":"의원","address":"서울특별시 강남구 테헤란로 407 (삼성동)","phone":"02-6188-0070"},{"region":"송파구","name":"사랑아이여성의원","type":"의원","address":"서울특별시 송파구 백제고분로 69 (잠실동)","phone":"02-419-7501"},{"region":"부산서구","name":"부산대학교병원","type":"상급종합병원","address":"부산광역시 서구 구덕로 179 (아미동1가)","phone":"051-240-7000"},{"region":"부산진구","name":"인제대학교부산백병원","type":"상급종합병원","address":"부산광역시 부산진구 복지로 75","phone":"051-890-6114"},{"region":"부산서구","name":"동아대학교병원","type":"상급종합병원","address":"부산광역시 서구 대신공원로 26 (동대신동3가)","phone":"051-240-2400"},{"region":"부산동구","name":"일신기독병원","type":"종합병원","address":"부산광역시 동구 정공단로 27 (좌천동)","phone":"051-630-0300"},{"region":"부산해운대구","name":"인제대학교 해운대백병원","type":"종합병원","address":"부산광역시 해운대구 해운대로 875 (좌동)","phone":"051-797-0100"},{"region":"부산동래구","name":"세화병원","type":"병원","address":"부산광역시 동래구 미남로132번길 28 (온천동)","phone":"051-505-1333"},{"region":"부산북구","name":"미래로병원","type":"병원","address":"부산광역시 북구 금곡대로 15 (덕천동)","phone":"051-330-5000"},{"region":"부산해운대구","name":"삼성제일산부인과의원","type":"의원","address":"부산광역시 해운대구 해운대로 369 (우동)","phone":"051-747-3999"},{"region":"부산연제구","name":"마리아의원 부산","type":"의원","address":"부산광역시 연제구 월드컵대로 125 (연산동)","phone":"051-441-6555"},{"region":"인천남동구","name":"길병원","type":"상급종합병원","address":"인천광역시 남동구 남동대로774번길 21 (구월동)","phone":""},{"region":"수원영통구","name":"아주대학교병원","type":"상급종합병원","address":"경기도 수원시 영통구 월드컵로 164 (원천동)","phone":"031-219-5114"},{"region":"성남분당구","name":"분당차병원","type":"종합병원","address":"경기도 성남시 분당구 야탑로 59 (야탑동)","phone":"031-780-5000"},{"region":"성남분당구","name":"분당서울대학교병원","type":"상급종합병원","address":"경기도 성남시 분당구 구미로173번길 82 (구미동)","phone":"031-787-2114"},{"region":"고양일산동구","name":"일산차병원","type":"종합병원","address":"경기도 고양시 일산동구 중앙로 1205 (장항동)","phone":"031-782-8300"},{"region":"안산단원구","name":"고려대학교안산병원","type":"상급종합병원","address":"경기도 안산시 단원구 적금로 123 (고잔동)","phone":"031-1577-7516"},{"region":"원주시","name":"연세대학교 원주세브란스기독병원","type":"상급종합병원","address":"강원특별자치도 원주시 일산로 20 (일산동)","phone":"033-741-0114"},{"region":"춘천시","name":"강원대학교병원","type":"종합병원","address":"강원특별자치도 춘천시 백령로 156 (효자동)","phone":"033-258-2000"},{"region":"청주서원구","name":"모태안여성병원","type":"병원","address":"충청북도 청주시 서원구 복대로17번길 57","phone":"043-272-0001"},{"region":"대전중구","name":"충남대학교병원","type":"상급종합병원","address":"대전광역시 중구 문화로 282 (대사동)","phone":"042-1599-7123"},{"region":"대전서구","name":"건양대학교병원","type":"상급종합병원","address":"대전광역시 서구 관저동로 158 (관저동)","phone":"042-600-9999"},{"region":"세종시","name":"세종충남대학교병원","type":"종합병원","address":"세종특별자치시 보듬7로 20 (도담동)","phone":"1800-3114"},{"region":"천안서북구","name":"혜성산부인과병원","type":"병원","address":"충청남도 천안시 서북구 미라2길 18-11 (쌍용동)","phone":"041-572-4567"},{"region":"전주덕진구","name":"전북대학교병원","type":"상급종합병원","address":"전라북도 전주시 덕진구 건지로 20 (금암동)","phone":"063-250-1129"},{"region":"전주완산구","name":"예수병원","type":"종합병원","address":"전라북도 전주시 완산구 서원로 365 (중화산동1가)","phone":"063-230-8114"},{"region":"전주덕진구","name":"대자인병원","type":"종합병원","address":"전라북도 전주시 덕진구 견훤로 390 (우아동3가)","phone":"063-240-2000"},{"region":"광주동구","name":"전남대학교병원","type":"상급종합병원","address":"광주광역시 동구 제봉로 42 (학동)","phone":"062-1899-0000"},{"region":"광주동구","name":"조선대학교병원","type":"상급종합병원","address":"광주광역시 동구 필문대로 365 (학동)","phone":"062-220-3321"},{"region":"광주서구","name":"시엘병원","type":"병원","address":"광주광역시 서구 무진대로 957 (광천동)","phone":"062-368-1700"},{"region":"순천시","name":"미즈여성아동병원","type":"병원","address":"전라남도 순천시 조례1길 10-26 (조례동)","phone":"061-720-8022"},{"region":"대구중구","name":"경북대학교병원","type":"상급종합병원","address":"대구광역시 중구 동덕로 130 (삼덕동2가)","phone":"053-200-5114"},{"region":"대구달서구","name":"계명대학교동산병원","type":"상급종합병원","address":"대구광역시 달서구 달구벌대로 1035 (신당동)","phone":"1577-6622"},{"region":"포항북구","name":"여성아이병원","type":"병원","address":"경상북도 포항시 북구 우창동로22번길 7 (우현동)","phone":"054-255-5000"},{"region":"대구수성구","name":"효성병원","type":"병원","address":"대구광역시 수성구 수성로 194 (중동)","phone":"053-766-7070"},{"region":"진주시","name":"경상국립대학교병원","type":"상급종합병원","address":"경상남도 진주시 강남로 79 (칠암동)","phone":"055-750-8000"},{"region":"울산동구","name":"울산대학교병원","type":"상급종합병원","address":"울산광역시 동구 대학병원로 25 (전하동)","phone":"052-250-7000"},{"region":"창원의창구","name":"창원한마음병원","type":"종합병원","address":"경상남도 창원시 의창구 용동로57번길 8 (사림동)","phone":"055-225-0000"},{"region":"창원성산구","name":"창원경상국립대학교병원","type":"종합병원","address":"경상남도 창원시 성산구 삼정자로 11 (성주동)","phone":"055-214-2000"},{"region":"김해시","name":"우리여성병원","type":"병원","address":"경상남도 김해시 내외중앙로 91 (내동)","phone":"055-321-0114"},{"region":"창원의창구","name":"엘르메디여성의원","type":"의원","address":"경상남도 창원시 의창구 서상로 1 (동정동)","phone":"055-253-2111"},{"region":"제주시","name":"엘산부인과의원","type":"의원","address":"제주특별자치도 제주시 중앙로 352 (이도이동)","phone":"064-726-6555"}];

export default function Home() {
  const [lang, setLang] = useState('en'); // 기본 언어 영어로 변경
  const [tab, setTab] = useState('chat');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [periods, setPeriods] = useState(['','','','','','']);
  const [age, setAge] = useState('');
  const [ovulResult, setOvulResult] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [symptomResult, setSymptomResult] = useState('');
  const [symptomLoading, setSymptomLoading] = useState(false);
  const [imgPreview, setImgPreview] = useState('');
  const [imgResult, setImgResult] = useState('');
  const [imgLoading, setImgLoading] = useState(false);
  const [imgQuestion, setImgQuestion] = useState('');
  const [imgType, setImgType] = useState('🔬 Ultrasound');
  const [hospitals, setHospitals] = useState([]);
  const [hospitalError, setHospitalError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('agaya_agreed');
      if (saved === 'true') setAgreed(true);
    } catch(e) {}
  }, []);

  useEffect(() => {
    try {
      if (periods.some(p => p !== '')) {
        localStorage.setItem('agaya_periods', JSON.stringify(periods));
      }
    } catch(e) {}
  }, [periods]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('agaya_periods');
      if (saved) setPeriods(JSON.parse(saved));
    } catch(e) {}
  }, []);

  function searchHospitalsByRegion(region) {
    if (!region.trim()) return;
    const filtered = HOSPITAL_DATA.filter(h => h.address.includes(region) || h.region.includes(region));
    setHospitals(filtered);
    setHospitalError(filtered.length === 0 ? 'No designated fertility clinics found in that area.' : '');
  }

  const welcomeMsg = {
    en: "Hello! I'm Agaya, your fertility health information assistant. How can I help you today?",
    ko: "안녕하세요! 저는 Agaya, 생식 건강 정보 어시스턴트예요. 무엇이 궁금하세요?",
    sw: "Habari! Mimi ni Agaya, msaidizi wako wa taarifa za afya ya uzazi.",
    vi: "Xin chào! Tôi là Agaya, trợ lý thông tin sức khỏe sinh sản của bạn. Tôi có thể giúp gì cho bạn?",
    th: "สวัสดี! ฉันคือ Agaya ผู้ช่วยข้อมูลสุขภาพการเจริญพันธุ์ของคุณ วันนี้มีอะไรให้ช่วยไหม?",
    tl: "Kumusta! Ako si Agaya, ang iyong katulong sa impormasyon ng kalusugang pangreproduksyon. Paano kita matutulungan ngayon?"
  };

  const quickQ = {
    en: ['IVF process', 'PCOS symptoms', 'Ovulation signs', 'Fertility diet'],
    ko: ['IVF 과정', 'PCOS 증상', '배란 징후', '임신 준비 식단', '습관성 유산'],
    sw: ['Mchakato wa IVF', 'Dalili za PCOS', 'Ishara za ovulesheni', 'Lishe ya uzazi'],
    vi: ['Quy trình IVF', 'Triệu chứng PCOS', 'Dấu hiệu rụng trứng', 'Chế độ ăn cho sinh sản'],
    th: ['ขั้นตอน IVF', 'อาการ PCOS', 'สัญญาณตกไข่', 'อาหารเพื่อการเจริญพันธุ์'],
    tl: ['Proseso ng IVF', 'Sintomas ng PCOS', 'Palatandaan ng ovulation', 'Diyeta para sa fertility']
  };

  const symptomList = {
    en: ['Irregular periods','Pelvic pain','Heavy bleeding','Spotting','Acne/hair loss','Weight changes','Mood changes','Hot flashes'],
    ko: ['불규칙한 생리','골반 통증','과다 출혈','부정 출혈','여드름/탈모','체중 변화','기분 변화','안면 홍조'],
    sw: ['Hedhi isiyo ya kawaida','Maumivu ya nyonga','Damu nyingi','Matone ya damu','Chunusi/nywele','Uzito','Hisia','Moto'],
    vi: ['Kinh nguyệt không đều','Đau vùng chậu','Chảy máu nhiều','Ra máu bất thường','Mụn/rụng tóc','Thay đổi cân nặng','Thay đổi tâm trạng','Bốc hỏa'],
    th: ['ประจำเดือนไม่สม่ำเสมอ','ปวดอุ้งเชิงกราน','เลือดออกมาก','เลือดออกผิดปกติ','สิว/ผมร่วง','น้ำหนักเปลี่ยน','อารมณ์เปลี่ยน','ร้อนวูบวาบ'],
    tl: ['Hindi regular na regla','Sakit sa pelvis','Matinding pagdurugo','Spotting','Acne/paglagas ng buhok','Pagbabago ng timbang','Pagbabago ng mood','Hot flashes']
  };

  // 언어별 UI 텍스트
  const L = {
    en: {
      periodTitle: '6-Month Period Tracker', periodSub: 'Enter your last 6 period start dates to view your cycle pattern',
      month: ' months ago', thisMonth: 'This month', analyze: 'View Cycle Pattern',
      avgCycle: 'Average cycle', nextOvul: 'Estimated ovulation (reference)', fertile: 'Fertile window (reference)', nextPeriod: 'Next period',
      irregular: '⚠️ Irregular cycle', regular: '✅ Regular cycle', days: ' days', inputMore: 'Please enter at least 2 months of data',
      tip: '💡 Good to know', tipEgg: '🥚 An egg survives 24-48 hours after ovulation.',
      tipSperm: '🔬 Sperm can survive in the uterus for 3-5 days.',
      tipWhy: '📅 The fertile window is about 1 week because sperm can wait for the egg.',
      tipBest: '➡️ The highest chance of pregnancy is 2-3 days before ovulation!',
      dataNote: ' cycles analyzed', ageLabel: 'Age (optional)', amhInfoTitle: 'What is AMH?',
      sendBtn: 'Send', placeholder: 'Ask a question...',
      symptomSub: 'Select symptoms to get educational info and consultation tips.',
      symptomBtn: 'Get Info & Consultation Guide ↗', symptomLoading: 'Loading...',
      hospitalInfo: '🏥 Official Ministry of Health IVF-designated clinics in Korea',
      hospitalPlaceholder: 'Enter area (e.g. Gangnam, Suwon, Changwon)',
      hospitalSearch: 'Search', hospitalFound: ' clinics found',
      hospitalNote: 'Official designated clinics · Please call ahead before visiting',
      irregularNote: 'Cycle variation is',
      irregularNote2: 'days. Specialist consultation recommended.',
      cycleNote: '* Stored on device only, not sent to server',
      disclaimer: '⚕️ This result is a statistical reference only. Please confirm exact ovulation date with ultrasound at your OB/GYN.',
      amhNote: 'AMH interpretation should be done with a specialist. Below is general educational info.',
      amhDisclaimer: '⚕️ AMH interpretation and treatment decisions must be made with a fertility specialist. This is educational information only.',
    },
    ko: {
      periodTitle: '6개월 생리 시작일 입력', periodSub: '최근 6개월간 생리 시작일을 입력하면 주기 패턴을 확인할 수 있어요',
      month: '개월 전', thisMonth: '이번 달', analyze: '주기 패턴 확인하기',
      avgCycle: '평균 주기', nextOvul: '배란 예측 참고일', fertile: '가임 참고 기간', nextPeriod: '다음 생리 예정일',
      irregular: '⚠️ 주기 불규칙', regular: '✅ 주기 규칙적', days: '일', inputMore: '최소 2개월 이상 입력해주세요',
      tip: '💡 알아두세요', tipEgg: '🥚 난자는 배란 후 24~48시간 생존해요.',
      tipSperm: '🔬 정자는 자궁 내에서 3~5일 생존할 수 있어요.',
      tipWhy: '📅 가임기가 약 1주일인 이유는 정자가 미리 기다릴 수 있기 때문이에요.',
      tipBest: '➡️ 배란 2~3일 전부터 배란일까지가 임신 확률이 가장 높아요!',
      dataNote: '개 주기 데이터 기반', ageLabel: '나이 (세, 선택)', amhInfoTitle: 'AMH란?',
      sendBtn: '보내기', placeholder: '질문을 입력하세요...',
      symptomSub: '증상을 선택하면 관련 생식 건강 정보와 전문의 상담 시 논의할 포인트를 안내해드려요.',
      symptomBtn: '관련 정보 및 상담 가이드 보기 ↗', symptomLoading: '정보 불러오는 중...',
      hospitalInfo: '🏥 보건복지부 공식 지정 난임(체외수정) 병원을 찾아드려요',
      hospitalPlaceholder: '지역명 입력 (예: 강남구, 수원, 창원)',
      hospitalSearch: '검색', hospitalFound: '곳 발견',
      hospitalNote: '보건복지부 공식 지정 병원 · 방문 전 전화 확인을 권장해요',
      irregularNote: '주기 변동이', irregularNote2: '일이에요. 전문의 상담을 권장해요.',
      cycleNote: '* 기기 내 저장, 서버 전송 없음',
      disclaimer: '⚕️ 이 결과는 통계 기반 참고값이며 개인차가 있습니다. 정확한 배란일 확인은 산부인과 초음파 검사를 통해 확인하세요.',
      amhNote: 'AMH 수치 해석은 전문의와 상담하세요. 아래는 교육용 일반 정보예요.',
      amhDisclaimer: '⚕️ AMH 수치 해석 및 치료 결정은 반드시 불임 전문의와 상담하세요. 본 정보는 교육 목적이며 의료 행위가 아닙니다.',
    },
    sw: {
      periodTitle: 'Rekodi ya Hedhi ya Miezi 6', periodSub: 'Ingiza tarehe za mwanzo wa hedhi kwa miezi 6 iliyopita',
      month: ' miezi iliyopita', thisMonth: 'Mwezi huu', analyze: 'Angalia Mfumo wa Mzunguko',
      avgCycle: 'Wastani wa mzunguko', nextOvul: 'Ovulesheni inayokadiriwa (rejea)', fertile: 'Kipindi cha uzazi (rejea)', nextPeriod: 'Hedhi inayokuja',
      irregular: '⚠️ Mzunguko usio wa kawaida', regular: '✅ Mzunguko wa kawaida', days: ' siku', inputMore: 'Tafadhali ingiza data ya miezi 2 au zaidi',
      tip: '💡 Kumbuka', tipEgg: '🥚 Yai huishi masaa 24-48 baada ya ovulesheni.',
      tipSperm: '🔬 Manii yanaweza kuishi siku 3-5 kwenye uterasi.',
      tipWhy: '📅 Kipindi cha uzazi ni wiki moja kwa sababu manii yanaweza kusubiri yai.',
      tipBest: '➡️ Uwezekano mkubwa wa ujauzito ni siku 2-3 kabla ya ovulesheni!',
      dataNote: ' mizunguko', ageLabel: 'Umri (hiari)', amhInfoTitle: 'AMH ni nini?',
      sendBtn: 'Tuma', placeholder: 'Uliza swali...',
      symptomSub: 'Chagua dalili ili kupata taarifa za elimu na vidokezo vya kushauriana.',
      symptomBtn: 'Pata Taarifa na Mwongozo ↗', symptomLoading: 'Inapakia...',
      hospitalInfo: '🏥 Kliniki rasmi za IVF nchini Korea',
      hospitalPlaceholder: 'Ingiza eneo', hospitalSearch: 'Tafuta', hospitalFound: ' kliniki zimepatikana',
      hospitalNote: 'Kliniki rasmi · Piga simu kabla ya kutembelea',
      irregularNote: 'Tofauti ya mzunguko ni', irregularNote2: 'siku. Inashauriwa kushauriana na mtaalamu.',
      cycleNote: '* Imehifadhiwa kwenye kifaa tu, haitumwi kwa seva',
      disclaimer: '⚕️ Matokeo haya ni kwa kumbukumbu tu. Thibitisha siku ya ovulesheni na daktari wako.',
      amhNote: 'Tafsiri ya AMH ifanywe na mtaalamu. Hapa chini ni taarifa za jumla za elimu.',
      amhDisclaimer: '⚕️ Maamuzi ya matibabu lazima yafanywe na mtaalamu wa uzazi. Hii ni taarifa ya elimu tu.',
    },
    vi: {
      periodTitle: 'Theo dõi kinh nguyệt 6 tháng', periodSub: 'Nhập ngày bắt đầu kinh nguyệt 6 tháng gần nhất để xem chu kỳ của bạn',
      month: ' tháng trước', thisMonth: 'Tháng này', analyze: 'Xem chu kỳ',
      avgCycle: 'Chu kỳ trung bình', nextOvul: 'Ngày rụng trứng ước tính (tham khảo)', fertile: 'Cửa sổ thụ thai (tham khảo)', nextPeriod: 'Kỳ kinh tiếp theo',
      irregular: '⚠️ Chu kỳ không đều', regular: '✅ Chu kỳ đều', days: ' ngày', inputMore: 'Vui lòng nhập ít nhất 2 tháng dữ liệu',
      tip: '💡 Nên biết', tipEgg: '🥚 Trứng sống 24-48 giờ sau khi rụng.',
      tipSperm: '🔬 Tinh trùng có thể sống 3-5 ngày trong tử cung.',
      tipWhy: '📅 Cửa sổ thụ thai khoảng 1 tuần vì tinh trùng có thể chờ trứng.',
      tipBest: '➡️ Khả năng mang thai cao nhất là 2-3 ngày trước khi rụng trứng!',
      dataNote: ' chu kỳ đã phân tích', ageLabel: 'Tuổi (tùy chọn)', amhInfoTitle: 'AMH là gì?',
      sendBtn: 'Gửi', placeholder: 'Đặt câu hỏi...',
      symptomSub: 'Chọn triệu chứng để nhận thông tin giáo dục và hướng dẫn tư vấn.',
      symptomBtn: 'Xem thông tin & Hướng dẫn tư vấn ↗', symptomLoading: 'Đang tải...',
      hospitalInfo: '🏥 Các phòng khám IVF được Bộ Y tế chỉ định tại Hàn Quốc',
      hospitalPlaceholder: 'Nhập khu vực (vd: Gangnam, Suwon)',
      hospitalSearch: 'Tìm kiếm', hospitalFound: ' phòng khám tìm thấy',
      hospitalNote: 'Phòng khám được chỉ định chính thức · Vui lòng gọi điện trước khi đến',
      irregularNote: 'Biến động chu kỳ là', irregularNote2: 'ngày. Nên tư vấn chuyên gia.',
      cycleNote: '* Chỉ lưu trên thiết bị, không gửi lên máy chủ',
      disclaimer: '⚕️ Kết quả này chỉ mang tính tham khảo thống kê. Vui lòng xác nhận ngày rụng trứng chính xác với bác sĩ.',
      amhNote: 'Giải thích AMH cần được thực hiện cùng chuyên gia. Dưới đây là thông tin giáo dục chung.',
      amhDisclaimer: '⚕️ Quyết định điều trị phải được thực hiện cùng bác sĩ chuyên khoa vô sinh. Đây chỉ là thông tin giáo dục.',
    },
    th: {
      periodTitle: 'ติดตามประจำเดือน 6 เดือน', periodSub: 'ป้อนวันเริ่มประจำเดือน 6 เดือนล่าสุดเพื่อดูรูปแบบรอบของคุณ',
      month: ' เดือนที่แล้ว', thisMonth: 'เดือนนี้', analyze: 'ดูรูปแบบรอบ',
      avgCycle: 'รอบเฉลี่ย', nextOvul: 'วันตกไข่โดยประมาณ (อ้างอิง)', fertile: 'ช่วงเจริญพันธุ์ (อ้างอิง)', nextPeriod: 'ประจำเดือนครั้งต่อไป',
      irregular: '⚠️ รอบไม่สม่ำเสมอ', regular: '✅ รอบสม่ำเสมอ', days: ' วัน', inputMore: 'กรุณาป้อนข้อมูลอย่างน้อย 2 เดือน',
      tip: '💡 ควรรู้', tipEgg: '🥚 ไข่มีชีวิต 24-48 ชั่วโมงหลังตกไข่',
      tipSperm: '🔬 อสุจิสามารถมีชีวิตได้ 3-5 วันในมดลูก',
      tipWhy: '📅 ช่วงเจริญพันธุ์ประมาณ 1 สัปดาห์เพราะอสุจิรอไข่ได้',
      tipBest: '➡️ โอกาสตั้งครรภ์สูงสุดคือ 2-3 วันก่อนตกไข่!',
      dataNote: ' รอบที่วิเคราะห์', ageLabel: 'อายุ (ไม่บังคับ)', amhInfoTitle: 'AMH คืออะไร?',
      sendBtn: 'ส่ง', placeholder: 'ถามคำถาม...',
      symptomSub: 'เลือกอาการเพื่อรับข้อมูลเพื่อการศึกษาและคำแนะนำในการปรึกษา',
      symptomBtn: 'ดูข้อมูลและคำแนะนำ ↗', symptomLoading: 'กำลังโหลด...',
      hospitalInfo: '🏥 คลินิก IVF ที่กระทรวงสาธารณสุขเกาหลีรับรอง',
      hospitalPlaceholder: 'ป้อนพื้นที่ (เช่น Gangnam, Suwon)',
      hospitalSearch: 'ค้นหา', hospitalFound: ' คลินิกที่พบ',
      hospitalNote: 'คลินิกที่ได้รับการรับรองอย่างเป็นทางการ · กรุณาโทรก่อนเยี่ยมชม',
      irregularNote: 'ความผันผวนของรอบคือ', irregularNote2: 'วัน แนะนำให้ปรึกษาผู้เชี่ยวชาญ',
      cycleNote: '* บันทึกเฉพาะบนอุปกรณ์ ไม่ส่งไปยังเซิร์ฟเวอร์',
      disclaimer: '⚕️ ผลลัพธ์นี้เป็นเพียงข้อมูลอ้างอิงทางสถิติ กรุณายืนยันวันตกไข่ที่แน่นอนกับแพทย์ของคุณ',
      amhNote: 'การแปลผล AMH ควรทำกับผู้เชี่ยวชาญ ด้านล่างเป็นข้อมูลเพื่อการศึกษาทั่วไป',
      amhDisclaimer: '⚕️ การตัดสินใจรักษาต้องทำกับผู้เชี่ยวชาญด้านภาวะมีบุตรยาก นี่คือข้อมูลเพื่อการศึกษาเท่านั้น',
    },
    tl: {
      periodTitle: '6-Buwang Tracker ng Regla', periodSub: 'Ilagay ang mga petsa ng simula ng regla sa nakaraang 6 na buwan',
      month: ' buwan na ang nakakaraan', thisMonth: 'Ngayong buwan', analyze: 'Tingnan ang Pattern ng Cycle',
      avgCycle: 'Average na cycle', nextOvul: 'Tinatantyang ovulation (sanggunian)', fertile: 'Fertile window (sanggunian)', nextPeriod: 'Susunod na regla',
      irregular: '⚠️ Hindi regular na cycle', regular: '✅ Regular na cycle', days: ' araw', inputMore: 'Mangyaring maglagay ng data na hindi bababa sa 2 buwan',
      tip: '💡 Dapat malaman', tipEgg: '🥚 Ang itlog ay nabubuhay ng 24-48 oras pagkatapos ng ovulation.',
      tipSperm: '🔬 Ang sperm ay maaaring mabuhay ng 3-5 araw sa matres.',
      tipWhy: '📅 Ang fertile window ay humigit-kumulang 1 linggo dahil maaaring maghintay ang sperm para sa itlog.',
      tipBest: '➡️ Ang pinakamataas na pagkakataon ng pagbubuntis ay 2-3 araw bago mag-ovulate!',
      dataNote: ' na cycle ang nasuri', ageLabel: 'Edad (opsyonal)', amhInfoTitle: 'Ano ang AMH?',
      sendBtn: 'Ipadala', placeholder: 'Magtanong...',
      symptomSub: 'Pumili ng mga sintomas para makakuha ng impormasyon at gabay sa konsultasyon.',
      symptomBtn: 'Makakuha ng Impormasyon at Gabay ↗', symptomLoading: 'Naglo-load...',
      hospitalInfo: '🏥 Mga opisyal na IVF clinic na itinalaga ng Ministri ng Kalusugan ng Korea',
      hospitalPlaceholder: 'Ilagay ang lugar (hal. Gangnam, Suwon)',
      hospitalSearch: 'Hanapin', hospitalFound: ' clinic ang nahanap',
      hospitalNote: 'Opisyal na itinalagang clinic · Mangyaring tumawag bago bumisita',
      irregularNote: 'Ang pagkakaiba-iba ng cycle ay', irregularNote2: 'araw. Inirerekomenda ang konsultasyon sa espesyalista.',
      cycleNote: '* Naka-imbak sa device lamang, hindi ipinapadala sa server',
      disclaimer: '⚕️ Ang resultang ito ay isang sangguniang istatistika lamang. Mangyaring kumpirmahin ang eksaktong petsa ng ovulation sa iyong OB/GYN.',
      amhNote: 'Ang interpretasyon ng AMH ay dapat gawin kasama ang espesyalista. Sa ibaba ay pangkalahatang impormasyon para sa edukasyon.',
      amhDisclaimer: '⚕️ Ang mga desisyon sa paggamot ay dapat gawin kasama ang fertility specialist. Ito ay impormasyon para sa edukasyon lamang.',
    }
  }[lang];

  const langLabels = { en: 'EN', ko: '한국어', sw: 'SW', vi: 'VI', th: 'TH', tl: 'TL' };

  async function sendMessage(text) {
    if (!text.trim() || loading) return;
    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: newMessages, system: SYSTEM[lang] }) });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.content }]);
    } catch (e) {
      setMessages([...newMessages, { role: 'assistant', content: 'An error occurred. Please try again.' }]);
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
    const fmt = d => d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    setOvulResult({ avg, min, max, variation, nextPeriod: fmt(nextPeriod), ovulDay: fmt(ovulDay), ovulRange: `${fmt(earlyOvul)} ~ ${fmt(lateOvul)}`, fertile: `${fmt(fertileStart)} ~ ${fmt(fertileEnd)}`, isIrregular: variation > 7, cycleCount: cycles.length });
  }

  function toggleSymptom(s) { setSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]); }

  async function analyzeSymptoms() {
    if (!symptoms.length) return;
    setSymptomLoading(true);
    const q = lang === 'ko'
      ? `다음 증상들이 있어요: ${symptoms.join(', ')}. 이 증상들이 어떤 생식 건강 상태와 관련이 있을 수 있는지 교육적 정보를 알려주시고, 전문의 상담 시 어떤 부분을 말씀드리면 좋을지 가이드해주세요.`
      : `I have these symptoms: ${symptoms.join(', ')}. What reproductive health topics might be worth discussing with a specialist? Please provide educational information only.`;
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'user', content: q }], system: SYSTEM[lang] }) });
      const data = await res.json();
      setSymptomResult(data.content);
    } catch (e) { setSymptomResult('Error occurred.'); }
    setSymptomLoading(false);
  }

  const iStyle = { width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' };
  const lStyle = { display: 'block', fontSize: 12, color: '#6b7280', marginBottom: 4 };

  // 동의 팝업 (영어 기본)
  if (!agreed) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 9999}}>
        <div style={{ background: 'white', borderRadius: '24px 24px 0 0', padding: '8px 28px 40px', maxWidth: 480, width: '100%', maxHeight: '72vh', overflowY: 'auto', boxShadow: '0 -4px 24px rgba(0,0,0,0.15)' }}><div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, background: '#d1d5db' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1D9E75', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 18 }}>🌿</div>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Agaya Service Notice</h2>
              <p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>Please read before using</p>
            </div>
          </div>
          <div style={{ background: '#FEF3C7', borderRadius: 10, padding: '14px 16px', marginBottom: 16, border: '1px solid #FCD34D', fontSize: 13, color: '#92400E', lineHeight: 1.7 }}>
            <strong>⚕️ Important Notice</strong><br/>
            This service is <strong>not a medical act</strong> and is not a licensed medical device.<br/>
            All information provided is <strong>general educational information only</strong> and does not replace medical diagnosis, prescription, or treatment.
          </div>
          <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.8, marginBottom: 20 }}>
            <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Privacy Policy</p>
            <p style={{ margin: '0 0 6px' }}>• Menstrual cycle data is stored <strong>only on your device (localStorage)</strong> and is never sent to our servers or shared externally.</p>
            <p style={{ margin: '0 0 6px' }}>• AI chat content is not stored after responses are generated.</p>
            <p style={{ margin: '0 0 16px' }}>• In case of emergency, immediately call your local emergency number or visit the nearest emergency room.</p>
            <p style={{ margin: 0, fontWeight: 600 }}>Terms of Use</p>
            <p style={{ margin: '4px 0 0', color: '#6b7280' }}>Agaya and its providers are not medically liable for outcomes resulting from use of this service. All health-related decisions should be made in consultation with a qualified medical professional.</p>
          </div>
          <button
            onClick={() => { setAgreed(true); try { localStorage.setItem('agaya_agreed', 'true'); } catch(e) {} }}
            style={{ width: '100%', padding: '12px', background: '#1D9E75', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 15, fontWeight: 600 }}>
            I have read and agree to the above
          </button>
          <p style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center', marginTop: 10 }}>You can use the service after agreeing</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>

      {/* ── HEADER ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#1D9E75', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 20 }}>🌿</div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Agaya</h1>
          <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>Fertility AI by a Korean Doctor</p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <a href="/blog" style={{ padding: '4px 12px', borderRadius: 6, border: '1px solid #5DCAA5', color: '#0F6E56', background: '#E1F5EE', fontSize: 12, textDecoration: 'none', fontWeight: 500 }}>
            📝 Blog
          </a>
          {['en','ko','vi','th','tl','sw'].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid', borderColor: lang===l ? '#1D9E75' : '#d1d5db', background: lang===l ? '#E1F5EE' : 'white', color: lang===l ? '#0F6E56' : '#6b7280', cursor: 'pointer', fontSize: 12 }}>
              {langLabels[l]}
            </button>
          ))}
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: 24, overflowX: 'auto' }}>
        {[['chat','💬 Chat'],['ovulation','📅 Cycle'],['symptoms','📋 Symptoms'],['image','🔬 Image'],['hospital','🏥 Clinics']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ padding: '10px 14px', fontSize: 13, cursor: 'pointer', color: tab===id ? '#1D9E75' : '#6b7280', background: 'transparent', border: 'none', borderBottom: tab===id ? '2px solid #1D9E75' : '2px solid transparent', fontWeight: tab===id ? 600 : 400, whiteSpace: 'nowrap' }}>
            {label}
          </button>
        ))}
      </div>

      {/* ── CHAT ── */}
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
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter' && sendMessage(input)} placeholder={L.placeholder} style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14 }} />
            <button onClick={() => sendMessage(input)} disabled={loading} style={{ padding: '8px 16px', background: '#1D9E75', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>{L.sendBtn}</button>
          </div>
        </div>
      )}

      {/* ── OVULATION ── */}
      {tab === 'ovulation' && (
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{L.periodTitle}</h2>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>{L.periodSub}</p>
          <div style={{ padding: '10px 14px', background: '#f9fafb', borderRadius: 10, border: '1px solid #e5e7eb', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <label style={{ fontSize: 13, color: '#6b7280', whiteSpace: 'nowrap' }}>{L.ageLabel}</label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="35" style={{ ...iStyle, width: 120 }} />
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
                  {ovulResult.isIrregular && <span style={{ fontWeight: 400, fontSize: 12, display: 'block', marginTop: 4 }}>{L.irregularNote} {ovulResult.variation} {L.irregularNote2}</span>}
                </div>
                {[[L.avgCycle,`${ovulResult.avg}${L.days} (${ovulResult.min}~${ovulResult.max}${L.days})`],[L.nextOvul,ovulResult.ovulDay],['Ovulation range (ref)',ovulResult.ovulRange],[L.fertile,ovulResult.fertile],[L.nextPeriod,ovulResult.nextPeriod]].map(([label,value]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #9FE1CB' }}>
                    <span style={{ fontSize: 13, color: '#0F6E56' }}>{label}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#085041' }}>{value}</span>
                  </div>
                ))}
                <p style={{ fontSize: 12, color: '#6b7280', marginTop: 12 }}>{L.cycleNote}</p>
                <div style={{ marginTop: 12, padding: '12px 14px', background: 'white', borderRadius: 8, border: '1px solid #9FE1CB', fontSize: 13, lineHeight: 1.9 }}>
                  <strong style={{ color: '#0F6E56', display: 'block', marginBottom: 6 }}>{L.tip}</strong>
                  <p style={{ margin: '4px 0' }}>{L.tipEgg}</p>
                  <p style={{ margin: '4px 0' }}>{L.tipSperm}</p>
                  <p style={{ margin: '4px 0' }}>{L.tipWhy}</p>
                  <p style={{ margin: '6px 0 0', color: '#0F6E56', fontWeight: 600 }}>{L.tipBest}</p>
                </div>
                <div style={{ marginTop: 12, padding: '10px 12px', background: '#FEF3C7', borderRadius: 8, border: '1px solid #FCD34D', fontSize: 12, color: '#92400E', lineHeight: 1.6 }}>
                  {L.disclaimer}
                </div>
              </div>
              <div style={{ background: '#EFF6FF', borderRadius: 12, padding: '1.25rem', border: '1px solid #BFDBFE' }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1E40AF', marginBottom: 4 }}>{L.amhInfoTitle}</h3>
                <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 14 }}>{L.amhNote}</p>
                {(AMH_INFO[lang] || AMH_INFO['en']).map((item, i) => (
                  <div key={i} style={{ marginBottom: 12, padding: '10px 14px', background: 'white', borderRadius: 10, border: '1px solid #BFDBFE' }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#1E40AF', margin: '0 0 4px' }}>Q. {item.q}</p>
                    <p style={{ fontSize: 13, color: '#374151', margin: 0, lineHeight: 1.6 }}>{item.a}</p>
                  </div>
                ))}
                <div style={{ padding: '8px 12px', background: '#FEF3C7', borderRadius: 8, fontSize: 12, color: '#92400E', border: '1px solid #FCD34D' }}>
                  {L.amhDisclaimer}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── SYMPTOMS ── */}
      {tab === 'symptoms' && (
        <div>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>{L.symptomSub}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
            {(symptomList[lang] || symptomList['en']).map(s => (
              <label key={s} onClick={() => toggleSymptom(s)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, border: '1px solid', borderColor: symptoms.includes(s) ? '#5DCAA5' : '#e5e7eb', background: symptoms.includes(s) ? '#E1F5EE' : 'white', cursor: 'pointer', fontSize: 13, color: symptoms.includes(s) ? '#0F6E56' : '#374151' }}>
                <span>{symptoms.includes(s) ? '✓' : '○'}</span> {s}
              </label>
            ))}
          </div>
          <button onClick={analyzeSymptoms} disabled={symptomLoading} style={{ width: '100%', padding: 10, background: '#1D9E75', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>
            {symptomLoading ? L.symptomLoading : L.symptomBtn}
          </button>
          {symptomResult && (
            <div style={{ marginTop: 16, padding: 16, background: '#f9fafb', borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
              {symptomResult}
            </div>
          )}
        </div>
      )}

      {/* ── IMAGE ── */}
      {tab === 'image' && (
        <div>
          <div style={{ padding: '12px 16px', background: '#FEF3C7', borderRadius: 8, border: '1px solid #FCD34D', fontSize: 13, color: '#92400E', marginBottom: 16, lineHeight: 1.7 }}>
            ⚕️ <strong>Important:</strong> This feature is not a medical act and is not a licensed medical device.<br/>
            AI-provided content is general educational information only and <strong>not a professional medical reading.</strong><br/>
            For accurate diagnosis, please consult an OB/GYN specialist.
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {['🔬 Ultrasound', '🧪 Ovulation Test'].map(type => (
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
              {imgType === '🧪 Ovulation Test' ? 'Upload ovulation test stick photo' : 'Upload ultrasound / test result image'}
            </p>
            <p style={{ color: '#6b7280', fontSize: 12, margin: 0 }}>
              {imgType === '🧪 Ovulation Test' ? 'Make sure the Control (C) and Test (T) lines are clearly visible' : 'Click or drag image here (JPG, PNG)'}
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
              <img src={imgPreview} alt="Uploaded image" style={{ width: '100%', maxHeight: 300, objectFit: 'contain', borderRadius: 12, border: '1px solid #e5e7eb' }} />
              {imgType !== '🧪 Ovulation Test' && (
                <div style={{ marginTop: 12 }}>
                  <label style={lStyle}>Ask a question about this image (optional)</label>
                  <input type="text" value={imgQuestion} onChange={e => setImgQuestion(e.target.value)} placeholder="e.g. What can you see in this image?" style={iStyle} />
                </div>
              )}
              <button onClick={async () => {
                setImgLoading(true);
                setImgResult('');
                try {
                  const base64 = imgPreview.split(',')[1];
                  const mimeType = imgPreview.split(';')[0].split(':')[1];
                  const question = imgType === '🧪 Ovulation Test'
                    ? 'Please compare the Control line (C) and Test line (T) color intensity of this ovulation test stick. Rate the color intensity on a scale of 10, and clarify that this is educational color comparison reference information only, not a professional medical reading.'
                    : (imgQuestion || 'Please describe what you can see in this image educationally. Clarify that this is general information only, not a professional medical reading.');
                  const system = imgType === '🧪 Ovulation Test'
                    ? 'You are an educational color comparison assistant. Compare the Control line (C) and Test line (T) of an ovulation test stick and rate on a scale of 10. Format: Color comparison score: X.X/10, Reference: darker/similar/lighter, Description: (brief explanation). Always add at the end: "This is educational color comparison reference information only, not a professional medical reading. Accurate interpretation requires consulting the product instructions and a medical professional."'
                    : 'You are Agaya, an educational information assistant created by an OB/GYN. Provide educational general information only based on the image. Always add at the end: "This is not a medical act, and not a professional medical reading. For accurate diagnosis, please consult an OB/GYN specialist."';
                  const res = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ system, messages: [{ role: 'user', content: [{ type: 'image', source: { type: 'base64', media_type: mimeType, data: base64 } }, { type: 'text', text: question }] }] })
                  });
                  const data = await res.json();
                  setImgResult(data.content || 'Could not retrieve results.');
                } catch(e) { setImgResult('An error occurred. Please try again.'); }
                setImgLoading(false);
              }} disabled={imgLoading} style={{ width: '100%', padding: 12, background: '#1D9E75', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600, marginTop: 12 }}>
                {imgLoading ? '🔍 Loading...' : imgType === '🧪 Ovulation Test' ? '🧪 View Color Comparison Reference' : '🔬 View Image General Info'}
              </button>
            </div>
          )}
          {imgResult && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ padding: '8px 14px', background: '#FEF3C7', borderRadius: '8px 8px 0 0', border: '1px solid #FCD34D', borderBottom: 'none', fontSize: 12, color: '#92400E', fontWeight: 600 }}>
                ⚕️ Not a professional medical reading — Educational reference information only
              </div>
              <div style={{ padding: 16, background: '#f9fafb', borderRadius: '0 0 12px 12px', border: '1px solid #e5e7eb', fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                {imgResult}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── HOSPITAL ── */}
      {tab === 'hospital' && (
        <div>
          <div style={{ padding: '10px 12px', background: '#E1F5EE', borderRadius: 8, fontSize: 12, color: '#0F6E56', marginBottom: 16 }}>
            {L.hospitalInfo}
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && searchHospitalsByRegion(searchQuery)} placeholder={L.hospitalPlaceholder} style={{ flex: 1, padding: '9px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14 }} />
            <button onClick={() => searchHospitalsByRegion(searchQuery)} style={{ padding: '9px 18px', background: '#1D9E75', color: 'white', border: 'none', borderRadius: 8, fontSize: 14, cursor: 'pointer' }}>{L.hospitalSearch}</button>
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
              <div style={{ padding: '10px 16px', fontSize: 13, color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>{hospitals.length}{L.hospitalFound}</div>
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
            {L.hospitalNote}
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <div style={{ marginTop: 48, padding: '16px 20px', background: '#f9fafb', borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 12, color: '#6b7280', lineHeight: 1.9 }}>
        <p style={{ fontWeight: 600, color: '#374151', marginBottom: 8, fontSize: 13 }}>📋 Service Notice & Disclaimer</p>
        <p style={{ margin: '0 0 4px' }}>• Agaya is not a medical act and is not a licensed medical device.</p>
        <p style={{ margin: '0 0 4px' }}>• All information is for general educational purposes only and does not replace medical diagnosis, prescription, or treatment.</p>
        <p style={{ margin: '0 0 4px' }}>• Menstrual cycle data is stored only on your device and is never sent to our servers.</p>
        <p style={{ margin: '0 0 4px' }}>• In case of emergency, immediately contact your local emergency services or visit the nearest emergency room.</p>
        <p style={{ margin: '0 0 8px' }}>• Service by OB/GYN & Fertility Specialist | <a href="https://agaya.net" style={{ color: '#1D9E75', textDecoration: 'none' }}>agaya.net</a></p>
        <p style={{ margin: 0, color: '#9ca3af' }}>© 2026 Agaya. All rights reserved.</p>
      </div>

    </div>
  );
}
