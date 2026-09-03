
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


export const API_URL_MEDICAMENTOS = `${environment.apiUrl}/medicamentos`;
export const API_URL_VALIDADE = `${environment.apiUrl}/validade`;
export const API_URL_AUTH = `${environment.apiUrl}/auth`;

export function getAuthHeaders(): HttpHeaders {
  const username = localStorage.getItem('username') || '';
  const password = localStorage.getItem('password') || '';
  const credentials = btoa(`${username}:${password}`);

  return new HttpHeaders({
    Authorization: `Basic ${credentials}`,
  });
}


export enum CLASSIFICAO_MEDICAMENTO {
  TARJA_PRETA = 'TARJA_PRETA',
  TARJA_VERMELHA = 'TARJA_VERMELHA',
  MIP = 'MIP',
}

export enum TIPO_MEDICAMENTO {
  REFERENCIA = 'REFERENCIA',
  GENERICO = 'GENERICO',
  SIMILAR = 'SIMILAR',
}

export interface MedicamentoCreateDTO {
  ean: string | null;
  descricao: string | null;
  fabricante: string | null;
  tipo: string | null;
  classificacao: string | null;
  principio_ativo: string | null;
  registro_anvisa: string | null;
}

export interface MedicamentoViewDTO extends MedicamentoCreateDTO {
  id: number; // ou string, dependendo de como está o tipo do seu ID no back-end
}

export interface ValidadeMedicamentoCreateDTO {
  lote: string|null;
  data_vencimento: string | null;
  medicamentoId: number | undefined;
}

export interface ValidadeMedicamentoViewDTO {
  id: number;
  lote: string;
  data_vencimento: string;
  dias_restantes: number;
  medicamento:MedicamentoViewDTO
}

