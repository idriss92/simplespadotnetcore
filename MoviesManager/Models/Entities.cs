using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class Movie
    {
        public int MovieID { get; set; }
        public string Title { get; set; }
        public DateTime BoxDate { get; set; }
        //public int RealisatorID { get; set; }
        public Realisator Realisator { get; set; }
        public string Cover { get; set; }
        public ICollection<Actor> Actors { get; set; }
        public ICollection<Note> Notes { get; set; }
    }
    interface IPersonalInformations
    {
        string FirstName { get; set; }
        string LastName { get; set; }
    }
    public class Actor : IPersonalInformations
    {
        public int ActorID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        //public int MovieID { get; set; }
        public Movie Movie { get; set; }
        // public ICollection<Movie> Movies { get; set; }
    }

    public class Note
    {
        public int NoteID { get; set; }
        public string Contact { get; set; }
        public int NoteValue { get; set; }
    }

    public class Realisator
    {
        public int RealisatorID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public ICollection<Movie> Movies { get; set; }
    }
}
