using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Context
{
    public class DefaultDbContextInitializer : IDefaultDbContextInitializer
    {
        private readonly MoviesContext _context;

        public DefaultDbContextInitializer(MoviesContext context)
        {
            _context = context;
        }

        public bool EnsureCreated()
        {
            return _context.Database.EnsureCreated();
        }

        public void Migrate()
        {
            _context.Database.Migrate();
        }

        public async Task Seed()
        {
            //var email = "user@test.com";
            //if (await _userManager.FindByEmailAsync(email) == null)
            //{
            //    var user = new ApplicationUser
            //    {
            //        UserName = email,
            //        Email = email,
            //        EmailConfirmed = true,
            //        GivenName = "John Doe"
            //    };

            //    await _userManager.CreateAsync(user, "P2ssw0rd!");
            //}

            //if (_context.Contacts.Any())
            //{
            //    foreach (var u in _context.Contacts)
            //    {
            //        _context.Remove(u);
            //    }
            //}

            //_context.Contacts.Add(new Contact() { LastName = "Finkley", FirstName = "Adam", Phone = "555-555-5555", Email = "adam@somewhere.com" });
            //_context.Contacts.Add(new Contact() { LastName = "Biles", FirstName = "Steven", Phone = "555-555-5555", Email = "sbiles@somewhere.com" });
            await _context.SaveChangesAsync();
        }
    }

    public interface IDefaultDbContextInitializer
    {
        bool EnsureCreated();
        void Migrate();
        Task Seed();
    }
}
