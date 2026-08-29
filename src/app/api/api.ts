
import { HttpHeaders } from '@angular/common/http';


export const API_URL_MEDICAMENTOS = 'http://localhost:8081/medicamentos';
export const API_URL_VALIDADE = 'http://localhost:8081/validade';

export const CREDENTIALS: string = btoa('admin:adminpass');

export const HEADERS = new HttpHeaders({
  Authorization: `Basic ${CREDENTIALS}`,
});


export enum CLASSIFICAO_MEDICAMENTO {
  CONTROLADO = 'CONTROLADO',
  MIP = 'MIP',
}

export enum TIPO_MEDICAMENTO {
  ETICO='ETICO',
  GENERICO = 'GENERICO',
  SIMILAR = 'SIMILAR',
}

export interface MedicamentoCreateDTO {
  ean: string;
  descricao: string;
  fabricante: string;
  tipo: string;
  classificacao: string;
  principio_ativo: string;
  registro_anvisa: string;
}

export interface MedicamentoViewDTO extends MedicamentoCreateDTO {
  id: number; // ou string, dependendo de como está o tipo do seu ID no back-end
}

export interface ValidadeMedicamentoCreateDTO {
  lote: string;
  data_vencimento: string;
  medicamento: MedicamentoViewDTO;
}

export interface ValidadeMedicamentoViewDTO extends ValidadeMedicamentoCreateDTO {
  id: number;
  dias_restantes: number;
}

