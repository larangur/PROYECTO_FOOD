import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Filters,
    RecipesContainer,
    Pagination,
    Browser,
    SearchBar,
    CreateButton,
    FormCreate,
    Modal,
    Header,
    LoadingGlobal,
} from '../../components';
import { getAllRecipes } from '../../redux/actions';
import { usePagination } from '../../hooks';

import styles from './HomePage.module.css';
import { Footer } from '../../components/Footer';

export const HomePage = () => {
    const dispatch = useDispatch();

    const allRecipes = useSelector((state) => state.allRecipes);
    const filteredRecipes = useSelector((state) => state.filteredRecipes);
    const onCreate = useSelector((state) => state.onCreate);
    const created = useSelector((state) => state.created);
    const onLoading = useSelector((state) => state.onLoading);
  
    const {
        currentPage,
        nextPage,
        previousPage,
        maxPages,
        itemsPerPage,
        resetPage,
    } = usePagination(9);

    useEffect(() => {
        if (allRecipes.length < 1) {
            dispatch(getAllRecipes());
        }
    }, []);
    return (
        <main className={styles.main}>
            <Header />
            <Filters resetPage={resetPage} />
            <Browser>
                <SearchBar />
                <CreateButton />
                <Pagination
                    currentPage={currentPage}
                    nextPage={nextPage}
                    previousPage={previousPage}
                    maxPages={maxPages}
                />
            </Browser>
            {onLoading && <LoadingGlobal />}
            {!onLoading && (
                <RecipesContainer
                    filteredRecipes={filteredRecipes}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                />
            )}
            {onCreate && <FormCreate />}
            {created && (
                <Modal
                    title="Recipe created successfully"
                    subtitle="(Reload page for view changes)"
                    icon="check_verde.png"
                />
            )}
          
            <Footer />
        </main>
    );
};
