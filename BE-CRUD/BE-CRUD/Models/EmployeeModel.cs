using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace BE_CRUD.Models
{
    public class EmployeeModel
    {
        [Key]
        public int Id { get; set; }

        public string name { get; set; }

        public string apellido { get; set; }

        public string Mobile { get; set; }

        public int Salary { get; set; }

        public string  Email { get; set; }

        public DateTime FechaRegistro { get; set; }  

    }
}
