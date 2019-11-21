import React, {
    Component
} from 'react';
import {
    DropzoneDialog
} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';
import request from 'superagent'

// const apiBaseUrl = "http://10.172.113.98:8090/";
const apiBaseUrl = "http://localhost:8090/";


// =============================================================================================================
// =============================================================================================================
// =============================================================================================================
// Generate Fake Data
function createData(id, category, keyword, description, severity, detail) {
    return {id, category, keyword, description, severity, detail };
}

const detail = [
createData(0, "category 1", "issue 1", "this is a attacking signal", 0, "check more details on website"),
createData(1, "category 2", "issue 2", "this is a attacking signal", 1, "check more details on website"),
createData(2, "category 3", "issue 3", "this is a attacking signal", 2, "check more details on website"),
createData(3, "category 4", "issue 4", "this is a attacking signal", 3, "check more details on website"),
createData(4, "category 5", "issue 5", "this is a attacking signal", 4, "check more details on website"),
createData(5, "category 6", "issue 6", "this is a attacking signal", 5, "check more details on website"),
];

const fakeReport = {
    summery: [{
        field: "Type 1",
        value: 0
    }, {
        field: "Type 2",
        value: 3
    }, {
        field: "Type 3",
        value: 2
    }, {
        field: "Type 4",
        value: 1
    }, {
        field: "Type 5",
        value: 3
    }, {
        field: "Type 6",
        value: 2
    }, {
        field: "Type 17",
        value: 2
    }],
    score: 100,
    detail: detail,
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
                self.notifyAnalyzeCompleted(err, fakeReport);
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
