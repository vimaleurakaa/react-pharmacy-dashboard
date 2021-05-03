import React, { useState } from 'react';

import { Layout, Breadcrumb } from 'antd';

import SideNav from '../../../components/SideNavigation';
import TopNavigationMenu from '../../../components/TopNavigation';
import Inventory from '../Inventory';
import Orders from '../Orders';
import Teams from '../Teams';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const { Content, Footer } = Layout;

const Home = () => {
	const [routeChangeHandler, setRouteChangeHandler] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const id = window.location.pathname;
	const SM_Route = `/${process.env.REACT_APP_PUBLIC_SM_URI}`;
	const parmName = id.split('/')[2];
	const store = useSelector((state) => state);

	if (store.auth.authError === null) {
		return <Redirect to="/" />;
	}

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<SideNav
				navigationState={collapsed}
				changeState={setCollapsed}
				route={routeChangeHandler}
				setRoute={setRouteChangeHandler}
			/>
			<Layout className="site-layout">
				<TopNavigationMenu />
				<Content style={{ margin: '0 16px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>
							{parmName === '' || parmName === undefined
								? 'Inventory'
								: parmName?.charAt(0).toUpperCase() + parmName?.slice(1)}
						</Breadcrumb.Item>
					</Breadcrumb>
					<div
						className="site-layout-background"
						style={{ padding: 24, minHeight: 360 }}
					>
						{id === `${SM_Route}/` || id === SM_Route ? (
							<Inventory />
						) : id === `${SM_Route}/orders` ? (
							<Orders />
						) : id === `${SM_Route}/teams` ? (
							<Teams />
						) : (
							<h1>Page Not Found</h1>
						)}
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					Created by Vimal Kumar Thanikachalam
				</Footer>
			</Layout>
		</Layout>
	);
};

export default Home;
