using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class MovieApiModel
    {

    }

    public class MovieModel
    {
        public int MovieID { get; set; }
        public string Title { get; set; }
        public DateTime BoxDate { get; set; }
        public string Cover { get; set; }
        public int ActorId { get; set; }
        public int RealisatorId { get; set; }
    }
}
