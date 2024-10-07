import { Paper, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';

function UploadDocument() {
    const onDrop = (acceptedFiles: any) => {
        // Handle the file upload, currently just logging
        //@ts-ignore
        const pdfFiles = acceptedFiles.filter(file => file.type === 'application/pdf');
        if (pdfFiles.length > 0) {
            console.log('Uploaded PDFs:', pdfFiles);
        } else {
            console.log('Please upload only PDF files.');
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': []
        },
    });

    return (
        <div className='option-container'>
            <div className="title">Upload a Document</div>
            <p>Feed a document to our Large Language Model</p>

            <Paper
                {...getRootProps()}
                elevation={3}
                sx={{
                    boxShadow: 'none',
                    marginTop: "20px",
                    padding: '20px',
                    textAlign: 'center',
                    border: isDragActive ? '2px solid #3f51b5' : '2px dashed #ccc',
                    cursor: 'pointer',
                    marginBottom: '20px'
                }}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <Typography color="primary">
                        Drop the PDF files here...
                    </Typography>
                ) : (
                    <Typography >
                        Drag & drop your PDF files here, or click to select files
                    </Typography>
                )}
            </Paper>

            <div className='button-section'>
                <button onClick={() => console.log('Handle Upload Logic')}>
                    Upload Document
                </button>
            </div>
        </div>
    );
}

export default UploadDocument;