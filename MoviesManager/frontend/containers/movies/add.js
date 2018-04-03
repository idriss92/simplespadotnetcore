import React from 'react';import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    fetchActors,
    fetchRealisators,
    createMovie,
    handleOnChangeRealisator,
    handleOnChangeActor,
    onChangeInput
} from '../../modules/creationmovie';
import _ from 'lodash'


class Create extends React.Component {
    constructor(props) {
        super(props)
        this.optionsActors = [];
        this.onChangeInput = this.onChangeInput.bind(this);
        this.createMovies = this.createMovies.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentWillMount() {       
        this.props.fetchActors();
        this.props.fetchRealisators();
    }
    
    goBack() {
        (this.props).history.goBack()
    }

    createMovies  ()  {
        this.props.createMovie();
    }

    onChangeInput(event) {
        this.props.onChangeInput(event)
    }

    shouldComponentUpdate(nextProps) {
        const differentcreatemovie = this.props.create.movie != nextProps.create.movie;
        return differentcreatemovie;
    }

    renderOptionsRealisators(array){
        let options = [];
        options.push(<option key={-1} selected>Select the options</option>)
        array.map((item, index) =>{
            options.push(<option key={index} value={item.realisatorID}>{item.firstName +' ' +item.lastName}</option>)
        })
        return options
    }


    renderOptionsActors(array){
        let options = [];
        options.push(<option key={-1} selected>Select the options</option>)
        array.map((item, index) =>{
            options.push(<option key={index} value={item.actorID}>{item.firstName +' ' +item.lastName}</option>)
        })
        return options
    }

    renderForm(props) {
        return (
            <div className="mui-form">
                <div className="mui-textfield">
                    <label htmlFor="title">Title:</label>
                    <input type="text" required id="title" value={this.props.create.movie.title} name="title" onChange={this.onChangeInput} />
                </div>
                <div className="mui-textfield">
                    <label htmlFor="boxDate">BoxDate:</label>
                    <input required id="boxDate" type="date" name="boxDate" value={this.props.create.movie.boxDate} onChange={this.onChangeInput} />
                </div>
                <div className="mui-textfield">
                    <label htmlFor="cover" required>Cover:</label>
                    <input type="text" id="cover" name="cover"  value={this.props.create.movie.cover} onChange={this.props.onChangeInput} />
                </div>
                <div className="mui-select">
                    <label htmlFor="actor">Actors:</label>
                    <select onChange={this.props.onChangeInput} name="actor" id="actor" value={this.props.create.actorId}>
                        {this.renderOptionsActors(this.props.create.actors)}
                    </select>
                </div>
                <div className="mui-select">
                    <label htmlFor="actor">Realisator:</label>
                    <select onChange={this.props.onChangeInput} name="realisator" id="realisator" value={this.props.create.realisatorId}>
                        {this.renderOptionsRealisators(this.props.create.realisators)}
                    </select>
                </div>
                <div className="mui-textfield">
                    <button type="button" className="mui-btn mui-btn--danger" onClick={this.goBack}>Cancel</button>
                    <button type="button" className="mui-btn mui-btn--primary" onClick={(event) => this.createMovies()}>Submit movie</button>
                </div>
            </div>
        )
    }

    render() {
            return this.renderForm(this.props)
        
        // return <div>Loading</div>

    }
}

const mapStateToProps = state => ({
    create: state.create
})

const mapDispatchToProps = dispatch =>{
    return bindActionCreators(
        {
            createMovie,
            fetchActors,
            fetchRealisators,
            handleOnChangeActor,
            handleOnChangeRealisator,
            onChangeInput
        },
        dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);