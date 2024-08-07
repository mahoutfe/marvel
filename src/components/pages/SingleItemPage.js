import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
// import { Page404 } from '../pages';
import './singleItemPage.scss';

const SingleItemPage = () => {
	const { itemValue } = useParams();
	const [item, setItem] = useState(null);

	const { loading, error, getComic, getCharacterByName, clearError } =
		useMarvelService();

	useEffect(() => {
		updateItem();
	}, [itemValue]);

	const updateItem = () => {
		clearError();
		if (itemValue * 1) {
			return getComic(itemValue).then(onItemLoaded);
		} else {
			return getCharacterByName(itemValue).then(onItemLoaded);
		}
	};

	const onItemLoaded = (item) => {
		setItem(item);
	};

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !item) ? <View item={item} /> : null;

	return (
		<>
			<AppBanner />
			{errorMessage}
			{spinner}
			{content}
		</>
	);
};

const View = ({ item }) => {
	const { name, title, price, description, thumbnail, pageCount, language } =
		item;

	const thumb = name ? (
		<img src={thumbnail} alt={name} className='single-item__img' />
	) : (
		<img src={thumbnail} alt={title} className='single-item__img' />
	);
	const label = name ? (
		<h2 className='single-item__name'>{name}</h2>
	) : (
		<h2 className='single-item__name'>{title}</h2>
	);

	const comicInfo = title ? (
		<>
			<p className='single-item__descr'>{pageCount}</p>
			<p className='single-item__descr'>language: {language}</p>
			<div className='single-item__price'>{price}</div>
		</>
	) : null;

	const backButton = title ? (
		<Link to='/comics' className='single-item__back'>
			Back to all
		</Link>
	) : (
		<Link to='/' className='single-item__back'>
			Back to Main page
		</Link>
	);

	return (
		<div className='single-item'>
			{thumb}
			<div className='single-item__info'>
				{label}
				<p className='single-item__descr'>{description}</p>
				{comicInfo}
			</div>
			{backButton}
		</div>
	);
};

export default SingleItemPage;
