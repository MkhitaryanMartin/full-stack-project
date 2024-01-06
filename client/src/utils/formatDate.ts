/**
 * Функция форматирования даты в нужный формат
 * @param {string} dateString - Строка с датой и временем в формате ISO 8601
 * @returns {string} - Отформатированная строка с датой в указанном формате
 */
export default function formatDate(dateString: string): string {
  const months: string[] = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];
  
  const date: Date = new Date(dateString);

  const day: string = String(date.getDate()).padStart(2, '0');
  const monthIndex: number = date.getMonth();
  const year: number = date.getFullYear();
  const hours: string = String(date.getHours()).padStart(2, '0');
  const minutes: string = String(date.getMinutes()).padStart(2, '0');

  const monthName: string = months[monthIndex];

  return `${day}.${monthIndex}.${year}.${hours}:${minutes}`;
}
