using BE_CRUD.Data;
using BE_CRUD.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace BE_CRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly UserDbContext _context;

        public EmployeeController(UserDbContext userDbContext)
        {
            _context = userDbContext;
        }

        //Metodo Post para el registro de nuevos empleados
        [HttpPost("add_employee")]
        public IActionResult AddEmployee([FromBody] EmployeeModel employeeObj)
        {
            if(employeeObj == null) 
            {
                return BadRequest();
            }
            else
            {
                employeeObj.FechaRegistro = DateTime.Now;
                _context.employeeModels.Add(employeeObj);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Empleado registrado satisfactoriamente"
                });
            }
        }

        //Metodo Put para la actualización de datos de los empleados registrados
        [HttpPut("update_employee")]
        public IActionResult UpdateEmployee([FromBody] EmployeeModel employeeObj)
        {
            if(employeeObj == null)
            {
                return BadRequest();
            }
            var user = _context.employeeModels.AsNoTracking().FirstOrDefault(x => x.Id == employeeObj.Id);
            if(user == null) 
            {
                return NotFound(new
                {
                    StatusCode = 200,
                    Message = "Empleado no encontrado"
                });
            }
            else
            {
                _context.Entry(employeeObj).State = EntityState.Modified;
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Empleado actualizado correctamente"
                });
            }
        }

        //Metodo Delete para la eliminacion de los empleados registrados 
        [HttpDelete("delete_employee/{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            var user = _context.employeeModels.Find(id);
            if(user == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "Empleado no encontrado"
                });
            }
            else
            {
                _context.Remove(user);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Empleado eliminado satisfactoriamente"
                });
            }
        }

        //Metodo Get para listar todos los empleados registrados en general
        [HttpGet("get_all_employees")]
        public IActionResult GetAllEmployees()
        {
            var employees = _context.employeeModels.AsQueryable();
            return Ok(new
            {
                StatusCode = 200,
                EmployeeDetails = employees
            });
        }

        //Metodo GET para listar un empleado en especifico
        [HttpGet("get_employee/{id}")]
        public IActionResult GetEmployee(int id)
        {
            var employee = _context.employeeModels.Find(id);
            if(employee == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "Empleado no encontrado"
                });
            }
            else
            {
                return Ok(new
                {
                    StatusCode = 200,
                    EmployeeDetail = employee
                });
            }
        }

    }
}
