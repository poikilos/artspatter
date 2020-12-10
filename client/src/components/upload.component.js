import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

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

const vtitle = value => {
  if (value.length < 2 || value.length > 100) {
    return (
      <div className="alert alert-danger" role="alert">
        The title must be between 2 and 100 characters.
      </div>
    );
  }
};

const description = value => {
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

    this.state = {
      title: "",
      description: "",
      image: null,
      successful: false,
      message: "",
    };
  }

  onChangeTitle(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  handleUpload(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      UploadService.upload(
        this.state.title,
        this.state.description,
        this.state.image,
      ).then(
        response => {
          this.setState({
            message: reporting.responseLeaf(response),
            successful: true,
          });
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
      <div className="col-md-12">
        <div className="card card-container">
          <Form
            method="post"
            enctype="multipart/form-data"
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
                    validations={[required, description]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="image">Image</label>
                  <Input
                    type="file"
                    className="form-control"
                    name="image"
                    value={this.state.image}
                    // onChange={this.onChangeImage}
                    // validations={[required, vimage]}
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
    );
  }
}

// (BezKoder, 2019b)
