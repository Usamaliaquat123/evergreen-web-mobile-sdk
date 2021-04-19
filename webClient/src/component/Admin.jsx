/* eslint-disable no-console */
import React from "react";
import Dashboard from "./Admin/Dashboard";
import AdminPage from "./Admin/AdminPages/AdminPage";
/**
 * Category Imports 
 */
import AllCategories from "./Admin/AdminPages/CategoryPage/AllCategories";
import AddCategory from "./Admin/AdminPages/CategoryPage/AddCategory";

import ProductPage from "./Admin/AdminPages/ProductPage";
import UserPage from "./Admin/AdminPages/UserPage";
import Sidebar from "./Admin/Sidebar";

const Admin = (props) => {
  const [component, setComponent] = React.useState("Dashboard");
  const handleClick = (componentName) => {
      setComponent(componentName);
    
  };


  const ComponentSwitch = (componentName) => {
    console.log('====================================');
    console.log(componentName);
    console.log('====================================');
    switch (componentName) {
      /**
       * Category Cases
       */
      case "All-Categories":
        return <AllCategories {...props} />;
      case "Add-Category":
        return <AddCategory {...props} />;
      case "ProductPage":
        return <ProductPage {...props} />;
      case "UserPage":
        return <UserPage {...props} />;
      case "AdminPage":
        return <AdminPage {...props} />;
     
      default:
        console.log("default");
        return <Dashboard {...props} />;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="p-0 m-0 col-md-3">
          <Sidebar {...props} handleClick={handleClick} activeComponent={component} />
        </div>
        <div className="p-0 m-0 col-md-9 ">{ComponentSwitch(component)}</div>
      </div>
    </div>
  );
};
export default Admin;
