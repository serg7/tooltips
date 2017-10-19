import React from 'react';
import { Link } from 'react-router-dom';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';

import { Images } from '../api/images';
import Tooltip from './Tooltip';

export default class Image extends React.Component
{
    constructor(props)
    {
        super(props);

    }

    render()
    {
        return (
            <div className="image__container">
                <h4>{this.props.title}</h4>

                <Tooltip text={this.props.tooltip}>
                    <img src='/img/chamomile.jpg' onClick={() => this.props.openPreview(this.props.title, this.props.tooltip)} />
                </Tooltip>

                <p><b>Tooltip text</b>: {this.props.tooltip}</p>

                <div className="button_section">
                    <button className="button button__edit" onClick={() => this.props.openEdit(this.props.id, this.props.title, this.props.tooltip)}>Edit</button>
                    <button className="button button__remove" onClick={() => Images.remove({_id: this.props.id})}>Delete</button>
                </div>
            </div>
        );
    }
}

Image.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired
}