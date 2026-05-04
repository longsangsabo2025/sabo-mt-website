// Site-wide content tokens — sync 1-1 với Design Brief v1.0
// Tách ra để dễ swap khi có copywriter chính thức

export const SITE = {
  name: 'SABO Media & Technology',
  shortName: 'SABO M&T',
  tagline: 'Build. Automate. Create.',
  taglineEn: 'Build. Automate. Create.',
  oneLiner: 'Custom AI Solutions Studio — xây dựng giải pháp công nghệ và sản xuất media tùy chỉnh bằng AI cho doanh nghiệp Việt Nam.',
  oneLinerEn: 'Custom AI Solutions Studio — building software and media solutions for Vietnamese businesses.',
  email: 'contact@sabo.com.vn',
  emailFounder: 'longsangsabo@gmail.com',
  phone: '0798893333',
  address: '342/9 Nguyễn An Ninh, P. Tam Thắng, TP. Hồ Chí Minh, Việt Nam',
  taxCode: '3502578142',
  founded: 2026,
  domains: ['sabo.com.vn'],
  social: { linkedin: '' }
};

export const PROBLEMS = [
  {
    label: 'Vận hành thủ công, không scale được',
    body: 'Quy trình lặp lại tiêu tốn nhân sự nhưng khó mở rộng khi quy mô tăng. Lỗi vận hành đến từ con người, không từ thiết kế hệ thống.',
    cta: 'Giải pháp',
    href: '/services/automate'
  },
  {
    label: 'Dữ liệu phân tán, ra quyết định chậm',
    body: 'Mỗi phòng ban một spreadsheet. Khi cần báo cáo lãnh đạo, mất ngày để ghép dữ liệu. Insight luôn đến muộn hơn quyết định.',
    cta: 'Giải pháp',
    href: '/services/build'
  },
  {
    label: 'Thiếu volume content, production chậm và đắt',
    body: 'Cần hình ảnh, video, content cho marketing và sản phẩm — nhưng team nhỏ, budget hạn chế. Production truyền thống không theo kịp tốc độ ship.',
    cta: 'Giải pháp',
    href: '/services/create'
  }
];

export type ServiceTier = {
  slug: 'build' | 'automate' | 'create';
  number: '01' | '02' | '03';
  eyebrow: string;
  title: string;
  description: string;
  subServices: string[];
  outcomes: string[];
  scenarios: { label: string; body: string }[];
};

export const SERVICES: ServiceTier[] = [
  {
    slug: 'build',
    number: '01',
    eyebrow: 'PHẦN MỀM TÙY CHỈNH',
    title: 'Build',
    description:
      'Ứng dụng, website, web app — code riêng theo nhu cầu thật của doanh nghiệp. Không template lắp ghép, không vendor lock-in. AI layer được tích hợp ngay từ đầu.',
    subServices: [
      'Web app & dashboards',
      'Mobile app (iOS/Android)',
      'Backend, API & system integration',
      'Database & data architecture'
    ],
    outcomes: [
      'Sản phẩm production-ready trong 8–16 tuần',
      'Code ownership 100% — không vendor lock-in',
      'AI layer được tích hợp ngay từ đầu',
      'Hand-off tài liệu kỹ thuật đầy đủ'
    ],
    scenarios: [
      { label: 'Đã có ý tưởng, cần đối tác triển khai', body: 'Phương án và scope đã rõ, cần đội thực thi commit timeline và chất lượng.' },
      { label: 'Sản phẩm cũ cần làm lại', body: 'Hệ thống legacy chậm, khó bảo trì, không scale được — cần redesign và rebuild có kế thừa dữ liệu.' },
      { label: 'Cần MVP để test thị trường', body: 'Cần một sản phẩm đi vào tay khách thật trong 8-12 tuần để xác nhận hypothesis trước khi đầu tư lớn.' }
    ]
  },
  {
    slug: 'automate',
    number: '02',
    eyebrow: 'TỰ ĐỘNG HÓA & AI',
    title: 'Automate',
    description:
      'Workflow automation, AI agents, system integration — giải phóng đội ngũ khỏi việc lặp đi lặp lại. Tools nội bộ nói chuyện được với nhau. AI xử lý volume mà không tăng người.',
    subServices: [
      'Workflow automation (n8n, Make, custom)',
      'AI agents & LLM integration',
      'API & system integration',
      'Data pipeline & sync'
    ],
    outcomes: [
      'Giảm tối thiểu 50% thao tác lặp lại',
      'AI agent xử lý task 24/7',
      'Tích hợp tools nội bộ thành 1 luồng thống nhất',
      'ROI đo lường được trong tháng đầu tiên'
    ],
    scenarios: [
      { label: 'Đội ngũ ngập copy-paste lặp lại', body: 'Nhân viên dành phần lớn thời gian copy dữ liệu giữa các hệ thống — cần automation để họ làm việc có giá trị hơn.' },
      { label: 'Tools không nói chuyện được với nhau', body: 'CRM, kế toán, kho vận, marketing — mỗi tool một silo. Cần integration layer để dữ liệu chảy tự động.' },
      { label: 'Cần AI xử lý volume', body: 'Volume đơn hàng / ticket / inquiry tăng nhanh — muốn dùng AI agent xử lý thay vì tuyển thêm.' }
    ]
  },
  {
    slug: 'create',
    number: '03',
    eyebrow: 'SẢN XUẤT MEDIA AI',
    title: 'Create',
    description:
      'Hình ảnh, video, content pipeline bằng AI — chất lượng broadcast, chi phí bằng 1/10 production truyền thống. Volume giải phóng cho marketing, A/B test, social, brand.',
    subServices: [
      'Ảnh sản phẩm & brand asset AI',
      'Video content pipeline',
      'Voiceover & TTS đa ngôn ngữ',
      'Auto YouTube / TikTok / Reels factory'
    ],
    outcomes: [
      'Chi phí media giảm 80–90% so với production truyền thống',
      'Output volume gấp 10–50 lần team thủ công',
      'Chất lượng broadcast-ready',
      'Brand consistency tự động theo guideline'
    ],
    scenarios: [
      { label: 'Cần volume content, budget hạn chế', body: 'Marketing cần hàng trăm asset/tháng — hire agency quá đắt, hire in-house quá chậm.' },
      { label: 'Production cũ quá chậm để A/B test', body: 'Muốn test 10 phiên bản creative — nhưng production truyền thống chỉ ship được 1.' },
      { label: 'Muốn launch YouTube/TikTok channel', body: 'Có ý tưởng channel nhưng team nhỏ — cần pipeline AI để ship 3–30 video/tuần.' }
    ]
  }
];

export const PROCESS_STEPS = [
  { num: '01', label: 'Discover', body: 'Hiểu nghiệp vụ, lượng hoá vấn đề, đặt KPI cam kết.' },
  { num: '02', label: 'Design', body: 'Thiết kế giải pháp end-to-end — kỹ thuật, vận hành, ngân sách.' },
  { num: '03', label: 'Deliver', body: 'Triển khai theo sprint với demo định kỳ và bàn giao tài liệu đầy đủ.' },
  { num: '04', label: 'Optimize', body: 'Vận hành, đo lường, và iterate dựa trên dữ liệu sử dụng thực tế.' }
];

export const DIFFERENTIATORS = [
  {
    title: 'Custom. Không template.',
    body: 'Mỗi giải pháp được thiết kế riêng theo nghiệp vụ thật của doanh nghiệp bạn. Không lắp ghép — build từ đầu theo yêu cầu cụ thể.'
  },
  {
    title: 'AI-native. Không bolt-on.',
    body: 'AI được tích hợp ngay từ khâu thiết kế, không phải addon sau cùng. Mọi thứ chúng tôi ship đều có AI layer hoạt động từ ngày đầu tiên.'
  },
  {
    title: 'Tech + Media. Một đối tác.',
    body: 'Phần mềm tùy chỉnh và sản xuất media AI dưới một mái nhà. Không cần IT vendor riêng và agency riêng — cùng một đội chịu trách nhiệm.'
  },
  {
    title: 'End-to-end. Không đứt đoạn.',
    body: 'Từ phân tích nghiệp vụ đến vận hành ổn định — một đối tác chịu trách nhiệm toàn bộ. Không bàn giao giữa chừng, không blame-shifting.'
  },
  {
    title: 'Nhanh ra giá trị.',
    body: 'Lean execution và AI-powered workflow cho phép ship first version trong 8–12 tuần. Không phải 6 tháng chờ đợi.'
  }
];

export const INDUSTRIES = [
  {
    slug: 'sports',
    label: 'Sports & Entertainment',
    desc: 'Giải đấu tổ chức bằng Excel và Messenger mất hàng chục giờ mỗi tuần, lỗi bracket là bình thường. Chúng tôi build platform end-to-end: ranking ELO tự động, matchmaking theo level, live scoring và app riêng cho người chơi — đã kiểm chứng với 5,000+ user thực tế.',
    active: true
  },
  {
    slug: 'real-estate',
    label: 'Real Estate',
    desc: 'Lead thất lạc trong Zalo, hợp đồng soạn tay mất cả ngày, quản lý không có visibility pipeline. Chúng tôi build CRM theo workflow thực tế của đội sales — AI tự sinh hợp đồng chuẩn xác và nhắc follow-up đúng thời điểm.',
    active: true
  },
  {
    slug: 'hospitality',
    label: 'Hospitality',
    desc: 'POS một nơi, booking một nơi, loyalty lại nơi khác — báo cáo tổng hợp là ác mộng cuối ca. Chúng tôi tạo lớp orchestration thống nhất dữ liệu từ mọi điểm chạm thành một dashboard real-time duy nhất cho chủ chuỗi.',
    active: true
  },
  {
    slug: 'education',
    label: 'Education',
    desc: 'Học viên bỏ cuộc không phải vì thiếu nội dung mà vì thiếu phản hồi kịp thời. Chúng tôi tích hợp AI tutor, assessment engine và cá nhân hóa tự động để tỉ lệ hoàn thành khóa học tăng có kiểm chứng.',
    active: true
  },
  {
    slug: 'retail',
    label: 'Retail',
    desc: 'Omnichannel commerce, quản lý tồn kho thông minh, customer 360° — đang mở rộng.',
    active: false
  },
  {
    slug: 'finance',
    label: 'Finance',
    desc: 'Tự động hóa quy trình nội bộ, compliance tự động, báo cáo tài chính real-time — đang mở rộng.',
    active: false
  }
];

export const TECH_PARTNERS = [
  'Anthropic',
  'OpenAI',
  'Google Cloud',
  'Vercel',
  'Supabase',
  'AWS'
];

export const METRICS = [
  { value: '15+', label: 'Sản phẩm số đã ship' },
  { value: '4',   label: 'Lĩnh vực đã phục vụ' },
  { value: '3+',  label: 'Năm xây dựng AI products' },
  { value: '6',   label: 'Đối tác công nghệ' }
];

export type CaseStudy = {
  slug: string;
  industry: string;
  industrySlug: string;
  title: string;
  oneLiner: string;
  metric: string;
  timeline: string;
  servicesUsed: string[];
  techCategory: string[];
  challenge: string;
  solution: string;
  impact: { value: string; label: string }[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'sabo-arena',
    industry: 'Sports & Entertainment',
    industrySlug: 'sports',
    title: 'SABO Arena — Tournament platform cho cộng đồng billiards',
    oneLiner: 'Nền tảng tổ chức giải đấu billiards với hệ thống ranking và matchmaking tự động.',
    metric: '5,000+ người chơi đăng ký trong 3 tháng đầu',
    timeline: '6 tháng triển khai',
    servicesUsed: ['Build', 'Automate'],
    techCategory: ['Web platform', 'Mobile app', 'Real-time matchmaking'],
    challenge:
      'Cộng đồng billiards địa phương tổ chức giải đấu thủ công qua Facebook và Excel. Không có hệ thống ranking chuẩn, mất nhiều giờ mỗi tuần để cập nhật bracket và kết quả.',
    solution:
      'Xây dựng platform end-to-end gồm web admin + mobile app cho người chơi, hệ thống ranking ELO tự động, matchmaking dựa trên skill level, và streaming live cho các trận quan trọng.',
    impact: [
      { value: '5,000+', label: 'Người chơi đăng ký' },
      { value: '12h → 2h', label: 'Thời gian tổ chức 1 giải' },
      { value: '99.5%', label: 'Uptime trong mùa giải' },
      { value: '3x', label: 'Tăng số giải tổ chức/tháng' }
    ]
  },
  {
    slug: 'sabohub',
    industry: 'Hospitality',
    industrySlug: 'hospitality',
    title: 'SABOHUB — Multi-venue operations platform',
    oneLiner: 'Hệ thống quản lý đa chi nhánh F&B/billiards club tích hợp POS, booking và loyalty.',
    metric: 'Giảm 40% thời gian closing ca cuối ngày',
    timeline: '4 tháng triển khai',
    servicesUsed: ['Build', 'Automate'],
    techCategory: ['POS integration', 'Multi-tenant SaaS', 'Analytics dashboard'],
    challenge:
      'Chuỗi venue dùng 3 phần mềm khác nhau cho POS, booking và loyalty. Báo cáo tổng hợp phải xuất Excel từ từng hệ thống rồi ghép tay — luôn lệch số.',
    solution:
      'Thiết kế lớp orchestration thống nhất API của 3 hệ thống, cộng dashboard real-time cho chủ chuỗi và app loyalty cho khách. Migration không downtime trong giờ vắng khách.',
    impact: [
      { value: '40%', label: 'Giảm thời gian closing ca' },
      { value: '1', label: 'Dashboard duy nhất cho 8 chi nhánh' },
      { value: '+22%', label: 'Tăng repeat customer sau loyalty' },
      { value: '0', label: 'Downtime trong migration' }
    ]
  },
  {
    slug: 'vungtauland',
    industry: 'Real Estate',
    industrySlug: 'real-estate',
    title: 'Vũng Tàu Dream Homes — Nền tảng bất động sản Vũng Tàu',
    oneLiner: 'Nền tảng bất động sản cho thị trường Vũng Tàu — tìm kiếm thông minh, đăng tin đơn giản, kết nối người mua/thuê với chủ sở hữu.',
    metric: 'Rút ngắn 35% thời gian từ lead đến hợp đồng',
    timeline: '3 tháng triển khai',
    servicesUsed: ['Build', 'Automate'],
    techCategory: ['CRM', 'Sales automation', 'Document workflow'],
    challenge:
      'Đội sales 25 người dùng Excel + Zalo để theo dõi lead. Lead bị bỏ sót, không có visibility về pipeline cho cấp quản lý, hợp đồng soạn tay luôn sai sót.',
    solution:
      'Xây CRM tinh gọn theo workflow của đội sales hiện tại — không bắt họ học công cụ phức tạp. Tự động sinh hợp đồng từ template, AI assistant gợi ý next-action cho mỗi lead.',
    impact: [
      { value: '-35%', label: 'Thời gian từ lead đến hợp đồng' },
      { value: '100%', label: 'Lead được follow-up trong 24h' },
      { value: '0', label: 'Lỗi trong hợp đồng tự sinh' },
      { value: '4x', label: 'Visibility pipeline cho quản lý' }
    ]
  },
  {
    slug: 'ainewbievn',
    industry: 'Community / AI',
    industrySlug: 'community',
    title: 'AINewbieVN — Cộng đồng AI & workflow tự động hóa',
    oneLiner: 'Nền tảng sản phẩm số AI, workflow tự động hóa và kết nối nhân tài công nghệ cho người Việt.',
    metric: 'Tăng 2.4× tỉ lệ hoàn thành khoá học',
    timeline: '5 tháng triển khai',
    servicesUsed: ['Build', 'Automate'],
    techCategory: ['LMS', 'AI tutor', 'Assessment engine'],
    challenge:
      'Doanh nghiệp đầu tư đào tạo nội bộ nhưng tỉ lệ hoàn thành khoá học rất thấp, đo lường tác động đến công việc thực tế không khả thi.',
    solution:
      'Platform có AI tutor đồng hành theo tốc độ từng học viên, đánh giá năng lực qua tình huống nghiệp vụ thực thay vì trắc nghiệm, và dashboard cho L&D theo dõi impact theo phòng ban.',
    impact: [
      { value: '2.4×', label: 'Tỉ lệ hoàn thành khoá học' },
      { value: '85%', label: 'Học viên dùng AI tutor hàng tuần' },
      { value: '+18 NPS', label: 'Trải nghiệm so với LMS cũ' },
      { value: '6 phòng ban', label: 'Triển khai trong năm đầu' }
    ]
  }
];

export const ROLES = ['Owner', 'CEO', 'Director', 'Manager', 'Other'];
export const COMPANY_SIZES = [
  '< 50 nhân viên',
  '50 – 100 nhân viên',
  '100 – 300 nhân viên',
  '300 – 1,000 nhân viên',
  '> 1,000 nhân viên'
];
