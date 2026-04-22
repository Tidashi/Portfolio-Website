window.CARDS = [
  {
    id: 'about',
    name: 'Christopher, the Seeker',
    color: 'blue',
    manaCost: [{ type: 'U' }, { type: 'U' }],
    supertype: 'Legendary Planeswalker',
    subtype: 'Christopher',
    emoji: '🧙‍♂️',
    collectorNum: '001/006',
    flavor: '"Every line of code is a spell waiting to be cast."',
    abilities: [
      { keyword: 'Curiosity', text: ' — Whenever Christopher explores new tech, draw a card.' },
      { keyword: '+1:', text: ' Look at the top three cards of your library. You may rearrange them.' },
      { keyword: '−2:', text: ' Create a 1/1 Idea token with flying.' },
    ],
    pt: '∞',
    modal: {
      type: 'Legendary Planeswalker — Christopher',
      sections: [
        {
          heading: 'About Me',
          text: "Hi! I'm Christopher Tjahjo — a Full Stack Developer at Paycom and OSU Computer Science grad. I love building things that blend creativity with technical craft, from polished UIs to scalable back-end systems.",
        },
        {
          heading: 'Location',
          text: 'Oklahoma City / Stillwater, OK',
        },
        {
          heading: 'Links',
          text: 'linkedin.com/in/christopher-tjahjo  ·  github.com/Tidashi',
        },
      ],
    },
  },
  {
    id: 'experience',
    name: 'Tome of Experience',
    color: 'gold',
    manaCost: [{ type: 'C', label: '3' }, { type: 'W' }, { type: 'U' }],
    supertype: 'Artifact',
    subtype: 'Equipment — Résumé',
    emoji: '📜',
    collectorNum: '002/006',
    flavor: '"Knowledge tempered by experience is the sharpest blade."',
    abilities: [
      { keyword: 'Equipped creature', text: ' gets +2/+2 and has "Tap: Ship a feature."' },
      { keyword: 'Equip', text: ' {2} — Attach to any role or challenge.' },
    ],
    pt: null,
    modal: {
      type: 'Artifact — Equipment · Résumé',
      sections: [
        {
          heading: 'Paycom — Full Stack Developer',
          text: 'June 2025 – Present · Oklahoma City, OK\nWorked in the SPA and Mantle systems in the Compensation Department. Led migration of functionality from SPA to Mantle for improved performance and maintainability. Collaborated with Product and Design to enhance UI quality and user experience.',
          tags: ['SPA', 'Mantle', 'Full Stack', 'UI/UX'],
        },
        {
          heading: 'Infratie — Full-Stack Django Developer Intern',
          text: 'January 2024 – Present · Stillwater, OK\nResponsible for website programming and maintenance for a sewer management company. Normalized the database for multi-city scalability. Managed server updates and helped establish a dedicated development environment.',
          tags: ['Django', 'Python', 'MySQL', 'Apache', 'Docker'],
        },
        {
          heading: 'IT Phone Agent Team Lead',
          text: 'August 2021 – August 2024 · Oklahoma State University\nProvided technical support to students and faculty. Promoted to Tier 2 support — trained new team members and improved overall team performance.',
          tags: ['Technical Support', 'Team Lead', 'Tier 2'],
        },
      ],
    },
  },
  {
    id: 'skills',
    name: 'Arsenal of the Arcane',
    color: 'red',
    manaCost: [{ type: 'R' }, { type: 'R' }, { type: 'U' }],
    supertype: 'Enchantment',
    subtype: 'Saga',
    emoji: '⚔️',
    collectorNum: '003/006',
    flavor: '"A warrior without tools is a warrior half-made."',
    abilities: [
      { keyword: 'I —', text: ' Gain mastery of Languages: PHP, Python, TypeScript, C#.' },
      { keyword: 'II —', text: ' Gain mastery of Frameworks: Django, ASP.NET, jQuery.' },
      { keyword: 'III —', text: ' Gain mastery of Tools: Docker, Git, PyTorch, Tailwind.' },
    ],
    pt: null,
    modal: {
      type: 'Enchantment — Saga',
      sections: [
        {
          heading: 'Languages',
          tags: ['PHP', 'TypeScript', 'Python', 'JavaScript', 'MySQL', 'Java', 'C/C++', 'C#', 'Bash', 'HTML/CSS', 'PowerShell', 'Redux'],
        },
        {
          heading: 'Frameworks & Libraries',
          tags: ['Django', 'ASP.NET Core', 'jQuery', 'Tailwind CSS', 'PyTorch'],
        },
        {
          heading: 'Tools & Infrastructure',
          tags: ['Git', 'Docker', 'Apache Server', 'dbForge', 'JetBrains IDE', 'VS Code', 'Google Colab', 'LaTeX'],
        },
      ],
    },
  },
  {
    id: 'projects',
    name: 'Gallery of Creations',
    color: 'green',
    manaCost: [{ type: 'G' }, { type: 'G' }, { type: 'C', label: '2' }],
    supertype: 'Enchantment',
    subtype: 'Ongoing',
    emoji: '🌱',
    collectorNum: '004/006',
    flavor: '"From seed to forest, one commit at a time."',
    abilities: [
      { keyword: 'Proliferate', text: ' — At the start of each sprint, add a feature counter to each project.' },
      { keyword: 'When this enters,', text: ' search your library for a new project and put it into play.' },
    ],
    pt: null,
    modal: {
      type: 'Enchantment — Ongoing',
      sections: [
        {
          heading: 'Machine Learning — Tomato Ripeness Classifier',
          text: 'Aug – Dec 2024 · Google Colab, PyTorch\nReplicated a published AI study to classify whether a tomato was ripe using computer vision. Managed dataset pre-processing, model training, and helped debug and improve model accuracy.',
          tags: ['PyTorch', 'Google Colab', 'Machine Learning', 'Computer Vision'],
        },
        {
          heading: 'Web App — Eco-Friendly Clothing Brand',
          text: 'Jan – Dec 2024 · HTML, CSS, JavaScript, MySQL\nBuilt a full-stack website for a fictional eco-friendly clothing brand. Designed the UI/UX mood board, implemented front-end, and built a MySQL database for product listings and user comments.',
          tags: ['HTML', 'CSS', 'JavaScript', 'MySQL', 'UI/UX Design'],
        },
        {
          heading: 'OSU Hackathon 2021',
          text: 'March 2021 · HTML, CSS, JavaScript, Git\nBuilt a student connection app for the OSU Hackathon. Implemented the real-time online chat feature and designed a system to match students by shared classes.',
          tags: ['HTML', 'CSS', 'JavaScript', 'Git', 'Real-Time Chat'],
        },
        {
          heading: 'Senior Game Project',
          text: 'April – May 2021 · Unity, C#, VSCode\nCollaborated in a 4-member team to build a first-person story-driven video game. Owned both UI and gameplay components.',
          tags: ['Unity', 'C#', 'Game Design', 'UI'],
        },
      ],
    },
  },
  {
    id: 'education',
    name: 'Scroll of Scholarship',
    color: 'white',
    manaCost: [{ type: 'W' }, { type: 'W' }, { type: 'C', label: '1' }],
    supertype: 'Enchantment',
    subtype: 'Aura',
    emoji: '🎓',
    collectorNum: '005/006',
    flavor: '"The university teaches you how to think. Life teaches you what to think about."',
    abilities: [
      { keyword: 'Enchant', text: ' creature (Christopher).' },
      { keyword: 'Enchanted creature', text: ' has "Tap: Solve any problem you\'ve seen before."' },
    ],
    pt: null,
    modal: {
      type: 'Enchantment — Aura',
      sections: [
        {
          heading: 'Oklahoma State University',
          text: 'BS in Computer Science · GPA 3.63 · Graduated May 2025\nMinor in Management Information Systems · Stillwater, OK',
          tags: ['Database Systems', 'Web App Development', 'Machine Learning', 'Scripting Essentials'],
        },
        {
          heading: 'Francis Tuttle Technology Center',
          text: '3-year Computer Science prep program · Aug 2019 – May 2021 · Oklahoma City, OK',
          tags: ['CS Principles', 'Intro to Game Development', 'Computer Science 1'],
        },
      ],
    },
  },
  {
    id: 'contact',
    name: 'Summon: Open Channel',
    color: 'black',
    manaCost: [{ type: 'B' }, { type: 'U' }],
    supertype: 'Instant',
    subtype: '',
    emoji: '📡',
    collectorNum: '006/006',
    flavor: '"The fastest spell is a well-timed message."',
    abilities: [
      { keyword: 'Flash.', text: '' },
      { keyword: 'Target player', text: ' may reach Christopher through any channel. If they do, you gain 1 collaboration counter.' },
    ],
    pt: null,
    modal: {
      type: 'Instant',
      sections: [
        {
          heading: 'Phone',
          text: '405-905-3861',
        },
        {
          heading: 'Email',
          text: 'chris.tjahjo@okstate.edu  ·  christjahjo@gmail.com',
        },
        {
          heading: 'Online',
          text: 'linkedin.com/in/christopher-tjahjo  ·  github.com/Tidashi',
          tags: ['LinkedIn', 'GitHub', 'Email'],
        },
      ],
    },
  },
];
