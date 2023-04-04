import { Component, OnInit } from '@angular/core';
import { DescargarServiceService } from '../../services/descargar-service.service';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { ApiService } from '../../shared/api.service';
import { EmployeeModel } from '../employee-dashboard.model';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent implements OnInit {

  registro !: any[];
  employeeObj: EmployeeModel = new EmployeeModel();

  constructor(private DescargarService: DescargarServiceService, private api: ApiService) { }

  ngOnInit(): void {
    this.DescargarService.obtenerRegistros().subscribe((data: any) => {
      this.registro = data.employeeDetails;
      console.log(this.registro)
    });
  }

  getEmployeeDetails() {
    this.api.GetEmployees()
      .subscribe(res => {
        this.registro = res.employeeDetails;
      })
  }

  descargarExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.registro);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registros');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.guardarArchivo(excelBuffer, 'registros.xlsx');
  }

  guardarArchivo(buffer: any, fileName: string): void {
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
  }


}
