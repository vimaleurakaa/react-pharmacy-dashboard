import React, { useRef, useState } from 'react';
import { Form, Table, Button, Modal, Input } from 'antd';
import {
	PlusCircleOutlined,
	AuditOutlined,
	CarryOutOutlined,
	TagOutlined,
	FormOutlined,
	DeleteOutlined,
	DollarCircleOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
	addNewMedicine,
	deleteMedicineData,
	updateMedicine,
} from '../../../store/action/action';
import { useFirestoreConnect } from 'react-redux-firebase';
import loader from '../../../assets/img/loader.gif';

const Inventory = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const formRefs = useRef();
	const getEditKey = sessionStorage.getItem('editKey');

	const query = { collection: 'medicines', storeAs: 'medicines' };
	useFirestoreConnect([query]);

	const dispatch = useDispatch();
	const store = useSelector((state) => state);

	const [isEditForm, setEditForm] = useState({
		state: false,
		title: 'Edit Medicine',
	});

	const [deleted, setDeleted] = useState(false);

	const [state, setState] = useState({
		loading: false,
		visible: false,
	});

	const handleEdit = (record) => {
		formRefs.current?.setFieldsValue({
			medicine_Name: record.medicine_Name,
			manufacturer: record.manufacturer,
			stock: record.stock,
			discount: record.discount.split('%')[0],
			price: record.price.split('Rs.')[1],
		});
		setEditForm({ ...isEditForm, state: true });
		setIsModalVisible(true);
		sessionStorage.setItem('editKey', record.key);
	};

	const handleDelete = (record) => {
		dispatch(deleteMedicineData(record, deleted, setDeleted));
	};

	const columns = [
		{
			title: 'Name',
			dataIndex: 'medicine_Name',
			key: 'medicine_Name',
		},
		{
			title: 'Manufacture',
			dataIndex: 'manufacturer',
			key: 'manufacturer',
		},

		{
			title: 'Stock',
			dataIndex: 'stock',
			key: 'stock',
		},
		{
			title: 'Discount',
			dataIndex: 'discount',
			key: 'discount',
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
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
			medicine_Name: '',
			manufacturer: '',
			stock: '',
			discount: '',
			price: '',
		});
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const onFinish = (values) => {
		setState({ loading: true });

		if (isEditForm.state) {
			dispatch(updateMedicine(values, setIsModalVisible, setState, getEditKey));
		} else {
			dispatch(addNewMedicine(values, setIsModalVisible, setState));
		}
	};

	return (
		<div>
			<div className="add_inventory_btn">
				<Button type="primary" size="large" onClick={showModal}>
					Add New Medicine
				</Button>
			</div>
			<Modal
				title={isEditForm.state ? isEditForm.title : 'Add New Medicine'}
				visible={isModalVisible}
				onOk={{ visible: false }}
				onCancel={handleCancel}
				footer={[
					<Button
						form="add_medicine"
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
						name="add_medicine"
						className="add_medicine"
						ref={formRefs}
						onFinish={onFinish}
					>
						<Form.Item
							name="medicine_Name"
							rules={[
								{ required: true, message: 'Please input Medicine Name!' },
							]}
						>
							<Input
								prefix={<PlusCircleOutlined className="site-form-item-icon" />}
								placeholder="Medicine Name"
							/>
						</Form.Item>
						<Form.Item
							name="manufacturer"
							rules={[
								{ required: true, message: 'Please input Manufacturer!' },
							]}
						>
							<Input
								prefix={<AuditOutlined className="site-form-item-icon" />}
								type="text"
								placeholder="Manufacturer"
							/>
						</Form.Item>

						<Form.Item
							name="stock"
							rules={[{ required: true, message: 'Please input Stock!' }]}
						>
							<Input
								prefix={<CarryOutOutlined className="site-form-item-icon" />}
								placeholder="Stock "
								type="number"
							/>
						</Form.Item>

						<Form.Item
							name="discount"
							rules={[{ required: true, message: 'Please input Discount!' }]}
						>
							<Input
								prefix={<TagOutlined className="site-form-item-icon" />}
								placeholder="Discount "
								type="number"
							/>
						</Form.Item>

						<Form.Item
							name="price"
							rules={[{ required: true, message: 'Please input Price!' }]}
						>
							<Input
								prefix={
									<DollarCircleOutlined className="site-form-item-icon" />
								}
								placeholder="Price"
								type="number"
							/>
						</Form.Item>
					</Form>
				</div>
			</Modal>
			<div>
				{store.firestore.data?.medicines ? (
					<Table
						dataSource={Object.values(store.firestore.data?.medicines)}
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

export default Inventory;
