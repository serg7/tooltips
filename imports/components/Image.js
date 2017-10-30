import React from 'react';
import PropTypes from 'prop-types';

import { Images } from '../api/images';

export default class Image extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            loaded: false,
            src: ''
        };
    }

    onImageLoadError(event)
    {
        //console.log('URL: ' + this.props.url);
        // TODO: prevent unlimited requests
        event.target.src = '/cfs/files/files/' + this.props.fileId;
    }

    componentDidMount()
    {
        const img = this.refs.img;
        if (img.complete)
        {
            this.handleImageLoaded();
        }
    }

    handleImageLoaded()
    {
        if (!this.state.loaded) {
            console.log('image loaded');
            this.setState({ loaded: true });
        }
    }

    render()
    {
        return (
            <div className="image__container">
                <img ref="img" src={'/cfs/files/files/' + this.props.fileId}
                     onClick={() => this.props.openPreview(this.props.title, this.props.tooltip, this.props.fileId)}
                     onLoad={this.handleImageLoaded.bind(this)}
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