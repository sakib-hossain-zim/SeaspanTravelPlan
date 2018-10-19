import React from 'react';

class FileUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);


    var self = this;
    fetch('http://localhost:4000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ imageURL: `http://localhost:4000/${body.file}` });
      });
    }).then(window.alert("Upload successful"))
    .then(localStorage.setItem('imageURL',this.state.imageURL));
  }

  render() {
    return (
      <div className='div_upload'>
      <br />
      <br />
      <p><b> * Please merge all receipts into a single pdf. You can use this website to merge pdf <a href="https://www.pdfmerge.com/">https://www.pdfmerge.com/</a></b> </p>
      <form onSubmit={this.handleUploadImage}>
        <div>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
        </div>
        <div>
          <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
        </div>
        <br />
        <div>
          <button>Upload</button>
        </div>

      </form>
      <br />
      <br />
      </div>
    );
  }
}

export default FileUpload;
