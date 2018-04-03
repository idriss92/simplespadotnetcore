import { push } from 'react-router-redux'

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
export const RESET = 'RESET';

import { fetchAllActors, create, fetchAllRealisators, fetchOne, update } from '../services';

const movie = {
    cover: '',
    boxDate: Date.now(),
    title: '',
    note: 0,
    actorId: 0,
    realisatorId: 0

}

const initialState = {
    movie: movie,
    movieId: 0,
    isLoadingLoadOneData: false,
    isLoadingEditData: false,
    failEditData: false,
    succeedEditData: false,
    failLoadOneData: false,
    succeedLoadOneData: false,
    isLoadingLoadData: false,
    failLoadData: false,
    succeedLoadData: false,
    fail: false,
    isLoading: false,
    succeed: false,
    errors: {},
    params: {},
    realisators: [],
    actors: [],
    actorId: 0,
    realisatorId: 0
};


export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_ACTORS:
        case REQUEST_REALISATORS:
            return Object.assign({}, state, { isLoadingLoadData: true, failLoadData: false });
        case CREATE_MOVIES:
            return Object.assign({}, state, { isLoading: true });
        case REQUEST_ACTORS_ERROR:
        case REQUEST_REALISATORS_ERROR:
            return Object.assign({}, state, { isLoadingLoadData: false, failLoadData: true, succeedLoadData: false, errors: action.payload });
        case CREATE_MOVIES_ERROR:
            return Object.assign({}, state, { isLoading: false, fail: true, succeed: false, errors: action.payload });
        case EDIT_MOVIES_SUCCESS:
            return { ...state, movie: null, succeedEditData: true, failEditData: false, isLoadingEditData: false };
        case CREATE_MOVIES_SUCCESS:
            return { ...state, movie: movie, succeed: true, fail: false, isLoading: false };
        case EDIT_MOVIES:
            return { ...state, isLoadingEditData: true, failEditData: false, succeedEditData: false, errors: {} };
        case EDIT_MOVIES_SUCCESS:
            return { ...state, movie: null, succeedEditData: true, failLoadOneData: false, isLoadingOneData: false };
        case EDIT_MOVIES_ERROR:
            return { ...state, movie: null, succeedLoadOneData: false, failLoadOneData: true, isLoadingOneData: false, errors: action.payload };
        case REQUEST_MOVIE:
            return { ...state, isLoading: true }
        case REQUEST_MOVIE_ERROR:
            return { ...state, succeedLoadOneData: false, failLoadOneData: true, isLoadingOneData: false, errors: action.payload };
        case RESET:
            return { ...state, movie: movie}

        case REQUEST_MOVIE_SUCCESS: {
            return { ...state, movie: action.payload, succeedLoadOneData: true, isLoadingLoadOneData: true, failLoadOneData: false }
        }
        case REQUEST_REALISATORS_SUCCESS:
            return Object.assign({}, state, { realisators: action.payload, isLoadingLoadData: false, failLoadData: false, succeedLoadData: true });
        case REQUEST_ACTORS_SUCCESS:
            return Object.assign({}, state, { actors: action.payload, isLoadingLoadData: false, failLoadData: false, succeedLoadData: true });

        case ON_CHANGE_INPUT_BOXDATE:
            return { ...state, movie: { ...state.movie, boxDate: action.payload } }
        case ON_CHANGE_INPUT_COVER:
            return { ...state, movie: { ...state.movie, cover: action.payload } }
        case ON_CHANGE_INPUT_TITLE:
            return { ...state, movie: { ...state.movie, title: action.payload } }
        case ON_CHANGE_INPUT_ACTOR:
            return { ...state, movie: { ...state.movie, realisatorId: action.payload } }
        case ON_CHANGE_INPUT_REALISATOR:
            return { ...state, movie: { ...state.movie, actorId: action.payload } }
        default:
            return state;
    }
}


export const fetchActors = () => {
    return dispatch => {
        dispatch({
            type: REQUEST_ACTORS
        });
        fetchAllActors()
            .then(actors => dispatch(dispatch({
                type: REQUEST_ACTORS_SUCCESS,
                payload: actors
            })))
            .catch(() => dispatch({
                type: REQUEST_ACTORS_ERROR,
            }));
    }
}
export const fetchRealisators = () => {
    return dispatch => {
        dispatch({
            type: REQUEST_REALISATORS
        });
        fetchAllRealisators()
            .then(realisators => dispatch({
                type: REQUEST_REALISATORS_SUCCESS,
                payload: realisators
            }))
            .catch(() => dispatch({
                type: REQUEST_REALISATORS_ERROR
            }));
    }
}

export const createMovie = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CREATE_MOVIES
        });
        let movie = getState().create.movie;
        create(movie)
            .then(movies => {
                dispatch({
                    type: CREATE_MOVIES_SUCCESS,
                    payload: movies
                });
                push('/movies')
            })
            .catch((error) => dispatch({
                type: CREATE_MOVIES_ERROR,
                payload: error
            }));

    }
}

export const handleOnChangeRealisator = (event) => dispatch => {
    dispatch({
        type: ON_CHANGE_INPUT_REALISATOR,
        payload: parseInt(event.currentTarget.value)
    })
}
export const handleOnChangeActor = (event) => (dispatch, getState) => {
    dispatch({
        type: ON_CHANGE_INPUT_ACTOR,
        payload: parseInt(event.currentTarget.value)
    })
}

export const onChangeInput = (event) => dispatch => {
    switch (event.currentTarget.name) {
        case 'realisator':
            dispatch({
                type: ON_CHANGE_INPUT_REALISATOR,
                payload: parseInt(event.currentTarget.value)
            })
            break;
        case 'actor':
            dispatch({
                type: ON_CHANGE_INPUT_ACTOR,
                payload: parseInt(event.currentTarget.value)
            })
            break;
        case 'title':
            dispatch({ type: ON_CHANGE_INPUT_TITLE, payload: event.currentTarget.value });
            break;
        case 'cover':
            dispatch({ type: ON_CHANGE_INPUT_COVER, payload: event.currentTarget.value });
            break;
        case 'boxDate':
            dispatch({ type: ON_CHANGE_INPUT_BOXDATE, payload: event.currentTarget.value });
            break;
    }
}

export const loadMovie = (movieId) => {
    return (dispatch, getState) => {
        dispatch({
            type: REQUEST_MOVIE
        });
        fetchOne(movieId)
            .then(movie => {
                dispatch({
                    type: REQUEST_MOVIE_SUCCESS,
                    payload: movie
                })
            })
            .catch(error => dispatch({
                type: REQUEST_MOVIE_ERROR,
                payload: error
            }))
    }
}

export const reset = () => {
    return dispatch => {
        dispatch({
            type: RESET
        });
    }
}

export const updateMovie = () => {
    return (dispatch, getState) => {
        dispatch({
            type: EDIT_MOVIES,
        })
        let movie = getState().create.movie;
        update(movie)
            .then(() => dispatch({
                type: EDIT_MOVIES_SUCCESS
            }))
            .catch(error => dispatch({
                type: EDIT_MOVIES_ERROR,
                payload: error
            }))
    }
}

