import { useState } from 'react';
import RandomChar from '../randomChar/RandomChar';
import CharInfo from '../charInfo/CharInfo';
import CharList from '../charList/CharList';
import AppBanner from '../appBanner/AppBanner';
import AppHeader from '../appHeader/AppHeader';
import ComicsList from '../comicsList/ComicsList';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import SingleComic from '../singleComic/SingleComic';

import decoration from '../../resources/img/vision.png';

const App = () => {
	const [selectedChar, setChar] = useState(null);

	const onCharSelected = (id) => {
		setChar(id);
	};

	const [selectedComic, setComic] = useState(null);

	const onComicSelected = (id) => {
		setComic(id);
	};

	return (
		<div className='app'>
			<AppHeader />
			<main>
				<ErrorBoundary>
					<RandomChar />
				</ErrorBoundary>
				<div className='char__content'>
					<ErrorBoundary>
						<CharList onCardSelected={onCharSelected} />
					</ErrorBoundary>
					<ErrorBoundary>
						<CharInfo charId={selectedChar} />
					</ErrorBoundary>
				</div>
				<img className='bg-decoration' src={decoration} alt='vision' />
				<AppBanner />
				<ErrorBoundary>
					<ComicsList onCardSelected={onComicSelected} />
				</ErrorBoundary>
				<ErrorBoundary>
					<SingleComic comicId={selectedComic} />
				</ErrorBoundary>
			</main>
		</div>
	);
};

export default App;
