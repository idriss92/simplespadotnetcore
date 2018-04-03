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
    [Route("api/Realisators")]
    public class RealisatorsController : Controller
    {
        IMoviesService _service;

        public RealisatorsController(IMoviesService moviesService)
        {
            _service = moviesService;
        }

        [HttpGet]
        public IEnumerable<Realisator> GetMovies()
        {
            var realisators = _service.GetAllRealisators();
            return realisators;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var realisator = await _service.GetRealisatorById(id);
            if (realisator == null)
            {
                return NotFound();
            }
            return Ok(realisator);
        }

    }
}