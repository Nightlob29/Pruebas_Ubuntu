import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DescargarServiceService {

  public employeeAPIUrl: string = "https://localhost:44382/api/Employee/";

  constructor(private _http: HttpClient) { }

  obtenerRegistros(): Observable<any[]> {
    console.log("hola :D")
    return this._http.get<any>(`${this.employeeAPIUrl}get_all_employees`)
  }
}
