
import { Product, Category, BlogPost, Review, Variant } from './types';

export const COLORS = {
  primary: '#764F35', // Warm Wood Brown (主色调)
  auxiliary: '#E9D6BE', // Sandstone Beige (辅助色)
  background: '#FAF7F2', // Light Off-white Background
  textDark: '#2D241E', // Dark Umber for text
};

export const ITEMS_PER_PAGE = 20;

const REQUESTED_PRODUCT_IMG = 'https://m.media-amazon.com/images/I/51a0UK8LfBL._AC_SX679_.jpg';
export const BANNER_URL = 'https://static.accupass.com/eventbanner/2509201427248631952770.jpg';

export const HERO_BANNERS = [
  {
    image: BANNER_URL,
    title: '承香名品：古法沉香',
    subtitle: '萃取自然之灵，传世百年之香'
  }
];

// Mock Data Generators
const MOCK_VARIANTS: Variant[] = [
  { id: 'v1', name: '10克体验装' },
  { id: 'v2', name: '50克礼盒装', price: 18800 }, // Assuming price override logic
  { id: 'v3', name: '100克尊享装', price: 36000 }
];

const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    userName: '张**',
    userAvatar: 'https://i.pravatar.cc/150?u=1',
    rating: 5,
    content: '味道非常正，初闻有淡淡的凉意，继而在喉底回甘。包装也很精美，送礼非常有面子。',
    date: '2024-01-15',
    images: [REQUESTED_PRODUCT_IMG, BANNER_URL]
  },
  {
    id: 'r2',
    userName: 'Li_Art',
    userAvatar: 'https://i.pravatar.cc/150?u=2',
    rating: 4.8,
    content: '油脂丰富，是正宗的沉水级。物流很快，顺丰第二天就到了。',
    date: '2023-12-28'
  },
  {
    id: 'r3',
    userName: '王总',
    userAvatar: 'https://i.pravatar.cc/150?u=3',
    rating: 5,
    content: '收藏级别的品质，已经多次回购了。',
    date: '2023-11-05'
  }
];

const MOCK_RICH_TEXT = `
  <div class="space-y-6 text-[#2D241E]">
    <p>此款沉香产自核心老产区，历经百年结香，油脂丰盈，纹理清晰自然。</p>
    <img src="${BANNER_URL}" alt="Detail 1" class="w-full rounded-lg shadow-sm" />
    <h3 class="text-xl font-serif font-bold text-[#764F35] mt-4">古法工艺 · 匠心传承</h3>
    <p>遵循古法“理香、洗香、炮制”工艺，全程手工操作，最大程度保留了沉香的天然韵味。不添加任何化学香精，安全更安心。</p>
    <img src="${REQUESTED_PRODUCT_IMG}" alt="Detail 2" class="w-full rounded-lg shadow-sm" />
    <h3 class="text-xl font-serif font-bold text-[#764F35] mt-4">鉴赏指南</h3>
    <p>生闻清雅，上炉后爆发力强。初香清凉甘甜，本香浓郁醇厚，尾香持久回甘，留香时间极长。</p>
  </div>
`;

const commonProductFields = {
  shortDescription: '采自顶级产区，经古法工艺炮制，香韵醇厚，层次丰富。无论是品香、礼佛还是收藏，皆为上选。',
  detailContent: MOCK_RICH_TEXT,
  variants: MOCK_VARIANTS,
  reviews: MOCK_REVIEWS
};

// --- DATA GENERATOR FOR EXTRA PRODUCTS ---
const generateExtraProducts = (categoryName: string, count: number, startId: number): Product[] => {
  const origins = ['印尼', '越南', '文莱', '柬埔寨', '马来西亚', '海南', '达拉干', '马泥涝'];
  const adjectives = ['顶级', '老料', '沉水', '入门', '珍藏', '古法', '野生', '特级', '百年', '极品'];
  
  // Map category names to typical product types/nouns
  const nounMap: Record<string, string[]> = {
    '沉香原材': ['原木', '板头', '虫漏', '壳子', '碎料', '老料'],
    '香道线香': ['线香', '盘香', '塔香', '倒流香', '卧香'],
    '随身佩戴': ['手串', '念珠', '提珠', '随形手链', '雕件吊坠'],
    '顶级奇楠': ['白奇楠', '绿奇楠', '紫奇楠', '黑奇楠', '黄奇楠'],
    '精选香器': ['纯铜香炉', '陶瓷香炉', '博山炉', '香插', '香篆套装', '品香杯'],
    '沉香原油': ['精油', '纯油', '原液', '提炼油']
  };

  const nouns = nounMap[categoryName] || ['沉香'];

  return Array.from({ length: count }).map((_, i) => {
    const origin = origins[Math.floor(Math.random() * origins.length)];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const priceBase = categoryName.includes('奇楠') ? 50000 : categoryName.includes('精选香器') || categoryName.includes('线香') ? 500 : 5000;
    
    return {
      id: `gen-${categoryName}-${startId + i}`,
      name: `${origin}${adj}${noun}【${categoryName.replace('沉香', '')}系列】`,
      brand: '承香自营',
      price: Math.floor(Math.random() * priceBase * 2) + priceBase,
      image: REQUESTED_PRODUCT_IMG,
      tag: categoryName, // Important: Include category name in tag for filter matching
      rating: Number((4.0 + Math.random()).toFixed(1)),
      origin: origin,
      ...commonProductFields,
      shortDescription: `[${categoryName}新品] 来自${origin}的${adj}${noun}，油脂丰富，香韵迷人。`
    };
  });
};

// Generate 30 products for each category
const extraRawMaterials = generateExtraProducts('沉香原材', 30, 1000);
const extraIncense = generateExtraProducts('香道线香', 30, 2000);
const extraWearables = generateExtraProducts('随身佩戴', 30, 3000);
const extraKynam = generateExtraProducts('顶级奇楠', 30, 4000);
const extraTools = generateExtraProducts('精选香器', 30, 5000);
const extraOil = generateExtraProducts('沉香原油', 30, 6000);

const allExtraProducts = [
  ...extraRawMaterials,
  ...extraIncense,
  ...extraWearables,
  ...extraKynam,
  ...extraTools,
  ...extraOil
];

// Shuffle helper
const shuffle = (array: Product[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const shuffledExtras = shuffle([...allExtraProducts]);

// Distribute extras evenly among the 3 main lists to ensure they appear
const chunkSize = Math.ceil(shuffledExtras.length / 3);
const extraForHot = shuffledExtras.slice(0, chunkSize);
const extraForBest = shuffledExtras.slice(chunkSize, chunkSize * 2);
const extraForNew = shuffledExtras.slice(chunkSize * 2);

const ORIGINAL_HOT_PRODUCTS: Product[] = [
  { id: '1', name: '极品达拉干沉香原材', brand: '承香秘藏', price: 18800, image: REQUESTED_PRODUCT_IMG, tag: '顶级收藏', rating: 5, origin: '印尼', ...commonProductFields },
  { id: '2', name: '芽庄白奇楠沉香手串', brand: '百年孤品', price: 98000, image: REQUESTED_PRODUCT_IMG, tag: '镇店之宝', rating: 5, origin: '越南', ...commonProductFields },
  { id: '3', name: '古法醇化芽庄线香', brand: '雅室系列', price: 1280, image: REQUESTED_PRODUCT_IMG, tag: '热销', rating: 4.9, origin: '越南', ...commonProductFields },
  { id: '4', name: '惠安老料沉香油', brand: '精油系列', price: 3500, image: REQUESTED_PRODUCT_IMG, rating: 4.8, origin: '越南', ...commonProductFields },
  { id: '5', name: '沉水级加里曼丹香块', brand: '承香秘藏', price: 8500, image: REQUESTED_PRODUCT_IMG, tag: '新品', rating: 4.9, origin: '印尼', ...commonProductFields },
  { id: '6', name: '祥云铜制熏香炉', brand: '香器美学', price: 2100, image: REQUESTED_PRODUCT_IMG, tag: '工艺精选', rating: 4.7, origin: '苏州', ...commonProductFields }
];

const ORIGINAL_BEST_SELLERS: Product[] = [
  { id: 's1', name: '印尼马泥涝沉香手串', brand: '至臻系列', price: 15800, image: REQUESTED_PRODUCT_IMG, tag: '口碑之选', rating: 4.9, origin: '印尼', ...commonProductFields },
  { id: 's2', name: '柬埔寨菩萨省红土沉香', brand: '产地精选', price: 12500, image: REQUESTED_PRODUCT_IMG, tag: '醇厚', rating: 4.8, origin: '柬埔寨', ...commonProductFields },
  { id: 's3', name: '天然印尼水沉香粉', brand: '篆香必备', price: 980, image: REQUESTED_PRODUCT_IMG, rating: 4.7, origin: '印尼', ...commonProductFields },
  { id: 's4', name: '富森红土沉香小盘香', brand: '宁神系列', price: 2880, image: REQUESTED_PRODUCT_IMG, tag: '爆款', rating: 5, origin: '越南', ...commonProductFields },
  { id: 's5', name: '文莱沉水级香插件', brand: '文房雅玩', price: 6800, image: REQUESTED_PRODUCT_IMG, rating: 4.9, origin: '文莱', ...commonProductFields }
];

const ORIGINAL_NEW_ARRIVALS: Product[] = [
  { id: 'n1', name: '入门级芽庄红土线香', brand: '初见系列', price: 499, image: REQUESTED_PRODUCT_IMG, tag: '超值', rating: 4.6, origin: '越南', ...commonProductFields },
  { id: 'n2', name: '西马沉香雕件：观音', brand: '工美大师', price: 15600, image: REQUESTED_PRODUCT_IMG, tag: '孤品', rating: 4.9, origin: '马来西亚', ...commonProductFields },
  { id: 'n3', name: '文莱老料随形手串', brand: '自然之韵', price: 7200, image: REQUESTED_PRODUCT_IMG, tag: '独家', rating: 4.8, origin: '文莱', ...commonProductFields },
  { id: 'n4', name: '承香堂定制电子香炉', brand: '科技香道', price: 1580, image: REQUESTED_PRODUCT_IMG, tag: '现代', rating: 4.7, origin: '中国', ...commonProductFields },
  { id: 'n5', name: '顶级苏门答腊香粉', brand: '香篆专用', price: 880, image: REQUESTED_PRODUCT_IMG, tag: '纯净', rating: 4.8, origin: '印尼', ...commonProductFields },
  { id: 'n6', name: '承香阁便携式香插', brand: '随身系列', price: 320, image: REQUESTED_PRODUCT_IMG, tag: '极简', rating: 4.5, origin: '景德镇', ...commonProductFields }
];

export const HOT_PRODUCTS: Product[] = [...ORIGINAL_HOT_PRODUCTS, ...extraForHot];
export const BEST_SELLERS: Product[] = [...ORIGINAL_BEST_SELLERS, ...extraForBest];
export const NEW_ARRIVALS: Product[] = [...ORIGINAL_NEW_ARRIVALS, ...extraForNew];

export const CATEGORIES: Category[] = [
  { id: 'c1', name: '沉香原材', image: BANNER_URL, description: '山野灵气，不事雕琢。' },
  { id: 'c2', name: '香道线香', image: BANNER_URL, description: '静心凝神，香伴左右。' },
  { id: 'c3', name: '随身佩戴', image: BANNER_URL, description: '千年修得，腕间乾坤。' },
  { id: 'c4', name: '顶级奇楠', image: BANNER_URL, description: '香中之王，绝迹收藏。' },
  { id: 'c5', name: '精选香器', image: BANNER_URL, description: '美学载体，香道礼器。' },
  { id: 'c6', name: '沉香原油', image: BANNER_URL, description: '一滴千金，至臻萃取。' }
];

const MOCK_BLOG_ARTICLE = `
    <div class="space-y-8 text-[#2D241E] leading-relaxed">
        <p class="first-letter:text-5xl first-letter:font-serif first-letter:text-[#764F35] first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]">沉</p>
        <p>沉香，自古以来便被誉为“众香之首”，其香气高雅、深沉，具有安神定气、调和身心的功效。它不仅是一种珍贵的香料，更是中华传统文化中不可或缺的一部分。</p>
        
        <h3 class="text-2xl font-serif font-bold text-[#764F35] mt-8 mb-4">鉴别真伪的关键</h3>
        <p>在市场上，沉香的品质良莠不齐，学会鉴别真伪至关重要。首先看其<strong>纹理</strong>，天然沉香的油脂线自然、清晰，无规律可循；其次闻其<strong>香气</strong>，真沉香生闻味道清淡，上炉后香气层次丰富，持久而不刺鼻。</p>
        
        <div class="my-8">
            <img src="${BANNER_URL}" alt="Article Image 1" class="w-full rounded-lg shadow-md mb-2" />
            <p class="text-center text-xs text-stone-500 italic">图：顶级芽庄白棋楠切片</p>
        </div>

        <h3 class="text-2xl font-serif font-bold text-[#764F35] mt-8 mb-4">沉香的产区分布</h3>
        <p>沉香主要分布在东南亚地区，其中越南惠安系和印尼星洲系最为著名。惠安系沉香以甜凉为主，香气清雅；星洲系沉香则味浓醇厚，穿透力强。不同的产区，孕育了沉香截然不同的性格。</p>
        
        <blockquote class="border-l-4 border-[#764F35] pl-6 italic text-[#764F35]/80 my-8 py-2 bg-[#F9F6F2]">
            "燎沉香，消溽暑。鸟雀呼晴，侵晓窥檐语。" —— 李清照
        </blockquote>

        <h3 class="text-2xl font-serif font-bold text-[#764F35] mt-8 mb-4">结语</h3>
        <p>品香，实则是品味人生。在喧嚣的尘世中，点一支沉香，看着轻烟袅袅升起，内心也会随之变得宁静。希望每一位香友，都能在沉香的世界里，找到属于自己的那份安宁。</p>
    </div>
`;

// ACADEMY COURSES (Used in 'Academy' tab)
export const BLOGS: BlogPost[] = [
  { 
    id: 'course1', 
    title: '如何鉴别野生沉香与人工香', 
    excerpt: '从油脂分布、香味层次到燃烧表现，教你一眼识破沉香真伪。', 
    date: '2024-12-20', 
    image: BANNER_URL, 
    category: '知识课程', 
    content: MOCK_BLOG_ARTICLE,
    lecturer: '沉香雅士',
    courseTime: '2024年7月20日 (周六) 14:00-16:00',
    location: '上海·承香名品·静安体验店',
    contactPhone: '021-66668888',
    contactEmail: 'course@chengxiang.com',
    relatedProductId: '1', 
    tips: ['课程包含实物鉴赏环节', '提供专业放大镜与品香炉', '谢绝空降，请提前报名']
  },
  { 
    id: 'course2', 
    title: '沉香：贯穿千年的香道文化', 
    excerpt: '从隋唐皇室到当代雅士，沉香如何成为中国文化的精神象征。', 
    date: '2024-12-15', 
    image: BANNER_URL, 
    category: '文化讲座', 
    content: MOCK_BLOG_ARTICLE,
    lecturer: '国学大师·王教授',
    courseTime: '2024年8月05日 (周日) 13:30-15:30',
    location: '北京·承香堂·国子监院',
    contactPhone: '010-88886666',
    contactEmail: 'culture@chengxiang.com',
    relatedProductId: '2', 
    tips: ['请着中式服装出席', '课程含茶道体验', '名额有限']
  },
  { 
    id: 'course3', 
    title: '香篆的使用礼仪与技巧', 
    excerpt: '一平、一扫、一压，在寂静的时光里寻找内心的平和。', 
    date: '2024-12-05', 
    image: BANNER_URL, 
    category: '实操课程', 
    content: MOCK_BLOG_ARTICLE,
    lecturer: '静心雅士',
    courseTime: '2024年6月15日 - 6月17日 (周末)',
    location: '杭州·承香名品·西湖分院',
    contactPhone: '0571-88889999',
    contactEmail: 'academy@chengxiang.com',
    relatedProductId: 's3',
    tips: ['请着宽松素雅服装', '课前一小时请勿食用辛辣', '课前请勿喷洒浓烈香水']
  },
  { 
    id: 'course4', 
    title: '全球顶级产区：越南芽庄深度游', 
    excerpt: '探秘奇楠之乡，感受世界最顶级的香道原产地魅力。', 
    date: '2024-11-28', 
    image: BANNER_URL, 
    category: '游学活动', 
    content: MOCK_BLOG_ARTICLE,
    lecturer: '资深藏家·李先生',
    courseTime: '2024年10月1日 - 10月7日',
    location: '越南·芽庄 (集合地: 广州白云机场)',
    contactPhone: '400-888-6666',
    contactEmail: 'travel@chengxiang.com',
    relatedProductId: 's2',
    tips: ['需持有效护照', '费用包含机票食宿', '名额仅限10人']
  }
];

// PLAIN ARTICLES (Used in 'Home' Agarwood Study section)
export const KNOWLEDGE_ARTICLES: BlogPost[] = [
  { id: 'a1', title: '入门指南：沉香的分类与等级', excerpt: '详解惠安系与星洲系的区别，以及沉水、半沉、浮水的等级划分标准。', date: '2024-03-10', image: BANNER_URL, category: '百科', content: MOCK_BLOG_ARTICLE },
  { id: 'a2', title: '香炉的保养与维护', excerpt: '铜炉、瓷炉、木炉的日常清洁与养护心得，让爱器常用常新。', date: '2024-03-05', image: BANNER_URL, category: '养护', content: MOCK_BLOG_ARTICLE },
  { id: 'a3', title: '沉香与睡眠：安神助眠的奥秘', excerpt: '科学解析沉香气味分子对神经系统的舒缓作用，打造高质量睡眠环境。', date: '2024-02-28', image: BANNER_URL, category: '养生', content: MOCK_BLOG_ARTICLE },
  { id: 'a4', title: '古代文人与香：苏东坡的沉香情缘', excerpt: '从诗词歌赋中探寻宋代文人的用香雅趣与精神寄托。', date: '2024-02-15', image: BANNER_URL, category: '历史', content: MOCK_BLOG_ARTICLE }
];
