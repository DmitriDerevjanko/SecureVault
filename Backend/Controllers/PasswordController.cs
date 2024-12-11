using Backend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PasswordController : ControllerBase
    {
        private readonly DataContext _context;

        public PasswordController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var passwords = _context.PasswordList
                                    .Where(p => p.UserId == userId)
                                    .ToList();

            return Ok(passwords);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var password = await _context.PasswordList
                                        .FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);

            if (password == null)
                return NotFound();

            return Ok(password);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Password newPassword)
        {
            if (newPassword == null)
                return BadRequest();

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID is missing.");
            }

            newPassword.UserId = userId;

            _context.PasswordList.Add(newPassword);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = newPassword.Id }, newPassword);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Password updatedPassword)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var password = await _context.PasswordList
                                        .FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);

            if (password == null)
                return NotFound();

            password.Login = updatedPassword.Login;
            password.PasswordValue = updatedPassword.PasswordValue;
            password.Purpose = updatedPassword.Purpose;

            await _context.SaveChangesAsync();

            return Ok(updatedPassword);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var password = await _context.PasswordList
                                        .FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);
            
            if (password == null)
            {
                return NotFound();
            }

            _context.PasswordList.Remove(password);
            await _context.SaveChangesAsync();

            return Ok("Deleted");
        }

        [HttpGet("folders")]
        public IActionResult GetFolders()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var folderNames = _context.PasswordList
                .Where(p => p.UserId == userId && !string.IsNullOrEmpty(p.FolderName))
                .Select(p => p.FolderName)
                .Distinct()
                .ToList();

            return Ok(folderNames);
        }
    }
}
