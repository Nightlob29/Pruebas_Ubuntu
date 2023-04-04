using BE_CRUD.Data;
using BE_CRUD.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace BE_CRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UserDbContext _context;

        public LoginController(UserDbContext userDbContext)
        {
            _context = userDbContext;
        }

        //Metodo Get Usuarios Registrados para el Logueo
        [HttpGet("users")]
        public IActionResult GetUsers() 
        {
            var userdetails = _context.userModels.AsQueryable();
            return Ok(userdetails);
        }

        //Metodo Post de Registro de Usuarios
        [HttpPost("signup")]
        public IActionResult SignUp([FromBody] UserModel userObj)
        {
            if(userObj == null) 
            {
                return BadRequest();
            }
            else
            {
                _context.userModels.Add(userObj);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Usuario registrado satisfactoriamente"
                });
            }
        }

        //Metodo Post - Validación del Login
        [HttpPost("login")]
        public IActionResult Login([FromBody] UserModel userObj)
        {
            if(userObj == null)
            {
                return BadRequest();
            }
            else
            {
                var user = _context.userModels.Where(a =>
                a.UserName == userObj.UserName && a.Password == userObj.Password).FirstOrDefault();

                if(user != null)
                {
                    return Ok(new
                    {
                        StatusCode = 200,
                        Message = "Usuario logueado con éxito"
                    });
                }
                else
                {
                    return NotFound(new
                    {
                        StatusCode = 404,
                        Message = "Usuario no encontrado, por favor verifique los datos ingresados"
                    });
                }
            }
        }


    }
}
