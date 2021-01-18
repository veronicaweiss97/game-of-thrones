import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMesage';

export default class ItemList extends Component {

    state = {
        itemList: null,
        randomKey: `f${(~~(Math.random() * 1e8)).toString(16)}`,
        error: false
    }

    componentDidMount() {

        const {getData} = this.props;

        getData()
            .then( (itemList) => {
                this.setState({
                    itemList
                })
            })
    }

    renderItems(arr) {
        return arr.map((item, i) => {

            const {id} = item;
            const label = this.props.renderItem(item);

            return(
                <li 
                    key={this.randomKey}
                    className="list-group-item"
                    onClick={ () => this.props.onCharSelected(i, id)}>
                    {label}
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
        const {itemList, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;

        if ( !itemList ) {
            return <Spinner/>
        }

        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
            {errorMessage}
               {items}
            </ul>
        );
    }
}