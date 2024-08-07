import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import './singleItemPage.scss';

const SingleCharPage = () => {
	const { charName } = useParams();
	const [char, setChar] = useState(null);
	const { loading, error, getCharacterByName, clearError } = useMarvelService();
	useEffect(() => {
		updateName();
	}, [charName]);
	const updateName = () => {
		clearError();
		getCharacterByName(charName).then(onCharLoaded);
	};
	const onCharLoaded = (char) => {
		setChar(char);
	};
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !char) ? <View char={char} /> : null;
	return (
		<>
			<AppBanner />
			{errorMessage}
			{spinner}
			{content}
		</>
	);
};
const View = ({ char }) => {
	const { name, description, thumbnail } = char;
	return (
		<div className='single-item'>
			<img src={thumbnail} alt={name} className='single-item__img' />
			<div className='single-item__info'>
				<h2 className='single-item__name'>{name}</h2>
				<p className='single-item__descr'>{description}</p>
			</div>
		</div>
	);
};

export default SingleCharPage;
