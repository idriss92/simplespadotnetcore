
import { fetchAll, removeMovie } from '../services'

import { push } from 'react-router-redux';

export const REQUEST_MOVIES = 'REQUEST_MOVIES';
export const REQUEST_MOVIES_SUCCESS = 'REQUEST_MOVIES_SUCCESS';
export const REQUEST_MOVIES_ERROR = 'REQUEST_MOVIES_ERROR';

export const DELETE_MOVIES = "DELETE_MOVIES";
export const DELETE_MOVIES_SUCCESS = "DELETE_MOVIES_SUCCESS";
export const DELETE_MOVIES_ERROR = "DELETE_MOVIES_ERROR";
export const SORT_MOVIE_BY_DATE_END = 'SORT_MOVIE_BY_DATE_END';
export const SORT_MOVIE_BY_TITLE_END = 'SORT_MOVIE_BY_TITLE_END';
export const SEARCH_MOVIES_FULL = "SEARCH_MOVIES_FULL";
export const SEARCH_MOVIES_FULL_END = "SEARCH_MOVIES_FULL_END";
export const CREATE_MOVIES = "CREATE_MOVIES";
export const CREATE_MOVIES_SUCCESS = "CREATE_MOVIES_SUCCESS";
export const CREATE_MOVIES_ERROR = "CREATE_MOVIES_ERROR";

export const ON_CHANGE_INPUT_TITLE = 'ON_CHANGE_INPUT_TITLE';
export const ON_CHANGE_INPUT_COVER = 'ON_CHANGE_INPUT_COVER';
export const ON_CHANGE_INPUT_BOXDATE = 'ON_CHANGE_INPUT_BOXDATE';

export const REQUEST_ACTORS = 'REQUEST_ACTORS';
export const REQUEST_ACTORS_ERROR = 'REQUEST_ACTORS_ERROR';
export const REQUEST_ACTORS_SUCCESS = 'REQUEST_ACTORS_SUCCESS';

export const REQUEST_REALISATORS = 'REQUEST_REALISATORS';
export const REQUEST_REALISATORS_ERROR = 'REQUEST_REALISATORS_ERROR';
export const REQUEST_REALISATORS_SUCCESS = 'REQUEST_REALISATORS_SUCCESS';
export const ON_CHANGE_INPUT_ACTOR = 'ON_CHANGE_INPUT_ACTOR';
export const ON_CHANGE_INPUT_REALISATOR = 'ON_CHANGE_INPUT_REALISATOR';

export const REQUEST_MOVIE = 'REQUEST_MOVIE';
export const REQUEST_MOVIE_SUCCESS = 'REQUEST_MOVIE_SUCCESS';
export const REQUEST_MOVIE_ERROR = 'REQUEST_MOVIE_ERROR';

export const EDIT_MOVIES = "EDIT_MOVIES";
export const EDIT_MOVIES_SUCCESS = "EDIT_MOVIES_SUCCESS";
export const EDIT_MOVIES_ERROR = "EDIT_MOVIES_ERROR";

const initialState = {
    movies: [],
    fail: false,
    isLoading: false,
    succeed: false,
    error: '',
    isDeleting: false,
    deleteSucceed: false,
    deleteFail: false,
    isSearching: false
};




export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_MOVIES:
            return Object.assign({}, state, { isLoading: true });
        case REQUEST_MOVIES_ERROR:
            return Object.assign({}, state, { isLoading: false, fail: true, succeed: false });
        case REQUEST_MOVIES_SUCCESS:
            return Object.assign({}, state, { succeed: true, fail: false, movies: action.payload });
        case DELETE_MOVIES:
            return { ...state, isDeleting: true }
        case DELETE_MOVIES_ERROR:
            return { ...state, isDeleting: false, deleteFail: true, deleteSucceed: true, error: action.payload }
        case DELETE_MOVIES_SUCCESS:
            return { ...state, movies: action.payload, isDeleting: false, deleteSucceed: true, deleteFail: false }
        case SORT_MOVIE_BY_DATE_END:
        case SORT_MOVIE_BY_TITLE_END:
            return {
                ...state,
                movies: action.payload
            }
        case SEARCH_MOVIES_FULL:
            return {
                ...state, isSearching: true
            }
        case SEARCH_MOVIES_FULL_END:
            return {
                ...state, movies: action.payload, isSearching: false
            }
        default:
            return state;
    }
}
export const fetchMovies = () => {
    return dispatch => {
        dispatch({
            type: REQUEST_MOVIES
        });
        fetchAll()
            .then(movies => {
                dispatch({
                    type: REQUEST_MOVIES_SUCCESS,
                    payload: movies
                });
            })
            .catch(() => dispatch({
                type: REQUEST_MOVIES_ERROR
            }));
    }
}


export const deleteMovie = (movieId) => {
    return (dispatch, getState) => {
        dispatch({
            type: DELETE_MOVIES
        });
        removeMovie(movieId)
            .then((response) => {
                if (response.ok) {
                    let movies = getState().movies.movies;
                    _.remove(movies, { movieID: movieId })
                    dispatch
                        ({
                            type: DELETE_MOVIES_SUCCESS,
                            payload: movies
                        });
                }
                else {
                    throw "failure of deletion"
                }
            })
            .catch((error) => dispatch({
                type: DELETE_MOVIES_ERROR,
                payload: error
            }))
    }
}


export const sortByDate = (movies) => (dispatch, getState) => {
    movies = _.sortBy(movies, ['boxDate'], ['asc']);
    dispatch({ type: SORT_MOVIE_BY_DATE_END, payload: movies })
}

export const sortByTitle = (movies) => (dispatch, getState) => {
    movies = _.sortBy(movies, ['title'], ['asc']);
    dispatch({ type: SORT_MOVIE_BY_TITLE_END, payload: movies })
}


export const search = (searchword) => (dispatch, getState) => {
    dispatch({
        type: SEARCH_MOVIES_FULL
    })
    let movies = getState().movies.movies;
    if (searchword != '')
        movies = _.filter(movies, function (movie) {
            return _.startsWith(movie.cover, searchword) || _.startsWith(movie.title, searchword);
        });
    dispatch({
        type: SEARCH_MOVIES_FULL_END,
        payload: movies
    })

}