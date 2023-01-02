import React, { useEffect, useState } from 'react';
import '../assets/scss/components/Home.scss';
import Header from './Header';
import Page from './Page';

export default function Home(props) {

    const [pages, setPages] = useState(null);
    const [selectedPage, setSelectedPage] = useState(null);
    const [fetchDate, setFetchDate] = useState(Date.now());
    const changeSelectedPage = (pageId, forceUpdate) => {
        const page = pages.find((page) => page.id === pageId);
        // Permet de forcer le rechargement (exemple au clic sur une notification alors que le select est déjà sur la pge)
        setFetchDate(Date.now());
        setSelectedPage(page ? page : null);
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/fb/accounts`, {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            }
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                throw new Error("Une erreur est survenue.");
            })
            .then(responseJson => {
                setPages(responseJson.data || null);
            })
            .catch(error => {
                console.error('Une erreur est survenue');
                // this.setState({
                //     error: "Une erreur est survenue."
                // });
            });
    }, []);

    return (
        <main id="home">
            <Header user={props.user} pages={pages} onChangeSelectedPage={changeSelectedPage} selectedPage={selectedPage}/>
            <section>
                {selectedPage && (
                    <Page page={selectedPage} fetchDate={fetchDate}/>
                )}
            </section>
        </main>
    )
}