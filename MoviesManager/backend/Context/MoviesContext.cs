using Microsoft.EntityFrameworkCore;
using Models;
namespace backend.Context
{
    public class MoviesContext : DbContext
    {

        public MoviesContext(DbContextOptions<MoviesContext> options) : base(options)
        {

        }
        
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Actor> Actors { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<Realisator> Realisators { get; set; }
    }
}
