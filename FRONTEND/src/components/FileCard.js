import React, { Component } from "react";
import {
  DocumentIcon,
  EllipsisHorizontalCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

class FileCard extends Component {
  #showNumDetails = 5
  fileDetailLists = [
    { key: "Owner", val: "Thomas" },
    { key: "Created", val: "10/11/2022" },
    { key: "Signed Date", val: "10/12/2022" },
    { key: "Status", val: "Completed" },
    { key: "IPFSHash", val: "1446faweu4hr823nrdf78rq2t3gufw378" },
    { key: "Document Size", val: "123 MB" },
    { key: "Document Hash", val: "awqewraasdce123245235wrfwe5t65" },
    { key: "", val: "" },
  ];

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="shadow-lg shadow-gray-500 flex flex-row p-4 space-x-3 bg-gradient-to-r from-gray-700 via-gray-900 to-black ">
        <div className="flex flex-col border-solid border-r-2 border-r-gray-300 w-10">
          <DocumentIcon className="flex-grow h-6 w-6 text-slate-200" />
        </div>
        <div className="flex flex-grow flex-row justify-between p-2">
          <div className=" flex flex-col justify-between basis-1/2">
            <h1 className="text-xl font-bold text-gray-300">Document</h1>
            {/* <Link to="#" className="">
              Download Document
            </Link> */}
            <a
              href=""
              className="no-underline text-sm font-semibold hover:text-white text-gray-400 "
            >
              Download Document
            </a>
          </div>
          {/* Display file details */}
          <div className=" flex flex-col justify-around basis-1/2">
            <div className="space-y-2">
              {this.fileDetailLists.slice(0, this.#showNumDetails).map(({ key, val }) => (
                <div
                  key={key}
                  className="flex flex-row justify-start space-x-0.5"
                >
                  <h1 className="text-slate-400 font-semibold text-sm">
                    {key}:
                  </h1>
                  <h1 className="text-slate-200 text-sm">{val}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-solid border-l-2 border-r-gray-300 flex flex-col justify-around w-10">
          <div className="text-slate-400 hover:text-slate-200 flex justify-center">
            <EllipsisHorizontalCircleIcon
              onClick={() => {}}
              className="h-6 w-6"
            />
          </div>
          <div className="text-slate-400 hover:text-slate-200 flex justify-center">
            <TrashIcon className="h-6 w-6" />
          </div>
        </div>
      </div>
    );
  }
}

export default FileCard;
