import type { I18nSchema } from './pl'

const en = {
  common: {
    yes: 'Yes',
    no: 'No',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    confirm: 'Confirm',
    actions: 'Actions',
    invite: 'Invite',
    create: 'Create',
  },
  dashboard: {
    nav: {
      dashboard: 'Dashboard',
      harmonogram: 'Schedule',
      employees: 'Employees',
      institutions: 'Institutions',
      courses: 'Courses',
      inbox: 'Inbox',
      settings: 'Settings',
      feedback: 'Feedback',
      help: 'Help',
    },
  },
  table: {
    header: {
      title: 'Title',
      message: 'Message',
      priority: 'Priority',
      date: 'Date',
      read: 'Read',
      email: 'Email',
      faculty: 'Faculty',
      position: 'Position',
      name: 'Name',
      address: 'Address',
    },
    ariaLabel: {
      actions: 'Actions',
    },
    actions: {
      copyId: 'Copy ID',
      viewDetails: 'View Details',
    },
  },
  chat: {
    tooltip: 'AI Chat',
    placeholder: 'Ask a question or enter a command...',
  },
  notifications: {
    tooltip: 'Notifications',
  },
  error: {
    pageNotFound: 'Page not found',
    pageNotFoundDescription: "The page you're looking for doesn't exist.",
    backToHome: 'Back to Home',
  },
  institution: {
    create: {
      title: 'Create a new institution',
      description: 'Create a new institution to start managing its data and users.',
      submit: 'Create Institution',
    },
    fields: {
      name: 'Institution Name',
      address: 'Institution Address',
      code: 'Institution Code',
    },
  },
} satisfies I18nSchema

export default en
