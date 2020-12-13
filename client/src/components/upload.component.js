import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import UploadService from "../services/upload.service";
const reporting = require("../reporting");

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vtitle = (value) => {
  if (value.length < 2 || value.length > 100) {
    return (
      <div className="alert alert-danger" role="alert">
        The title must be between 2 and 100 characters.
      </div>
    );
  }
};

const vdescription = (value) => {
  if (value.length < 10 || value.length > 300) {
    return (
      <div className="alert alert-danger" role="alert">
        The description must be between 10 and 300 characters.
      </div>
    );
  }
};

export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    // this.onFormSubmit = this.onFormSubmit.bind(this);

    this.state = {
      title: "",
      description: "",
      file: null,
      files: [],
      successful: false,
      message: "",
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeImage(e) {
    /*
    console.log("e.target.files:", e.target.files);
    this.setState({
      file: e.target.files[0],
    });
    // Uncaught DOMException: An attempt was made to use an object that is not, or is no longer, usable
    */
   console.log("e.target.files:", e.target.files);
   console.log("e.target.file:", e.target.file);
   this.setState({
    //file: e.target.files[0],
    files: e.target.files, // this is the only thing that
    // prevents crash (?):
    // InvalidStateError: An attempt was made to use an object that is not, or is no longer, usable
    // --or:
    // TODO:? readystatechange ? 
  });
  /*
    var files = e.target.files;
    console.log(files);
    var filesArr = Array.prototype.slice.call(files);
    console.log(filesArr);
    this.setState({ files: [...this.state.files, ...filesArr] });
    // ^ See https://codesandbox.io/s/xnxmzxbe?file=/index.js:528-589
    // this.setState({file: files[0]});

    */
  }

  removeFile(f) {
    this.setState({ files: this.state.files.filter(x => x !== f) }); 
  }

  handleUpload(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      const formData = new FormData();
      formData.append('title', this.state.title);
      formData.append('description', this.state.title);
      formData.append('file', this.state.files[0]);

      // Array notes and other notes:
      // <https://medium.com/@mahesh_joshi/reactjs-nodejs-upload-image-how-
      // to-upload-image-using-reactjs-and-nodejs-multer-918dc66d304c>
      
      UploadService.upload(
        formData,
      ).then(
        response => {
          this.setState({
            message: reporting.responseLeaf(response),
            successful: true,
          });
          // document.getElementById('file').value = null;
          // ^ TODO:? Prevent reuse causing bug, see 
          //   https://github.com/redux-form/redux-form/issues/769
        },
        error => {
          this.setState({
            successful: false,
            message: reporting.errorLeaf(error),
          });
        }
      );
    }
  }

  render() {
    return (
      <section
        className="flex p-5 flex-col justify-center text-center"
        style={{ minWidth: "100vw", minHeight: "100vh" }}
      >
        <div className="col-md-12">
          <div className="card card-container">
            <Form
              method="post"
              encType="multipart/form-data"
              onSubmit={this.handleUpload}
              ref={c => {
                this.form = c;
              }}
            >
              {!this.state.successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="title"
                      value={this.state.title}
                      onChange={this.onChangeTitle}
                      validations={[required, vtitle]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="description"
                      value={this.state.description}
                      onChange={this.onChangeDescription}
                      validations={[required, vdescription]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="file">Image</label>
                    <Input
                      type="file"
                      id="file"
                      className="form-control"
                      name="file"
                      value={this.state.file}
                      onChange={this.onChangeImage}
                      validations={[required]} //
                      ref={ref => this.fileInput = ref}
                    />
                  </div>

                  <div className="form-group">
                    <button className="btn btn-primary btn-block">Submit</button>
                  </div>
                </div>
              )}

              {this.state.message && (
                <div
                  className={
                    this.state.successful
                    ? "text-white px-6 py-4 border-0 rounded relative mb-4 bg-green-500"
                    : "text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500"
                  }
                  >
                  { this.state.successful
                    ?
                    <span className="text-xl inline-block mr-5 align-middle">
                      <i className="fas fa-check" />
                    </span>
                    :
                    <span className="text-xl inline-block mr-5 align-middle">
                      <i className="fas fa-bell" />
                    </span>
                  }
                  <span
                    className={
                      this.state.successful
                        ? "alert alert-success"
                        : "alert alert-danger"
                    }
                  >
                    {this.state.message}
                  </span>
                </div>
              )}
              {this.state.debug && (
                <div
                  className={
                    this.state.successful
                    ? "text-white px-6 py-4 border-0 rounded relative mb-4 bg-green-500"
                    : "text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500"
                  }
                  >
                  { this.state.successful
                    ?
                    <span className="text-xl inline-block mr-5 align-middle">
                      <i className="fas fa-check" />
                    </span>
                    :
                    <span className="text-xl inline-block mr-5 align-middle">
                      <i className="fas fa-bell" />
                    </span>
                  }
                  <span
                    className={
                      this.state.successful
                        ? "alert alert-success"
                        : "alert alert-danger"
                    }
                  >
                    {this.state.debug}
                  </span>
                </div>
              )}
              <CheckButton
                style={{ display: "none" }}
                ref={c => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          </div>
        </div>
      </section>
    );
  }
}

// (BezKoder, 2019b)
