using backend.Context;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Repositories
{
    public class ActorsRepository : GenericRepository<Actor>, IActorsRepository
    {
        public ActorsRepository(MoviesContext dbContext) : base(dbContext)
        {
        }
    }
}
