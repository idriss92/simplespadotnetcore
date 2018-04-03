using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services
{
    public interface IMoviesService
    {
        List<Actor> GetAllActors();
        List<Realisator> GetAllRealisators();
        Movie GetMovieById(int id);
        Task<Realisator> GetRealisatorById(int id);
        Task<Actor> GetActorById(int id);
        List<Movie> GetAllMovies();        
        void DeleteMovie(int id);
        Task<Movie> Edit(Movie movie);

        Task Add(Movie movie);
        Task DeleteMovie(Movie movie);
    }
}
