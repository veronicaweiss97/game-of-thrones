import React, {Component} from 'react';
import gotService from '../../services/gotService';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMesage';

export default class ItemList extends Component {

    gotService = new gotService();

    state = {
        charList: null,
        randomKey: `f${(~~(Math.random() * 1e8)).toString(16)}`,
        error: false
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then( (charList) => {
                this.setState({
                    charList
                })
            })
    }

    renderItems(arr) {
        return arr.map((item, i) => {
            return(
                <li 
                    key={this.randomKey}
                    className="list-group-item"
                    onClick={ () => this.props.onCharSelected(41 + i)}>
                    {item.name}
                 </li>
            )
        })
    }
    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    render() {
        const {charList, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;

        if ( !charList ) {
            return <Spinner/>
        }

        const items = this.renderItems(charList);

        return (
            <ul className="item-list list-group">
            {errorMessage}
               {items}
            </ul>
        );
    }
}