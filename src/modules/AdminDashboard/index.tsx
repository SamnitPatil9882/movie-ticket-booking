import React from "react";
import Header from "../Headers/header";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import Movie from "./components/tabs/Movie";
import UserTab from "./components/tabs/User";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div>
        <Tabs
          className="bg-gray-800 text-white rounded-lg shadow-lg"
          tabPosition="left"
          size="large"
          tabBarGutter={16} // Gutter of tabs
          tabBarStyle={{ backgroundColor: 'rgb(45,45,45)' }} // Background color of tabs
        >
          <TabPane tab={<span className="text-white font-bold text-xl">User</span>} key="1">
            <UserTab/>
          </TabPane>
          <TabPane tab={<span className="text-white font-bold text-xl">Movie</span>} key="2">
            <Movie/>
          </TabPane>
          <TabPane tab={<span className="text-white font-bold text-xl">MovieShow</span>} key="3">
            MovieShow Information
          </TabPane>
          <TabPane tab={<span className="text-white font-bold text-xl">Tickets</span>} key="4">
            Ticket Information
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default AdminDashboard;
