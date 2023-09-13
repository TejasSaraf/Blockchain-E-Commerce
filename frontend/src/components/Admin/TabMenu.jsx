import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Orders from "./Tables/Orders";
import Products from "./Tables/Products";
import Users from "./Tables/Users";

function TabMenu() {
  return (
    <div className="my-24">
      <Tabs>
        <TabList>
          <Tab>
            <p className="MaisonNeueMonoRegular tracking-wider">PRODUCTS</p>
          </Tab>
          <Tab>
            <p className="MaisonNeueMonoRegular tracking-wider">USERS</p>
          </Tab>
          <Tab>
            <p className="MaisonNeueMonoRegular tracking-wider">ORDERS</p>
          </Tab>
        </TabList>

        <TabPanel>
          <div className="my-20 mx-8">
            <Products />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="my-20 mx-8">
            <Users/>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="my-20 mx-8">
            <div>
              <Orders />
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default TabMenu;
