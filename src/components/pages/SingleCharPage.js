import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';
import './singleComicPage.scss';

const SingleCharPage = () => {
	const { smth } = useParams();
	console.log(smth);

	return (
		<>
			<AppBanner />
		</>
	);
};

export default SingleCharPage;
