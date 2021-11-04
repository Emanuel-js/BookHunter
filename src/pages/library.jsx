import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import Header from "./commen/header";

import { ToastContainer } from "react-toastify";
import "./library.css";

import Add from "../components/bookAdd";
import DisplayLibrary from "../components/displayLibrary";
import MyLibrary from "../components/myLibrary";
function Library() {
	return (
		<div>
			<Header />

			<Tabs
				defaultActiveKey='Library'
				id='uncontrolled-tab-example'
				className='mb-3'
			>
				<Tab eventKey='share' title='Share Book'>
					<Add />
					<br></br>
				</Tab>
				<Tab eventKey='Library' title='Library'>
					<DisplayLibrary />
				</Tab>
				<Tab eventKey='MyLibrary' title='MyLibrary'>
					<MyLibrary />
				</Tab>
			</Tabs>
			<ToastContainer />
		</div>
	);
}

export default Library;
