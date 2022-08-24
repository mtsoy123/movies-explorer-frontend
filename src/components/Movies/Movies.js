import React, {useEffect, useState} from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Movies.css'
import {mainApi} from '../../utils/MainApi';
import MovieListError from '../MovieListError/MovieListError';
import useMediaQuery from '../../hooks/useMediaQuery';
import MoviesCard from '../MoviesCard/MoviesCard';
import {getDuration} from '../../utils/getDuration';
import {filterQuery} from '../../utils/filter';
import {movieApi} from '../../utils/MoviesApi';

function Movies({menuOpened, setMenuOpened, loggedIn}) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const [showMovieCardList, setShowMovieCardList] = useState(false);
  const [showMovies, setShowMovies] = useState(0);
  const [showMoreVisibility, setShowMoreVisibility] = useState(true);
  const [movies, setMovies] = useState([])
  const [isShort, setIsShort] = useState(false);
  const [movieQuery, setMovieQuery] = useState('');
  const [localStorageQuery, setLocalStorageQuery] = useState(localStorage.getItem('inputQuery'));
  const [localStorageIsShort, setLocalStorageIsShort] = useState(JSON.parse(localStorage.getItem('isShort')));
  const [localStorageMovies, setLocalStorageMovies] = useState(JSON.parse(localStorage.getItem('moviesArr')));

  const isDesktop = useMediaQuery('(min-width: 769px)');
  const isTablet = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (localStorage.getItem('moviesArr')) {
      setLocalStorageMovies(JSON.parse(localStorage.getItem('moviesArr')));
    }
  }, [movies])

  useEffect(() => {
    defaultShowMovies();
  }, [isDesktop])

  useEffect(() => {
    if (localStorageMovies) {
      setShowMovieCardList(!showMovieCardList)
      setMovies(localStorageMovies)
    }
  }, [])

  useEffect(() => {
    if (localStorageIsShort) {
      setIsShort(localStorageIsShort)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('isShort', JSON.stringify(isShort));
    setLocalStorageIsShort(JSON.parse(localStorage.getItem('isShort')));
    defaultShowMovies();
  }, [isShort])

  useEffect(() => {
    if (localStorageQuery) {
      setMovieQuery(localStorageQuery)
    }
  }, [])

  useEffect(() => {
    if (isShort) {
      defaultShowMovies()
    }
  }, [isShort])

  const defaultShowMovies = () => setShowMovies((isDesktop ? 12 : (isTablet ? 8 : 5)));

  function handleCardLike(movieProps) {

    mainApi.getMovies()
    .then(res => {
      return res.filter(m => m.movieId === movieProps.id);
    })
    .then(likedMovie => {
      return mainApi.changeCardStatus(movieProps, likedMovie)
      .then((editedMovie) => {
        const getNewMovieArray = (moviesArray) => {
          return moviesArray.map((m) => {
            if (m.id === editedMovie.movieId) {
              m.liked = !m.liked
              m._id = editedMovie._id
              return m
            } else {
              return m
            }
          })
        }
        const newMovieArray = getNewMovieArray(localStorageMovies);
        setMovies(newMovieArray);
        return newMovieArray;
      })
      .then((res) => {
        return localStorage.setItem('moviesArr', JSON.stringify(res))
      })
    })
    .catch(err => console.log(err))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    defaultShowMovies();
    setErrorMessage('');
    setShowMovieCardList(false);
    setIsLoading(true)

    if (!movieQuery) {
      setIsLoading(false);
      return setErrorMessage('Нужно ввести ключевое слово');
    }

    if (!localStorageMovies) {
      // mainApi.getMovies()
      movieApi.getMovies()
      .then((moviesArr) => {
        setShowMovieCardList(true);
        // localStorage.setItem('moviesArr', JSON.stringify(moviesArr));
        localStorage.setItem('inputQuery', movieQuery);
        localStorage.setItem('isShort', JSON.stringify(isShort));
        setMovies(JSON.parse(localStorage.getItem('moviesArr')));
        setLocalStorageQuery(localStorage.getItem('inputQuery'));
        setLocalStorageIsShort(JSON.parse(localStorage.getItem('isShort')));
        // setLocalStorageMovies(JSON.parse(localStorage.getItem('moviesArr')));
        return moviesArr
      })
      .then((moviesArr) => {
        /*
        moviesArr: Array(100)
          0:
            country: "США"
            created_at: "2020-11-23T14:12:21.376Z"
            description: "В конце 1960-х группа «Роллинг Стоунз», несмотря на все свои мегахиты и сверхуспешные концертные туры, была разорена. Виной всему — бездарный менеджмент и драконовское налогообложение в Британии. Тогда музыканты приняли не самое простое для себя решение: летом 1971 года после выхода альбома «Stiсky Fingers» они отправились на юг Франции записывать новую пластинку. Именно там, на Лазурном Берегу, в арендованном Китом Ричардсом подвале виллы Неллькот родился сборник «Exile on Main St.», который стал лучшим альбомом легендарной группы."
            director: "Стивен Кайак "
            duration: 61
            id: 1
            image: {id: 1, name: 'stones-in-exile', alternativeText: '', caption: '', width: 512, …}
            nameEN: "Stones in Exile"
            nameRU: "«Роллинг Стоунз» в изгнании"
            trailerLink: "https://www.youtube.com/watch?v=UXcqcdYABFw"
            updated_at: "2020-11-23T14:12:21.376Z"
            year: "2010"
            [[Prototype]]: Object
          1:
            country: "Великобритания"
            created_at: "2020-11-23T14:15:19.238Z"
            description: "Хроники британского фестиваля, который первым нарушил монополию «Гластонбери», «Ридинга» и прочих пивных сборищ в чистом поле — и с тех пор прослыл одним из самых независимых и принципиальных. ATP из года в год проходит на базе отдыха в английской глуши, где артисты и их поклонники живут в одинаковых номерах, не бывает коммерческих спонсоров, программу составляют приглашенные кураторы (в разное время ими были Ник Кейв, Belle & Sebastian, Sonic Youth и даже Мэтт Грейнинг). И, главное, где не любят вздорных людей — основатель фестиваля Барри Хоган однажды сказал, что никогда больше не станет иметь дело с группой Killing Joke, «потому что они му...аки». Эта демократичность сказалась и на фильме: часть съемок сделана адептами фестиваля на мобильный телефон."
            director: " Джонатан Кауэтт"
            duration: 82
            id: 2
            image: {id: 2, name: 'all-tommoros-parties', alternativeText: '', caption: '', width: 699, …}
            nameEN: "All Tomorrow's Parties"
            nameRU: "All Tomorrow's Parties"
            trailerLink: "https://www.youtube.com/watch?v=D5fBhbEJxEU"
            updated_at: "2020-11-23T14:15:19.238Z"
            year: "2009"*/

        mainApi.getMovies()
        .then((likedMovies) => {
          // проблема: как проверить что члены одного массива содержат свойство из другого массива?
          /*likedMovies: Array(2)
              0:
                country: "Великобритания"
                description: "«Жан Жене всегда хотел побывать в марокканской тюрьме Сен-Лоран, потому что считал, что именно там отбывали срок настоящие преступники, там сидел французский офицер Альфред Дрейфус, там текли воды реки Марони, в которой водились пираньи. Но тюрьму эту закрыли в 40-е годы, как раз когда он отбывал свой срок во Франции», — такими словами начинается фильм, в котором Патти Смит выступает и рассказчиком, и главным героем в кадре. Он — по сути ее не опубликованный мини-рассказ, столь же мощный по своей поэтической силе, сколь и лучшие ее песни или книга «Я пасу облака». Режиссер фильма Фридер Шляйх, давний знакомый певицы, подловил ее на небольшом концерте в Танжере и отправился вместе с ней на могилу Жана Жене, по дороге снимая Патти ходящей босой по воде или пьющей марокканский чай из бардачка и перемежая интимные сцены с ней черно-белыми видами Танжера. В фильме всплывают имена всех, кто был связан с этим местом, — от Пола Боулза до Уилльяма Берроуза, что провели здесь немало своих дней, поэтому этот фильм —посвящение Жене и его наследникам, поколению писателей и художников, к которому принадлежит и сама Патти Смит — ну и своего рода эпилог к последнему фильма Джармуша."
                director: "Фридер Шляйх"
                duration: 7
                image: "https://api.nomoreparties.co/uploads/zagruzhennoe_edcf93eb96.jpeg"
                movieId: 63
                nameEN: "Three Stones for Jean Genet"
                nameRU: "Три камня для Жана Жене"
                owner: "6304a6c30b8d98aefdefc48f"
                thumbnail: "https://api.nomoreparties.co/uploads/thumbnail_zagruzhennoe_edcf93eb96.jpeg"
                trailerLink: "https://www.youtube.com/watch?v=6p-X4WRP9rU"
                year: "2014"
                __v: 0
                _id: "6304d4460b8d98aefdefc51d"
                [[Prototype]]: Object
              1:
                country: "Великобритания"
                description: "Хроники британского фестиваля, который первым нарушил монополию «Гластонбери», «Ридинга» и прочих пивных сборищ в чистом поле — и с тех пор прослыл одним из самых независимых и принципиальных. ATP из года в год проходит на базе отдыха в английской глуши, где артисты и их поклонники живут в одинаковых номерах, не бывает коммерческих спонсоров, программу составляют приглашенные кураторы (в разное время ими были Ник Кейв, Belle & Sebastian, Sonic Youth и даже Мэтт Грейнинг). И, главное, где не любят вздорных людей — основатель фестиваля Барри Хоган однажды сказал, что никогда больше не станет иметь дело с группой Killing Joke, «потому что они му...аки». Эта демократичность сказалась и на фильме: часть съемок сделана адептами фестиваля на мобильный телефон."
                director: " Джонатан Кауэтт"
                duration: 82
                image: "https://api.nomoreparties.co/uploads/all_tommoros_parties_33a125248d.jpeg"
                movieId: 2
                nameEN: "All Tomorrow's Parties"
                nameRU: "All Tomorrow's Parties"
                owner: "6304a6c30b8d98aefdefc48f"
                thumbnail: "https://api.nomoreparties.co/uploads/thumbnail_all_tommoros_parties_33a125248d.jpeg"
                trailerLink: "https://www.youtube.com/watch?v=D5fBhbEJxEU"
                year: "2009"
                __v: 0
                _id: "6304d9e10b8d98aefdefc52a"*/

          const moviesWithLikes = (array) => { // array — likedMovies. moviesArr - фильмы с мувиапи
            /*            const newArray = [];
                        for (const likedMovie of array) {
                          for (const movie of moviesArr) {
                            if (movie.id === likedMovie.movieId) {
                              movie.liked = !movie.liked
                            }
                            newArray.push(movie);
                            // movie._id = likedMovie._id
                          }
                        }
                        return newArray*/

            return moviesArr.map((m) => {
              return array.some(movie => {
                return m.id === movie.movieId
              })

              /*if (m.id === likedMovies.movieId) {

                return m
              } else {
                return m
              }*/
            })
          }
          const likedMoviesArray = moviesWithLikes(likedMovies); // фильмы с мувиспа(!) лайками

          const moviesWithLikeProperty = moviesArr.map((movie, index) => {
            movie.liked = likedMoviesArray[index]
            return movie
          })

          // moviesArr.map((movie, index) => {
          //   return movie.liked = likedMoviesArray[index]
          // })

          /*for (let i = 0; i <= likedMoviesArray.length; i++) {
            console.log(moviesArr[i])
            console.log(moviesArr[i].liked)
            moviesWithLikeProperty.push(moviesArr[i].liked = likedMoviesArray[i])
          }*/

          setMovies(likedMoviesArray);

          localStorage.setItem('moviesArr', JSON.stringify(moviesWithLikeProperty));
          setLocalStorageMovies(JSON.parse(localStorage.getItem('moviesArr')));
          return likedMoviesArray;
        })
      })
      .then(() => setIsLoading(false))
      .catch(() => setErrorMessage('Во время запроса произошла ошибка.\nВозможно, проблема с соединением или сервер недоступен.\nПодождите немного и попробуйте ещё раз'))
    } else {
      localStorage.setItem('inputQuery', movieQuery);
      localStorage.setItem('isShort', JSON.stringify(isShort));
      setLocalStorageQuery(localStorage.getItem('inputQuery'));
      setLocalStorageIsShort(JSON.parse(localStorage.getItem('isShort')));
      setIsLoading(false)
      setShowMovieCardList(true);
    }
  }

  const handleAddMoreClick = () => {
    setShowMovies(showMovies + (isDesktop ? 3 : 2))
  }

  function renderMovies(moviesCount) {

    const filteredArray = filterQuery(localStorageMovies, localStorageQuery, localStorageIsShort);

    if (filteredArray.length === 0) {
      return setErrorMessage('Ничего не найдено');
    }

    if (moviesCount < filteredArray.length) {
      setShowMoreVisibility(true)
      // defaultShowMovies();
    }

    if (moviesCount >= filteredArray.length && showMoreVisibility === true) {
      setShowMoreVisibility(false)
      setShowMovies(filteredArray.length)
    }

    return filteredArray.slice(0, moviesCount).map((movie) => (
      <MoviesCard
        key={movie.id}
        cardButton="like"
        movieTitle={movie.nameRU}
        movieDuration={getDuration(movie.duration)}
        imgSrc={`https://api.nomoreparties.co/${movie.image.url}`}
        handleCardAction={handleCardLike}
        cardProps={movie}
        trailerLink={movie.trailerLink}
      />
    ))
  }

  return (
    <>
      <Header
        menuOpened={menuOpened}
        setMenuOpened={setMenuOpened}
        loggedIn={loggedIn}/>
      <main className="movies">
        <SearchForm
          handleSubmit={handleSubmit}
          setIsShort={setIsShort}
          setMovieQuery={setMovieQuery}
          movieQuery={movieQuery}
          isShort={isShort}
        />
        {isLoading && <Preloader
          isLoading={isLoading}
        />}
        {errorMessage && (<MovieListError
          errorText={errorMessage}
        />)}

        {showMovieCardList && (<MoviesCardList
          showMovies={showMovies}
          renderMovies={renderMovies}
        >
          <section
            className={`movie-card-list__add-more ${showMoreVisibility && 'movie-card-list__add-more_type_visible '}`}>
            <button onClick={handleAddMoreClick} type="button"
                    className="movie-card-list__add-more-button">Ещё
            </button>
          </section>
        </MoviesCardList>)
        }
      </main>
      <Footer/>
    </>
  );
}

export default Movies;
