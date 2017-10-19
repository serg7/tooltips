import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

import Image from './Image';
import { Images, files } from '../api/images';
import AddImage from './AddImage';
import Tooltip from './Tooltip';

export default class ImageList extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            images : [],
            tooltip: '',
            title: '',
            id: '',
            modalPreviewIsOpen: false,
            modalEditIsOpen: false,
            previewItem: {
                title: '',
                tooltip: ''
            }
        }
    }

    componentDidMount()
    {
        this.imagesTracker = Tracker.autorun(() => {
            Meteor.subscribe('images');
            const images = Images.find({ }).fetch();
            this.setState({ images });
        });
    }

    renderImages()
    {
        if (this.state.images.length === 0)
        {
            return <div className="item"><p className="item__status-message">No Images Found</p></div>;
        }

        return this.state.images.map((image) => {
            return (
                <Image
                    openPreview={(title, tooltip) => this.setState({ modalPreviewIsOpen: true, previewItem: { title, tooltip } })}
                    closePreview={() => this.setState({ modalPreviewIsOpen: false })}
                    openEdit={(id, title, tooltip) => this.setState({ modalEditIsOpen: true, id, title, tooltip })}
                    closeEdit={() => this.setState({ modalEditIsOpen: false })}
                    tooltip={image.tooltip}
                    id={image._id}
                    fileId={image.file._id}
                    key={image._id}
                    title={image.title}
                />
            )
        });
    }

    updateImage(event)
    {
        event.preventDefault();

        const { id, title, tooltip, file } = this.state;
        let fileObj = files.insert(file);

        Meteor.call('images.update', id, title, tooltip, fileObj, (error, response) => {
            !!error ? this.setState({ error: error.reason }) : this.setState({ modalEditIsOpen: false, title: '', error: '', tooltip: '' });
        });
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
        console.log('render method');

        let imagePreview = this.state.imagePreviewUrl ? <img src={this.state.imagePreviewUrl} /> : <div>Please select an Image for Preview</div>;

        return (
            <div>
                <div className="header">
                    <div className="header__content">
                        <h1 className="header_title">Admin panel</h1>
                        <button className="button button__link-text" onClick={() => Accounts.logout() }>Logout</button>
                    </div>
                </div>

                <div className="page-content">
                    <AddImage/>

                    <Modal
                        isOpen={this.state.modalPreviewIsOpen}
                        contentLabel="Preview"
                        className="boxed-view__box boxed-view__preview"
                        overlayClassName="boxed-view boxed-view__modal"
                    >
                        <div className="boxed-view__content">
                            <Tooltip text={this.state.previewItem.tooltip}>
                                <img src='/img/chamomile.jpg' title={this.state.previewItem.title} />
                            </Tooltip>
                        </div>
                        <button className="button button__secondary" type="button" onClick={() => this.setState({ modalPreviewIsOpen: false })}>Cancel</button>
                    </Modal>

                    <Modal
                        isOpen={this.state.modalEditIsOpen}
                        contentLabel="Edit"
                        className="boxed-view__box"
                        overlayClassName="boxed-view boxed-view__modal"
                    >
                        { this.state.error ? <p>{this.state.error}</p> : undefined }
                        <form onSubmit={this.updateImage.bind(this)} className="boxed-view__form">
                            <label>Title</label>
                            <input
                                type="text"
                                ref="title"
                                onChange={(event) => this.setState({ title: event.target.value }) }
                                defaultValue={this.state.title}
                                placeholder="Image title"
                            />
                            <label>Tooltip text</label>
                            <input
                                type="text"
                                ref="tooltip"
                                defaultValue={this.state.tooltip}
                                onChange={(event) => { this.setState({ tooltip: event.target.value }) }}
                                placeholder="Tooltip text" />

                            <input className="fileInput"
                                   type="file"
                                   onChange={(e)=>this.handleImageChange(e)} />
                            <div className="imgPreview">
                                {imagePreview}
                            </div>
                            <button className="button">Update</button>
                            <button className="button button__secondary" type="button" onClick={() => this.setState({ modalEditIsOpen: false })}>Cancel</button>
                        </form>
                    </Modal>

                    {this.renderImages()}
                </div>
            </div>
        )
    }

    componentWillUnmount()
    {
        this.imagesTracker.stop();
    }
}
