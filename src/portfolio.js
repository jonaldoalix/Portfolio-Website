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
  username: "Demo",
  title: "Hi! I'm Demo!",
  subTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  resumeLink: "#", // "./filename.pdf"
  resumeLinkLabel: "View Resume",
  displayGreeting: true
};

// Social Media Links
const socialMediaLinks = {
  github: "#",
  linkedin: "#",
  email: "#",
  twitter: "#",
  gitlab: "#",
  facebook: "#",
  medium: "#",
  stackoverflow: "#",
  instagram: "#",
  kaggle: "#",
  display: true
};

// Skills Section
const skillsSection = {
  title: "What I Do",
  subTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  skills: [
    emoji(
      "⚡ Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
    ),
    emoji("⚡ Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"),
    emoji(
      "⚡ Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    ),
    emoji(
      "⚡ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
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
      schoolName: "School Name",
      logo: require("./assets/images/neuLogo.png"),
      subHeader: "Degree Obtained",
      duration: "Date Started - Date Completed",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      descBullets: [
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", 
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"]
    },
    {
        schoolName: "School Name",
        logo: require("./assets/images/neuLogo.png"),
        subHeader: "Degree Obtained",
        duration: "Date Started - Date Completed",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        descBullets: [
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", 
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"]
      }
  ]
};

// Your top stacks
const techStack = {
  viewSkillBars: true,
  title: "Stack Highlight",
  unit: "unit of measurement",
  experience: [
    {
      Stack: "Name of Measurement",
      progressPercentage: "90%"
    },
    {
      Stack: "Name of Measurement",
      progressPercentage: "50%"
    },
    {
      Stack: "Name of Measurement",
      progressPercentage: "75%"
    },
    {
      Stack: "Name of Measurement",
      progressPercentage: "25%"
    }
  ],
  displayCodersrank: false
};

// Work experience section
const workExperiences = {
  display: true,
  title: "Exerience",
  experience: [
    {
      role: "Role or Title Held",
      company: "Company Name",
      companylogo: require("./assets/images/fsbLogo.png"),
      date: "Date Started – Date Ended",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      descBullets: [
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      ]
    },
    {
        role: "Role or Title Held",
        company: "Company Name",
        companylogo: require("./assets/images/nrstpaLogo.png"),
        date: "Date Started – Date Ended",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        descBullets: [
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        ]
    },
    {
        role: "Role or Title Held",
        company: "Company Name",
        companylogo: require("./assets/images/bonaloopLogo.png"),
        date: "Date Started – Date Ended",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        descBullets: [
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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
  title: "Big Projects",
  subtitle: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  projects: [
    {
      image: require("./assets/images/bonaloopBanner.png"),
      projectName: "Project Name",
      projectDesc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      footerLink: [
        {
          name: "Link Label",
          url: "#"
        },
        {
          name: "Another Link",
          url: "#"
        }
      ]
    },
    {
      image: require("./assets/images/fsbBannerNBG.png"),
      projectName: "Project Name",
      projectDesc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      footerLink: [
        {
          name: "Link Label",
          url: "#"
        },
        {
          name: "Another Link",
          url: "#"
        }
      ]
    },
    {
        image: require("./assets/images/bonaloopBanner.png"),
        projectName: "Project Name",
        projectDesc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        footerLink: [
          {
            name: "Link Label",
            url: "#"
          },
          {
            name: "Another Link",
            url: "#"
          }
        ]
      },
      {
        image: require("./assets/images/fsbBannerNBG.png"),
        projectName: "Project Name",
        projectDesc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        footerLink: [
          {
            name: "Link Label",
            url: "#"
          },
          {
            name: "Another Link",
            url: "#"
          }
        ]
      },
      {
        image: require("./assets/images/bonaloopBanner.png"),
        projectName: "Project Name",
        projectDesc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        footerLink: [
          {
            name: "Link Label",
            url: "#"
          },
          {
            name: "Another Link",
            url: "#"
          }
        ]
      },
      {
        image: require("./assets/images/fsbBannerNBG.png"),
        projectName: "Project Name",
        projectDesc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        footerLink: [
          {
            name: "Link Label",
            url: "#"
          },
          {
            name: "Another Link",
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
  subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  number: "+13456789012",
  email_address: "example@example.com"
};

// Twitter Section
const twitterDetails = {
  userName: "Twitter", // Your twitter username without @
  display: true
};

// Looking for Work? (Only shows on Github Profile Section)
const isHireable = false; // True or False Only 

// Footer Section
const footer = {
  copyrightOwner: "Your Name Here"
};

// Header Section
const header = {
  logoImg: {
    dark: require("./assets/images/JAColorizedLogo.png"),
    light: require("./assets/images/JAInvertedLogo.png"),
    alt: "Logo"
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
