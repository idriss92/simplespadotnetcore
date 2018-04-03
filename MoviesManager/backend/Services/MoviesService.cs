using backend.Repositories;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services
{
    public class MoviesService : IMoviesService
    {
        private IMoviesRepository _moviesRepository;
        IActorsRepository _actorsRepository;
        IRealisatorsRepository _realisatorsRepository;

        public MoviesService(IMoviesRepository moviesRepository, IActorsRepository actorsRepository, IRealisatorsRepository realisatorsRepository)
        {
            _moviesRepository = moviesRepository;
            _actorsRepository = actorsRepository;
            _realisatorsRepository = realisatorsRepository;
        }

        public List<Movie> GetAllMovies()
        {
            return _moviesRepository.AllIncluding(p=> p.Notes, x => x.Realisator, a => a.Actors).ToList();
        }

        public List<Actor> GetAllActors()
        {
            return _actorsRepository.GetAll().ToList();
        }

        public List<Realisator> GetAllRealisators()
        {
            return _realisatorsRepository.GetAll().ToList();
        }

        public Movie GetMovieById(int id)
        {
            return _moviesRepository.AllIncludingFiltering(movie => movie.MovieID.Equals(id), p => p.Notes, x => x.Realisator, a => a.Actors).FirstOrDefault();
        }

        public async Task<Realisator> GetRealisatorById(int id)
        {
            return await _realisatorsRepository.GetBy(realisator => realisator.RealisatorID.Equals(id));
        }

        public async Task<Actor> GetActorById(int id)
        {
            return await _actorsRepository.GetBy(actor => actor.ActorID.Equals(id));
        }


        public void DeleteMovie(int id)
        {
            _moviesRepository.DeleteWhere(movie => movie.MovieID.Equals(id));
        }

        public async Task DeleteMovie(Movie movie)
        {
            await _moviesRepository.Delete(movie);
        }


        public async Task<Movie> Edit(Movie movie)
        {
            await _moviesRepository.Update(movie);
            return movie;
        }

        public async Task Add(Movie movie)
        {
            await _moviesRepository.Create(movie);
        }
    }
}
