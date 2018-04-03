using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace backend.Controllers
{
    [Produces("application/json")]
    [Route("api/Actors")]
    public class ActorsController : Controller
    {
        IMoviesService _service;

        public ActorsController(IMoviesService moviesService)
        {
            _service = moviesService;
        }

        [HttpGet]
        public IEnumerable<Actor> GetMovies()
        {
            var actors = _service.GetAllActors();
            return actors;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var actor = await _service.GetActorById(id);
            if (actor == null)
            {
                return NotFound();
            }
            return Ok(actor);
        }
    }
}