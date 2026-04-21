import { useState } from 'react';

const POSTS = {
  en: [
    {
      id: 7, tag: 'Fertility Tips',
      title: "Timing Isn't Everything — But Sperm Supply Is",
      excerpt: "A practical tip most couples trying to conceive overlook: you can time things perfectly and still fail if sperm reserves are already depleted.",
      date: 'April 21, 2026', readTime: '4 min read',
      content: `## The Problem Isn't Timing — It's Depletion

Most people trying to conceive know they should have sex around ovulation. But there's a mistake that quietly undermines even the best-timed effort — and I see it in my clinic regularly.

A couple has been having frequent sex in the days before ovulation. I confirm their timing, they try again on the right day — but by then, sperm reserves are already significantly depleted. The count at the critical moment ends up far lower than it should be.

## How Long Does Sperm Actually Survive?

Sperm can survive up to 7 days under ideal conditions — but realistically, most remain viable for about **3 days**. This means you don't need to time sex exactly at ovulation. A few days before works too.

The window is forgiving. Sperm supply is not.

## What I Recommend

During your fertile window, aim for sex **every other day** — with at least **48 hours** between each time. This gap allows sperm count and motility to meaningfully recover. Very long abstinence also reduces quality, so balance matters.

Every other day gives you good coverage *and* keeps sperm supply healthy.

## Plan Ahead with Agaya

To schedule every-other-day timing well in advance, you need to know when your fertile window is. **Agaya** tracks up to 6 months of cycle data and predicts upcoming ovulation dates — so you can map your schedule before the cycle begins, not scramble at the last minute.

Log your period dates at **agaya.net** and let Agaya show you when to prepare.

---
*This article is for educational purposes and does not replace personal medical advice. Consult your OB/GYN for personalized guidance.*`
    },
    {
      id: 1, tag: 'PCOS',
      title: 'PCOS and Insulin: How Blood Sugar Management Affects Fertility',
      excerpt: 'Up to 70% of women with PCOS have insulin resistance. Understanding this connection can change your treatment approach.',
      date: 'April 8, 2026', readTime: '5 min read',
      content: `## What is PCOS and Insulin Resistance?

Polycystic Ovary Syndrome (PCOS) affects about 10% of women of reproductive age. At its core is often insulin resistance — cells don't respond properly to insulin signals, so the body produces more. Elevated insulin stimulates the ovaries to produce more androgens, leading to irregular ovulation, acne, excess hair growth, and difficulty conceiving.

## Why Does Blood Sugar Management Matter for Pregnancy?

Insulin resistance appears in about 70% of women with PCOS. Stabilizing blood sugar lowers insulin levels, which can restore regular ovulation cycles, reduce androgen levels, and improve pregnancy success rates.

## What You Can Do Through Lifestyle

Reducing refined carbohydrates and increasing protein and fiber improves insulin sensitivity. Aerobic exercise 3–4 times per week for 30+ minutes has strong evidence behind it. Metformin directly improves insulin resistance and is widely used in PCOS treatment — ask your specialist.

## Questions to Ask Your Doctor

Ask about fasting glucose, insulin, and HOMA-IR tests. Find out whether Metformin is appropriate for you.

---
*This article is for educational purposes and does not replace personal medical advice.*`
    },
    {
      id: 6, tag: 'AI & Medicine',
      title: 'Starting with Claude, Expanding with Gemma 4 — The Agaya Story',
      excerpt: 'What a Korean OB/GYN learned building an AI app. And why we chose Gemma 4 for women in Africa.',
      date: 'April 19, 2026', readTime: '6 min read',
      content: `## Why Did a Doctor Learn to Code?

In the clinic, I hear the same questions dozens of times a day. "When is my ovulation day?" "If my AMH is low, can I still get pregnant?" Consultation time is short, patients' anxiety follows them home — and at 11pm, there's nowhere to ask. So I decided to build it myself.

## Why We Started with Claude

Agaya's first version was built on Anthropic's Claude API. Claude understands medical context well, delivers excellent multilingual responses, and gives consistently safe and warm answers.

## Why We're Expanding with Gemma 4

One thing kept weighing on me: is this app actually reaching women in East Africa, medically underserved regions? Gemma 4 is an open model. It can work in areas with unstable internet or where cost is a barrier. If Claude is Agaya's present, Gemma 4 is the experiment toward the future Agaya needs.

## What's Next

Agaya currently supports Korean, English, and Swahili. The goal is an offline-friendly version so people in areas with unstable internet can still access basic fertility information. Knowing is the first step to healing — that information shouldn't only belong to people in Changwon.

---
*Written directly by Agaya's creator (OB/GYN & Fertility Specialist).*`
    },
    {
      id: 2, tag: 'Agaya Stories',
      title: '"I Found Out I Had Endometriosis at 34" — Amara\'s Story from Lagos',
      excerpt: 'A late diagnosis, the emotional weight it carried, and how information changed everything.',
      date: 'April 5, 2026', readTime: '7 min read',
      content: `## For 10 Years, She Was Told "It's Just Period Pain"

Amara (not her real name) is a 34-year-old woman in Lagos. She'd had severe pain with every period since high school, but was always told "all women go through this." Two years after getting married without conceiving, a laparoscopy revealed Stage 3 endometriosis.

## Why Is Endometriosis Diagnosed So Late?

Endometriosis takes an average of 7–10 years to diagnose. Symptoms like painful periods and pelvic pain are often dismissed as normal. A laparoscopy is required for definitive diagnosis, creating an additional barrier.

## How Information Changed Everything

After her diagnosis, Amara learned through Agaya that her symptoms weren't abnormal, that treatment options existed, that pregnancy was still possible. "If I had known this 10 years ago" — that's why Agaya exists.

## What You Should Know

Endometriosis affects about 10% of women of reproductive age. If period pain interferes with daily life, seek a specialist consultation. Early diagnosis is important for preventing infertility.

---
*Names and details changed to protect privacy.*`
    },
    {
      id: 3, tag: 'Pregnancy',
      title: 'Morning Sickness: Evidence-Based Relief Beyond Ginger Tea',
      excerpt: 'What randomized controlled trials actually say about managing hyperemesis — and when to go to the hospital.',
      date: 'April 2, 2026', readTime: '4 min read',
      content: `## Why Does Morning Sickness Happen?

About 70–80% of pregnant women experience nausea and vomiting in early pregnancy. Rising hCG hormones, increased estrogen, and heightened smell sensitivity all play a role. It typically eases around 12–14 weeks.

## Methods With Evidence Behind Them

Ginger (250mg capsules, 4 times daily) has real research supporting nausea relief. Vitamin B6 (pyridoxine, 10–25mg per day) has demonstrated effectiveness in multiple RCTs. Eating small amounts frequently and avoiding greasy foods and strong smells also helps.

## When Should You Go to the Hospital?

If you're vomiting more than 3–4 times a day, can't eat or drink for 24 hours, or your urine is very dark — visit the hospital immediately. These can be signs of **Hyperemesis Gravidarum**.

---
*This article is for educational purposes. If symptoms are severe, consult an OB/GYN.*`
    },
    {
      id: 4, tag: 'IVF & ART',
      title: 'IVF in Sub-Saharan Africa: Access, Cost, and Change',
      excerpt: 'Assisted reproductive technologies are spreading across the continent. Who is being reached, and who is still left out.',
      date: 'March 29, 2026', readTime: '9 min read',
      content: `## Infertility in Africa: An Underestimated Crisis

In sub-Saharan Africa, infertility carries deep social stigma. In many cultures, women who cannot have children risk divorce and social exclusion. Yet access to IVF remains extremely difficult.

## The Current Situation

IVF clinics are emerging in Nigeria, Kenya, South Africa, and Ghana. But one cycle costs $2,000–5,000 — dozens of times the average monthly wage — and health insurance coverage is almost nonexistent.

## Why Agaya Cares About This

Agaya supports Swahili — spoken by over 100 million people in East Africa. Helping people get basic information and know the right questions to ask before seeing a specialist — that's the starting point for change.

---
*For educational purposes only.*`
    },
    {
      id: 5, tag: 'Hormonal Health',
      title: 'Thyroid and Pregnancy: The Often-Missed Link in Recurrent Miscarriage',
      excerpt: 'Subclinical hypothyroidism is treatable but often goes undetected. What you should ask your doctor.',
      date: 'March 25, 2026', readTime: '5 min read',
      content: `## The Link Between Recurrent Miscarriage and the Thyroid

If you have experienced two or more miscarriages, thyroid function must be checked. **Subclinical Hypothyroidism** — elevated TSH with normal T4 — often passes as "normal" in routine checkups, but the standards differ for those trying to conceive. A TSH below 2.5 mIU/L is generally recommended for women preparing for pregnancy.

## Treatment

Levothyroxine treatment is safe and effective. Ask your doctor for TSH, Free T4, and thyroid antibody (TPOAb) tests.

---
*If you have experienced recurrent miscarriage, please consult a specialist.*`
    },
  ],
  ko: [
    {
      id: 7, tag: '임신 준비',
      title: '배란 타이밍만큼 중요한 것 — 정자 수',
      excerpt: '임신을 준비하는 부부들이 자주 놓치는 실용적인 팁: 타이밍을 완벽하게 맞춰도 정자가 이미 고갈된 상태라면 실패할 수 있습니다.',
      date: '2026년 4월 21일', readTime: '4분 읽기',
      content: `## 문제는 타이밍이 아니라 정자 고갈입니다

임신을 준비하는 분들은 대부분 배란 시기에 맞춰 관계를 가져야 한다는 걸 알고 계십니다. 그런데 타이밍을 아무리 잘 맞춰도 실패하는 경우가 있습니다. 제가 진료 현장에서 자주 목격하는 흔한 실수 때문입니다.

배란일 전에 이미 여러 번 관계를 가진 부부가 내원합니다. 제가 배란을 확인해주면 그날 또 시도하는데, 막상 그 시점에는 정자가 이미 많이 소진된 상태인 경우가 적지 않습니다.

## 정자는 얼마나 오래 살까요?

정자는 이상적인 조건에서 최대 7일까지 생존할 수 있지만, 현실적으로는 대부분 **약 3일** 정도 생존합니다. 꼭 배란 당일에 맞출 필요는 없고, 며칠 전부터 관계를 가져도 충분합니다.

가임기 창은 여유가 있습니다. 하지만 정자 공급은 그렇지 않습니다.

## 제가 권하는 방법

가임기 동안에는 **이틀에 한 번**, 즉 최소 **48시간 간격**으로 관계를 갖는 것을 권장합니다. 이 간격만 지켜도 정자 수와 운동성이 의미 있게 회복됩니다. 너무 오래 참는 것도 정자 질을 떨어뜨리니 균형이 중요합니다.

이틀에 한 번이 가임기를 충분히 커버하면서 *정자 공급도 유지*하는 최선의 방법입니다.

## Agaya로 미리 준비하세요

이틀에 한 번 일정을 미리 잡으려면 가임기가 언제인지 알아야 합니다. **Agaya**에 생리 날짜를 입력하면 최대 6개월치 배란 예정일을 예측해드립니다. 주기가 시작되기 전에 미리 달력에 표시해두고 차분하게 준비해보세요.

**agaya.net**에서 생리 날짜를 기록하고 배란 예정일을 확인해보세요.

---
*본 게시물은 일반적인 정보 제공을 목적으로 합니다. 개인별 맞춤 상담은 산부인과 전문의와 함께 하시기 바랍니다.*`
    },
    {
      id: 1, tag: 'PCOS',
      title: 'PCOS와 인슐린: 혈당 관리가 임신에 미치는 영향',
      excerpt: 'PCOS 여성의 약 70%에서 인슐린 저항성이 발견됩니다. 이 연관성을 이해하면 치료 접근법이 달라질 수 있습니다.',
      date: '2026년 4월 8일', readTime: '5분 읽기',
      content: `## PCOS와 인슐린 저항성이란?

다낭성난소증후군(PCOS)은 가임기 여성의 약 10%에서 발생하는 가장 흔한 내분비 질환입니다. 핵심에는 종종 인슐린 저항성이 있습니다. 세포가 인슐린 신호에 제대로 반응하지 못하면 몸은 더 많은 인슐린을 분비하고, 이 과잉 인슐린이 난소를 자극해 안드로겐(남성호르몬)을 과다 분비시킵니다. 이것이 불규칙한 배란, 여드름, 다모증, 난임으로 이어지는 연쇄 반응입니다.

## 혈당 관리가 임신에 왜 중요한가요?

PCOS 여성의 약 70%에서 인슐린 저항성이 나타납니다. 혈당을 안정시키면 인슐린 수치가 낮아지고, 이를 통해 규칙적인 배란 주기를 회복하고 안드로겐 수치를 줄이며 임신 성공률을 높일 수 있습니다.

## 생활 습관으로 할 수 있는 것

정제 탄수화물(흰쌀, 흰빵, 설탕)을 줄이고 단백질과 식이섬유를 늘리면 인슐린 감수성이 개선됩니다. 주 3~4회 30분 이상 유산소 운동은 강력한 근거를 가지고 있습니다. 메트포르민은 인슐린 저항성을 직접 개선하는 약물로 PCOS 치료에 널리 사용됩니다.

## 의사에게 물어볼 것들

공복 혈당, 인슐린, HOMA-IR 검사를 요청해보세요. 메트포르민이 본인에게 적합한지 상담해보시기 바랍니다.

---
*본 게시물은 교육 목적이며 개인 의료 조언을 대체하지 않습니다.*`
    },
    {
      id: 6, tag: 'AI & 의학',
      title: 'Claude로 시작해서 Gemma 4로 확장하다 — Agaya 이야기',
      excerpt: '한국의 산부인과 의사가 AI 앱을 만들면서 배운 것. 그리고 아프리카 여성들을 위해 Gemma 4를 선택한 이유.',
      date: '2026년 4월 19일', readTime: '6분 읽기',
      content: `## 왜 의사가 코딩을 배웠나요?

진료실에서 하루에도 수십 번 같은 질문을 듣습니다. "배란일이 언제예요?" "AMH가 낮으면 임신이 안 되나요?" 진료 시간은 짧고, 환자의 불안은 집까지 따라갑니다. 밤 11시에는 물어볼 곳이 없습니다. 그래서 직접 만들기로 했습니다.

## Claude로 시작한 이유

Agaya의 첫 번째 버전은 Anthropic의 Claude API를 기반으로 만들어졌습니다. Claude는 의료 맥락을 잘 이해하고, 다국어 응답이 뛰어나며, 무엇보다 일관되게 안전하고 따뜻한 답변을 제공합니다.

## Gemma 4로 확장하는 이유

계속 마음에 걸리는 것이 있었습니다. 이 앱이 정말 가장 필요한 사람들, 동아프리카 여성들, 의료 소외 지역에 닿고 있는가? Gemma 4는 오픈 모델입니다. 인터넷이 불안정하거나 비용이 장벽인 곳에서도 작동할 수 있습니다. Claude가 Agaya의 현재라면, Gemma 4는 Agaya가 나아가야 할 미래를 위한 실험입니다.

## 앞으로의 계획

Agaya는 현재 한국어, 영어, 스와힐리어를 지원합니다. 목표는 인터넷이 불안정한 지역에서도 기본적인 임신·생식 건강 정보에 접근할 수 있는 오프라인 친화적 버전을 만드는 것입니다. 아는 것이 치유의 첫 걸음입니다. 그 정보가 창원 사람들에게만 속해서는 안 됩니다.

---
*이 글은 Agaya 제작자(산부인과 및 불임 전문의)가 직접 작성한 개발 이야기입니다.*`
    },
    {
      id: 2, tag: 'Agaya 이야기',
      title: '"34살에 자궁내막증을 알게 됐어요" — 라고스에서 온 아마라의 이야기',
      excerpt: '늦은 진단, 그것이 가져온 감정적 무게, 그리고 정보가 모든 것을 바꾼 방식.',
      date: '2026년 4월 5일', readTime: '7분 읽기',
      content: `## 10년 동안 "그냥 생리통이에요"라는 말을 들었습니다

아마라(가명)는 나이지리아 라고스에 사는 34세 여성입니다. 고등학교 때부터 매달 심한 통증이 있었지만 항상 "모든 여성이 겪는 일"이라는 말만 들었습니다. 결혼 후 2년이 지나도 임신이 되지 않아 처음으로 불임 전문의를 찾았고, 복강경 검사 결과 3기 자궁내막증이었습니다.

## 왜 자궁내막증은 늦게 진단될까요?

자궁내막증은 진단까지 평균 7~10년이 걸립니다. 생리통, 골반 통증, 성교통 같은 증상이 "정상 생리 증상"으로 무시되기 일쑤입니다. 확진을 위해 복강경 수술이 필요하다는 점도 장벽이 됩니다.

## 정보가 모든 것을 바꿨습니다

진단 후 아마라는 Agaya를 통해 자신의 증상이 비정상이 아니었다는 것, 치료 옵션이 있다는 것, 임신이 가능하다는 것을 알게 됐습니다. "10년 전에 이걸 알았다면" — 그 말이 계속 마음에 남습니다. 그래서 Agaya가 존재합니다.

---
*실제 경험을 바탕으로 재구성된 이야기입니다. 이름과 일부 세부 사항은 개인정보 보호를 위해 변경되었습니다.*`
    },
    {
      id: 3, tag: '임신',
      title: '입덧: 생강차를 넘어선 근거 기반 완화법',
      excerpt: '무작위 대조 시험이 실제로 말하는 것 — 그리고 언제 병원에 가야 하는가.',
      date: '2026년 4월 2일', readTime: '4분 읽기',
      content: `## 입덧은 왜 생기나요?

임신부의 약 70~80%가 임신 초기에 메스꺼움과 구토를 경험합니다. 상승하는 hCG 호르몬, 증가하는 에스트로겐, 예민해진 후각이 모두 관여하며 대부분 12~14주 무렵 완화됩니다.

## 근거 있는 방법들

생강(250mg 캡슐, 하루 4회)은 메스꺼움 완화에 실제 연구 근거가 있습니다. 비타민 B6(피리독신, 하루 10~25mg)는 여러 무작위 대조 시험에서 효과가 입증됐습니다. 공복을 피하고, 소량씩 자주 먹으며, 기름진 음식과 강한 냄새를 피하는 것도 도움이 됩니다.

## 언제 병원에 가야 하나요?

하루 3~4회 이상 구토하거나, 24시간 동안 아무것도 먹거나 마실 수 없거나, 소변이 매우 진하고 양이 줄었다면 즉시 병원을 방문하세요. **임신오조증(Hyperemesis Gravidarum)**의 징후일 수 있습니다.

---
*증상이 심하면 산부인과 전문의와 상담하세요.*`
    },
    {
      id: 4, tag: 'IVF & 보조생식술',
      title: '사하라 이남 아프리카의 IVF: 접근성, 비용, 그리고 변화',
      excerpt: '보조생식술이 대륙 전역으로 확산되고 있습니다. 누가 혜택을 받고, 누가 여전히 소외되어 있는가.',
      date: '2026년 3월 29일', readTime: '9분 읽기',
      content: `## 아프리카의 불임: 과소평가된 위기

사하라 이남 아프리카에서 불임은 개인적인 문제를 넘어 사회적 낙인을 동반합니다. 많은 문화권에서 아이를 낳지 못하는 여성은 이혼, 가정 폭력, 사회적 배제의 위험에 처합니다. 하지만 IVF와 보조생식술에 대한 접근성은 여전히 극히 제한적입니다.

## 현재 상황

나이지리아, 케냐, 남아프리카, 가나 등지에서 IVF 클리닉이 생겨나고 있습니다. 하지만 한 주기 비용이 200~500만 원으로, 평균 월 소득의 수십 배에 달하며 의료보험 적용은 거의 없습니다.

## Agaya가 이것에 관심을 갖는 이유

Agaya가 스와힐리어를 지원하는 것은 단순한 언어 추가가 아닙니다. 동아프리카에서 1억 명 이상이 사용하는 언어로 생식 건강 정보를 제공하는 것입니다. 기본 정보를 얻고 전문의를 찾아가기 전에 올바른 질문을 알 수 있도록 돕는 것 — 그것이 시작점입니다.

---
*교육 목적의 게시물입니다.*`
    },
    {
      id: 5, tag: '호르몬 건강',
      title: '갑상선과 임신: 반복 유산에서 자주 놓치는 연결고리',
      excerpt: '무증상 갑상선기능저하증은 치료 가능하지만 자주 발견되지 않습니다. 의사에게 물어봐야 할 것들.',
      date: '2026년 3월 25일', readTime: '5분 읽기',
      content: `## 반복 유산과 갑상선의 연관성

두 번 이상 유산을 경험했다면 갑상선 기능 검사가 반드시 포함되어야 합니다. **무증상 갑상선기능저하증**은 증상이 없거나 미미해서 놓치기 쉽지만, 반복 유산과 불임의 원인이 될 수 있습니다. 임신을 준비하는 여성에게는 TSH 2.5 mIU/L 미만이 권장됩니다.

## 치료

레보티록신 치료는 안전하고 효과적입니다. TSH, Free T4, 갑상선 항체(TPOAb) 검사를 요청해보세요.

---
*반복 유산을 경험했다면 전문의와 상담하시기 바랍니다.*`
    },
  ],
};

const TAG_COLORS = {
  'Fertility Tips': '#1D9E75',
  '임신 준비': '#1D9E75',
  'PCOS': '#C4704A',
  'Agaya Stories': '#7B5EA7',
  'Agaya 이야기': '#7B5EA7',
  'Pregnancy': '#4A6741',
  '임신': '#4A6741',
  'IVF & ART': '#2A1F14',
  'IVF & 보조생식술': '#2A1F14',
  'Hormonal Health': '#D4963A',
  '호르몬 건강': '#D4963A',
  'AI & Medicine': '#1D9E75',
  'AI & 의학': '#1D9E75',
};

const UI = {
  en: {
    logo: 'Agaya',
    back: '← Back to Assistant',
    eyebrow: '// Agaya Journal',
    heroTitle: ['Knowing is', 'the first step to healing.'],
    heroSub: 'Evidence-based articles on fertility, reproductive health, and AI in medicine — for every woman, everywhere.',
    collabText: 'Written by a Fertility Specialist + AI. Every article is a collaboration between an OB/GYN & fertility specialist and AI writing. For educational purposes only.',
    aiLabel: '✦ Agaya AI Writing',
    aiTitle: 'Generate a New Article',
    aiSub: 'Enter a topic in any language — English, 한국어, Swahili… Agaya will write the full article.',
    aiPlaceholder: 'e.g. How stress affects egg quality / PCOS and diet…',
    aiHint: '✦ Language is automatically detected from your input',
    generateBtn: '✦  Generate Article',
    generating: '⏳  Generating…',
    aiGenLabel: '✦ AI Generated · Reviewed by Fertility Specialist',
    closeBtn: '✕ Close',
    latestArticles: 'Latest Articles',
    allTag: 'All',
    readMore: 'Read →',
    collapse: '▲ Collapse',
    collapseBtn: '✕ Collapse',
    footerSub: '// Fertility information for every woman',
    footerNote: '© 2026 Agaya · Does not replace medical advice ·',
    tags: ['All', 'Fertility Tips', 'PCOS', 'Pregnancy', 'IVF & ART', 'Hormonal Health', 'Agaya Stories', 'AI & Medicine'],
  },
  ko: {
    logo: 'Agaya',
    back: '← AI 어시스턴트로 돌아가기',
    eyebrow: '// Agaya 저널',
    heroTitle: ['아는 것이', '치유의 첫 걸음입니다.'],
    heroSub: '임신, 생식 건강, 의학 AI에 관한 근거 기반 아티클 — 모든 여성을 위해, 어디서나.',
    collabText: '불임 전문의 + AI의 협업으로 작성됩니다. 모든 아티클은 산부인과·불임 전문의의 의학적 관점과 AI 작성의 협업입니다. 교육 목적으로만 제공됩니다.',
    aiLabel: '✦ Agaya AI 글쓰기',
    aiTitle: '새 아티클 생성하기',
    aiSub: '어떤 언어로든 주제를 입력하세요 — 한국어, English, Swahili… Agaya가 전체 아티클을 작성합니다.',
    aiPlaceholder: '예: 스트레스가 난자 질에 미치는 영향 / PCOS와 식단…',
    aiHint: '✦ 입력한 언어를 자동으로 감지합니다',
    generateBtn: '✦  아티클 생성',
    generating: '⏳  생성 중…',
    aiGenLabel: '✦ AI 생성 · 불임 전문의 검토',
    closeBtn: '✕ 닫기',
    latestArticles: '최신 아티클',
    allTag: '전체',
    readMore: '읽기 →',
    collapse: '▲ 접기',
    collapseBtn: '✕ 접기',
    footerSub: '// 모든 여성을 위한 임신 정보',
    footerNote: '© 2026 Agaya · 의료 조언을 대체하지 않습니다 ·',
    tags: ['전체', '임신 준비', 'PCOS', '임신', 'IVF & 보조생식술', '호르몬 건강', 'Agaya 이야기', 'AI & 의학'],
  },
};

export default function Blog() {
  const [lang, setLang] = useState('en');
  const [topic, setTopic] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState(null);
  const [langHint, setLangHint] = useState('');
  const [activeTag, setActiveTag] = useState('all');
  const [openPostId, setOpenPostId] = useState(null);

  const t = UI[lang];
  const posts = POSTS[lang];

  const filteredPosts = activeTag === 'all'
    ? posts
    : posts.filter(p => p.tag === activeTag);

  function detectLang(text) {
    if (/[\uAC00-\uD7AF]/.test(text)) return '한국어로 생성됩니다';
    if (/[\u0E00-\u0E7F]/.test(text)) return 'จะสร้างเป็นภาษาไทย';
    return 'Will be generated in the detected language';
  }

  function switchLang(newLang) {
    setLang(newLang);
    setActiveTag('all');
    setOpenPostId(null);
    setGeneratedPost(null);
  }

  async function generateArticle() {
    if (!topic.trim()) return;
    setGenerating(true);
    setGeneratedPost(null);
    const system = `You are Agaya's medical blog writer — an OB/GYN and fertility specialist writing together with AI.
Write authoritative, warm blog articles about women's health and fertility.
Rules:
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
      setGeneratedPost({ title: topic, category: 'Error', readTime: '', content: lang === 'ko' ? '오류가 발생했습니다. 다시 시도해주세요.' : 'An error occurred. Please try again.' });
    }
    setGenerating(false);
    setTopic('');
  }

  function renderContent(text) {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 400, color: '#2A1F14', margin: '24px 0 10px' }}>{line.slice(3)}</h2>;
      if (line.trim() === '---') return <hr key={i} style={{ border: 'none', borderTop: '1px solid #E8D9C0', margin: '20px 0' }} />;
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} style={{ marginBottom: 10 }} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>') }} />;
    });
  }

  const S = {
    page: { maxWidth: 860, margin: '0 auto', padding: '0 20px 60px', fontFamily: 'Georgia, serif', background: '#FAF6F0', minHeight: '100vh' },
    nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 0', borderBottom: '1px solid #E8D9C0', marginBottom: 40 },
    navLeft: { display: 'flex', alignItems: 'center', gap: 20 },
    navLogo: { fontSize: 22, fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2A1F14', textDecoration: 'none', fontFamily: 'Georgia, serif' },
    langToggle: { display: 'flex', border: '1px solid #E8D9C0', borderRadius: 4, overflow: 'hidden' },
    langBtn: (active) => ({ padding: '4px 12px', fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.08em', border: 'none', cursor: 'pointer', background: active ? '#2A1F14' : 'transparent', color: active ? '#FAF6F0' : '#9E8E82', transition: 'all 0.15s' }),
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
        <div style={S.navLeft}>
          <a href="/" style={S.navLogo}>{t.logo}</a>
          <div style={S.langToggle}>
            <button style={S.langBtn(lang === 'en')} onClick={() => switchLang('en')}>EN</button>
            <button style={S.langBtn(lang === 'ko')} onClick={() => switchLang('ko')}>한국어</button>
          </div>
        </div>
        <a href="/" style={S.navBack}>{t.back}</a>
      </nav>

      <div style={{ marginBottom: 48 }}>
        <p style={S.eyebrow}>{t.eyebrow}</p>
        <h1 style={S.heroTitle}>
          {t.heroTitle[0]}<br />
          <em style={S.heroTitleEm}>{t.heroTitle[1]}</em>
        </h1>
        <p style={S.heroSub}>{t.heroSub}</p>
      </div>

      <div style={S.collab}>
        <div style={S.collabDot} />
        <p style={S.collabText}>{t.collabText}</p>
      </div>

      <div style={S.sectionHead}>
        <h2 style={S.sectionLabel}>{t.latestArticles}</h2>
      </div>

      <div style={S.tagStrip}>
        {t.tags.map(tag => {
          const val = tag === t.allTag ? 'all' : tag;
          return (
            <button key={tag} style={S.tag(activeTag === val)} onClick={() => setActiveTag(val)}>{tag}</button>
          );
        })}
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
                  <span style={{ color: '#C4704A' }}>{isOpen ? t.collapse : t.readMore}</span>
                </div>
              </div>
            </div>
            {isOpen && (
              <div style={S.articleBody}>
                <div style={S.articleContent}>{renderContent(post.content)}</div>
              <a href={`/?topic=${encodeURIComponent(post.title)}`}
  style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    margin: '20px 0 8px', padding: '14px 18px',
    background: '#E1F5EE', borderRadius: 8,
    border: '1px solid #5DCAA5', textDecoration: 'none'
  }}>
  <span style={{ fontFamily: 'system-ui', fontSize: 13, color: '#085041' }}>
    💬 {lang === 'ko' ? '이 주제가 더 궁금하신가요?' : 'Want to know more about this topic?'}
  </span>
  <span style={{ fontFamily: 'system-ui', fontSize: 13, fontWeight: 600, color: '#1D9E75' }}>
    {lang === 'ko' ? 'Agaya에게 물어보기 →' : 'Ask Agaya →'}
  </span>
</a>
                <button style={S.closeBtn} onClick={() => setOpenPostId(null)}>{t.collapseBtn}</button>
              </div>
            )}
          </div>
        );
      })}

      <div style={S.footer}>
        <p style={S.footerLogo}>{t.logo}</p>
        <p style={S.footerSub}>{t.footerSub}</p>
        <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: 11, color: '#9E8E82', marginTop: 10 }}>
          {t.footerNote} <a href="https://agaya.net" style={{ color: '#1D9E75', textDecoration: 'none' }}>agaya.net</a>
        </p>
      </div>
    </div>
  );
}
