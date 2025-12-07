export const cvData = {
    name: "Thais A. Molina",
    title: "Junior Data Analyst & Applied ML Engineer ",
    contact: {
        phone: "+5493517878146",
        email: "thais.molina.tech@gmail.com",
        location: "Relocating to Shanghai Jan 2026",
    },
    summary: "Senior Full-Stack Engineer with 8+ years of experience delivering high-performance distributed systems using Java, Kotlin, and Next.js. I specialize in modernizing legacy financial monoliths into scalable, event-driven microservices ready for cloud deployment. Proven track record of solving complex architectural challenges, optimizing data layers for massive scale, and bridging the gap between complex backend logic and modern frontends. Currently expanding architectural scope through advanced GCP and Cybersecurity certifications.",

    experience: [
        {
            title: "Senior Full Stack Engineer (Independent Consultant)",
            company: "Self-Employed",
            dates: "Jan 2024 – Present",
            description: [
                "Architected the end-to-end infrastructure for a high-traffic events ticketing platform, designing for high-concurrency loads with failover redundancy.",
                "Engineered a high-performance financial dashboard using Next.js and Spring Boot, implementing Redis caching and optimized SQL indexing to minimize data retrieval latency.",
                "Designed a type-safe, full-stack schema using Drizzle, Prisma, and Zod, establishing a zero-trust architecture that strictly validates data integrity at runtime.",
                "Implemented secure, role-based authentication (RBAC) using NextAuth.js, ensuring future-proof compliance with strict data privacy standards.",
            ],
        },
        {
            title: "Full Stack Developer",
            company: "Team International",
            dates: "Nov 2022 – Dec 2023",
            description: [
                "Architected the backend ingestion engine for a Smart City IoT solution, capable of processing high-volume daily sensor events using Kotlin microservices.",
                "Enhanced frontend rendering performance for real-time data visualization dashboards using React and optimized state management strategies.",
                "Refactored legacy services into modular NestJS microservices, significantly reducing deployment complexity and CI/CD build times.",
                "Designed scalable PostgreSQL database models to store historical IoT data, optimizing storage efficiency through table partitioning and indexing.",
            ],
        },
        {
            title: "Java Developer (Bench / R&D)",
            company: "Distillery",
            dates: "May 2022 – Nov 2022",
            description: [
                "Engaged in an intensive technical upskilling program focused on advanced Kotlin patterns and microservices architecture.",
                "Completed specialized training modules on distributed systems and cloud-native best practices to prepare for high-complexity client engagements.",
                "Conducted research on modern Java ecosystems, solidifying expertise in Spring Boot and reactive programming paradigms.",
            ],
        },
        {
            title: "Senior Developer",
            company: "Superalgos",
            dates: "Nov 2021 – May 2022",
            description: [
                "Served as Core Architect for an open-source social trading network, overseeing a codebase designed for decentralized, high-frequency trading operations.",
                "Optimized Node.js API endpoints to handle high-throughput data streams, ensuring system stability under peak theoretical loads.",
                "Established rigorous code review standards and pair programming practices, significantly reducing bug regression rates.",
            ],
        },
        {
            title: "Full Stack Developer",
            company: "Dev VOWEL",
            dates: "Feb 2020 – Feb 2022",
            description: [
                "Engineered the core credit servicing engine for Prelios (European Fintech Leader), architecting workflows to manage complex distressed loan portfolios.",
                "Executed the migration of a legacy banking monolith to a Dockerized Kotlin microservices architecture, establishing a foundation for horizontal scalability.",
                "Integrated Keycloak for centralized identity management, unifying authentication across multiple distinct banking applications.",
                "Automated CI/CD pipelines using Jenkins/GitLab, enabling continuous delivery and significantly reducing manual release overhead.",
            ],
        },
        {
            title: "Java Developer",
            company: "DXC Technology",
            dates: "Aug 2018 – Jan 2020",
            description: [
                "Executed the strategic strangulation of the monolithic Sabre booking software, successfully decoupling core modules into independent microservices.",
                "Maintained operational stability during the migration of mission-critical booking data for major airline clients.",
                "Optimized complex Hibernate queries, resolving long-standing performance bottlenecks in report generation.",
            ],
        },
    ],
    skills: {
        "Core Tech Stack": [
            { name: "Java (Spring Boot)", level: 4 }, { name: "Kotlin", level: 4 },
            { name: "Node.js (NestJS)", level: 4 }, { name: "React & Next.js", level: 4 },
            { name: "TypeScript", level: 4 }, { name: "SQL & PostgreSQL", level: 4 }
        ],
        "Cloud & DevOps": [
            { name: "Docker", level: 4 },
            { name: "CI/CD (Jenkins/GitLab)", level: 4 },
            { name: "Kubernetes", level: 3 },
            { name: "AWS (ECS/S3)", level: 3 },
            { name: "Google Cloud (GCP)", level: 2 },
            { name: "Nginx", level: 3 }
        ],
        "Security & Identity": [
            { name: "OAuth2 & OIDC", level: 3 }, { name: "JWT Strategy", level: 3 },
            { name: "Keycloak", level: 3 }, { name: "NextAuth.js", level: 4 },
            { name: "OWASP Principles", level: 3 }
        ],
        "Architecture & Data": [
            { name: "Microservices", level: 4 }, { name: "Event-Driven Arch", level: 3 },
            { name: "Kafka / RabbitMQ", level: 3 }, { name: "Redis Caching", level: 3 },
            { name: "Hibernate / Prisma", level: 3 }, { name: "REST & GraphQL", level: 4 }
        ],
        "Testing & Quality": [
            { name: "JUnit & Mockito", level: 4 }, { name: "TDD / BDD", level: 3 },
            { name: "Integration Testing", level: 4 }, { name: "End-to-End Testing", level: 3 }
        ],
        "Soft Skills": [
            { name: "System Design", level: 4 }, { name: "Mentoring", level: 4 },
            { name: "Agile & Scrum", level: 4 }, { name: "Problem Solving", level: 4 }
        ]
    },
    education: [
        {
            degree: "Professional Certificate: Google Cloud Platform (GCP) Architecture",
            university: "Google Cloud Skills Boost",
            dates: "2025 – Present (In Progress)",
        },
        {
            degree: "Google Cybersecurity Professional Certificate",
            university: "Coursera / Google",
            dates: "2025 – Present (In Progress)",
        },
        {
            degree: "University Studies in Computing Engineering",
            university: "21st Century Business University",
            dates: "2019 – 2022",
        },
    ],
    languages: [
        { name: "English", proficiency: "Full Professional Proficiency (C2)" },
        { name: "Spanish", proficiency: "Native / Bilingual" },
    ],
};
