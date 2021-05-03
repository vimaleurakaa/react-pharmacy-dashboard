import React from 'react';
import { Layout, Menu } from 'antd';
import {
	TeamOutlined,
	PieChartOutlined,
	ShopOutlined,
} from '@ant-design/icons';
import styles from './sidenav.module.scss';
import logo from '../../assets/img/logo.png';
import { BrowserRouter, Link } from 'react-router-dom';

const { Sider } = Layout;

const SideNavigationMenu = ({
	navigationState,
	changeState,
	route,
	setRoute,
}) => {
	return (
		<Sider
			collapsible
			collapsed={navigationState}
			onCollapse={() => changeState(!navigationState)}
		>
			<div className={styles.logo}>
				<div>
					<img src={logo} alt="logo" />
				</div>
				<div>
					<p>Pharmacy</p>
				</div>
			</div>
			<BrowserRouter basename={process.env.REACT_APP_PUBLIC_SM_URI}>
				<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
					<Menu.Item
						key="1"
						icon={<PieChartOutlined />}
						onClick={() => setRoute(!route)}
					>
						<Link to="/">Inventory</Link>
					</Menu.Item>

					<Menu.Item
						key="2"
						icon={<TeamOutlined />}
						onClick={() => setRoute(!route)}
					>
						<Link to="/teams">Teams</Link>
					</Menu.Item>

					<Menu.Item
						key="3"
						icon={<ShopOutlined />}
						onClick={() => setRoute(!route)}
					>
						<Link to="/orders">Orders</Link>
					</Menu.Item>
				</Menu>
			</BrowserRouter>
		</Sider>
	);
};

export default SideNavigationMenu;
