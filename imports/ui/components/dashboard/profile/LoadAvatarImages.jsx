import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Row, Col, Glyphicon, Panel, Button } from 'react-bootstrap';
import { Session } from 'meteor/session';
//import {Images} from '../../../api/images/collections.js';

const imgPath = cv.IMGPATH_HOME;
const avatarSize = '100';



class LoadAvatarImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUpload: false,
            uploading: [],
            progress: 0
        };

        this.inputFile = this.inputFile.bind(this);

    }

    inputFile (e) {

        //const UserImages = Images;
        const UserImages = this.props.AllImages;
        const self = this;
        e.preventDefault();

        if (e.currentTarget.files && e.currentTarget.files[0]) {

            let file = e.currentTarget.files[0];
            let currentDate = new Date();

             console.log('file=', file);
            if (file) {
                let uploadInstance = UserImages.insert({

                    file: file,
                    streams: 'dynamic',
                    chunkSize: 'dynamic',

                    meta: {
                        type: 'avatar',
                        createdAt: currentDate
                    }
                 //allowWebWorkers: true // If you see issues with uploads, change this to false
                }, false);

                self.setState({
                    currentUpload: true,// Show the progress bar now
                    uploading: uploadInstance // Keep track of this instance to use below
                });

                uploadInstance.on('start', function() {
                    console.log('Starting');
                    //Session.set("notLoadImage", false);
                });

                uploadInstance.on('end', function(error, fileObj) {
                  if (error) {
                    alert('Error during upload: ' + error.reason);
                  } else {

                    console.log('File "' + fileObj.name + '" successfully uploaded');
                    //Session.set("loadImageId", fileObj._id);

                    /* следующий фрагмент относится к ресайзу = пока делать не буду
                    //=================================================================
                    let oldFileName = fileObj._id + '.'+ fileObj.extension;
                    let newFileName = fileObj._id + '_'+avatarSize+'.'+ fileObj.extension;

                    //console.log('newFileName====', newFileName);
                    let oldPath = imgPath + oldFileName;
                    let newPath = imgPath + newFileName;

                    Meteor.call('img.resize', oldPath, newPath, avatarSize, avatarSize, (err, res) => {
                        console.log('res= ', res);
                        if(res === 'write') Session.set("notLoadImage", true);
                    });
                    //=================================================================
                    */
                  }

                });

                uploadInstance.on('uploaded', function (error, fileObj) {
                    console.log('uploaded: ', fileObj);
                    //self.refs['avatarInput'].value = '';

                    self.setState({
                        uploading: [],
                        progress: 0,
                        currentUpload: false
                    });
                });

                uploadInstance.on('progress', function (progress, fileObj) {
                    self.setState({
                        progress: progress
                    })
                });

                uploadInstance.on('error', function (error, fileObj) {
                  console.log('Error during upload: ' + error);
                });

                uploadInstance.start();
            }
        }

    }

    render() {
        let currentUpload = this.state.currentUpload;

        return (


                    <Panel header='Or upload a new' bsStyle="info">

                        {currentUpload ?
                            'Uploading'
                        :
                            <div>
                            <input type="file"  id="avatarInput" onChange={this.inputFile} />
                            <p>
                                <small>
                                    Upload file in <code>jpeg</code> or <code>png</code> format, with size less or equal to 4MB
                                </small>
                            </p>
                            </div>
                        }


                    </Panel>


        );

    }

}

export default LoadAvatarImages ;
