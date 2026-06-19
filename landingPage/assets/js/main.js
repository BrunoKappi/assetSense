(function () {
  //===== Prealoder

  window.onload = function () {
    window.setTimeout(fadeout, 500);
  };

  function fadeout() {
    document.querySelector(".preloader").style.opacity = "0";
    document.querySelector(".preloader").style.display = "none";
  }

  /*=====================================
    Sticky
    ======================================= */
  window.onscroll = function () {
    const header_navbar = document.querySelector(".navbar-area");
    const sticky = header_navbar.offsetTop;
    if (window.pageYOffset > sticky) {
      header_navbar.classList.add("sticky");
    } else {
      header_navbar.classList.remove("sticky");
    }

    // show or hide the back-top-top button
    const backToTo = document.querySelector(".scroll-top");
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      backToTo.style.display = "flex";
    } else {
      backToTo.style.display = "none";
    }
  };

  // for menu scroll
  const pageLink = document.querySelectorAll(".page-scroll");

  pageLink.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(elem.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
        offsetTop: 1 - 60,
      });
    });
  });

  // section menu active
  function onScroll(event) {
    const sections = document.querySelectorAll(".page-scroll");
    const scrollPos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    for (let i = 0; i < sections.length; i++) {
      const currLink = sections[i];
      const val = currLink.getAttribute("href");
      const refElement = document.querySelector(val);
      const scrollTopMinus = scrollPos + 73;
      if (
        refElement.offsetTop <= scrollTopMinus &&
        refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
      ) {
        document.querySelector(".page-scroll").classList.remove("active");
        currLink.classList.add("active");
      } else {
        currLink.classList.remove("active");
      }
    }
  }

  window.document.addEventListener("scroll", onScroll);

  //===== close navbar-collapse when a  clicked
  let navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  document.querySelectorAll(".page-scroll").forEach((e) =>
    e.addEventListener("click", () => {
      navbarToggler.classList.remove("active");
      navbarCollapse.classList.remove("show");
    })
  );
  navbarToggler.addEventListener("click", function () {
    navbarToggler.classList.toggle("active");
  });

  // Translations Dictionary
  const translations = {
    en: {
      nav_home: "Home",
      nav_features: "Features",
      nav_details: "Details",
      nav_why: "Why Us",
      nav_dev: "Developer",
      hero_title: "AssetSense - Asset Management",
      hero_desc: "Centralize the control of Assets, Requests, Withdrawals, Returns, and much more in an integrated, simple platform with high visibility.",
      hero_btn: "See Features",
      feat_custom_title: "Customizable",
      feat_custom_desc: "AssetSense software is highly customizable, adapting to the specific needs of each company. With flexible asset, status, and location registration, the system perfectly molds to unique requirements, offering a versatile solution.",
      feat_simple_title: "Simple Design",
      feat_simple_desc: "With an elegant and intuitive design, AssetSense provides a simplified user experience. Its clean and organized interface facilitates navigation, making it easier to find desired information. The simple design allows for a quick learning curve.",
      feat_easy_title: "Easy to Use",
      feat_easy_desc: "AssetSense was developed to be easy to use. With a friendly and intuitive interface, asset management becomes simple and uncomplicated. From registration to reporting, all steps are accessible, making the system suitable for users of all technical skill levels.",
      about_assets_title: "Assets - Listing, Details, and Tracking",
      about_assets_p1: "Gain complete, centralized control of all your company's assets. Our system offers a detailed and intuitive list of equipment with smart filters by location, status, and asset category.",
      about_assets_p2: "Access an exclusive details screen for each asset, where you can view full technical specifications, complete custody movement history, audit logs, and associated requests.",
      about_moves_title: "Movements - Withdrawal and Return Control",
      about_moves_p1: "Prevent loss and know exactly who has each asset in real-time. AssetSense simplifies the physical registration of movements, allowing withdrawals to be registered in seconds, linked directly to the responsible employee.",
      about_moves_p2: "Define expected return deadlines, register responsibilities and signatures, and evaluate the physical condition of the equipment upon return for strict asset control.",
      about_reqs_title: "Requests - Custom Workflows and Approvals",
      about_reqs_p1: "Provide an agile channel for your employees to request new assets and equipment directly through the portal. Managers benefit from an integrated interface to review, approve, reject, or request clarification on requests.",
      about_reqs_p2: "Configure custom rules and limits for automatic requests by department, ensuring full compliance with the organization's internal IT and infrastructure policies.",
      about_security_title: "Security, Access Profiles, and Parametrization",
      about_security_p1: "Ensure company information is protected with high-level granular access control. Each user has a detailed profile with clearly parameterized view, edit, or approval permissions.",
      about_security_p2: "Access the settings screen to customize asset categories, statuses, physical storage locations, and corporate profile data quickly and centrally.",
      why_title: "Why choose AssetSense?",
      why_subtitle: "Discover why AssetSense is the ideal choice for asset management. With customizable features, an attractive design, and high performance, our platform offers a complete and efficient solution. Try AssetSense today and take your asset management to a new level.",
      why_saas_title: "SaaS Centric",
      why_saas_desc: "AssetSense is cloud-based SaaS software accessible via the internet, allowing you to manage your assets easily and quickly, from anywhere and at any time.",
      why_design_title: "Amazing Design",
      why_design_desc: "With an attractive and intuitive design, AssetSense offers a beautiful and functional user interface, providing a pleasant experience for users.",
      why_ready_title: "Ready to Use",
      why_ready_desc: "AssetSense is ready to use as soon as you become our customer. There is no need for long implementations or complex setups. Just log in and start managing your assets immediately. With a simplified initial setup, you save time and effort, quickly enjoying all the benefits of our asset management solution.",
      why_custom_title: "Customizable",
      why_custom_desc: "AssetSense is highly customizable to meet your company's specific needs. Add custom fields, create unique categories, and configure access permissions to get an asset management system tailored to your preferences.",
      why_sections_title: "Essential Sections",
      why_sections_desc: "AssetSense has dedicated sections for asset registration, movements, requests, and reports, ensuring clear organization and quick access to important information.",
      why_optimized_title: "Highly Optimized",
      why_optimized_desc: "AssetSense has been optimized for exceptional performance, allowing you to manage a large number of assets quickly and efficiently, without lag or performance issues. You will have a smooth and effective user experience.",
      dev_section_title: "About the Developer",
      dev_title: "Bruno Kappi",
      dev_subtitle: "Fullstack Developer & Systems Analyst",
      dev_location: "Novo Hamburgo, Rio Grande do Sul, Brazil",
      dev_bio1: "With a background in both industrial automation and modern web development, Bruno brings a rare blend of technical depth and product vision to everything he builds.",
      dev_bio2: "He believes software should be elegant, efficient, and most of all, useful.",
      footer_desc: "Modern asset management platform for businesses of all sizes."
    },
    pt: {
      nav_home: "Início",
      nav_features: "Funcionalidades",
      nav_details: "Detalhes",
      nav_why: "Por que nós",
      nav_dev: "Desenvolvedor",
      hero_title: "AssetSense - Gestão de Ativos",
      hero_desc: "Centralize o controle de Ativos, Solicitações, Retiradas, Devoluções e muito mais em uma plataforma integrada, simples e com altíssima visibilidade.",
      hero_btn: "Ver Funcionalidades",
      feat_custom_title: "Personalizável",
      feat_custom_desc: "O software AssetSense é altamente personalizável, adaptando-se às necessidades específicas de cada empresa. Com cadastro flexível de ativos, status e locais, o sistema se molda perfeitamente aos requisitos únicos, oferecendo uma solução versátil.",
      feat_simple_title: "Design Simples",
      feat_simple_desc: "Com um design elegante e intuitivo, o AssetSense proporciona uma experiência de usuário simplificada. Sua interface limpa e organizada facilita a navegação, tornando mais fácil encontrar as informações desejadas. O design simples permite uma curva de aprendizado rápida.",
      feat_easy_title: "Fácil de Usar",
      feat_easy_desc: "O AssetSense foi desenvolvido para ser fácil de usar. Com uma interface amigável e intuitiva, o gerenciamento de ativos se torna simples e descomplicado. Desde o cadastro até a geração de relatórios, todas as etapas são acessíveis, tornando o sistema adequado para usuários de todos os níveis de habilidade técnica.",
      about_assets_title: "Ativos - Listagem, Detalhes e Rastreamento",
      about_assets_p1: "Tenha o controle completo e centralizado de todos os ativos da sua empresa. Nosso sistema oferece uma listagem detalhada e intuitiva de equipamentos com filtros inteligentes por localizações, status e categorias de ativos.",
      about_assets_p2: "Acesse uma tela exclusiva de detalhes para cada ativo, onde é possível visualizar especificações técnicas completas, histórico completo de movimentações de custódia, logs de auditoria e solicitações associadas.",
      about_moves_title: "Movimentações - Controle de Retiradas e Devoluções",
      about_moves_p1: "Evite perdas e saiba exatamente com quem está cada ativo em tempo real. O AssetSense simplifica o registro físico de movimentações, permitindo realizar retiradas em segundos vinculadas diretamente ao colaborador responsável.",
      about_moves_p2: "Defina prazos esperados para devolução, registre assinaturas e termos de responsabilidade e avalie as condições físicas do equipamento no ato da devolução para um controle patrimonial rigoroso.",
      about_reqs_title: "Solicitações - Fluxos Personalizados e Aprovações",
      about_reqs_p1: "Ofereça um canal ágil para que seus colaboradores possam solicitar novos ativos e equipamentos diretamente pelo portal. Os gestores contam com uma interface integrada para revisar, aprovar, reprovar ou pedir esclarecimentos sobre as solicitações.",
      about_reqs_p2: "Configure regras e limites personalizados para solicitações automáticas de acordo com o setor, garantindo total conformidade com as políticas internas de TI e infraestrutura da organização.",
      about_security_title: "Segurança, Perfis de Acesso e Parametrização",
      about_security_p1: "Garanta que as informações da empresa estejam protegidas por meio de um controle de acesso granular de alto nível. Cada usuário possui um perfil detalhado com permissões de visualização, edição ou aprovação claramente parametrizadas.",
      about_security_p2: "Acesse a tela de configurações para customizar as categorias de ativos, status, locais físicos de armazenamento e dados do perfil corporativo de forma ágil e centralizada.",
      why_title: "Por que escolher o AssetSense?",
      why_subtitle: "Descubra por que o AssetSense é a escolha ideal para a gestão de ativos. Com recursos personalizáveis, um design atraente e alto desempenho, nossa plataforma oferece uma solução completa e eficiente. Experimente o AssetSense hoje e eleve sua gestão de ativos a um novo patamar.",
      why_saas_title: "Centrado em SaaS",
      why_saas_desc: "O AssetSense é um software SaaS (Software como Serviço) acessível pela internet, permitindo que você gerencie seus ativos de forma fácil e rápida, de qualquer lugar e a qualquer momento.",
      why_design_title: "Design Incrível",
      why_design_desc: "Com um design atraente e intuitivo, o AssetSense oferece uma interface de usuário bonita e funcional, proporcionando uma experiência agradável aos usuários.",
      why_ready_title: "Pronto para usar",
      why_ready_desc: "O AssetSense está pronto para uso assim que você se tornar nosso cliente. Não há necessidade de longas implementações ou configurações complexas. Basta fazer login e começar a gerenciar seus ativos imediatamente. Com uma configuração inicial simplificada, você economiza tempo e esforço, aproveitando rapidamente todos os benefícios da nossa solução de gestão de ativos.",
      why_custom_title: "Personalizável",
      why_custom_desc: "O AssetSense é altamente personalizável para atender às necessidades específicas da sua empresa. Adicione campos personalizados, crie categorias exclusivas e configure permissões de acesso para obter um sistema de gestão de ativos adaptado às suas preferências.",
      why_sections_title: "Seções Essenciais",
      why_sections_desc: "O AssetSense possui seções dedicadas a cadastro de ativos, movimentações, solicitações e relatórios, garantindo uma organização clara e acesso rápido às informações importantes.",
      why_optimized_title: "Altamente Otimizado",
      why_optimized_desc: "O AssetSense foi otimizado para um desempenho excepcional, permitindo que você gerencie um grande número de ativos com rapidez e eficiência, sem atrasos ou problemas de desempenho. Você terá uma experiência de uso fluida e eficaz.",
      dev_section_title: "Sobre o Desenvolvedor",
      dev_title: "Bruno Kappi",
      dev_subtitle: "Desenvolvedor Fullstack & Analista de Sistemas",
      dev_location: "Novo Hamburgo, Rio Grande do Sul, Brazil",
      dev_bio1: "Com experiência tanto em automação industrial quanto em desenvolvimento web moderno, Bruno traz uma combinação única de profundidade técnica e visão de produto para tudo o que constrói.",
      dev_bio2: "Ele acredita que o software deve ser elegante, eficiente e, acima de tudo, útil.",
      footer_desc: "Plataforma moderna de gestão de ativos para empresas de todos os tamanhos."
    },
    es: {
      nav_home: "Inicio",
      nav_features: "Funcionalidades",
      nav_details: "Detalles",
      nav_why: "Por qué nosotros",
      nav_dev: "Desarrollador",
      hero_title: "AssetSense - Gestión de Activos",
      hero_desc: "Centralice el control de Activos, Solicitudes, Retiros, Devoluciones y mucho más en una plataforma integrada, simple y con altísima visibilidad.",
      hero_btn: "Ver Funcionalidades",
      feat_custom_title: "Personalizable",
      feat_custom_desc: "El software AssetSense es altamente personalizable, adaptándose a las necesidades específicas de cada empresa. Con registro flexible de activos, estados y ubicaciones, el sistema se adapta perfectamente a requisitos únicos, ofreciendo una solución versátil.",
      feat_simple_title: "Diseño Simple",
      feat_simple_desc: "Con un diseño elegante e intuitivo, AssetSense proporciona una experiencia de usuario simplificada. Su interfaz limpia y organizada facilita la navegación, facilitando la búsqueda de la información deseada. El diseño simple permite una curva de aprendizaje rápida.",
      feat_easy_title: "Fácil de Usar",
      feat_easy_desc: "AssetSense fue desarrollado para ser fácil de usar. Con una interfaz amigable e intuitiva, la gestión de activos se vuelve simple y sin complicaciones. Desde el registro hasta la generación de informes, todos los pasos son accesibles, lo que hace que el sistema sea adecuado para usuarios de todos los niveles de habilidad técnica.",
      about_assets_title: "Activos - Listado, Detalles y Seguimiento",
      about_assets_p1: "Obtenga el control completo y centralizado de todos los activos de su empresa. Nuestro sistema ofrece un listado detallado e intuitivo de equipos con filtros inteligentes por ubicación, estado y categoría de activo.",
      about_assets_p2: "Acceda a una pantalla de detalles exclusiva para cada activo, donde puede ver especificaciones técnicas completas, historial completo de movimientos de custodia, registros de auditoría y solicitudes asociadas.",
      about_moves_title: "Movimientos - Control de Retiros y Devoluciones",
      about_moves_p1: "Evite pérdidas y sepa exactamente quién tiene cada activo en tiempo real. AssetSense simplifica el registro físico de movimientos, permitiendo realizar retiros en segundos vinculados directamente al colaborador responsable.",
      about_moves_p2: "Defina plazos esperados para la devolución, registre firmas y términos de responsabilidad, y evalúe las condiciones físicas del equipo al momento de la devolución para un estricto control patrimonial.",
      about_reqs_title: "Solicitudes - Flujos Personalizados y Aprobaciones",
      about_reqs_p1: "Ofrezca un canal ágil para que sus colaboradores soliciten nuevos activos y equipos directamente a través del portal. Los administradores cuentan con una interfaz integrada para revisar, aprobar, rechazar o solicitar aclaraciones sobre las solicitudes.",
      about_reqs_p2: "Configure reglas y límites personalizados para solicitudes automáticas según el departamento, garantizando el cumplimiento total de las políticas internas de TI e infraestructura de la organización.",
      about_security_title: "Seguridad, Perfiles de Acceso y Parametrización",
      about_security_p1: "Garantice que la información de la empresa esté protegida mediante un control de acceso granular de alto nivel. Cada usuario tiene un perfil detallado con permisos de visualización, edición o aprobación claramente parametrizados.",
      about_security_p2: "Acceda a la pantalla de configuración para personalizar categorías de activos, estados, ubicaciones de almacenamiento físico y datos del perfil corporativo de forma rápida y centralizada.",
      why_title: "¿Por qué elegir AssetSense?",
      why_subtitle: "Descubra por qué AssetSense es la opción ideal para la gestión de activos. Con características personalizables, un diseño atractivo y alto rendimiento, nuestra plataforma ofrece una solución completa y eficiente. Pruebe AssetSense hoy y lleve su gestión de activos a un nuevo nivel.",
      why_saas_title: "Centrado en SaaS",
      why_saas_desc: "AssetSense es un software SaaS (Software como Servicio) accesible a través de Internet, lo que le permite administrar sus activos de manera fácil y rápida, desde cualquier lugar y en cualquier momento.",
      why_design_title: "Diseño Increíble",
      why_design_desc: "Con un diseño atractivo e intuitivo, AssetSense ofrece una interfaz de usuario hermosa y funcional, proporcionando una experiencia de usuario agradable.",
      why_ready_title: "Listo para usar",
      why_ready_desc: "AssetSense está listo para usar tan pronto como se convierta en nuestro cliente. No hay necesidad de largas implementaciones ni configuraciones complejas. Simplemente inicie sesión y comience a administrar sus activos de inmediato. Con una configuración inicial simplificada, ahorra tiempo y esfuerzo, disfrutando rápidamente de todos los beneficios de nuestra solución de gestión de activos.",
      why_custom_title: "Personalizable",
      why_custom_desc: "AssetSense es altamente personalizable para satisfacer las necesidades específicas de su empresa. Agregue campos personalizados, cree categorías únicas y configure permisos de acceso para obtener un sistema de gestión de activos adaptado a sus preferencias.",
      why_sections_title: "Secciones Esenciales",
      why_sections_desc: "AssetSense cuenta con secciones dedicadas al registro de activos, movimientos, solicitudes e informes, garantizando una organización clara y un acceso rápido a la información importante.",
      why_optimized_title: "Altamente Optimizado",
      why_optimized_desc: "AssetSense ha sido optimizado para un rendimiento excepcional, lo que le permite administrar una gran cantidad de activos de manera rápida y eficiente, sin demoras ni problemas de rendimiento. Tendrá una experiencia de usuario fluida y eficaz.",
      dev_section_title: "Sobre el Desarrollador",
      dev_title: "Bruno Kappi",
      dev_subtitle: "Desarrollador Fullstack & Analista de Sistemas",
      dev_location: "Novo Hamburgo, Rio Grande do Sul, Brazil",
      dev_bio1: "Con experiencia tanto en automatización industrial como en desarrollo web moderno, Bruno aporta una combinación única de profundidad técnica y visión de producto a todo lo que construye.",
      dev_bio2: "Él cree que el software debe ser elegante, eficiente y, sobre todo, útil.",
      footer_desc: "Plataforma moderna de gestión de activos para empresas de todos los tamaños."
    }
  };

  // Language management
  function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;

    // Update texts with data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.innerText = translations[lang][key];
      }
    });

    // Update active class on lang buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Bind language switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const lang = this.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  // Global theme management
  function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update all mockup images with class 'theme-dependent-mockup'
    document.querySelectorAll('.theme-dependent-mockup').forEach(img => {
      const darkSrc = img.getAttribute('data-dark-src');
      const lightSrc = img.getAttribute('data-light-src');
      if (theme === 'dark' && darkSrc) {
        img.src = darkSrc;
      } else if (theme === 'light' && lightSrc) {
        img.src = lightSrc;
      }
    });

    // Update button active classes
    document.querySelectorAll('.theme-btn').forEach(b => {
      if (b.getAttribute('data-theme') === theme) {
        b.classList.add('active');
        b.classList.add('btn-primary');
        b.classList.remove('btn-outline-primary');
        b.style.borderColor = '';
      } else {
        b.classList.remove('active');
        b.classList.remove('btn-primary');
        b.classList.add('btn-outline-primary');
        b.style.borderColor = 'transparent';
      }
    });

    // Update icon class on theme toggle buttons
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'lni lni-night';
      } else {
        themeIcon.className = 'lni lni-sun';
      }
    }
  }

  // Bind theme buttons (both hero and navbar toggles)
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const theme = this.getAttribute('data-theme');
      setTheme(theme);
    });
  });

  const universalThemeToggle = document.getElementById('themeToggle');
  if (universalThemeToggle) {
    universalThemeToggle.addEventListener('click', function (e) {
      e.preventDefault();
      const currentTheme = document.body.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // Initialize theme and language on DOM load
  const initialTheme = localStorage.getItem('theme') || 'dark';
  setTheme(initialTheme);

  const initialLang = localStorage.getItem('lang') || 'en';
  setLanguage(initialLang);

  // WOW active
  new WOW().init();
})();
