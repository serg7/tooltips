import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

import { files, filesStore } from "../api/images";

export default class AddImage extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            title: '',
            tooltip: '',
            isOpen: false,
            error: '',
            file: '',
            imagePreviewUrl: ''
        };
    }

    onSubmit(event)
    {
        event.preventDefault();

        const { title, tooltip, file } = this.state;
        let fileObj = files.insert(file);
        let cursor = files.findOne(fileObj._id);

        cursor.on('uploaded', Meteor.bindEnvironment(() => {
            Meteor.call('images.insert', title, tooltip, fileObj, (error, response) => {
                !error ? this.setState({ isOpen: false, title: '', error: '', tooltip: '', imagePreviewUrl: '' }) : this.setState({ error: error.reason });
            });
        }));
    }

    handleImageChange(event) {
        event.preventDefault();

        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({ file, imagePreviewUrl: reader.result });
        }
        reader.readAsDataURL(file);
    }

    render()
    {
        let imagePreview = this.state.imagePreviewUrl ? <img src={this.state.imagePreviewUrl} /> : <div>Please select an Image for Preview</div>;

        return (
            <div>
                <button className="button" onClick={() => this.setState({isOpen: true})}>Add Image</button>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel="Add image"
                    onAfterOpen={ () => this.refs.title.focus() }
                    onRequestClose={() => this.setState({ isOpen: false, title: '', error: '', tooltip: '' })}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view__modal"
                >
                    <h1>Add Image</h1>

                    { this.state.error ? <p>{this.state.error}</p> : undefined }
                    <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                        <input
                            type="text"
                            ref="title"
                            onChange={(event) => this.setState({ title: event.target.value}) }
                            placeholder="Image title" />
                        <input
                            type="text"
                            ref="tooltip"
                            onChange={(event) => { this.setState({ tooltip: event.target.value}) }}
                            placeholder="Tooltip text" />

                        <input className="fileInput"
                               type="file"
                               onChange={(e)=>this.handleImageChange(e)} />
                        <div className="imgPreview">
                            {imagePreview}
                        </div>

                        <button className="button">Add Image</button>
                        <button className="button button__secondary" type="button" onClick={() => this.setState({ isOpen: false, title: '', error: '', tooltip: '' })}>Cancel</button>
                    </form>
                </Modal>
            </div>
        )
    }
}