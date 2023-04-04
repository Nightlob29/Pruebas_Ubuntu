import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FormBuilder, FormGroup } from '@angular/forms'
import { EmployeeModel } from './employee-dashboard.model';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  registro!: any[];
  formValue !: FormGroup;
  employeeData !: any;
  employeeObj : EmployeeModel = new EmployeeModel();
  showAdd !: boolean;
  showUpdate !: boolean;
  @Input() receive !: string;
  @Input() mobileSpecification !: any;
  role:string =""
  constructor(private api: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      apellido: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    })
    this.getEmployeeDetails();
    this.role = localStorage.getItem('userType')!

    this.api.obtenerRegistros().subscribe((data: any) => {
      this.registro = data.employeeDetails;
      console.log(this.registro)
    });
  }
   
  //Adicionar empleados
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  //Registro en formulario
  postEmployeeDetails() {
    this.employeeObj.name = this.formValue.value.name;
     this.employeeObj.apellido = this.formValue.value.apellido;
     this.employeeObj.Email = this.formValue.value.email;
     this.employeeObj.Mobile = this.formValue.value.mobile;
     this.employeeObj.Salary = this.formValue.value.salary;
    this.api.PostEmployee(this.employeeObj)
      .subscribe(res => {
        console.log(res);
        let ref = document.getElementById('close');
      ref?.click();
      this.getEmployeeDetails();      
      })
     
  }

 //Visualizar Empleados
  getEmployeeDetails() {
    this.api.GetEmployees()
    .subscribe(res=>{
      this.employeeData = res.employeeDetails; 
    })
  }

  //Traer datos registrados de los empleados
  editEmployeeDetail(){
     this.employeeObj.name = this.formValue.value.name;
     this.employeeObj.apellido = this.formValue.value.apellido;
     this.employeeObj.Email = this.formValue.value.email;
     this.employeeObj.Mobile = this.formValue.value.mobile;
     this.employeeObj.Salary = this.formValue.value.salary;
    this.api.UpdateEmployee(this.employeeObj)
    .subscribe(res=>{
      alert("Empleado actualizado correctamente")
      let ref = document.getElementById('close');
      ref?.click();
      this.getEmployeeDetails();
    })
  }

  //Modificando (Formulario) empleado 
  onEdit(row : any){
    this.employeeObj.Id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['apellido'].setValue(row.apellido);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    this.showUpdate = true;
    this.showAdd = false;
  }

  //Eliminar empleado
  deleteEmployeeDetail(row : any){
   let clickedYes = confirm("Esta seguro de eliminar a este empleado");
   if(clickedYes){
    this.api.DeleteEmployee(row.id)
    .subscribe(res=>{
      alert("Empleado eliminado satisfactoriamente");
      this.getEmployeeDetails();
    })
   }
  }

  //Generación del Archivo en Excel
  descargarExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.registro);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registros');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.guardarArchivo(excelBuffer, 'registros.xlsx');
  }

  //Almacenamiento del archivo Excel
  guardarArchivo(buffer: any, fileName: string): void {
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
  }
}
