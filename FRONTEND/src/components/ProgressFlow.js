import React, { Component } from "react";

class ProgressFlow extends Component {
  /**
   *
   * @param {*} props
   * stage: props receives an array that contains each stage name in the form of successive order
   * status: props receives the status of the progress
   */
  #stage;
  #status;
  #stage_length; // stores the stage length

  constructor(props) {
    super(props);
    this.stage = this.props.stage;
    this.stage_length = this.props.stage.length;
  }
  render() {
    
    const status = this.props.status;
    const status_index = this.stage.indexOf(status);

    return (
      <div className="flex flex-row justify-center shadow-lg shadow-gray-300 py-3">
        {this.stage.map((stage, index) => (
          <React.Fragment key={stage}>
            <div
              className="flex flex-col items-center space-y-2 px-8 py-2"
            >
              <div
                className={`${
                  index == status_index
                    ? "border-teal-700"
                    : index < status_index
                    ? "bg-teal-700 border-teal-700"
                    : "bg-gray-400 border-gray-400"
                } rounded-full border-solid border-2 h-2 w-2`}
              ></div>
              <div
                className={`${
                  index == status_index ? "border-teal-600 text-teal-800" : "border-none"
                } border-solid border-b-2 pb-1.5`}
              >
                {stage}
              </div>
            </div>
            {index < this.stage_length - 1 && (
              <div
                id="progress_flow_connector"
                className={`border-solid border-b-2 p-2 bg-gray ${
                  index < status_index ? "border-teal-700" : "border-gray-600"
                } w-64 h-0`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default ProgressFlow;
