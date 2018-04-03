    export const fetchAll =() => {
        return fetch(`http://localhost:5000/api/Movies`)
        .then(response => response.json())
            .then(listMovies => {
               return listMovies
        })
        .catch(error => {
            console.log(error);
        });
    }

    export function fetchAllActors(){
        return fetch('http://localhost:5000/api/Actors')
        .then(response => response.json())
        .then(actors => actors)
    }

    export const fetchAllRealisators=()=>{
        return fetch('http://localhost:5000/api/Realisators')
        .then(response => response.json())
        .then(realisators => realisators)
    }


    export const  fetchOne =(movieId) => {
        return fetch(`http://localhost:5000/api/Movies/${movieId}`)
        .then(response => response.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log(error);
        });
    }

    export function update(movie) {

        return fetch(`http://localhost:5000/api/Movies/${movie.movieID}`,
            {
                credentials: 'same-origin',
                method: 'PUT', body: JSON.stringify(movie),
                headers: new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
            })
            .then(response =>response)
            .catch(error => {
                console.error(error);
            });
    }

    export function create(movie) {
        return fetch(`http://localhost:5000/api/Movies`,
        {
            credentials: 'same-origin',
            method: 'POST', body: JSON.stringify(movie),
            headers: new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
        })
        .then(response => response.json())
        .then(res => {
           return res;
        })
        .catch(error => {
            console.log(error)
        });
    }

    export function save(movie){
        if(movie.movieID){
            return this.update(movie);
        } else{
            return this.create(movie);
        }
    }

    export const removeMovie = (movieId)=>{
        return fetch(`http://localhost:5000/api/Movies/${movieId}`, {
            credentials: 'same-origin',
            method: 'DELETE'
        })
            .then(response => response)
            .catch(error => error);
    }
