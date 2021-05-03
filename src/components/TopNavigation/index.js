import React from 'react';
import { Layout, Menu } from 'antd';
import styles from './top_nav.module.scss';
import { ExportOutlined } from '@ant-design/icons';
import { singOutAction } from '../../store/action/action';
import { useDispatch } from 'react-redux';

const { Header } = Layout;

const TopNavigationMenu = () => {
	const dispatch = useDispatch();

	const logOutHandler = () => {
		dispatch(singOutAction());
	};

	return (
		<Header>
			<div className="logo" />
			<Menu
				theme="dark"
				mode="horizontal"
				defaultSelectedKeys={['2']}
				className={styles.top_nav}
			>
				<Menu.Item key="1" onClick={logOutHandler}>
					Logout
					<ExportOutlined className={styles.logoutButton} />
				</Menu.Item>
			</Menu>
		</Header>
	);
};

export default TopNavigationMenu;
