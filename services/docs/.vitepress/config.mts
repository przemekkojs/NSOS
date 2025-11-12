import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "NSOS Documentation",
  description:
    "Academic management system for monitoring and minimizing teacher overtime",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/overview" },
      { text: "Administrator", link: "/administrator/" },
      { text: "Teacher", link: "/teacher/" },
      { text: "Use Cases", link: "/use-cases/overview" },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "Introduction",
          items: [
            { text: "Overview", link: "/guide/overview" },
            { text: "Getting Started", link: "/guide/getting-started" },
            { text: "User Roles", link: "/guide/user-roles" },
            { text: "Key Concepts", link: "/guide/key-concepts" },
          ],
        },
      ],

      "/administrator/": [
        {
          text: "Administrator Guide",
          items: [
            { text: "Overview", link: "/administrator/" },
            {
              text: "Teacher Management",
              link: "/administrator/teacher-management",
            },
            { text: "Semester Setup", link: "/administrator/semester-setup" },
            {
              text: "Subject Assignment",
              link: "/administrator/subject-assignment",
            },
            {
              text: "Overtime Monitoring",
              link: "/administrator/overtime-monitoring",
            },
            { text: "Reporting", link: "/administrator/reporting" },
          ],
        },
        {
          text: "Common Tasks",
          items: [
            {
              text: "Adding New Teacher",
              link: "/administrator/tasks/add-teacher",
            },
            {
              text: "Creating Teaching Groups",
              link: "/administrator/tasks/create-groups",
            },
            {
              text: "Handling Overtime",
              link: "/administrator/tasks/handle-overtime",
            },
          ],
        },
      ],

      "/teacher/": [
        {
          text: "Teacher Guide",
          items: [
            { text: "Overview", link: "/teacher/" },
            {
              text: "Viewing Your Schedule",
              link: "/teacher/viewing-schedule",
            },
            {
              text: "Understanding Pensum",
              link: "/teacher/understanding-pensum",
            },
            { text: "Personal Hour Register", link: "/teacher/hour-register" },
          ],
        },
      ],

      "/use-cases/": [
        {
          text: "Use Cases",
          items: [
            { text: "Overview", link: "/use-cases/overview" },
            {
              text: "UC-01: Create Teacher Account",
              link: "/use-cases/uc-01-create-teacher",
            },
            {
              text: "UC-02: Define Academic Position",
              link: "/use-cases/uc-02-define-position",
            },
            {
              text: "UC-03: Create Subject & Groups",
              link: "/use-cases/uc-03-create-subject",
            },
            {
              text: "UC-04: Overtime Dashboard",
              link: "/use-cases/uc-04-overtime-dashboard",
            },
            {
              text: "UC-05: Personal Hour Register",
              link: "/use-cases/uc-05-hour-register",
            },
            {
              text: "UC-06: Modify Assignment",
              link: "/use-cases/uc-06-modify-assignment",
            },
            {
              text: "UC-07: Generate Report",
              link: "/use-cases/uc-07-generate-report",
            },
            {
              text: "UC-08: Manage Semester",
              link: "/use-cases/uc-08-manage-semester",
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/przemekkojs/NSOS" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025-present NSOS Team",
    },

    search: {
      provider: "local",
    },

    editLink: {
      pattern: "https://github.com/przemekkojs/NSOS/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },

    lastUpdated: {
      text: "Updated at",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
  },
});
