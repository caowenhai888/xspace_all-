export type Language = 'en' | 'zh';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      technology: 'Technology',
      contact: 'Contact',
      bookDemo: 'Book a Demo',
      company: 'Company',
      careers: 'Careers',
      community: 'Developer Community',
    },
    hero: {
      title: 'Building the future of',
      titleAccent: 'embodied intelligence',
      subtitle: 'through high-quality real-world data infrastructure.',
      cta: 'Learn More',
      bookDemo: 'Book a Demo',
      explore: 'Explore Technology',
    },
    home: {
      mission: 'Xspark AI is a robotics company with the core mission of "data-driven embodied intelligence". We are building a high-quality real-world data infrastructure for embodied intelligence.',
      worldview: {
        title: 'How do we make Real-world data flow into',
        titleAccent: 'future robot AI.',
        desc: 'Two lines long introduction in here Two lines long introduction in hereTwo lines long introduction in hereTwo lines long introduction in hereTwo lines long introduction in hereTwo lines long introduction in hereTwo lines long introduction in hereTwo lines long introduction in.',
      },
      products: {
        xego: { 
          title: 'Extensible Physical Intuition X-Ego', 
          desc: 'Two lines long introduction in here Two lines long introduction in hereTwo lines long introduction in hereTwo lines long introduction in.' 
        },
        luminis: { 
          title: 'The new generation generative simulation Luminis', 
          desc: 'Two lines long introduction in here Two lines long introduction in hereTwo lines long introduction in hereTwo lines long introduction in.' 
        },
        xone: { 
          title: 'Stable robot infrastructure X-One', 
          desc: 'Two lines long introduction in here Two lines long introduction in hereTwo lines long introduction in hereTwo lines long introduction in.' 
        },
      },
      layers: [
        { 
          title: 'Human-Centric Data Input Layer', 
          desc: 'By developing non-invasive wearable devices, we can collect real human operational behaviors, visual information, and semantic structures in multiple scenarios, establish real-world task logic and physical interaction constraints, and provide robots with "prior distributions from humans".' 
        },
        { 
          title: 'Generative Simulation Extension Layer', 
          desc: 'By developing non-invasive wearable devices, we can collect real human operational behaviors, visual information, and semantic structures in multiple scenarios, establish real-world task logic and physical interaction constraints, and provide robots with "prior distributions from humans".' 
        },
        { 
          title: 'Physical and Action Alignment Layer', 
          desc: 'By developing non-invasive wearable devices, we can collect real human operational behaviors, visual information, and semantic structures in multiple scenarios, establish real-world task logic and physical interaction constraints, and provide robots with "prior distributions from humans".' 
        },
        { 
          title: 'Data Engine Closed-Loop Optimization Layer', 
          desc: 'By developing non-invasive wearable devices, we can collect real human operational behaviors, visual information, and semantic structures in multiple scenarios, establish real-world task logic and physical interaction constraints, and provide robots with "prior distributions from humans".' 
        },
      ],
      team: {
        title: 'Xspark AI Team',
        desc: 'Our core team comes from leading institutions including Tsinghua University, Shanghai Jiao Tong University, The University of Hong Kong and industry pioneers such as NIO. Combining frontier research with large-scale production experience, We close the loop from algorithm design to industrial deployment.',
      },
      partners: {
        title: 'Trusted by Long-term',
        titleAccent: 'business partner',
        names: {
          alibaba: 'Alibaba',
          bytedance: 'ByteDance',
          nvidia: 'NVIDIA',
          shanghai: 'Shanghai Jiao Tong University',
          tsinghua: 'Tsinghua University',
          hku: 'The University of Hong Kong',
        }
      },
      common: {
        mainView: 'Main View',
        learnMore: 'Learn More',
        dataFlow: 'Data Flow Diagram',
        gridItem: 'Product Detail',
        view: 'View',
        bookDemoArrow: 'Book a Demo →',
      }
    },
    technology: {
      xego: {
        title: 'Xspark AI Introduces X-Ego',
        desc: 'Two lines long introduction in here Two lines long introduction in hereTwo lines long introduction in hereTwo lines long introduction in hereTwo lines long introduction in hereTwo lines long introduction in hereTwo lines long introduction in.',
      },
      luminis: {
        title: 'Introduces Luminis',
        desc: 'Bridging Reality and Simulation. Expanding beyond physical constraints.A large-scale simulation engine aligned with unified task definitions, extending distribution coverage across long-tail and extreme scenarios.',
      },
      xone: {
        title: 'Xspark AI Introduces X-One',
        desc: 'Two lines long introduction in here Two lines long introduction in hereTwo lines long introduction in hereTwo lines long introduction in hereTwo lines long introduction in hereTwo lines long introduction in hereTwo lines long introduction in.',
      },
      sectionFooter: 'Our technology stack is designed to be modular and scalable, supporting a wide range of applications from industrial automation to personal robotics.',
      bookDemo: 'Book a Demo →',
    },
    contact: {
      title: 'Contact Us',
      firstName: 'First Name',
      lastName: 'Last Name',
      company: 'Company',
      jobTitle: 'Job Title',
      email: 'Email',
      stage: 'Project Stage',
      solutions: 'Solutions',
      message: 'Message',
      submit: 'Submit',
      submitting: 'Submitting...',
      success: {
        title: 'Message Sent!',
        desc: 'Thank you for reaching out. Our team will get back to you shortly.',
        button: 'Send Another Message',
      },
      errors: {
        generic: 'Something went wrong. Please try again.',
        network: 'An error occurred. Please try again.',
      },
      placeholders: {
        firstName: 'Enter your first name',
        lastName: 'Enter your last name',
        company: 'Enter your company name',
        jobTitle: 'Enter your job title',
        email: 'Enter your email address',
        message: 'How can we help you?',
      },
      stages: ['Concept', 'Prototype', 'Production'],
      solutionOptions: ['Data Infrastructure', 'Vision System', 'Robotics Platform'],
    },
    footer: {
      explore: 'Explore',
      about: 'About',
      connect: 'Connect',
      technology: 'Technology',
      community: 'Developer Community',
      company: 'Company',
      careers: 'Careers',
      contact: 'Contact us',
      links: {
        home: 'Home',
        technology: 'Technology',
        contact: 'Contact',
        story: 'Our Story',
        careers: 'Careers',
        press: 'Press',
        twitter: 'Twitter',
        linkedin: 'LinkedIn',
        github: 'GitHub',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
      }
    }
  },
  zh: {
    nav: {
      home: '首页',
      technology: '技术',
      contact: '联系我们',
      bookDemo: '预约演示',
      company: '公司',
      careers: '职业生涯',
      community: '开发者社区',
    },
    hero: {
      title: '构建',
      titleAccent: '具身智能',
      subtitle: '的未来，通过高质量的现实世界数据基础设施。',
      cta: '了解更多',
      bookDemo: '预约演示',
      explore: '探索技术',
    },
    home: {
      mission: 'Xspark AI 是一家以“数据驱动的具身智能”为核心使命的机器人公司。我们正在为具身智能构建高质量的现实世界数据基础设施。',
      worldview: {
        title: '我们如何让现实世界的数据流向',
        titleAccent: '未来的机器人 AI',
        desc: '这里有两行长的介绍这里有两行长的介绍这里有两行长的介绍这里有两行长的介绍这里有两行长的介绍这里有两行长的介绍这里有两行长的介绍这里有两行长的介绍。',
      },
      products: {
        xego: { 
          title: '可扩展物理直觉 X-Ego', 
          desc: '这里有两行长的介绍这里有两行长的介绍这里有两行长的介绍这里有两行长的介绍。' 
        },
        luminis: { 
          title: '新一代生成式仿真 Luminis', 
          desc: '这里有两行长的介绍这里有两行长的介绍这里有两行长的介绍这里有两行长的介绍。' 
        },
        xone: { 
          title: '稳定的机器人基础设施 X-One', 
          desc: '这里有两行长的介绍这里有两行长的介绍这里有两行长的介绍这里有两行长的介绍。' 
        },
      },
      layers: [
        { 
          title: '以人为中心的数据输入层', 
          desc: '通过开发非侵入式可穿戴设备，我们可以收集多种场景下的真实人类操作行为、视觉信息和语义结构，建立现实世界的任务逻辑和物理交互约束，并为机器人提供“来自人类的先验分布”。' 
        },
        { 
          title: '生成式仿真扩展层', 
          desc: '通过开发非侵入式可穿戴设备，我们可以收集多种场景下的真实人类操作行为、视觉信息和语义结构，建立现实世界的任务逻辑和物理交互约束，并为机器人提供“来自人类的先验分布”。' 
        },
        { 
          title: '物理与动作对齐层', 
          desc: '通过开发非侵入式可穿戴设备，我们可以收集多种场景下的真实人类操作行为、视觉信息和语义结构，建立现实世界的任务逻辑和物理交互约束，并为机器人提供“来自人类的先验分布”。' 
        },
        { 
          title: '数据引擎闭环优化层', 
          desc: '通过开发非侵入式可穿戴设备，我们可以收集多种场景下的真实人类操作行为、视觉信息和语义结构，建立现实世界的任务逻辑和物理交互约束，并为机器人提供“来自人类的先验分布”。' 
        },
      ],
      team: {
        title: 'Xspark AI 团队',
        desc: '我们的核心团队来自清华大学、上海交通大学、香港大学等顶尖机构以及蔚来等行业先驱。结合前沿研究与大规模生产经验，我们实现了从算法设计到工业部署的闭环。',
      },
      partners: {
        title: '长期信任的',
        titleAccent: '合作伙伴',
        names: {
          alibaba: '阿里巴巴',
          bytedance: '字节跳动',
          nvidia: '英伟达',
          shanghai: '上海交通大学',
          tsinghua: '清华大学',
          hku: '香港大学',
        }
      },
      common: {
        mainView: '主视图',
        learnMore: '了解更多',
        dataFlow: '数据流图',
        gridItem: '产品详情',
        view: '视图',
        bookDemoArrow: '预约演示 →',
      }
    },
    technology: {
      xego: {
        title: 'Xspark AI 推出 X-Ego',
        desc: '这里有两行长的介绍这里有两行长的介绍这里有两行长的介绍这里有两行长的介绍这里有两行长的介绍这里有两行长的介绍这里有两行长的介绍。',
      },
      luminis: {
        title: '推出 Luminis',
        desc: '连接现实与仿真。超越物理约束。与统一任务定义对齐的大规模仿真引擎，扩展了长尾和极端场景的分布覆盖。',
      },
      xone: {
        title: 'Xspark AI 推出 X-One',
        desc: '这里有两行长的介绍这里有两行长的介绍这里有两行长的介绍这里有两行长的介绍这里有两行长的介绍这里有两行长的介绍这里有两行长的介绍。',
      },
      sectionFooter: '我们的技术栈旨在实现模块化和可扩展性，支持从工业自动化到个人机器人的广泛应用。',
      bookDemo: '预约演示 →',
    },
    contact: {
      title: '联系我们',
      firstName: '名字',
      lastName: '姓氏',
      company: '公司',
      jobTitle: '职位',
      email: '邮箱',
      stage: '项目阶段',
      solutions: '解决方案',
      message: '留言',
      submit: '提交',
      submitting: '提交中...',
      success: {
        title: '消息已发送！',
        desc: '感谢您的联系。我们的团队将很快与您联系。',
        button: '发送另一条消息',
      },
      errors: {
        generic: '出错了。请再试一次。',
        network: '发生错误。请再试一次。',
      },
      placeholders: {
        firstName: '请输入您的名字',
        lastName: '请输入您的姓氏',
        company: '请输入您的公司名称',
        jobTitle: '请输入您的职位',
        email: '请输入您的电子邮箱',
        message: '我们能为您提供什么帮助？',
      },
      stages: ['概念阶段', '原型阶段', '生产阶段'],
      solutionOptions: ['数据基础设施', '视觉系统', '机器人平台'],
    },
    footer: {
      explore: '探索',
      about: '关于',
      connect: '联系',
      technology: '技术',
      community: '开发者社区',
      company: '公司',
      careers: '职业生涯',
      contact: '联系我们',
      links: {
        home: '首页',
        technology: '技术',
        contact: '联系我们',
        story: '我们的故事',
        careers: '职业生涯',
        press: '媒体',
        twitter: 'Twitter',
        linkedin: 'LinkedIn',
        github: 'GitHub',
        privacy: '隐私政策',
        terms: '服务条款',
      }
    }
  }
};

export type TranslationType = typeof translations.en;
