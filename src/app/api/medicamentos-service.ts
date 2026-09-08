import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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




  buscarTodos(): Observable<MedicamentoViewDTO[]> {
    return this.http.get<MedicamentoViewDTO[]>(API_URL_MEDICAMENTOS, { withCredentials: true });
  }

  novoMedicamento(medicamento: MedicamentoCreateDTO):Observable<MedicamentoViewDTO> {
    return this.http.post<MedicamentoViewDTO>(API_URL_MEDICAMENTOS, medicamento,{
      withCredentials:true
    });
  }

  deletar(id: number) {
    return this.http.delete(`${API_URL_MEDICAMENTOS}/${id}`, { withCredentials: true });
  }
}
