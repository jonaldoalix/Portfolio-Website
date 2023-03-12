import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation";

// Splash Screen
const splashScreen = {
  enabled: true,
  animation: splashAnimation,
  duration: 2000
};

// Summary And Greeting Section
const illustration = {
  animated: true
};

const greeting = {
  username: "JonaldoAlix",
  title: "Hi! I'm Jonaldo!",
  subTitle: "Need an experienced developer to advance your business or personal technologies? Look no further!",
  quote: "Share your development goals with me and I will make them a reality. Share your passions with me and together, we will create your dreams",
  resumeLink: "/JAResume2023.pdf",
  resumeLinkLabel: "View Resume",
  displayGreeting: true
};

// Social Media Links
const socialMediaLinks = {
  github: "https://github.com/jonaldoalix",
  linkedin: "https://linkedin.com/in/jonaldo-alix/",
  email: "me@jonaldoalix.com",
  twitter: "https://twitter.com/jonaldoalix",
  gitlab: "",
  facebook: "",
  medium: "",
  stackoverflow: "",
  instagram: "",
  kaggle: "",
  display: true // Set true to display this section, defaults to false
};

// Skills Section
const skillsSection = {
  title: "What I Do",
  subTitle: "Using modern libraries, languages, and frameworks, I take your needs, evaluate the best options to get them done and turn them into reality.  No project too simple, no project too complex. Below are just SOME of the technologies I am an expert with!",
  skills: [
    emoji(
      "⚡ Single Page Websites, Multiple Page Websites, Complete Front-End Websites, Web Apps"
    ),
    emoji("⚡ Internal Websites, Back End Websites, APIs, Web Tools, Integrations with Third-Party Services, Database Administration and Acquisition"),
    emoji(
      "⚡ Mobile App Front-Ends, Mobile App Back End, Full-Stack Projects, App Hosting, App Publishing"
    ),
    emoji(
      "⚡ Wireframes and Mockups, System Analysis, Server Administration, Domain Acquisitions, Web Hosting, and more upon request"
    )
  ],

  softwareSkills: [
    {
      skillName: "html-5",
      fontAwesomeClassname: "fab fa-html5"
    },
    {
      skillName: "css3",
      fontAwesomeClassname: "fab fa-css3-alt"
    },
    {
      skillName: "sass",
      fontAwesomeClassname: "fab fa-sass"
    },
    {
      skillName: "JavaScript",
      fontAwesomeClassname: "fab fa-js"
    },
    {
      skillName: "reactjs",
      fontAwesomeClassname: "fab fa-react"
    },
    {
      skillName: "nodejs",
      fontAwesomeClassname: "fab fa-node"
    },
    {
      skillName: "npm",
      fontAwesomeClassname: "fab fa-npm"
    },
    {
      skillName: "sql-database",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "aws",
      fontAwesomeClassname: "fab fa-aws"
    },
    {
      skillName: "react-native",
      fontAwesomeClassname: "fas fa-mobile"
    },
    {
      skillName: "docker",
      fontAwesomeClassname: "fab fa-docker"
    },
    {
      skillName: "servers",
      fontAwesomeClassname: "fas fa-server"
    },
    {
      skillName: "bootstrap",
      fontAwesomeClassname: "fab fa-brands fa-bootstrap"
    },
    {
      skillName: "windows",
      fontAwesomeClassname: "fab fa-brands fa-windows"
    },
    {
      skillName: "apple",
      fontAwesomeClassname: "fab fa-brands fa-apple"
    },
    {
      skillName: "linux",
      fontAwesomeClassname: "fab fa-brands fa-linux"
    },
    {
      skillName: "ubuntu",
      fontAwesomeClassname: "fab fa-brands fa-ubuntu"
    },
    {
      skillName: "redhat",
      fontAwesomeClassname: "fab fa-brands fa-redhat"
    },
    {
      skillName: "centos",
      fontAwesomeClassname: "fab fa-brands fa-centos"
    },
    {
      skillName: "fedora",
      fontAwesomeClassname: "fab fa-brands fa-fedora"
    },
    {
      skillName: "ssl",
      fontAwesomeClassname: "fab fa-brands fa-expeditedssl"
    },
    {
      skillName: "php",
      fontAwesomeClassname: "fab fa-brands fa-php"
    },
    {
      skillName: "wordpress",
      fontAwesomeClassname: "fab fa-brands fa-wordpress"
    },
    {
      skillName: "mongodb",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "voip",
      fontAwesomeClassname: "fas fa-phone"
    },
    {
      skillName: "java",
      fontAwesomeClassname: "fab fa-brands fa-java"
    }
  ],
  display: true
};

// Education Section
const educationInfo = {
  display: true,
  schools: [
    {
      schoolName: "Northeastern University",
      logo: require("./assets/images/neuLogo.png"),
      subHeader: "Bachelor of Science in IT (Software Engineering Concentration)",
      duration: "September 2018 - Present",
      desc: "College of Professional Studies (CPS)",
      descBullets: ["Boston, MA", "PLUS: Minor in Business Administration concurrently"]
    }
  ]
};

// Your top stacks
const techStack = {
  viewSkillBars: true,
  title: "What I Do Most Often",
  unit: "of jobs",
  experience: [
    {
      Stack: "LAMP Stacks",
      progressPercentage: "55%"
    },
    {
      Stack: "MERN Stacks",
      progressPercentage: "45%"
    },
    {
      Stack: "OOP Languages",
      progressPercentage: "85%"
    },
    {
      Stack: "Script Languages",
      progressPercentage: "85%"
    }
  ],
  displayCodersrank: false
};

// Work experience section
const workExperiences = {
  display: true,
  title: "Highlights",
  experience: [
    {
      role: "Senior Full-Stack Developer",
      company: "Full Stack Boston",
      companylogo: require("./assets/images/fsbLogo.png"),
      date: "Jan 2023 – Present",
      desc: "Assist clients in getting their IT and development needs fulfilled as they are discovered as well as consult them on ways to improve their business technologies to grow their efficiency and offerings.",
      descBullets: [
        "Serve as analyst to assess client needs and best approaches to achieving their goals",
        "Mockup design concepts, if needed, to establish client needs in a visual way and finalize their goals",
        "Create or update their projects using their desired or our recommended systems",
        "Test and present our work for the client and then assist them with going live whether we will be maintaining the project or not in the future",
        "Follow up with clients to make sure their needs were indeed met and see if there is anything else we can offer them or assist them with"
      ]
    },
    {
      role: "Frontend/Backend Developer",
      company: "NRSTPA / Community Bank",
      companylogo: require("./assets/images/nrstpaLogo.png"),
      date: "August 2022 – Present",
      desc: "As part of a small team of IT professionals, I would assist Operations with any database updates and maintenance, website mockups, creation, modification, and deployments, as well as create and maintain day to day tools that made the business increasingly efficient.",
      descBullets: [
        "Build/Maintain 120+ and growing client-facing websites in varying versions of ASP.NET, HTML, and C",
        "Build/Maintain 250+ and growing client and internal SQL databases",
        "Use exclusively Microsoft products like VS Studio, SSMS, TFS, Azure, Teams, etc."
      ]
    },
    {
      role: "Web Developer / DB Admin / Hosting Provider",
      company: "Reverend Robert B. Parker Memorial Fund",
      companylogo: require("./assets/images/parkerFundLogo.png"),
      date: "Feb 2020 – Present",
      desc: "As part of this committee, I facilitate the use of technologies to efficiently seek, engage, and reward qualified applicants to receive a well established scholarship towards their undergraduate college education",
      descBullets: [
        "Provision servers to host legacy and current applicant data",
        "Provision servers to host informational website, applicant portal, and digital interviews when needed",
        "Voted onto the board that handles awards and oversees the fund in 2022"
      ]
    },
    {
      role: "Head of Technology / Co-Owner",
      company: "Bonaloop, LLC",
      companylogo: require("./assets/images/bonaloopLogo.png"),
      date: "August 2019 – Present",
      desc: "Brainstorm and build technology assets like sites, apps, infrastructure, and tools like CRMs, chat bots, and VoIP trunks to modernize the business and allow it to grow and expand safely.",
      descBullets: [
        "Provision (LAMP) server using AWS tools like EC2, SES, SNS, Cognito, VPN, Pinpoint, RDP, Polly, and more",
        "Provision (MERN) server using AWS tools to modernize business tools and integrations as well as aesthetics",
        "Provision 3CX server and services to host VoIP and incoming and outgoing message service",
        "Design, create and maintain Bonaloop (REST) API with highly secured JWT auth process",
        "Provision load balancers for reliable use (REST) APIs, Sites, and Admin tools",
        "Use AWS tools and experience to configure network assets like VPN, Subnets, Gateways, Firewalls and more to maintain a 99% up-time and handle surge periods and future growth",
        "Implement modern tools and third-party integrations to include e-commerce functionalities like payment processing, accounting, inventory management, SEO optimization, and more"
      ]
    },
    {
      role: "Head of Technology / Owner",
      company: "Be Useful, LLC",
      companylogo: require("./assets/images/beUsefulLogo.jpg"),
      date: "Nov 2016 – March 2020",
      desc: "Build complete suite of tools and technology to facilitate handyman startup business that eventually was sold to another local competitor and expanded upon.",
      descBullets: [
        "Handled the creation and maintenance of all digital assets like social media, phone lines, websites, apps, and integrations to third-party tools",
        "Handled domain acquisition and configuration as well as email server configuration",
        "Also served as one of the business' independent contractors offering smart home consultations and installations as well as on call assistance to clients who needed technological assistance"
      ]
    },
    {
      role: "Web Developer / IT Admin / Hosting Provider",
      company: "Components USA",
      companylogo: require("./assets/images/cusaLogo.png"),
      date: "Jan 2016 - Present",
      desc: "Serve on call to facilitate sales, and finance departments with any requests for technological assistance like dynamic templating, email routing or configurations, domain management, and other IT needs",
      descBullets: [
        "Designed and developed company informational site",
        "Migrated well over half a million sent and received emails as well as thousands of files and data from estranged servers that were not traditionally reachable with a 100% success rate",
        "Manage the business servers and social presence",
        "Create templates for invoicing, quoting, and accounting purposes so that workflows are streamlined and highly efficient without compromising on quality and thoroughness",
        "Actively work with management to improve future processes",
        "Provision and configure automatic process for securing legacy and daily backups of data for redundancy and consistency"
      ]
    }
  ]
};

// GitHub Pinned Projects and Profile Info
const openSource = {
  showGithubProfile: "true", // Profile Info
  display: true // Pinned Projects
};

// Some big projects you have worked on
const bigProjects = {
  title: "Hosted Samples",
  subtitle: "Actual code and projects from past tasks that have been rebranded and stripped, if necessary, for demonstrative purposes",
  projects: [
    {
      image: require("./assets/images/bonaloopBanner.png"),
      projectName: "Bonaloop LAMP",
      projectDesc: "Bonaloop needed a portal site that integrated with their minimal backend while a new frontend and backend was developed so I quickly threw up a splash page that used PHP to speak to their databases directly and keep them open with a new refreshed modern look and individually trailored experiences for their users.",
      footerLink: [
        {
          name: "Old PHP Site (Coming Soon)",
          url: "#"
        },
        {
          name: "Old PHP Site Repo (Coming Soon)",
          url: "#"
        }
      ]
    },
    {
      image: require("./assets/images/bonaloopBanner.png"),
      projectName: "Bonaloop MERN",
      projectDesc: "Bonaloop.com new and improved website offering user portals, modern aesthetics, and greater reliability",
      footerLink: [
        {
          name: "Bonaloop's React Site",
          url: "https://bonaloop.com"
        },
        {
          name: "Bonaloop's React Site Repo (Coming Soon)",
          url: "#"
        }
      ]
    },
    {
      image: require("./assets/images/bonaloopBanner.png"),
      projectName: "Bonaloop REST API",
      projectDesc: "Bonaloop needed a new backend and wanted an API that would make app development in the future easier to integrate with as well as a backend site to assist them with manipulating their data and experiences.",
      footerLink: [
        {
          name: "Bonaloop API Docs",
          url: "https://api.bonaloop.com"
        },
        {
          name: "Bonaloop's API Repo (Coming Soon)",
          url: "#"
        }
      ]
    },
    {
      image: require("./assets/images/fsbBannerNBG.png"),
      projectName: "Full Stack Boston MERN",
      projectDesc: "Full Stack Boston wanted a website where users could learn more about them and request their services as well as a backend for it to store any collected data and be able to act on it.",
      footerLink: [
        {
          name: "Full Stack Boston Site (Coming Soon)",
          url: "#"
        },
        {
          name: "Full Stack Boston Site Repo (Coming Soon)",
          url: "#"
        }
      ]
    }
  ],
  display: true
};

// Achievement Section
const achievementSection = {
  title: emoji("Achievements And Certifications 🏆 "),
  subtitle: "Achievements, Certifications, Award Letters and Some Cool Stuff that I have done!",
  achievementsCards: [
    {
      title: "",
      subtitle: "",
      image: "", // require("/"),
      imageAlt: "",
      footerLink: [
        {
          name: "",
          url: ""
        },
        {
          name: "",
          url: ""
        },
        {
          name: "",
          url: ""
        }
      ]
    },
    {
      title: "",
      subtitle: "",
      image: "", // require("/"),
      imageAlt: "",
      footerLink: [
        {
          name: "",
          url: ""
        }
      ]
    },

    {
      title: "",
      subtitle: "",
      image: "", // require("/"),
      imageAlt: "",
      footerLink: [
        {
          name: "", 
          url: ""
        },
        {
          name: "",
          url: ""
        }
      ]
    }
  ],
  display: false
};

// Blogs Section
const blogSection = {
  title: "Blogs",
  subtitle: "",
  displayMediumBlogs: "false",
  blogs: [
    {
      url: "",
      title: "",
      description: ""
    },
    {
      url: "",
      title: "",
      description: ""
    }
  ],
  display: false
};

// Talks Sections
const talkSection = {
  title: "TALKS",
  subtitle: emoji("I LOVE TO NETWORK! 😅"),
  talks: [
    {
      title: "",
      subtitle: "",
      slides_url: "",
      event_url: ""
    }
  ],
  display: false
};

// Podcast Section
const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "I LOVE TO TALK ABOUT PROJECTS AND TECHNOLOGIES",
  podcast: [""],
  display: false
};

// Contact Section (If Github Profile Unavail)
const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle: "Have a tech need? Ready to get started? Need help getting started? Send me an inquiry! I'd be honored to help!",
  number: "+19783959234",
  email_address: "me@jonaldoalix.com"
};

// Twitter Section
const twitterDetails = {
  userName: "JonaldoAlix", // Your twitter username without @
  display: true
};

// Looking for Work? (Only shows on Github Profile Section)
const isHireable = true; // True or False Only 

// Footer Section
const footer = {
  copyrightOwner: "Jonaldo Alix"
};

// Header Section
const header = {
  logoImg: {
    dark: require("./assets/images/JAColorizedLogo.png"),
    light: require("./assets/images/JAInvertedLogo.png"),
    alt: "Jonaldo Alix's Logo"
  }
};

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  footer,
  header
};
