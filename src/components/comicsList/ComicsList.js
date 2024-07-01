import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const ComicsList = (props) => {
	const { loading, error, getAllComics } = useMarvelService();

	const [comicsList, setComicsList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(8);
	const [comicsEnded, setComicsEnded] = useState(false);

	useEffect(() => {
		onRequest(offset, true);
	}, []);

	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllComics(offset).then(onComicsListLoaded);
	};

	const onComicsListLoaded = (newComicsList) => {
		let ended = false;
		if (newComicsList.length < 8) {
			ended = true;
		}

		setComicsList((comicsList) => [...comicsList, ...newComicsList]);
		setNewItemLoading((newItemLoading) => false);
		setOffset((offset) => offset + 8);
		setComicsEnded((comicsEnded) => ended);
	};

	const itemRefs = useRef([]);

	const focusOnItem = (id) => {
		itemRefs.current.forEach((item) =>
			item.classList.remove('comics__item_selected')
		);
		itemRefs.current[id].classList.add('comics__item_selected');
		itemRefs.current[id].focus();
	};

	function renderItems(arr) {
		const items = arr.map((item, i) => {
			return (
				<li
					className='comics__item'
					tabIndex={0}
					ref={(el) => (itemRefs.current[i] = el)}
					key={item.id}
					onClick={() => {
						props.onCardSelected(item.id);
						focusOnItem(i);
					}}
					onKeyPress={(e) => {
						if (e.key === ' ' || e.key === 'Enter') {
							props.onCardSelected(item.id);
							focusOnItem(i);
						}
					}}
				>
					<img
						src={item.thumbnail}
						alt={item.title}
						className='comics__item-img'
					/>
					<div className='comics__item-name'>{item.title}</div>
					<div className='comics__item-price'>{item.price}</div>
				</li>
			);
		});

		return <ul className='comics__grid'>{items}</ul>;
	}

	const items = renderItems(comicsList);

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !newItemLoading ? <Spinner /> : null;

	return (
		<div className='comics__list'>
			{errorMessage}
			{spinner}
			{items}
			<button
				className='button button__main button__long'
				disabled={newItemLoading}
				style={{ display: comicsEnded ? 'none' : 'block' }}
				onClick={() => onRequest(offset)}
			>
				<div className='inner'>load more</div>
			</button>
		</div>
	);
};

ComicsList.propTypes = {
	onComicsSelected: PropTypes.func.isRequired,
};
export default ComicsList;
