import React, { Component } from "react";
import { Link, Outlet } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

function RenderViewLinkDashboard(...props) {
  const viewHeader = props.name;
  const viewIcon = props.icon;
  return <div></div>;
}

class Dashboard extends Component {
  dashboardLinks = [
    { name: "Doc Box", href: "" },
    { name: "Sign Box", href: "" },
    { name: "Trash", href: "" },
  ];
  render() {
    return (
      <div id="Dashboard" className="h-full">
        <div className="flex flex-col justify-around py-4 px-6 w-1/6 h-full">
          <div className="flex flex-col text-center space-y-3">
            {this.dashboardLinks.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="no-underline max-w-md hover:bg-gray-800 hover:text-gray-300 py-2 px-6 w-full"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div>
            <div className="flex flex-col space-y-2 items-center py-4 px-6 mb-10">
              <Link to="../createdoc" className="no-underline">
                <PlusCircleIcon className="block  text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white h-8 w-8" />
              </Link>
              <span>Create Document</span>
            </div>
            <div className="flex flex-col space-y-2 items-center py-4 px-6 mb-10">
              <Link to="../createsign" className="no-underline">
                <PlusCircleIcon className="block  text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white h-8 w-8" />
              </Link>
              <span>Create Signature</span>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    );
  }
}

export default Dashboard;
