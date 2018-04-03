import React from 'react';
 import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    fetchActors,
    fetchRealisators,
    updateMovie,
    handleOnChangeRealisator,
    handleOnChangeActor,
    onChangeInput,
    loadMovie,
    reset
} from '../../modules/creationmovie';
import _ from 'lodash'


class Edit extends React.Component {
    constructor(props) {
        super(props)
        this.onChangeInput = this.onChangeInput.bind(this);
        this.updateTheMovie = this.updateTheMovie.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentWillMount() {
        this.props.loadMovie(this.props.match.params.id)
        this.props.fetchActors();
        this.props.fetchRealisators();
    }

    componentWillUnmount(){
        this.props.reset();
    }


    goBack() {
        (this.props).history.goBack()
    }

    updateTheMovie() {
        this.props.updateMovie();
        if (this.props.create.succeedEditData) {
            (this.props).history.push('/movies')
        }
    }

    onChangeInput(event) {
        this.props.onChangeInput(event)
    }


    renderOptionsRealisators(array) {
        let options = [];
        options.push(<option key={-1} selected>Select the realisators</option>)
        array.map((item, index) => {
            options.push(<option key={index} value={item.realisatorID}>{item.firstName + ' ' + item.lastName}</option>)
        })
        return options
    }


    renderOptionsActors(array) {
        let options = [];
        options.push(<option key={-1} selected>Select the actors</option>)
        array.map((item, index) => {
            options.push(<option key={index} value={item.actorID}>{item.firstName + ' ' + item.lastName}</option>)
        })
        return options
    }

    renderForm() {
        return (
            <div className="mui-form">
                <div className="mui-textfield">
                    <label htmlFor="title" className="col-form-label">Title:</label>
                    <input type="text" className="form-control" id="title" value={this.props.create.movie.title} name="title" onChange={this.onChangeInput} />
                </div>
                <div className="mui-textfield">
                    <label htmlFor="boxDate" className="col-form-label">BoxDate:</label>
                    <input className="form-control" id="boxDate" type="date" name="boxDate" value={this.props.create.movie.boxDate} onChange={this.onChangeInput} />
                </div>
                <div className="mui-textfield">
                    <label htmlFor="cover" className="col-form-label">Cover:</label>
                    <input type="text" className="form-control" id="cover" name="cover" value={this.props.create.movie.cover} onChange={this.onChangeInput} />
                </div>
                <div className="mui-select">
                    <label htmlFor="actor" className="col-form-label">Actors:</label>
                    <select onChange={this.props.handleOnChangeActor} name="actor" id="actor" value={this.props.create.movie.actorId}>
                        {this.renderOptionsActors(this.props.create.actors)}
                    </select>
                </div>
                <div className="mui-select">
                    <label htmlFor="actor" className="col-form-label">Realisator:</label>
                    <select onChange={this.props.handleOnChangeRealisator} name="realisator" id="realisator" value={this.props.create.movie.realisatorId}>
                        {this.renderOptionsRealisators(this.props.create.realisators)}
                    </select>
                </div>
                <div className="mui-textfield">
                    <button type="button" className="mui-btn mui-btn--danger" onClick={this.goBack}>Cancel</button>
                    <button type="button" className="mui-btn mui-btn--primary" onClick={(event) => this.updateTheMovie()}>Submit movie</button>
                </div>
            </div>
        )
    }

    render() {
        if (this.props.create.movie !== undefined) {
            return this.renderForm()
        }
        return <div>Edited</div>

    }
}

const mapStateToProps = state => ({
    create: state.create
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            updateMovie,
            fetchActors,
            fetchRealisators,
            handleOnChangeActor,
            handleOnChangeRealisator,
            onChangeInput,
            loadMovie,
            reset
        },
        dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);