using backend.Context;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Repositories
{
    public class RealisatorRepository : GenericRepository<Realisator>, IRealisatorsRepository
    {
        public RealisatorRepository(MoviesContext dbContext) : base(dbContext)
        {
        }
    }
}
