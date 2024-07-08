import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';
const Page404 = () => {
	const navigate = useNavigate();

	return (
		<div>
			<ErrorMessage />
			<p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
				Page doesn't exist
			</p>
			<Link
				style={{
					display: 'block',
					textAlign: 'center',
					fontWeight: 'bold',
					fontSize: '24px',
					marginTop: '30px',
				}}
				to={navigate(-1)}
			>
				Back to previous page
			</Link>
		</div>
	);
};
export default Page404;
