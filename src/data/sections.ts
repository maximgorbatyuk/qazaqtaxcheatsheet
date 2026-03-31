export interface Section {
  title: string;
  desc: string;
  path: string;
  icon: string;
}

export const sections: Section[] = [
  { title: 'Какие налоги оплачивать', desc: 'Таблица платежей, суммы, формулы, графики оплаты', path: '/taxes/', icon: '💸' },
  { title: 'FAQ по валютному контролю', desc: 'Вопросы по валютному контролю для ИП', path: '/faq-currency/', icon: '👮' },
  { title: 'FAQ и прочие вопросы', desc: 'Форма 910, ОКЭД, форма 270, TIN, БИК, крипта', path: '/faq/', icon: '❓' },
  { title: 'Ставка налога по регионам', desc: 'Ставки подоходного налога по городам Казахстана', path: '/tax-rates/', icon: '📉' },
  { title: 'Пример инвойса', desc: 'Шаблон инвойса для выписывания компании', path: '/invoice/', icon: '📝' },
  { title: 'Как получить УНК', desc: 'Учетный номер контракта для валютного контроля', path: '/unk/', icon: '📑' },
  { title: 'Банки для ИП', desc: 'Что выбрать и как работать с банками', path: '/banks/', icon: '🏦' },
  { title: 'ИП в Грузии', desc: 'Сравнение с Грузией (TLDR: не советуем)', path: '/georgia/', icon: '🚈' },
  { title: 'Полезное для разработчиков', desc: 'Ссылки, сервисы и инструменты для ИП на удаленке', path: '/useful-for-devs/', icon: '🔗' },
];
