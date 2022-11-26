import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { Formik } from "formik";
import {InputField, FileInputField} from "../components/FormFields";
import ProgressFlow from "../components/ProgressFlow";
import {addDocument, uploadIPFS} from "../models/ApiCalls";

class CreateForm extends Component {

  onFormUpdate = (formValue)=>{
    this.props.onFormUpdate(formValue)
    this.props.onStatusChange(this.props.nextStatus);
  };

  onFormSubmit = async (formdata) =>{
    const response = await addDocument(formdata)
    return response
  }

  render() {
    return (
      <>
        <Formik
          initialValues={{ docname: "", document: "" }}
          validate={(values) => {
            const errors = {};

            // docname field validations
            if (!values.docname) {
              errors.docname = "Required";
            }

            //  document field validations
            if (!values.document) {
              errors.document = "Required";
            } 
            else if (!/.*(.pdf)$/i.test(values.document.name)) {
              errors.document = "Document format is not in .pdf";
            }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(false);
            let formdata = new FormData()
            for(let value in values){
              formdata.append(value, values[value])
            }

            // Submit the form with form data
            let response = await this.onFormSubmit(formdata)
            // Check whether response status is success or not
            if ( response.status == "success"){
              this.onFormUpdate(response.content)
            }
            else {
              console.log("Error occured at server, please try again")
            }
          }}
        >
          {({ handleSubmit, isSubmitting, setFieldValue }) => (
            <form
              className="grid grid-cols-2 xl:w-1/2 p-8"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <InputField
                className="col-span-1.5"
                input="Document Name"
                type="text"
                value="docname"
                placeholder="ABC123"
                info="Please enter a document name"
              />
              <FileInputField
                input="Upload Document"
                type="file"
                value="document"
                info="Please upload document of *.pdf"
              />
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
class ReviewForm extends Component{
  constructor(props){
    super(props)
    this.formValue = this.props.formValue
  }

  onUploadToIPFS = async() =>{
    const response = await uploadIPFS(this.formValue["id"])
    console.log(response)
    if(response.status == "success"){
      let formValue = {
        "status": response.status,
        "form": this.formValue,
        "cid": response.content.value.cid,
        "size": response.content.value.id,
        "created_date": response.content.value.created
      }
      this.props.onFormUpdate(formValue)
      this.props.onStatusChange(this.props.nextStatus)
    }
    else {
      console.log("File not uploaded successfully")
    }
  }

  render(){
    console.log(this.formValue["id"])
    return(
      <div className="flex justify-center pt-10">
        <div className="flex flex-col space-y-4 py-3 px-10 shadow-xl w-1/2">
          {
            Object.entries(this.formValue).map(([key, value])=>(
              <div key={key} className="flex justify-between">
                <p className="">{key}:</p>
                <p className="">{value}</p>
              </div>
            ))
          }
          <div className="mx-auto pt-10 pb-5">
            <button
              className="rounded-md text-white bg-black mx-auto px-3 py-2 hover:bg-slate-200 hover:text-gray-900"
              type="submit"
              onClick={this.onUploadToIPFS}
            >
              Upload to IPFS
            </button>
          </div>
        </div>
      </div>
    )
  }
}

class Complete extends Component{
  constructor(props){
    super(props)
    this.formValue = this.props.formValue
    this.state = {
      time:5
    }
  }

  handleTimer = ()=>{
      this.setState({time: this.state.time - 1})
  }

  componentDidMount(){
    this.timerID = setInterval(this.handleTimer, 1000);

  }
  componentWillUnmount(){
    clearInterval(this.timerID)
  }

  render(){
    return(
      <div className="flex justify-center pt-20">
        <div className="flex flex-col space-y-3 ">
        {
          (this.formValue.status == "success") ?
            (
              <>
                <p><b>Document  uploaded successfully</b></p>
                <p><b>IPFS CID:</b> {this.formValue.cid}</p>
                <p><b>File Size: </b>{this.formValue.size}</p>
                <p><b>created date:</b> {this.formValue.created}</p>
                <p>Redirecting to dashboard in <b>{this.state.time}s</b></p>
              </>
            )
          : (
              <>
                <p><b>Document uploading failed</b></p>
                <p>Please retry after sometime</p>
                <p>Redirecting to dashboard in <b>{this.state.time}s</b></p>
              </>
            )
        }
        {
          (this.state.time == 0) && <Navigate to="../dashboard"/>
        }
      </div>
      </div>
    )
  }
}


class CreateDoc extends Component {
  // State variables
  state = {
    status: "create",
  };

  // Form values
  formValue = {}

  // Change status of the progress flow and render form accordingly
  handleStatusChange = (status) => {
    this.setState({ status: status });
  };

  // Update the form values
  handleFormValues = (values) => {
    console.log(values)
    this.formValue = values
  };

  render() {
    // Initialize status array and form to display 
    // Three Stages for this form 
    const statusArray = ["create", "review", "complete"]
    const CurrentForm = () => {
      switch(this.state.status){
        case "create":
          return <CreateForm nextStatus="review" onStatusChange={this.handleStatusChange} onFormUpdate={this.handleFormValues}/>
        case "review":
          return <ReviewForm formValue={this.formValue} nextStatus="complete" onStatusChange={this.handleStatusChange} onFormUpdate={this.handleFormValues}/> 
        case "complete":
          return <Complete formValue={this.formValue}/>
        default:
          <></>
      }
    }

    return (
      <>
        <ProgressFlow
          stage={statusArray}
          status={this.state.status}
        />
        <CurrentForm/>
      </>
    );
  }
}

export default CreateDoc;
