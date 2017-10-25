import React from 'react';
import PropTypes from 'prop-types';

import { Images } from '../api/images';

export default class Image extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            src: ''
        }
    }

    onImageLoadError(event)
    {
        event.target.src = '/cfs/files/files/' + this.props.fileId;
    }

    render()
    {
        return (
            <div className="image__container">
                <img src={'/cfs/files/files/' + this.props.fileId}
                     onClick={() => this.props.openPreview(this.props.title, this.props.tooltip, this.props.fileId)}
                     onError={this.onImageLoadError.bind(this)}
                />
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