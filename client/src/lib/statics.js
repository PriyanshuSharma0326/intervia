import { HistoryIcon, HomeIcon, ProfileIcon } from "./icons";

const ROLES = {
    "Software Engineering": [
        "Frontend Engineer",
        "Backend Engineer",
        "Full Stack Engineer",
        "React Developer",
        "Node.js Developer",
        "Mobile App Developer",
        "DevOps Engineer",
        "QA Engineer",
    ],

    "Data & AI": [
        "Data Scientist",
        "Data Analyst",
        "Machine Learning Engineer",
        "AI Engineer",
        "Business Intelligence Analyst",
    ],

    "Design": [
        "UI Designer",
        "UX Designer",
        "Product Designer",
        "Graphic Designer",
    ],

    "Product": [
        "Product Manager",
        "Associate Product Manager",
        "Technical Product Manager",
        "Program Manager",
    ],

    "Marketing": [
        "Digital Marketing Specialist",
        "SEO Specialist",
        "Content Strategist",
        "Performance Marketer",
        "Social Media Manager",
    ],

    "Sales": [
        "Account Executive",
        "Sales Development Representative",
        "Customer Success Manager",
        "Business Development Manager",
        "Inside Sales Representative",
    ],

    "HR & Recruiting": [
        "HR Manager",
        "Technical Recruiter",
        "People Operations Manager",
        "Talent Acquisition Specialist",
        "HR Business Partner",
    ],

    "Finance & Accounting": [
        "Financial Analyst",
        "Accountant",
        "Investment Analyst",
        "Auditor",
        "Finance Manager",
    ],

    "Operations": [
        "Operations Manager",
        "Supply Chain Analyst",
        "Logistics Coordinator",
        "Business Operations Associate",
    ],

    "Cybersecurity": [
        "Security Analyst",
        "Cybersecurity Engineer",
        "SOC Analyst",
        "Penetration Tester",
    ],

    "Cloud & Infrastructure": [
        "Cloud Engineer",
        "Site Reliability Engineer",
        "Infrastructure Engineer",
        "Systems Administrator",
    ],

    "Support": [
        "Technical Support Engineer",
        "IT Support Specialist",
        "Help Desk Technician",
        "Customer Support Specialist",
    ],

    "Education": [
        "Teacher",
        "Online Tutor",
        "Instructional Designer",
        "Academic Counselor",
    ],

    "Healthcare": [
        "Registered Nurse",
        "Medical Assistant",
        "Healthcare Administrator",
        "Clinical Research Coordinator",
    ],

    "Legal": [
        "Legal Associate",
        "Corporate Lawyer",
        "Paralegal",
        "Compliance Officer",
    ],
};

const DIFFICULTIES = ["Easy", "Medium", "Hard"];

const NAV_LINKS = [
    { to: "/", label: "Home", icon: HomeIcon },
    { to: "/history", label: "History", icon: HistoryIcon },
    { to: "/profile", label: "Profile", icon: ProfileIcon },
];

export {
    ROLES,
    DIFFICULTIES,
    NAV_LINKS
}
