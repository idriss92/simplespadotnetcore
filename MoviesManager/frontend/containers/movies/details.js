import React from 'react'; import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    fetchActors,
    fetchRealisators,
    loadMovie,
    reset
} from '../../modules/creationmovie';
import _ from 'lodash'


class Details extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.loadMovie(this.props.match.params.id);
        this.props.fetchActors();
        this.props.fetchRealisators()
    }

    componentWillUnmount() {
        this.props.reset();
    }

    shouldComponentUpdate(nextProps) {
        const differentcreatemovie = this.props.create.succeedLoadOneData != nextProps.create.succeedLoadOneData;
        return differentcreatemovie;
    }
    renderDetails() {
        if (this.props.create.succeedLoadOneData) {
            return (
                <div className="mui-form">
                    <div className="mui-textfield">
                        <label>Title:</label>
                        <div>{this.props.create.movie.title}</div>
                    </div>
                    <div className="mui-textfield">
                        <label>BoxDate:</label>
                        <div>{this.props.create.movie.boxDate} </div>
                    </div>
                    <div className="mui-textfield">
                        <label>Cover:</label>
                        <div><img src={this.props.create.movie.cover} height={300} width={300} /></div>
                    </div>

                    <div className="mui-textfield">
                        <label>Realisator:</label>
                        <div>{this.props.create.movie.realisator.firstName +' '+this.props.create.movie.realisator.lastName} </div>
                    </div>
                    
                    <div className="mui-textfield">
                        <label>Actors:</label>
                        {this.renderActor(this.props.create.movie.actors)}
                    </div>
                </div>

            )
        }
        return <div>fail to load details</div>
    }

    renderActor(actors){
        let actorRender;
        actors.forEach((actor)=>{
            actorRender = ' '+actor.firstName +' '+ actor.lastName
        })
        return <div>{actorRender}</div>
    }
    render() {
        return this.renderDetails()
    }
}

const mapStateToProps = state => ({
    create: state.create
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            loadMovie,
            fetchActors,
            fetchRealisators,
            reset
        },
        dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)