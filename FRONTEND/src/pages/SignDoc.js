import React, { Component } from "react";
import { Formik, useFormikContext } from "formik";
import {InputField} from "../components/FormFields";
import ProgressFlow from "../components/ProgressFlow";

class CreateForm extends Component {
  render() {
    return (
      <>
        <Formik
          initialValues={{ docname: "", signee: "", document: null }}
          validate={(values) => {
            const errors = {};

            // docname field validations
            if (!values.docname) {
              errors.docname = "Required";
            }

            // signee field validations
            if (!values.signee) {
              errors.signee = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.signee)
            ) {
              errors.signee = "Invalid email address";
            }

            // document field validations
            if (!values.document) {
              errors.document = "Required";
            } else if (!/.*(.pdf)$/i.test(values.file.name)) {
              errors.doument = "Document format is not in .pdf";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert("Please confirm the submission");
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form
              className="grid grid-cols-2 xl:w-1/2 p-8"
              onSubmit={handleSubmit}
            >
              <InputField
                className="col-span-1.5"
                input="Document Name"
                type="text"
                value="docname"
                placeholder="ABC123"
              />
              <InputField
                input="Assigned To"
                type="text"
                value="signee"
                info="Please input in email format"
              />
              <InputField
                input="Upload Document"
                type="file"
                value="document"
                info="Please upload document of *.pdf"
              />
              <InputField input="" />
              <button
                className="col-span-2 rounded-md text-white bg-black m-auto px-3 py-2 hover:bg-slate-200 hover:text-gray-900"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </form>
          )}
        </Formik>
      </>
    );
  }
}

class SignDoc extends Component {
  #status = "create";
  render() {
    const CurrentForm = () => {
      let element;

      if (this.#status == "create") element = <CreateForm />;
      else if (this.#status == "review") element = <Review />;
      else element = <Complete />;

      return element;
    };
    return (
      <>
        <ProgressFlow
          stage={["create", "review", "complete"]}
          status={this.#status}
        />
        <CurrentForm />
      </>
    );
  }
}

export default SignDoc;
