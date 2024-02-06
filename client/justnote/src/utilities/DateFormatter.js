import format from 'date-fns/format';
import ruLocale from 'date-fns/locale/ru';

export default class DateFormatter {
    static Format(dateString) {
        return format(new Date(dateString), 'dd MMMM yyyy, HH:mm', { locale: ruLocale });
    }
};