import { inject, Service } from '@angular/core';
import { API_URL_VALIDADE, getAuthHeaders, ValidadeMedicamentoCreateDTO, ValidadeMedicamentoViewDTO } from './api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Service()
export class ValidadeService {
  private httpClient: HttpClient = inject(HttpClient);

  carregar(): Observable<ValidadeMedicamentoViewDTO[]> {
    return this.httpClient.get<ValidadeMedicamentoViewDTO[]>(API_URL_VALIDADE, {
      headers: getAuthHeaders(),
      withCredentials: true,
    });
  }

  carregar10dias():Observable<ValidadeMedicamentoViewDTO[]> {
    return this.httpClient.get<ValidadeMedicamentoViewDTO[]>(`${API_URL_VALIDADE}/10dias`, {
      headers: getAuthHeaders(),
      withCredentials: true,
    });
  }

  criarValidade(novaValidade: ValidadeMedicamentoCreateDTO):Observable<ValidadeMedicamentoViewDTO> {

    return this.httpClient.post<ValidadeMedicamentoViewDTO>(`${API_URL_VALIDADE}`,
      novaValidade, {
      headers: getAuthHeaders(),
      withCredentials: true,
    });

  }

  deletar(id: number) {
    return this.httpClient.delete(`${API_URL_VALIDADE}/${id}`,{
      headers: getAuthHeaders(),
      withCredentials: true,
    });
  }
}
