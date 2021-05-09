import { format } from "date-fns";
import { de } from "date-fns/locale";

export const formatDate = (value) => format(new Date(value), 'P', {locale: de});