import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  API_URL_MEDICAMENTOS,
  HEADERS,
  MedicamentoViewDTO,
  ValidadeMedicamentoCreateDTO,
} from './api';
import { Observable } from 'rxjs';
import { ValidadeService } from './validade-service';

@Injectable({
  providedIn: 'root',
})
export class MedicamentosService {
  private http: HttpClient = inject(HttpClient);

  private _validadeService = inject(ValidadeService)

  buscarPorNome(descricao: string): Observable<MedicamentoViewDTO[]> {
    const params = new HttpParams().set('descricao', descricao);
    return this.http.get<MedicamentoViewDTO[]>(`${API_URL_MEDICAMENTOS}/descricao`, {
      headers: HEADERS,
      params,
      withCredentials: true,
    });
  }

  buscarPorRegistro(registro: string): Observable<MedicamentoViewDTO[]> {
    const params = new HttpParams().set('registro', registro);
    return this.http.get<MedicamentoViewDTO[]>(`${API_URL_MEDICAMENTOS}/registro/${registro}`, {
      headers: HEADERS,
      params,
      withCredentials: true,
    });
  }

  buscarPorEan(ean: string): Observable<MedicamentoViewDTO[]> {
    const params = new HttpParams().set('ean', ean);
    return this.http.get<MedicamentoViewDTO[]>(`${API_URL_MEDICAMENTOS}/ean}`, {
      headers: HEADERS,
      params,
      withCredentials: true,
    });
  }

  buscarTodos(): Observable<MedicamentoViewDTO[]> {
    return this.http.get<MedicamentoViewDTO[]>(API_URL_MEDICAMENTOS, { withCredentials: true });
  }

  novaValidade($event: ValidadeMedicamentoCreateDTO) {
    this._validadeService.criarValidade($event);
  }
}
