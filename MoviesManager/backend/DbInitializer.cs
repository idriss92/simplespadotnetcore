using backend.Context;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace backend
{

    public static class DbInitializer
    {
        public static void Initialize(MoviesContext moviesContext)
        {
            moviesContext.Database.EnsureCreated();
            moviesContext.Database.Migrate();
            try
            {
                if (!moviesContext.Realisators.Any())
                {
                    var realisators = new List<Realisator>
                {
                    new Realisator{FirstName = "Quentin", LastName = "Tarentino"},
                                        new Realisator{FirstName = "Leonardo", LastName = "Dicaprio"}
                };
                    moviesContext.Realisators.AddRange(realisators);
                }
                moviesContext.SaveChanges();
                if (!moviesContext.Actors.Any())
                {
                    var actors = new List<Actor> {  new Actor { FirstName = "Leonardo", LastName = "Dicaprio" },
                    new Actor { FirstName = "Jamie", LastName = "Fox" },
                    new Actor { FirstName = "Will" , LastName="Smith"} };
                    moviesContext.Actors.AddRange(actors);
                }
                moviesContext.SaveChanges();


                var movies = moviesContext.Movies.Include(x => x.Actors).Include(x => x.Realisator).ToList();
                moviesContext.Movies.RemoveRange(movies);
                moviesContext.SaveChanges();
                var realisatorsBis = moviesContext.Realisators.ToList();
                var actorsBis = moviesContext.Actors.ToList();
                var moviesBis = new Models.Movie
                {
                    BoxDate = DateTime.Now,
                    Title = "titanic",
                    Cover = "http://www.mustanlamminkennel.net/pennut/kuvat/alli2182010.jpg",
                    Realisator = new Realisator(),//  realisatorsBis.First(),
                    Actors = new List<Actor>()// actorsBis
                };
                moviesBis.Realisator = realisatorsBis.First(x => x.FirstName == "Quentin");
                moviesBis.Actors = actorsBis;
                moviesContext.Movies.Add(
                    moviesBis
                    );

                moviesContext.SaveChanges();
            }
            catch (Exception e)
            {
                Trace.Write(e);
            }
        }
        //public bool EnsureCreated()
        //{
        //    return _context.Database.EnsureCreated();
        //}

        //public void Migrate()
        //{
        //    _context.Database.Migrate();
        //}

    }
}
