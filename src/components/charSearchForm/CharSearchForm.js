import { useFormik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';

import './CharSearchForm.scss';

const validate = (values) => {
	const errors = {};

	if (!values.name) {
		errors.name = 'This field is required';
	}

	return errors;
};

const View = ({ char }) => {
	const { name, notFound } = char;

	return notFound ? (
		<>
			<div className='error'>
				The character was not found. Check the name and try again
			</div>
		</>
	) : (
		<>
			<div className='searсh__basics'>
				<div className='result'>There is! Visit {name} page?</div>
				<div className='searсh__btns'>
					<Link to={`/character/${name}`} className='button button__main'>
						<div className='inner'>TO PAGE</div>
					</Link>
				</div>
			</div>
		</>
	);
};

const CharSearchForm = () => {
	const [char, setChar] = useState(null);

	const { loading, getCharacterByName } = useMarvelService();

	const formik = useFormik({
		initialValues: {
			name: '',
		},
		validate,
		onSubmit: (values, { setSubmitting }) => {
			const { name } = values;
			setSubmitting(true);
			getCharacterByName(name).then((char) => {
				onCharSubmit(char);
				setSubmitting(false);
			});
		},
	});

	const onCharSubmit = (char) => {
		setChar(char);
	};
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || !char) ? <View char={char} /> : null;

	return (
		<form onSubmit={formik.handleSubmit} className='searсh__form'>
			<label htmlFor='name' className='searсh__label'>
				Or find a character by name:
			</label>
			<div className='searсh__basics'>
				<input
					id='name'
					name='name'
					type='text'
					placeholder='Enter name'
					className='searсh__input'
					value={formik.values.name}
					onChange={(event) => {
						formik.handleChange(event);
						if (event.target.value === '') {
							setChar(null);
						}
					}}
					onBlur={formik.handleBlur}
				/>

				<button
					type='submit'
					disabled={formik.isSubmitting}
					className='button button__main'
				>
					<div className='inner'>FIND</div>
				</button>
			</div>
			{formik.errors.name && formik.touched.name ? (
				<div className='error'>{formik.errors.name}</div>
			) : null}
			<div className='searсh__basics'>
				{content}
				{spinner}
			</div>
		</form>
	);
};

export default CharSearchForm;
