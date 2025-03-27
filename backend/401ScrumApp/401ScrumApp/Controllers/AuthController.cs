using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _401ScrumApp.Data; // <-- Change to match your project namespace
using _401ScrumApp.Models; // <-- Change to match where your User model is

namespace _401ScrumApp.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly iStalwartSaintsRepository _repository;

        public AuthController(iStalwartSaintsRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _repository.GetUserByCredentialsAsync(request.Username, request.Password);

            if (user == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            return Ok("Login successful!");
        }

    }

    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}

