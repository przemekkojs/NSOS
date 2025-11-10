const pl = {
  common: {
    yes: 'Tak',
    no: 'Nie',
    cancel: 'Anuluj',
    save: 'Zapisz',
    edit: 'Edytuj',
    delete: 'Usuń',
    confirm: 'Potwierdź',
    actions: 'Akcje',
    invite: 'Zaproś',
    create: 'Utwórz',
  },
  dashboard: {
    nav: {
      dashboard: 'Panel główny',
      harmonogram: 'Harmonogram',
      employees: 'Pracownicy',
      institutions: 'Instytucje',
      courses: 'Kursy',
      inbox: 'Skrzynka odbiorcza',
      settings: 'Ustawienia',
      feedback: 'Opinie',
      help: 'Pomoc',
    },
  },
  table: {
    header: {
      title: 'Tytuł',
      message: 'Wiadomość',
      priority: 'Priorytet',
      date: 'Data',
      read: 'Przeczytane',
      email: 'Email',
      faculty: 'Wydział',
      position: 'Stanowisko',
      name: 'Nazwa',
      address: 'Adres',
    },
    ariaLabel: {
      actions: 'Akcje',
    },
    actions: {
      copyId: 'Kopiuj ID',
      viewDetails: 'Zobacz szczegóły',
    },
  },
  chat: {
    tooltip: 'Czat AI',
    placeholder: 'Zadaj pytanie lub wpisz polecenie...',
  },
  notifications: {
    tooltip: 'Powiadomienia',
  },
  error: {
    pageNotFound: 'Strona nie została znaleziona',
    pageNotFoundDescription: 'Strona, której szukasz, nie istnieje.',
    backToHome: 'Powrót do strony głównej',
  },
  institution: {
    create: {
      title: 'Utwórz nową instytucję',
      description: 'Utwórz nową instytucję, aby rozpocząć zarządzanie jej danymi i użytkownikami.',
      submit: 'Utwórz instytucję',
    },
    fields: {
      name: 'Nazwa instytucji',
      address: 'Adres instytucji',
      code: 'Kod instytucji',
    },
  },
  course: {
    header: {
      name: 'Nazwa',
      weeklyHours: 'Godziny tygodniowo',
      ects: 'ECTS',
      courseGroup: 'Grupa kursów',
      courseType: 'Typ',
    },
  },
}

export type I18nSchema = typeof pl

export default pl
