import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SkeletonComic from '../skeletonComic/SkeletonComic';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';

const SingleComic = (props) => {
	const [comic, setComic] = useState(null);

	const { loading, error, getComic, clearError } = useMarvelService();

	useEffect(() => {
		updateComic();
	}, [props.comicId]);

	const updateComic = () => {
		const { comicId } = props;
		if (!comicId) {
			return;
		}

		clearError();
		getComic(comicId).then(onComicLoaded);
	};

	const onComicLoaded = (comic) => {
		setComic(comic);
	};

	const skeleton = comic || loading || error ? null : <SkeletonComic />;
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

	return (
		<div className='single-comic'>
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	);
};

const View = ({ comic }) => {
	const { title, price, description, thumbnail, pageCount, language } = comic;

	return (
		<>
			<img src={thumbnail} alt={title} className='single-comic__img' />
			<div className='single-comic__info'>
				<h2 className='single-comic__name'>{title}</h2>
				<p className='single-comic__descr'>{description}</p>
				<p className='single-comic__descr'>{pageCount}</p>
				<p className='single-comic__descr'>{language}</p>
				<div className='single-comic__price'>{price}</div>
			</div>
			<a href='#' className='single-comic__back'>
				Back to all
			</a>
		</>
	);
};

SingleComic.propTypes = {
	comicId: PropTypes.number,
};

export default SingleComic;
