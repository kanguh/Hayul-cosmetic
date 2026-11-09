export type Shape = "dropper" | "bottle" | "jar" | "tube" | "pump";
export type Category = "cleanse" | "tone" | "treat" | "moisture" | "special";

export type Product = {
  slug: string;
  name: string;
  nameKo: string;
  category: Category;
  shape: Shape;
  price: number;
  volume: string;
  tagline: string;
  description: string;
  texture: string;
  ingredients: string[]; // ingredients.ts 의 id
  howTo: string;
  palette: { bg: string; body: string; cap: string; liquid: string; label: string };
};

export const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "cleanse", label: "클렌징" },
  { id: "tone", label: "토너" },
  { id: "treat", label: "세럼 · 오일" },
  { id: "moisture", label: "크림" },
  { id: "special", label: "스페셜 케어" },
];

export const products: Product[] = [
  {
    slug: "dew-veil-serum",
    name: "Dew Veil Serum",
    nameKo: "듀 베일 세럼",
    category: "treat",
    shape: "dropper",
    price: 48000,
    volume: "30ml",
    tagline: "새벽 이슬처럼 얇게 스미는 수분 베일",
    description:
      "자작나무 수액을 물 대신 70% 담아, 바르는 순간 피부 위에 얇은 수분막을 씌웁니다. 끈적임 없이 흡수되어 메이크업 전에도 부담 없이 사용할 수 있습니다.",
    texture: "물처럼 가볍게 퍼지는 워터 세럼",
    ingredients: ["birch", "centella"],
    howTo: "토너 후 2–3방울을 손바닥에 덜어 얼굴 전체에 가볍게 눌러 흡수시킵니다.",
    palette: { bg: "#EFD9CF", body: "#F7E9E2", cap: "#B9785A", liquid: "#E9C1B0", label: "#FFFFFF" },
  },
  {
    slug: "mugwort-calm-toner",
    name: "Mugwort Calm Toner",
    nameKo: "쑥 카밍 토너",
    category: "tone",
    shape: "bottle",
    price: 32000,
    volume: "200ml",
    tagline: "붉어진 피부를 차분하게 가라앉히는 첫 단계",
    description:
      "강화도 해풍을 맞고 자란 쑥을 저온 숙성해 담았습니다. 세안 직후 예민해진 피부 결을 정돈하고 다음 단계의 흡수를 돕습니다.",
    texture: "산뜻한 묽은 제형",
    ingredients: ["mugwort", "centella"],
    howTo: "세안 후 화장솜이나 손에 덜어 피부 결을 따라 부드럽게 닦아내거나 두드려 흡수시킵니다.",
    palette: { bg: "#DCE1D3", body: "#C9D2BC", cap: "#4F5A3F", liquid: "#A9B596", label: "#F4EEE6" },
  },
  {
    slug: "cloud-barrier-cream",
    name: "Cloud Barrier Cream",
    nameKo: "클라우드 배리어 크림",
    category: "moisture",
    shape: "jar",
    price: 52000,
    volume: "50ml",
    tagline: "구름처럼 폭신하게, 장벽은 단단하게",
    description:
      "세라마이드와 쌀 발효 추출물이 무너진 피부 장벽을 채워 줍니다. 휘핑한 듯 가벼운 텍스처지만 아침까지 촉촉함이 오래 지속됩니다.",
    texture: "휘핑 크림 같은 에어리 텍스처",
    ingredients: ["rice", "centella"],
    howTo: "스킨케어 마지막 단계에서 적당량을 덜어 얼굴 안쪽에서 바깥쪽으로 펴 바릅니다.",
    palette: { bg: "#EDE6DA", body: "#FBF8F2", cap: "#D8C7B0", liquid: "#F3EDE3", label: "#B9785A" },
  },
  {
    slug: "rice-milk-cleanser",
    name: "Rice Milk Cleanser",
    nameKo: "라이스 밀크 클렌저",
    category: "cleanse",
    shape: "tube",
    price: 28000,
    volume: "150ml",
    tagline: "쌀뜨물처럼 순하게 씻어내는 밀크 폼",
    description:
      "여주 쌀을 곱게 갈아 만든 쌀 추출물이 노폐물은 씻어내고 수분은 남깁니다. 세안 후 당김 없이 매끈한 피부를 느낄 수 있습니다.",
    texture: "쫀쫀한 미세 거품",
    ingredients: ["rice"],
    howTo: "물기 있는 손에 적당량을 덜어 거품을 낸 뒤 부드럽게 마사지하고 미온수로 헹굽니다.",
    palette: { bg: "#E8DCCD", body: "#F4EEE6", cap: "#C9B497", liquid: "#EFE6D8", label: "#6E5A48" },
  },
  {
    slug: "camellia-night-oil",
    name: "Camellia Night Oil",
    nameKo: "동백 나이트 오일",
    category: "treat",
    shape: "dropper",
    price: 58000,
    volume: "30ml",
    tagline: "잠든 사이 채워지는 윤기",
    description:
      "제주 동백 씨앗을 냉압착한 오일에 스쿠알란을 더했습니다. 밤사이 피부에 영양을 채워 아침에 건강한 윤기를 남깁니다.",
    texture: "가볍게 스며드는 드라이 오일",
    ingredients: ["camellia", "honey"],
    howTo: "저녁 마지막 단계에서 2–3방울을 손바닥에 데운 뒤 얼굴을 감싸듯 눌러 줍니다. 크림에 섞어 써도 좋습니다.",
    palette: { bg: "#E6C9B4", body: "#C98B5E", cap: "#3A2A22", liquid: "#B8693A", label: "#F4EEE6" },
  },
  {
    slug: "honey-glow-mask",
    name: "Honey Glow Mask",
    nameKo: "허니 글로우 마스크",
    category: "special",
    shape: "jar",
    price: 36000,
    volume: "75ml",
    tagline: "10분 만에 차오르는 꿀광",
    description:
      "지리산 야생화 꿀과 동백 오일을 담은 워시오프 마스크. 칙칙한 피부에 영양과 윤기를 채워 생기 있는 피부로 가꿉니다.",
    texture: "꿀처럼 쫀득한 젤 밤",
    ingredients: ["honey", "camellia"],
    howTo: "세안 후 얼굴에 도톰하게 펴 바르고 10분 뒤 미온수로 씻어냅니다. 주 2–3회 권장.",
    palette: { bg: "#F1DDB8", body: "#E8B964", cap: "#8A5A24", liquid: "#E2A447", label: "#3A2A22" },
  },
  {
    slug: "daily-sun-fluid",
    name: "Daily Sun Fluid",
    nameKo: "데일리 선 플루이드",
    category: "special",
    shape: "pump",
    price: 34000,
    volume: "50ml · SPF50+",
    tagline: "백탁 없이, 스킨케어처럼 가볍게",
    description:
      "녹차 추출물을 담은 플루이드 선케어. 바른 듯 안 바른 듯 가볍고 백탁이 없어 매일 덧바르기 좋습니다.",
    texture: "로션처럼 묽은 플루이드",
    ingredients: ["greentea", "birch"],
    howTo: "스킨케어 마지막 단계에서 적당량을 펴 바르고, 2–3시간마다 덧발라 줍니다.",
    palette: { bg: "#F4D9C6", body: "#F8E6D8", cap: "#E39A72", liquid: "#F2C3A6", label: "#B9785A" },
  },
  {
    slug: "green-tea-eye-balm",
    name: "Green Tea Eye Balm",
    nameKo: "녹차 아이 밤",
    category: "moisture",
    shape: "tube",
    price: 42000,
    volume: "20ml",
    tagline: "눈가에 머무는 초록의 휴식",
    description:
      "보성 첫물 녹차와 병풀 추출물이 얇고 예민한 눈가를 촉촉하게 감싸 줍니다. 단단한 밤 제형이 체온에 부드럽게 녹아듭니다.",
    texture: "체온에 녹는 밤",
    ingredients: ["greentea", "centella"],
    howTo: "약지에 소량을 덜어 눈가에 톡톡 두드려 흡수시킵니다.",
    palette: { bg: "#D7DFCC", body: "#8FA07A", cap: "#F4EEE6", liquid: "#B6C4A2", label: "#F4EEE6" },
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const won = (n: number) => `${n.toLocaleString("ko-KR")}원`;
