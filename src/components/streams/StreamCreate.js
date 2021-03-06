import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createStream } from "../../actions";

class StreamCreate extends React.Component {
  renderErrors({ error, touched }) {
    if (error && touched) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  // shows the input fields
  showForm = ({ input, label, meta }) => {
    const errorField = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={errorField}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderErrors(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.showForm} label="Enter Usename" />
        <Field
          name="description"
          component={this.showForm}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

// show the error message in fields
const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You have to enter a title!";
  }

  if (!formValues.description) {
    errors.description = "You have to enter a decription!";
  }
  return errors;
};

const formWrapper = reduxForm({
  form: "createStream",
  validate
})(StreamCreate);

export default connect(
  null,
  { createStream }
)(formWrapper);
