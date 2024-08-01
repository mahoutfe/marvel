import { useFormik } from 'formik';
import { useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './CharSearchForm.scss';

const validate = (values) => {
	const errors = {};

	if (!values.name) {
		errors.name = 'This field is required';
	}

	return errors;
};

const View = ({ char }) => {
	const { homepage, name } = char;

	return (
		<>
			<div className='searсh__basics'>
				<div className='result'>There is! Visit {name} page?</div>
				<div className='searсh__btns'>
					<a href={homepage} className='button button__main'>
						<div className='inner'>TO PAGE</div>
					</a>
				</div>
			</div>
		</>
	);
};

const CharSearchForm = () => {
	const [char, setChar] = useState(null);

	const { loading, error, getCharacterByName, clearError } = useMarvelService();

	const formik = useFormik({
		initialValues: {
			name: '',
		},
		validate,
		onSubmit: (values) => {
			const { name } = values;
			clearError();
			getCharacterByName(name).then(onCharSubmit);
		},
	});

	const onCharSubmit = (char) => {
		setChar(char);
	};

	const errorMessage = error ? (
		<div className='error'>
			The character was not found. Check the name and try again
		</div>
	) : null;
	const content = !(loading || error || !char) ? <View char={char} /> : null;

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
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>

				<button type='submit' className='button button__main'>
					<div className='inner'>FIND</div>
				</button>
			</div>
			{formik.errors.name && formik.touched.name ? (
				<div className='error'>{formik.errors.name}</div>
			) : null}
			<div className='searсh__basics'>
				{errorMessage}
				{content}
			</div>
		</form>
	);
};

export default CharSearchForm;
