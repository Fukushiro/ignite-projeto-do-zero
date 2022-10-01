import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function convertToString(oldDate: string) {
  const formated = format(new Date(oldDate), 'dd LLL yyyy', { locale: ptBR });

  return formated;
}
