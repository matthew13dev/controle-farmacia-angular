import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  API_URL_MEDICAMENTOS,
  MedicamentoCreateDTO,
  MedicamentoViewDTO,
} from './api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicamentosService {
  private http: HttpClient = inject(HttpClient);


  buscarPorNome(descricao: string): Observable<MedicamentoViewDTO[]> {
    const params = new HttpParams().set('descricao', descricao);
    return this.http.get<MedicamentoViewDTO[]>(`${API_URL_MEDICAMENTOS}/descricao`, {
      params,
      withCredentials: true,
    });
  }

  buscarPorRegistro(registro: string): Observable<MedicamentoViewDTO[]> {
    const params = new HttpParams().set('registro', registro);
    return this.http.get<MedicamentoViewDTO[]>(`${API_URL_MEDICAMENTOS}/registro/${registro}`, {
      params,
      withCredentials: true,
    });
  }

  buscarPorEan(ean: string): Observable<MedicamentoViewDTO[]> {
    const params = new HttpParams().set('ean', ean);
    return this.http.get<MedicamentoViewDTO[]>(`${API_URL_MEDICAMENTOS}/ean}`, {
      params,
      withCredentials: true,
    });
  }

  buscarTodos(): Observable<MedicamentoViewDTO[]> {
    return this.http.get<MedicamentoViewDTO[]>(API_URL_MEDICAMENTOS, { withCredentials: true });
  }

  novoMedicamento(medicamento: MedicamentoCreateDTO):Observable<MedicamentoViewDTO> {
    return this.http.post<MedicamentoViewDTO>(API_URL_MEDICAMENTOS, medicamento,{
      withCredentials:true
    });
  }
}
