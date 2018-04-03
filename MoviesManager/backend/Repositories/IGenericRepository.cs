using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace backend.Repositories
{
    public interface IGenericRepository<TEntity>
   where TEntity : class
    {

        Task<TEntity> GetBy(Expression<Func<TEntity, bool>> predicate, params Expression<Func<TEntity, object>>[] includeProperties);

        Task Create(TEntity entity);

        Task Update(TEntity entity);


        Task<int> DeleteWhere(Expression<Func<TEntity, bool>> predicate);

        IQueryable<TEntity> GetAll();
        Task Delete(TEntity entity);
        IEnumerable<TEntity> AllIncluding(params Expression<Func<TEntity, object>>[] includeProperties);
        IEnumerable<TEntity> AllIncludingFiltering(Expression<Func<TEntity, bool>> predicate, params Expression<Func<TEntity, object>>[] includeProperties);


    }
}
