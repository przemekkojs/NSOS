export const formatTime = (date: Date): string => {
  return Intl.DateTimeFormat('default').format(date)
}
