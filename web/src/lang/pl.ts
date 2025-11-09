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
  },
  dashboard: {
    nav: {
      dashboard: 'Panel główny',
      harmonogram: 'Harmonogram',
      employees: 'Pracownicy',
      institutions: 'Instytucje',
      subjects: 'Przedmioty',
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
}

export type I18nSchema = typeof pl

export default pl
