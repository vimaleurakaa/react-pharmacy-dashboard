import React, { useRef, useState } from 'react';
import { Form, Table, Button, Modal, Input, DatePicker, Select } from 'antd';
import {
	AuditOutlined,
	UserOutlined,
	FormOutlined,
	DeleteOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
	addNewTeamMember,
	updateTeamMember,
	deleteTeamMember,
} from '../../../store/action/action';
import { useFirestoreConnect } from 'react-redux-firebase';
import loader from '../../../assets/img/loader.gif';

const Teams = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const formRefs = useRef();
	const getEditKey = sessionStorage.getItem('editKey');

	const query = { collection: 'teams', storeAs: 'teams' };
	useFirestoreConnect([query]);

	const dispatch = useDispatch();
	const store = useSelector((state) => state);

	const [isEditForm, setEditForm] = useState({
		state: false,
		title: 'Edit Member',
	});

	const [deleted, setDeleted] = useState(false);

	const [state, setState] = useState({
		loading: false,
		visible: false,
	});

	const handleEdit = (record) => {
		formRefs.current?.setFieldsValue({
			first_Name: record.first_Name,
			last_Name: record.last_Name,
			gender: record.gender,
			experience: record.experience,
		});
		setEditForm({ ...isEditForm, state: true });
		setIsModalVisible(true);
		sessionStorage.setItem('editKey', record.key);
	};

	const handleDelete = (key) => {
		dispatch(deleteTeamMember(key, deleted, setDeleted));
	};

	const columns = [
		{
			title: 'First Name',
			dataIndex: 'first_Name',
			key: 'first_Name',
		},
		{
			title: 'Last Name',
			dataIndex: 'last_Name',
			key: 'last_Name',
		},

		{
			title: 'Date of Birth',
			dataIndex: 'date_of_birth',
			key: 'date_of_birth',
		},
		{
			title: 'Gender',
			dataIndex: 'gender',
			key: 'gender',
		},
		{
			title: 'Experience',
			dataIndex: 'experience',
			key: 'experience',
		},
		{
			title: 'Updated On',
			dataIndex: 'createdAt',
			key: 'createdAt',
		},
		{
			title: 'Operations',
			dataIndex: 'operation',
			render: (_, record) => (
				<div className="inventory_edit_icons">
					<FormOutlined onClick={() => handleEdit(record)} />
					<DeleteOutlined
						className="delete_icon"
						onClick={() => handleDelete(record.key)}
					/>
				</div>
			),
		},
	];

	const showModal = () => {
		setEditForm({ ...isEditForm, state: false });
		formRefs.current?.setFieldsValue({
			first_Name: '',
			last_Name: '',
			gender: '',
			experience: '',
		});
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const onFinish = (values) => {
		setState({ loading: true });

		if (isEditForm.state) {
			dispatch(
				updateTeamMember(values, setIsModalVisible, setState, getEditKey)
			);
		} else {
			dispatch(addNewTeamMember(values, setIsModalVisible, setState));
		}
	};

	return (
		<div>
			<div className="add_inventory_btn">
				<Button type="primary" size="large" onClick={showModal}>
					Add New Team Member
				</Button>
			</div>
			<Modal
				title={isEditForm.state ? isEditForm.title : 'Add New Team Member'}
				visible={isModalVisible}
				onOk={{ visible: false }}
				onCancel={handleCancel}
				footer={[
					<Button
						form="add_team_member"
						key="submit"
						htmlType="submit"
						type="primary"
						loading={state.loading}
						size="large"
						className="login-form-button"
					>
						Submit
					</Button>,
				]}
			>
				<div className="add_medicine_modal_input">
					<Form
						name="add_team_member"
						className="add_medicine"
						ref={formRefs}
						onFinish={onFinish}
					>
						<Form.Item
							name="first_Name"
							rules={[{ required: true, message: 'Please input First Name!' }]}
						>
							<Input
								prefix={<UserOutlined className="site-form-item-icon" />}
								placeholder="First Name"
							/>
						</Form.Item>
						<Form.Item
							name="last_Name"
							rules={[{ required: true, message: 'Please input Last Name!' }]}
						>
							<Input
								prefix={<UserOutlined className="site-form-item-icon" />}
								placeholder="Last Name"
							/>
						</Form.Item>

						<Form.Item
							label="Date of Birth"
							name="date_of_birth"
							rules={[
								{ required: true, message: 'Please input Date of Birth!' },
							]}
						>
							<DatePicker />
						</Form.Item>

						<Form.Item
							label="Gender"
							name="gender"
							rules={[{ required: true, message: 'Please input Gender!' }]}
						>
							<Select>
								<Select.Option value="male">Male</Select.Option>
								<Select.Option value="female">Female</Select.Option>
								<Select.Option value="not_to_say">
									Prefer not to say
								</Select.Option>
							</Select>
						</Form.Item>

						<Form.Item
							name="experience"
							rules={[{ required: true, message: 'Please input Experience!' }]}
						>
							<Input
								prefix={<AuditOutlined className="site-form-item-icon" />}
								placeholder="Experience"
								type="number"
							/>
						</Form.Item>
					</Form>
				</div>
			</Modal>
			<div>
				{store.firestore.data?.teams ? (
					<Table
						dataSource={Object.values(store.firestore.data?.teams)}
						columns={columns}
					/>
				) : (
					<div className="inventory_loader">
						<img src={loader} alt="loading.." />
						<h2>Loading...</h2>
					</div>
				)}
			</div>
		</div>
	);
};

export default Teams;
