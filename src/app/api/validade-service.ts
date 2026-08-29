import { inject, Service } from '@angular/core';
import { API_URL_VALIDADE, HEADERS, ValidadeMedicamentoCreateDTO, ValidadeMedicamentoViewDTO } from './api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Service()
export class ValidadeService {
  private httpClient: HttpClient = inject(HttpClient);

  carregar(): Observable<ValidadeMedicamentoViewDTO[]> {
    return this.httpClient.get<ValidadeMedicamentoViewDTO[]>(API_URL_VALIDADE, {
      headers: HEADERS,
      withCredentials: true,
    });
  }

  carregar10dias():Observable<ValidadeMedicamentoViewDTO[]> {
    return this.httpClient.get<ValidadeMedicamentoViewDTO[]>(`${API_URL_VALIDADE}/10dias`, {
      headers: HEADERS,
      withCredentials: true,
    });
  }

  criarValidade($event: ValidadeMedicamentoCreateDTO) {

    return this.httpClient.post(`${API_URL_VALIDADE}`, $event, {
      headers: HEADERS,
      withCredentials: true,
    })
  }
}
