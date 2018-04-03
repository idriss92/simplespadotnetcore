import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    fetchMovies,
    deleteMovie,
    sortByDate,
    sortByTitle,
    search
} from '../../modules/movieslist';


class Movies extends React.Component {
    constructor(props){
        super(props)
        this.goToCreate = this.goToCreate.bind(this)
        this.state = {
            mysearch: ''
        }
    }
    componentWillMount() {
        this.props.fetchMovies()
    }

    goToEdit = (movieId) => {
        this.props.edit(movieId)
    }

    goToDetails = (movieId) =>{
        this.props.details(movieId)
    }
    renderRow(movie) {
        return (
                <tr key={movie.movieID}>
                    <td>{movie.title}</td>
                    <td>{movie.boxDate}</td>
                    <td>{movie.cover}</td>
                    <td><button className="mui-btn mui-btn--primary" onClick={(e) => this.goToEdit(movie.movieID)}>Edit</button></td>                    
                    <td><button className="mui-btn" onClick={(e) => this.goToDetails(movie.movieID)}>Details</button></td>
                    <td><button onClick={(event) => this.delete(movie.movieID)} className="mui-btn mui-btn--danger">Delete</button></td>
                </tr>
        );
    }

    delete = (movieId) => {
        this.props.deleteMovie(movieId)
        this.props.fetchMovies();
    }

    handleOnChange(event) {
        console.log('hello')
        this.setState({ mysearch: event.currentTarget.value})
        this.props.search(event.currentTarget.value)
    }

    goToCreate(event) {
        this.props.changePage();
    }
    renderTable(movies){
        return (
            <div className="mui-row">
            <div className="mui-form--inline">
            <div className="mui-textfield">
            <input type="text" value={this.state.mysearch} onChange={this.handleOnChange.bind(this)}  placeholder="Search"/>
            </div>
            </div>
            <div className="table-responsive">
            <table className="mui-table mui-table--responsive">
                <thead>
                        <tr>
                            <th onClick={()=>this.props.sortByTitle(movies)}>Titre</th>
                            <th onClick={()=>this.props.sortByDate(movies)}>Date</th>
                            <th>Cover</th>
                        </tr>
                </thead>
                <tbody>
                    {movies.map(movie => this.renderRow(movie))}
                </tbody>
            </table>
            </div>
            <div style={{alignContent: 'flex-end'}}>
            
            <button className="mui-btn mui-btn--fab mui-btn--primary" onClick={this.goToCreate}>Add</button>
            </div>
            </div>
            
        )
    }


    render() {
        const { movies } = this.props;
        {        
        return (
            this.renderTable(movies.movies)
            );
        }
        return <div>Nothing to show</div>
    }
}

const mapStateToProps = state =>({
    movies: state.movies
});

const mapDispatchToProps =  dispatch =>
bindActionCreators(
    {
        changePage:() => push('/moviesadd'),
        fetchMovies,
        edit:(id)=>push(`/moviesedit/${id}`),
        deleteMovie,
        sortByDate,
        sortByTitle,
        search,
        details:(id) => push(`/moviesdetails/${id}`)
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Movies)