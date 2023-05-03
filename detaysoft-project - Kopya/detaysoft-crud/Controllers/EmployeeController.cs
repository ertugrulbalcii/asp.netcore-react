using AutoMapper;
using detaysoft_crud.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace detaysoft_crud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeContext _employeeContext;
        public EmployeeController(EmployeeContext employeeContext)
        {
            _employeeContext = employeeContext;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            if (_employeeContext.Employees == null)
            {
                return NotFound();
            }
            return await _employeeContext.Employees.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployees(int id)
        {
            if (_employeeContext.Employees == null)
            {
                return NotFound();
            }
            var employee = await _employeeContext.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            return employee;

        }


        [HttpPost]
        public async Task<ActionResult<Employee>> CreateEmployee(Employee employee)
        {
            _employeeContext.Employees.Add(employee);
            await _employeeContext.SaveChangesAsync();

             return CreatedAtAction(nameof(GetEmployees), new { id = employee.ID}, employee);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, Employee employee)
        {
            if (id != employee.ID)
            {
                return BadRequest();
            }
            _employeeContext.Entry(employee).State = EntityState.Modified;
            await _employeeContext.SaveChangesAsync();
            
            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
            var employee = await _employeeContext.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }
            _employeeContext.Employees.Remove(employee);
            await _employeeContext.SaveChangesAsync();

            return NoContent();
        }


    }
}
