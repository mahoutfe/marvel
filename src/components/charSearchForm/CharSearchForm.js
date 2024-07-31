import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';

import './CharSearchForm.scss';

const CharSearch = (props) => {
	const [char, setChar] = useState(null);

	const { loading, error, getCharacterByName, clearError } = useMarvelService();

	useEffect(() => {
		updateChar();
	}, [props.charName]);

	const updateChar = () => {
		const { charName } = props;
		if (!charName) {
			return;
		}

		clearError();
		getCharacterByName(charName).then(onCharSubmit);
	};

	const onCharSubmit = (char) => {
		setChar(char);
	};

	const errorMessage = char.data.results[0] ? (
		<div className='error'>
			The character was not found. Check the name and try again
		</div>
	) : null;

	const content = !(loading || char.data.results.length || !char) ? (
		<View char={char} />
	) : null;

	return (
		<div className='searсh__basics'>
			{errorMessage}
			{content}
		</div>
	);
};

const View = ({ char }) => {
	const { homepage, name } = char;

	return (
		<>
			<div className='searсh__basics'>
				<div className='result'>There is! Visit ${name} page?</div>
				<div className='searсh__btns'>
					<a href={homepage} className='button button__main'>
						<div className='inner'>TO PAGE</div>
					</a>
				</div>
			</div>
		</>
	);
};

const validate = (values) => {
	const errors = {};

	if (!values.name) {
		errors.name = 'This field is required';
	}

	return errors;
};

const CharSearchForm = () => {
	const formik = useFormik({
		initialValues: {
			name: '',
		},
		validate,
		onSubmit: (values) => как-то передать имя в виде пропсов,
	});

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
				<div className='searсh__btns'>
					<button type='submit' className='button button__main'>
						<div className='inner'>FIND</div>
					</button>
				</div>
			</div>
			{formik.errors.name && formik.touched.name ? (
				<div className='error'>{formik.errors.name}</div>
			) : null}
			<CharSearch />
		</form>
	);
};

export default CharSearchForm;
