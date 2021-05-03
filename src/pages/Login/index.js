import { Form, Input, Button, Checkbox, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { signInAction } from '../../store/action/action';
import { Redirect } from 'react-router';

const Login = () => {
	const dispatch = useDispatch();
	const store = useSelector((state) => state);

	const onFinish = (values) => {
		dispatch(signInAction(values));
	};

	if (store.auth.authError !== null) {
		return <Redirect to="/store-manager" />;
	}

	return (
		<Card className="med_login_card">
			<Form
				name="normal_login"
				className="login-form"
				initialValues={{ remember: true }}
				onFinish={onFinish}
			>
				<Form.Item
					name="username"
					rules={[{ required: true, message: 'Please input your Username!' }]}
				>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						type="email"
						placeholder="Username"
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[{ required: true, message: 'Please input your Password!' }]}
				>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="Password"
					/>
				</Form.Item>
				<Form.Item>
					<Form.Item name="remember" valuePropName="checked" noStyle>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
						size="large"
					>
						Log in
					</Button>
					{/* <a href="">register now!</a> */}
				</Form.Item>
			</Form>
		</Card>
	);
};

export default Login;
