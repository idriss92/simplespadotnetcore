using backend.Services;
using FizzWare.NBuilder;
using Microsoft.AspNetCore.Mvc;
using Models;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace backend.test
{
    public class MoviesController
    {
        [Fact]
        public void MoviesController_GetMovies_ReturnexpectedValue()
        {
            var mockMoviesService = new Mock<IMoviesService>();
            mockMoviesService.Setup(x => x.GetAllMovies()).Returns(GetMoviesMock());
            var controller = new backend.Controllers.MoviesController(mockMoviesService.Object);

            var result = (IEnumerable<Movie>)controller.GetMovies();

            Assert.NotEmpty(result);
            Assert.Equal(10, result.Count());
           
        }

        [Fact]
        public void MoviesController_Get_ReturnUnexpectedValue()
        {
            var mockMoviesService = new Mock<IMoviesService>();
            mockMoviesService.Setup(x => x.GetMovieById(It.IsAny<int>()));
            var controller = new backend.Controllers.MoviesController(mockMoviesService.Object);

            IActionResult result = controller.Get(1);
            
            Assert.IsType<NotFoundResult>(result);

        }

        [Fact]
        public void MoviesController_Get_ReturnExpectedValue()
        {
            var mockMoviesService = new Mock<IMoviesService>();
            mockMoviesService.Setup(x => x.GetMovieById(1)).Returns(GetMoviesMock().First(x=>x.MovieID==1));
            var controller = new backend.Controllers.MoviesController(mockMoviesService.Object);

            IActionResult result = controller.Get(1);

            Assert.IsType<OkObjectResult>(result);
            Assert.NotNull((result as OkObjectResult).Value);

        }


        [Fact]
        public  async void MoviesController_Create_NotFoundRealisator()
        {
            var model = Builder<MovieModel>.CreateNew().With(x=>x.BoxDate = DateTime.Now).Build();
            var mockMoviesService = new Mock<IMoviesService>();
            mockMoviesService.Setup(x => x.GetRealisatorById(1)).Returns(Task.FromResult<Realisator>(null));
            var controller = new backend.Controllers.MoviesController(mockMoviesService.Object);

            IActionResult result = await controller.Create(model);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async void MoviesController_Create_NotFoundActor()
        {
            var model = Builder<MovieModel>.CreateNew().With(x => x.BoxDate = DateTime.Now).Build();
            var realisator = Builder<Realisator>.CreateNew().Build();
            var mockMoviesService = new Mock<IMoviesService>();
            mockMoviesService.Setup(x => x.GetRealisatorById(1)).Returns(Task.FromResult<Realisator>(realisator));
            var controller = new backend.Controllers.MoviesController(mockMoviesService.Object);

            IActionResult result = await controller.Create(model);
            Assert.IsType<NotFoundResult>(result);
            

        }


        [Fact]
        public async void MoviesController_Create_NotValidState()
        {
            var mockMoviesService = new Mock<IMoviesService>();
            var controller = new backend.Controllers.MoviesController(mockMoviesService.Object);
            controller.ModelState.AddModelError("", "");

            IActionResult result = await controller.Create(null);

            Assert.IsType<BadRequestObjectResult>(result);
            
        }

        [Fact]
        public async void MoviesController_Create_WorksFine()
        {
            var model = Builder<MovieModel>.CreateNew().With(x => x.BoxDate = DateTime.Now).Build();
            var realisator = Builder<Realisator>.CreateNew().Build();
            var actor = Builder<Actor>.CreateNew().Build();
            var mockMoviesService = new Mock<IMoviesService>();
            mockMoviesService.Setup(x => x.GetActorById(1)).Returns(Task.FromResult<Actor>(actor));
            mockMoviesService.Setup(x => x.GetRealisatorById(1)).Returns(Task.FromResult<Realisator>(realisator));
            var controller = new backend.Controllers.MoviesController(mockMoviesService.Object);

            IActionResult result = await controller.Create(model);
            Assert.IsType<OkObjectResult>(result);
            
        }


        [Fact]
        public async void MoviesController_Delete_WorksFine()
        {
            var mockMoviesService = new Mock<IMoviesService>();
            mockMoviesService.Setup(x => x.GetMovieById(1)).Returns(GetMoviesMock().First(x=>x.MovieID==1));
            mockMoviesService.Setup(x => x.DeleteMovie(1));
            var controller = new backend.Controllers.MoviesController(mockMoviesService.Object);

            IActionResult result = await controller.Delete(1);
            Assert.IsType<NoContentResult>(result);

        }

        [Fact]
        public async void MoviesController_Delete_MovieNotFound()
        {
            Movie movie = null;
            var mockMoviesService = new Mock<IMoviesService>();
            mockMoviesService.Setup(x => x.GetMovieById(1)).Returns(movie);
            mockMoviesService.Setup(x => x.DeleteMovie(1));
            var controller = new backend.Controllers.MoviesController(mockMoviesService.Object);

            IActionResult result = await controller.Delete(1);

            Assert.IsType<NotFoundResult>(result);

        }


        private List<Movie> GetMoviesMock()
        {
            var movies = Builder<Movie>.CreateListOfSize(10).Build().ToList();
            return movies;
        }
    }
}
