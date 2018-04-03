using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace backend.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [DisableCors]
    public class MoviesController : Controller
    {

        IMoviesService _service;

        public MoviesController(IMoviesService moviesService)
        {
            _service = moviesService;
        }

        [HttpGet]
        public IEnumerable<Movie> GetMovies()
        {
            var movies = _service.GetAllMovies();
            return movies;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var movie = _service.GetMovieById(id);
            if (movie == null)
            {
                return NotFound();
            }
            return Ok(movie);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var movie = _service.GetMovieById(id);
            if (movie == null)
            {
                return NotFound();
            }
            await _service.DeleteMovie(movie);
            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]MovieModel movie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var realisator = await _service.GetRealisatorById(movie.RealisatorId);
            if(realisator == null)
            {
                return NotFound();
            }

            var actor = await _service.GetActorById(movie.ActorId);
            if(actor == null)
            {
                return NotFound();
            }
            var model = new Movie { BoxDate = DateTime.Now, Cover = movie.Cover, Title = movie.Title, Realisator = realisator, Actors = new List<Actor>() };
            model.Actors.Add(actor);
            await _service.Add(model);

            return Ok(movie);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody]MovieModel movieModel)
        {
            if (movieModel == null || movieModel.MovieID != id)
            {
                return BadRequest();
            }

            var movie = _service.GetMovieById(id);
            if (movie == null)
            {
                return NotFound();
            }

            movie.BoxDate = movieModel.BoxDate;
            movie.Cover = movieModel.Cover;
            movie.Title = movieModel.Title;

            await _service.Edit(movie);
            return NoContent();
        }

    }

}