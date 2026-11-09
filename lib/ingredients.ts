export type Ingredient = {
  id: string;
  name: string;
  nameKo: string;
  origin: string;
  benefit: string;
  story: string;
  color: string;
  accent: string;
};

export const ingredients: Ingredient[] = [
  {
    id: "birch",
    name: "Birch Sap",
    nameKo: "자작나무 수액",
    origin: "강원 인제",
    benefit: "수분 공급 · 진정",
    story: "이른 봄, 단 몇 주 동안만 채취할 수 있는 자작나무 수액은 미네랄이 풍부해 물보다 빠르게 피부를 적십니다.",
    color: "#E9E4D8",
    accent: "#9AA38A",
  },
  {
    id: "mugwort",
    name: "Mugwort",
    nameKo: "쑥",
    origin: "인천 강화",
    benefit: "진정 · 피부 결 정돈",
    story: "바닷바람을 맞고 자란 강화 쑥을 3년간 숙성해, 예민해진 피부를 편안하게 다독이는 성분만 남겼습니다.",
    color: "#C9D2BC",
    accent: "#4F5A3F",
  },
  {
    id: "camellia",
    name: "Camellia",
    nameKo: "동백",
    origin: "제주 서귀포",
    benefit: "영양 · 윤기",
    story: "겨울에 피는 제주 동백의 씨앗을 냉압착해, 피부 유분과 닮은 가벼운 오일을 얻습니다.",
    color: "#E6B9A6",
    accent: "#9C3B2E",
  },
  {
    id: "rice",
    name: "Rice",
    nameKo: "쌀",
    origin: "경기 여주",
    benefit: "보습 · 맑은 피부 톤",
    story: "예부터 세안에 쓰던 쌀뜨물에서 착안해, 여주 쌀을 발효시켜 피부 장벽을 채우는 성분을 추출했습니다.",
    color: "#F1EADF",
    accent: "#B49E7E",
  },
  {
    id: "greentea",
    name: "Green Tea",
    nameKo: "녹차",
    origin: "전남 보성",
    benefit: "항산화 · 피지 밸런스",
    story: "봄에 가장 먼저 딴 첫물 녹차 잎만 골라, 외부 자극으로부터 피부를 지키는 카테킨을 담았습니다.",
    color: "#CFDBBF",
    accent: "#5D7A3E",
  },
  {
    id: "honey",
    name: "Wildflower Honey",
    nameKo: "야생화 꿀",
    origin: "경남 지리산",
    benefit: "영양 · 생기",
    story: "지리산 자락 야생화에서 모은 꿀은 피부에 수분을 끌어당기고, 칙칙한 피부에 생기를 더합니다.",
    color: "#F1DDB8",
    accent: "#B07A2A",
  },
  {
    id: "centella",
    name: "Centella",
    nameKo: "병풀",
    origin: "전남 해남",
    benefit: "장벽 강화 · 재생",
    story: "해남의 따뜻한 땅에서 키운 병풀은 손상된 피부가 스스로 회복하는 힘을 돕습니다.",
    color: "#D9E2CE",
    accent: "#6E7A5A",
  },
];

export const getIngredient = (id: string) => ingredients.find((i) => i.id === id);
