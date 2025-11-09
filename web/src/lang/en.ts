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
  },
  dashboard: {
    nav: {
      dashboard: 'Dashboard',
      harmonogram: 'Schedule',
      employees: 'Employees',
      institutions: 'Institutions',
      subjects: 'Subjects',
      inbox: 'Inbox',
      settings: 'Settings',
    },
  },
  table: {
    header: {
      title: 'Title',
      message: 'Message',
      priority: 'Priority',
      date: 'Date',
      read: 'Read',
    },
  },
} satisfies I18nSchema

export default en
