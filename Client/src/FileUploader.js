import React, {
    Component
} from 'react';
import {
    DropzoneDialog
} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';
import request from 'superagent'

const apiBaseUrl = "http://10.172.113.98:8090/";
// const apiBaseUrl = "http://localhost:8090/";


// =============================================================================================================
// =============================================================================================================
// =============================================================================================================
// Generate Fake Data
function createData(id, type, keyword, description) {
    return {id, type, keyword, description};
}

const detail = [
createData(0, "type 1", "issue 1", "this is a attacking signal"),
createData(1, "type 2", "issue 2", "this is a attacking signal"),
createData(2, "type 3", "issue 3", "this is a attacking signal"),
createData(3, "type 4", "issue 4", "this is a attacking signal"),
createData(4, "type 5", "issue 5", "this is a attacking signal"),
createData(5, "type 6", "issue 6", "this is a attacking signal"),
];

const fakeReport = {
    Summary: [{
        Field: "Type 1",
        Value: 0
    }, {
        Field: "Type 2",
        Value: 3
    }, {
        Field: "Type 3",
        Value: 2
    }, {
        Field: "Type 4",
        Value: 1
    }, {
        Field: "Type 5",
        Value: 3
    }, {
        Field: "Type 6",
        Value: 2
    }, {
        Field: "Type 17",
        Value: 2
    }],
    Score: 100,
    Detail: detail,
}
// =============================================================================================================
// =============================================================================================================
// =============================================================================================================


class FileUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogopen: false,
            uploading: false,
        };
    }

    handleDialogClose() {
        this.setState({
            dialogopen: false
        });
    }

    handleDialogOpen() {
        this.setState({
            dialogopen: true,
        });
    }

    showProgressBar() {
        this.setState({
            uploading: true,
        });
    }

    hideProgressBar() {
        this.setState({
            uploading: false,
        });
    }

    notifyAnalyzeCompleted(err, report) {
        if (this.props.onAnalyzeCompleted != null) {
            this.props.onAnalyzeCompleted(err, report);
        }
    }

    handleSave(files) {
        var self = this;
        if (files.length > 0) {
            var req = request.post(apiBaseUrl + 'writeFile');
            for (var i in files) {
                req.attach('fileToCheck', files[i], files[i].name)
            }
            req.end(function (err, res) {
                
                if (err) {
                    console.log("error ocurred");
                }

                self.hideProgressBar();

                // TODO: TODO: TODO:
                // console.log(res.body);
                let result = res ? res.body : fakeReport;
                self.notifyAnalyzeCompleted(err, result);
            });
                
            self.handleDialogClose();
            self.showProgressBar();
        } else {
            alert("Please upload some files first");
        }
    }

    render() {
        const inUploading = this.state.uploading;

        return (
            <div>
                {!inUploading? (
                    <div>
                        <Button onClick={this.handleDialogOpen.bind(this)}>
                        Add A File To Scan
                        </Button>
                        <DropzoneDialog
                            open={this.state.dialogopen}
                            onSave={this.handleSave.bind(this)}
                            submitButtonText="Submit to scan"
                            filesLimit={1} 
                            dropzoneText="Drop your xlsm file here or click"
                            acceptedFiles={['application/vnd.ms-excel.sheet.macroEnabled.12']}
                            showPreviews={false}
                            showPreviewsInDropzone={true}
                            maxFileSize={5000000}
                        />
                    </div>
                ) : (
                    <div>
                        <CircularProgress /> Scanning is processing
                    </div>
                )}
            </div>
        );
    }
}

export default FileUploader;
