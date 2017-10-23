import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortId from 'shortid';

//FS.debug = true;

export const Images = new Mongo.Collection('images');
export const filesStore = new FS.Store.FileSystem('files', { path: '/uploads' });
export const files = new FS.Collection('files', { stores: [filesStore] });

if (Meteor.isServer)
{
    Meteor.publish('images', function() {
        return Images.find({ userId: this.userId });
    });
}

Meteor.methods({
    'images.insert'(title, tooltip, file)
    {
        if (!this.userId)
        {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            title: {
                type: String,
                label: 'Image title',
                required: true,
                min: 5,
                max: 30
            },
            tooltip: {
                type: String,
                label: 'Image tooltip',
                required: true,
                min: 5,
                max: 50
            }
        }).validate({ title, tooltip });

        Images.insert({
            _id: shortId.generate(),
            title,
            tooltip,
            file,
            userId: this.userId
        });
    },

    'images.update'(id, title, tooltip, file)
    {
        if (!this.userId)
        {
            throw new Meteor.Error('not-authorized');
        }

        Images.update({ _id: id }, { $set: { title, tooltip, file }});
    }

});

SimpleSchema.defineValidationErrorTransform((error) => {
    return new Meteor.Error(400, error.message);
});